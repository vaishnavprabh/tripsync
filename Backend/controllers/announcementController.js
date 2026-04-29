import db from '../config/db.js';

// Create an announcement
export const createAnnouncement = (req, res) => {
    const { tripId } = req.params;
    const { title, message } = req.body;
    const userId = req.user.id;

    if (!title || !message) {
        return res.status(400).json({ error: 'Title and message are required' });
    }

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to create announcements for this trip' });
        }

        const sql = 'INSERT INTO announcements (trip_id, created_by_user_id, title, message) VALUES (?, ?, ?, ?)';
        db.query(sql, [tripId, userId, title, message], (err, result) => {
            if (err) {
                console.error('Error creating announcement:', err);
                return res.status(500).json({ error: 'Error creating announcement' });
            }

            res.status(201).json({
                message: 'Announcement created successfully',
                announcementId: result.insertId
            });
        });
    });
};

// Get all announcements for a trip
export const getTripAnnouncements = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view announcements for this trip' });
        }

        const sql = `SELECT a.*, u.username as created_by_name, u.email as created_by_email
                     FROM announcements a
                     JOIN users u ON a.created_by_user_id = u.id
                     WHERE a.trip_id = ?
                     ORDER BY a.created_at DESC`;

        db.query(sql, [tripId], (err, announcementResults) => {
            if (err) {
                console.error('Error fetching announcements:', err);
                return res.status(500).json({ error: 'Error fetching announcements' });
            }

            res.status(200).json({ announcements: announcementResults });
        });
    });
};

// Delete an announcement
export const deleteAnnouncement = (req, res) => {
    const { announcementId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or the one who created it
    const checkSql = `SELECT a.created_by_user_id, t.organizer_id
                      FROM announcements a
                      JOIN trips t ON a.trip_id = t.id
                      WHERE a.id = ?`;
    db.query(checkSql, [announcementId], (err, results) => {
        if (err) {
            console.error('Error checking announcement:', err);
            return res.status(500).json({ error: 'Error checking announcement' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Announcement not found' });
        }

        const announcement = results[0];
        if (announcement.organizer_id !== userId && announcement.created_by_user_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this announcement' });
        }

        const deleteSql = 'DELETE FROM announcements WHERE id = ?';
        db.query(deleteSql, [announcementId], (err, result) => {
            if (err) {
                console.error('Error deleting announcement:', err);
                return res.status(500).json({ error: 'Error deleting announcement' });
            }

            res.status(200).json({ message: 'Announcement deleted successfully' });
        });
    });
};
