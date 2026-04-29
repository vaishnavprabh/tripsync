import db from '../config/db.js';

// Send a message
export const sendMessage = (req, res) => {
    const { tripId } = req.params;
    const { messageText, message } = req.body; // Support both messageText and message
    const userId = req.user.id;
    const messageContent = messageText || message; // Use either field

    if (!messageContent || !messageContent.trim()) {
        return res.status(400).json({ error: 'Message text is required' });
    }

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to send messages for this trip' });
        }

        const sql = 'INSERT INTO messages (trip_id, user_id, message_text) VALUES (?, ?, ?)';
        db.query(sql, [tripId, userId, messageContent.trim()], (err, result) => {
            if (err) {
                console.error('Error sending message:', err);
                return res.status(500).json({ error: 'Error sending message' });
            }

            res.status(201).json({
                message: 'Message sent successfully',
                messageId: result.insertId
            });
        });
    });
};

// Get all messages for a trip
export const getTripMessages = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view messages for this trip' });
        }

        const sql = `SELECT m.*, m.message_text as message, u.username, u.email, u.id as user_id
                     FROM messages m
                     JOIN users u ON m.user_id = u.id
                     WHERE m.trip_id = ?
                     ORDER BY m.created_at ASC`;

        db.query(sql, [tripId], (err, messageResults) => {
            if (err) {
                console.error('Error fetching messages:', err);
                return res.status(500).json({ error: 'Error fetching messages' });
            }

            res.status(200).json({ messages: messageResults });
        });
    });
};
