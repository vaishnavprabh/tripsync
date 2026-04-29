import db from '../config/db.js';

// Add a new day to itinerary
export const addItineraryDay = (req, res) => {
    const { tripId } = req.params;
    const { dayNumber, date } = req.body;
    const userId = req.user.id;

    if (!dayNumber || !date) {
        return res.status(400).json({ error: 'Day number and date are required' });
    }

    // Check if user is organizer
    const checkSql = 'SELECT organizer_id FROM trips WHERE id = ?';
    db.query(checkSql, [tripId], (err, results) => {
        if (err) {
            console.error('Error checking trip:', err);
            return res.status(500).json({ error: 'Error checking trip' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        if (results[0].organizer_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to modify itinerary for this trip' });
        }

        const sql = 'INSERT INTO itinerary_days (trip_id, day_number, date) VALUES (?, ?, ?)';
        db.query(sql, [tripId, dayNumber, date], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Day already exists for this trip' });
                }
                console.error('Error adding day:', err);
                return res.status(500).json({ error: 'Error adding day' });
            }

            res.status(201).json({
                message: 'Day added successfully',
                dayId: result.insertId
            });
        });
    });
};

// Get itinerary for a trip
export const getTripItinerary = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view itinerary for this trip' });
        }

        const sql = `SELECT id.id, id.day_number, id.date,
                     COALESCE(
                         JSON_ARRAYAGG(
                             CASE 
                                 WHEN ia.id IS NOT NULL THEN
                                     JSON_OBJECT(
                                         'id', ia.id,
                                         'time', ia.activity_time,
                                         'activity', ia.activity_name,
                                         'location', ia.location,
                                         'description', ia.description,
                                         'order', ia.activity_order
                                     )
                                 ELSE NULL
                             END
                         ),
                         JSON_ARRAY()
                     ) as activities
                     FROM itinerary_days id
                     LEFT JOIN itinerary_activities ia ON id.id = ia.day_id
                     WHERE id.trip_id = ?
                     GROUP BY id.id, id.day_number, id.date
                     ORDER BY id.day_number ASC`;

        db.query(sql, [tripId], (err, dayResults) => {
            if (err) {
                console.error('Error fetching itinerary:', err);
                return res.status(500).json({ error: 'Error fetching itinerary' });
            }

            // Parse activities JSON - handle different formats
            const itinerary = dayResults.map(day => {
                let activities = [];
                
                if (day.activities) {
                    try {
                        // Check if it's already an array
                        if (Array.isArray(day.activities)) {
                            // Filter out null values that might come from JSON_ARRAYAGG
                            activities = day.activities.filter(act => act !== null && act !== undefined);
                        } else if (typeof day.activities === 'string') {
                            // If it's a string, parse it
                            const parsed = JSON.parse(day.activities);
                            if (Array.isArray(parsed)) {
                                activities = parsed.filter(act => act !== null && act !== undefined);
                            } else if (parsed && typeof parsed === 'object') {
                                activities = [parsed];
                            }
                        } else if (typeof day.activities === 'object' && day.activities !== null) {
                            // If it's already an object (MySQL driver parsed it), check if it's an array
                            if (Array.isArray(day.activities)) {
                                activities = day.activities.filter(act => act !== null && act !== undefined);
                            } else {
                                // Single object, wrap in array
                                activities = [day.activities];
                            }
                        }
                    } catch (parseErr) {
                        console.error('Error parsing activities:', parseErr);
                        console.error('Activities type:', typeof day.activities);
                        console.error('Activities value:', day.activities);
                        activities = [];
                    }
                }

                return {
                    id: day.id,
                    day: day.day_number,
                    date: day.date,
                    activities: activities
                };
            });

            res.status(200).json({ itinerary });
        });
    });
};

// Add activity to a day
export const addActivity = (req, res) => {
    const { dayId } = req.params;
    const { activityTime, activityName, location, description, activityOrder } = req.body;
    const userId = req.user.id;

    if (!activityTime || !activityName) {
        return res.status(400).json({ error: 'Activity time and name are required' });
    }

    // Check if user is organizer
    const checkSql = `SELECT t.organizer_id 
                      FROM itinerary_days id
                      JOIN trips t ON id.trip_id = t.id
                      WHERE id.id = ?`;
    db.query(checkSql, [dayId], (err, results) => {
        if (err) {
            console.error('Error checking day:', err);
            return res.status(500).json({ error: 'Error checking day' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Day not found' });
        }

        if (results[0].organizer_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to add activities' });
        }

        const sql = `INSERT INTO itinerary_activities (day_id, activity_time, activity_name, location, description, activity_order)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            dayId,
            activityTime,
            activityName,
            location || null,
            description || null,
            activityOrder || 0
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding activity:', err);
                return res.status(500).json({ error: 'Error adding activity' });
            }

            res.status(201).json({
                message: 'Activity added successfully',
                activityId: result.insertId
            });
        });
    });
};

// Update an activity
export const updateActivity = (req, res) => {
    const { activityId } = req.params;
    const { activityTime, activityName, location, description, activityOrder } = req.body;
    const userId = req.user.id;

    // Check if user is organizer
    const checkSql = `SELECT t.organizer_id 
                      FROM itinerary_activities ia
                      JOIN itinerary_days id ON ia.day_id = id.id
                      JOIN trips t ON id.trip_id = t.id
                      WHERE ia.id = ?`;
    db.query(checkSql, [activityId], (err, results) => {
        if (err) {
            console.error('Error checking activity:', err);
            return res.status(500).json({ error: 'Error checking activity' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        if (results[0].organizer_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to update this activity' });
        }

        // Build update query
        const updates = [];
        const values = [];

        if (activityTime) {
            updates.push('activity_time = ?');
            values.push(activityTime);
        }
        if (activityName) {
            updates.push('activity_name = ?');
            values.push(activityName);
        }
        if (location !== undefined) {
            updates.push('location = ?');
            values.push(location);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (activityOrder !== undefined) {
            updates.push('activity_order = ?');
            values.push(activityOrder);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        values.push(activityId);
        const updateSql = `UPDATE itinerary_activities SET ${updates.join(', ')} WHERE id = ?`;

        db.query(updateSql, values, (err, result) => {
            if (err) {
                console.error('Error updating activity:', err);
                return res.status(500).json({ error: 'Error updating activity' });
            }

            res.status(200).json({ message: 'Activity updated successfully' });
        });
    });
};

// Delete an activity
export const deleteActivity = (req, res) => {
    const { activityId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer
    const checkSql = `SELECT t.organizer_id 
                      FROM itinerary_activities ia
                      JOIN itinerary_days id ON ia.day_id = id.id
                      JOIN trips t ON id.trip_id = t.id
                      WHERE ia.id = ?`;
    db.query(checkSql, [activityId], (err, results) => {
        if (err) {
            console.error('Error checking activity:', err);
            return res.status(500).json({ error: 'Error checking activity' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        if (results[0].organizer_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this activity' });
        }

        const deleteSql = 'DELETE FROM itinerary_activities WHERE id = ?';
        db.query(deleteSql, [activityId], (err, result) => {
            if (err) {
                console.error('Error deleting activity:', err);
                return res.status(500).json({ error: 'Error deleting activity' });
            }

            res.status(200).json({ message: 'Activity deleted successfully' });
        });
    });
};

// Delete a day
export const deleteDay = (req, res) => {
    const { dayId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer
    const checkSql = `SELECT t.organizer_id 
                      FROM itinerary_days id
                      JOIN trips t ON id.trip_id = t.id
                      WHERE id.id = ?`;
    db.query(checkSql, [dayId], (err, results) => {
        if (err) {
            console.error('Error checking day:', err);
            return res.status(500).json({ error: 'Error checking day' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Day not found' });
        }

        if (results[0].organizer_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this day' });
        }

        const deleteSql = 'DELETE FROM itinerary_days WHERE id = ?';
        db.query(deleteSql, [dayId], (err, result) => {
            if (err) {
                console.error('Error deleting day:', err);
                return res.status(500).json({ error: 'Error deleting day' });
            }

            res.status(200).json({ message: 'Day deleted successfully' });
        });
    });
};
