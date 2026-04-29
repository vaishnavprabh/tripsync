import db from '../config/db.js';

// Get admin dashboard statistics
export const getAdminStats = (req, res) => {
    const sql = `SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM trips) as total_trips,
        (SELECT COUNT(*) FROM trips WHERE status = 'active') as active_trips,
        (SELECT COUNT(*) FROM trips WHERE status = 'published') as published_trips,
        (SELECT COUNT(*) FROM trips WHERE status = 'completed') as completed_trips,
        (SELECT COUNT(*) FROM trips WHERE status = 'draft') as draft_trips,
        (SELECT COUNT(*) FROM users WHERE role = 'organizer') as total_organizers,
        (SELECT COUNT(*) FROM users WHERE role = 'traveler') as total_travelers,
        (SELECT COUNT(*) FROM trip_participants) as total_participants,
        (SELECT COALESCE(SUM(estimated_budget), 0) FROM trips) as total_budget,
        (SELECT COUNT(*) FROM feedback WHERE status = 'pending') as pending_feedback`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching admin stats:', err);
            return res.status(500).json({ error: 'Error fetching statistics' });
        }

        res.status(200).json({ stats: results[0] });
    });
};

// Get all trips (admin view)
export const getAllTrips = (req, res) => {
    const { status } = req.query;

    let sql = `SELECT t.*, 
               u.username as organizer_name,
               u.email as organizer_email,
               (SELECT COUNT(*) FROM trip_participants WHERE trip_id = t.id) as participant_count
               FROM trips t
               JOIN users u ON t.organizer_id = u.id`;

    const values = [];

    if (status) {
        sql += ' WHERE t.status = ?';
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

// Get trip details (admin view)
export const getTripDetails = (req, res) => {
    const { tripId } = req.params;

    const sql = `SELECT t.*, 
                 u.username as organizer_name,
                 u.email as organizer_email,
                 u.number as organizer_phone,
                 (SELECT COUNT(*) FROM trip_participants WHERE trip_id = t.id) as participant_count,
                 (SELECT COUNT(*) FROM trip_invitations WHERE trip_id = t.id) as total_invitations,
                 (SELECT COUNT(*) FROM expenses WHERE trip_id = t.id) as total_expenses,
                 (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE trip_id = t.id) as expenses_total
                 FROM trips t
                 JOIN users u ON t.organizer_id = u.id
                 WHERE t.id = ?`;

    db.query(sql, [tripId], (err, results) => {
        if (err) {
            console.error('Error fetching trip details:', err);
            return res.status(500).json({ error: 'Error fetching trip details' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ trip: results[0] });
    });
};

// Delete trip (admin)
export const deleteTrip = (req, res) => {
    const { tripId } = req.params;

    const sql = 'DELETE FROM trips WHERE id = ?';

    db.query(sql, [tripId], (err, result) => {
        if (err) {
            console.error('Error deleting trip:', err);
            return res.status(500).json({ error: 'Error deleting trip' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ message: 'Trip deleted successfully' });
    });
};
