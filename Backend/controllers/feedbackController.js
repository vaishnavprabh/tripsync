import db from '../config/db.js';

// Submit feedback (for users - travelers/organizers)
export const submitFeedback = (req, res) => {
    const { subject, message, type } = req.body;
    const userId = req.user?.id || null;
    const userName = req.user?.username || req.body.userName || 'Anonymous';
    const userEmail = req.user?.email || req.body.userEmail || '';

    if (!subject || !message) {
        return res.status(400).json({ error: 'Subject and message are required' });
    }

    if (!userEmail && !userId) {
        return res.status(400).json({ error: 'User email is required for anonymous feedback' });
    }

    const feedbackType = type || 'feedback';
    if (!['feedback', 'complaint', 'technical'].includes(feedbackType)) {
        return res.status(400).json({ error: 'Invalid feedback type' });
    }

    // Get user details if userId is provided
    if (userId) {
        const getUserSql = 'SELECT username, email FROM users WHERE id = ?';
        db.query(getUserSql, [userId], (err, userResults) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Error fetching user details' });
            }

            if (userResults.length > 0) {
                const finalUserName = userResults[0].username;
                const finalUserEmail = userResults[0].email;

                const sql = `INSERT INTO feedback (user_id, user_name, user_email, type, subject, message, status) 
                           VALUES (?, ?, ?, ?, ?, ?, 'pending')`;
                
                db.query(sql, [userId, finalUserName, finalUserEmail, feedbackType, subject, message], (err, result) => {
                    if (err) {
                        console.error('Error submitting feedback:', err);
                        return res.status(500).json({ error: 'Error submitting feedback' });
                    }

                    res.status(201).json({
                        message: 'Feedback submitted successfully',
                        feedbackId: result.insertId
                    });
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        });
    } else {
        // Anonymous feedback
        const sql = `INSERT INTO feedback (user_id, user_name, user_email, type, subject, message, status) 
                   VALUES (?, ?, ?, ?, ?, ?, 'pending')`;
        
        db.query(sql, [null, userName, userEmail, feedbackType, subject, message], (err, result) => {
            if (err) {
                console.error('Error submitting feedback:', err);
                return res.status(500).json({ error: 'Error submitting feedback' });
            }

            res.status(201).json({
                message: 'Feedback submitted successfully',
                feedbackId: result.insertId
            });
        });
    }
};

// Get all feedback (admin only)
export const getAllFeedback = (req, res) => {
    const { type, status } = req.query;

    let sql = `SELECT f.*, 
               a.name as replied_by_admin_name
               FROM feedback f
               LEFT JOIN admin a ON f.replied_by_admin_id = a.id
               WHERE 1=1`;
    
    const values = [];

    if (type) {
        sql += ' AND f.type = ?';
        values.push(type);
    }

    if (status) {
        sql += ' AND f.status = ?';
        values.push(status);
    }

    sql += ' ORDER BY f.created_at DESC';

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).json({ error: 'Error fetching feedback' });
        }

        res.status(200).json({ feedback: results });
    });
};

// Get feedback by ID (admin only)
export const getFeedbackById = (req, res) => {
    const { feedbackId } = req.params;

    const sql = `SELECT f.*, 
                 a.name as replied_by_admin_name
                 FROM feedback f
                 LEFT JOIN admin a ON f.replied_by_admin_id = a.id
                 WHERE f.id = ?`;

    db.query(sql, [feedbackId], (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).json({ error: 'Error fetching feedback' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ feedback: results[0] });
    });
};

// Reply to feedback (admin only)
export const replyToFeedback = (req, res) => {
    const { feedbackId } = req.params;
    const { reply } = req.body;
    const adminId = req.user.id;

    if (!reply || !reply.trim()) {
        return res.status(400).json({ error: 'Reply message is required' });
    }

    const sql = `UPDATE feedback 
                 SET admin_reply = ?, 
                     replied_by_admin_id = ?, 
                     status = 'resolved',
                     replied_at = NOW(),
                     updated_at = NOW()
                 WHERE id = ?`;

    db.query(sql, [reply.trim(), adminId, feedbackId], (err, result) => {
        if (err) {
            console.error('Error replying to feedback:', err);
            return res.status(500).json({ error: 'Error replying to feedback' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Reply sent successfully' });
    });
};

// Update feedback status (admin only)
export const updateFeedbackStatus = (req, res) => {
    const { feedbackId } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'in_progress', 'resolved', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Valid status is required' });
    }

    const sql = 'UPDATE feedback SET status = ?, updated_at = NOW() WHERE id = ?';

    db.query(sql, [status, feedbackId], (err, result) => {
        if (err) {
            console.error('Error updating feedback status:', err);
            return res.status(500).json({ error: 'Error updating feedback status' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback status updated successfully' });
    });
};

// Delete feedback (admin only)
export const deleteFeedback = (req, res) => {
    const { feedbackId } = req.params;

    const sql = 'DELETE FROM feedback WHERE id = ?';

    db.query(sql, [feedbackId], (err, result) => {
        if (err) {
            console.error('Error deleting feedback:', err);
            return res.status(500).json({ error: 'Error deleting feedback' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    });
};

// Get user's own feedback (for travelers/organizers)
export const getUserFeedback = (req, res) => {
    const userId = req.user.id;

    const sql = `SELECT * FROM feedback 
                 WHERE user_id = ? 
                 ORDER BY created_at DESC`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user feedback:', err);
            return res.status(500).json({ error: 'Error fetching feedback' });
        }

        res.status(200).json({ feedback: results });
    });
};
