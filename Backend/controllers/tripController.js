import db from '../config/db.js';

// Helper function to convert ISO datetime to DATE format (YYYY-MM-DD)
const formatDateForDB = (dateString) => {
    if (!dateString) return null;
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }
    // If it's an ISO datetime string, extract just the date part
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Create a new trip
export const createTrip = (req, res) => {
    const { tripName, destination, description, startDate, endDate, maxParticipants, estimatedBudget, status } = req.body;
    const organizerId = req.user.id;

    // Validation
    if (!tripName || !destination || !startDate || !endDate) {
        return res.status(400).json({ error: 'Trip name, destination, start date, and end date are required' });
    }

    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Format dates for MySQL DATE column
    const formattedStartDate = formatDateForDB(startDate);
    const formattedEndDate = formatDateForDB(endDate);

    const sql = `INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, 
                max_participants, estimated_budget, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        organizerId,
        tripName,
        destination,
        description || null,
        formattedStartDate,
        formattedEndDate,
        maxParticipants || 20,
        estimatedBudget || 0,
        status || 'draft'
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating trip:', err);
            return res.status(500).json({ error: 'Error creating trip' });
        }

        res.status(201).json({
            message: 'Trip created successfully',
            tripId: result.insertId
        });
    });
};

// Get all trips for an organizer
export const getOrganizerTrips = (req, res) => {
    const organizerId = req.user.id;
    const { status } = req.query;

    let sql = `SELECT t.*, 
               COUNT(DISTINCT tp.id) as participant_count,
               COUNT(DISTINCT ti.id) as pending_invitations
               FROM trips t
               LEFT JOIN trip_participants tp ON t.id = tp.trip_id
               LEFT JOIN trip_invitations ti ON t.id = ti.trip_id AND ti.status = 'pending'
               WHERE t.organizer_id = ?
               GROUP BY t.id`;

    const values = [organizerId];

    if (status) {
        sql += ' AND t.status = ?';
        values.push(status);
    }

    sql += ' ORDER BY t.created_at DESC';

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching trips:', err);
            return res.status(500).json({ error: 'Error fetching trips' });
        }

        res.status(200).json({ trips: results });
    });
};

// Get a single trip by ID
export const getTripById = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    const sql = `SELECT t.*, 
                 COUNT(DISTINCT tp.id) as participant_count,
                 COUNT(DISTINCT ti.id) as pending_invitations,
                 (SELECT COUNT(*) FROM trip_participants WHERE trip_id = t.id) as total_participants
                 FROM trips t
                 LEFT JOIN trip_participants tp ON t.id = tp.trip_id
                 LEFT JOIN trip_invitations ti ON t.id = ti.trip_id AND ti.status = 'pending'
                 WHERE t.id = ? AND (t.organizer_id = ? OR EXISTS (SELECT 1 FROM trip_participants WHERE trip_id = t.id AND user_id = ?))
                 GROUP BY t.id`;

    db.query(sql, [tripId, userId, userId], (err, results) => {
        if (err) {
            console.error('Error fetching trip:', err);
            return res.status(500).json({ error: 'Error fetching trip' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ trip: results[0] });
    });
};

// Update a trip
export const updateTrip = (req, res) => {
    const { tripId } = req.params;
    const organizerId = req.user.id;
    const { tripName, destination, description, startDate, endDate, maxParticipants, estimatedBudget, status } = req.body;

    // Check if user is the organizer
    const checkSql = 'SELECT organizer_id FROM trips WHERE id = ?';
    db.query(checkSql, [tripId], (err, results) => {
        if (err) {
            console.error('Error checking trip:', err);
            return res.status(500).json({ error: 'Error checking trip' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        if (results[0].organizer_id !== organizerId) {
            return res.status(403).json({ error: 'You are not authorized to update this trip' });
        }

        // Build update query dynamically
        const updates = [];
        const values = [];

        if (tripName) {
            updates.push('trip_name = ?');
            values.push(tripName);
        }
        if (destination) {
            updates.push('destination = ?');
            values.push(destination);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (startDate) {
            updates.push('start_date = ?');
            values.push(formatDateForDB(startDate));
        }
        if (endDate) {
            updates.push('end_date = ?');
            values.push(formatDateForDB(endDate));
        }
        if (maxParticipants) {
            updates.push('max_participants = ?');
            values.push(maxParticipants);
        }
        if (estimatedBudget !== undefined) {
            updates.push('estimated_budget = ?');
            values.push(estimatedBudget);
        }
        if (status) {
            updates.push('status = ?');
            values.push(status);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        values.push(tripId);
        const updateSql = `UPDATE trips SET ${updates.join(', ')} WHERE id = ?`;

        db.query(updateSql, values, (err, result) => {
            if (err) {
                console.error('Error updating trip:', err);
                return res.status(500).json({ error: 'Error updating trip' });
            }

            res.status(200).json({ message: 'Trip updated successfully' });
        });
    });
};

// Delete a trip
export const deleteTrip = (req, res) => {
    const { tripId } = req.params;
    const organizerId = req.user.id;

    // Check if user is the organizer
    const checkSql = 'SELECT organizer_id FROM trips WHERE id = ?';
    db.query(checkSql, [tripId], (err, results) => {
        if (err) {
            console.error('Error checking trip:', err);
            return res.status(500).json({ error: 'Error checking trip' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        if (results[0].organizer_id !== organizerId) {
            return res.status(403).json({ error: 'You are not authorized to delete this trip' });
        }

        const deleteSql = 'DELETE FROM trips WHERE id = ?';
        db.query(deleteSql, [tripId], (err, result) => {
            if (err) {
                console.error('Error deleting trip:', err);
                return res.status(500).json({ error: 'Error deleting trip' });
            }

            res.status(200).json({ message: 'Trip deleted successfully' });
        });
    });
};

// Get trip statistics
export const getTripStats = (req, res) => {
    const organizerId = req.user.id;

    const sql = `SELECT 
                 COUNT(*) as total_trips,
                 SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_trips,
                 SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_trips,
                 SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_trips,
                 SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_trips,
                 (SELECT COUNT(*) FROM trip_invitations ti 
                  JOIN trips t ON ti.trip_id = t.id 
                  WHERE t.organizer_id = ? AND ti.status = 'pending') as pending_invitations,
                 (SELECT COALESCE(SUM(estimated_budget), 0) FROM trips WHERE organizer_id = ?) as total_budget
                 FROM trips WHERE organizer_id = ?`;

    db.query(sql, [organizerId, organizerId, organizerId], (err, results) => {
        if (err) {
            console.error('Error fetching stats:', err);
            return res.status(500).json({ error: 'Error fetching statistics' });
        }

        res.status(200).json({ stats: results[0] });
    });
};

// Get all trips for a traveler (trips they've joined)
export const getTravelerTrips = (req, res) => {
    const travelerId = req.user.id;

    const sql = `SELECT t.*, 
                 (SELECT COUNT(*) FROM trip_participants WHERE trip_id = t.id) as participant_count,
                 u.username as organizer_name,
                 tp.joined_at,
                 tp.role as participant_role
                 FROM trips t
                 JOIN trip_participants tp ON t.id = tp.trip_id
                 JOIN users u ON t.organizer_id = u.id
                 WHERE tp.user_id = ?
                 ORDER BY t.start_date DESC`;

    db.query(sql, [travelerId], (err, results) => {
        if (err) {
            console.error('Error fetching traveler trips:', err);
            return res.status(500).json({ error: 'Error fetching trips' });
        }

        res.status(200).json({ trips: results });
    });
};

// Get published trips (public endpoint - no auth required)
export const getPublishedTrips = (req, res) => {
    const { limit = 6 } = req.query;

    const sql = `SELECT t.*, 
                 COUNT(DISTINCT tp.id) as participant_count,
                 u.username as organizer_name
                 FROM trips t
                 LEFT JOIN trip_participants tp ON t.id = tp.trip_id
                 JOIN users u ON t.organizer_id = u.id
                 WHERE t.status IN ('published', 'active')
                 GROUP BY t.id
                 ORDER BY t.created_at DESC
                 LIMIT ?`;

    db.query(sql, [parseInt(limit)], (err, results) => {
        if (err) {
            console.error('Error fetching published trips:', err);
            return res.status(500).json({ error: 'Error fetching trips' });
        }

        res.status(200).json({ trips: results });
    });
};

// Get trip participants (for organizer or traveler)
export const getTripParticipants = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err) {
            console.error('Error checking trip:', err);
            return res.status(500).json({ error: 'Error checking trip' });
        }

        if (results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view participants for this trip' });
        }

        const sql = `SELECT tp.*, 
                     u.username, 
                     u.email, 
                     u.number as phone,
                     u.id as user_id
                     FROM trip_participants tp
                     JOIN users u ON tp.user_id = u.id
                     WHERE tp.trip_id = ?
                     ORDER BY tp.joined_at DESC`;

        db.query(sql, [tripId], (err, participantResults) => {
            if (err) {
                console.error('Error fetching participants:', err);
                return res.status(500).json({ error: 'Error fetching participants' });
            }

            res.status(200).json({ participants: participantResults });
        });
    });
};
