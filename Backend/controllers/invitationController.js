import db from '../config/db.js';

// Send invitation via email
export const sendInvitation = (req, res) => {
    const { tripId } = req.params;
    const { email, name, customMessage } = req.body;
    const organizerId = req.user.id;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

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
            return res.status(403).json({ error: 'You are not authorized to send invitations for this trip' });
        }

        // Check if user exists
        const userSql = 'SELECT id, username FROM users WHERE email = ?';
        db.query(userSql, [email], (err, userResults) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Error checking user' });
            }

            const invitedUserId = userResults.length > 0 ? userResults[0].id : null;
            const invitedName = name || (userResults.length > 0 ? userResults[0].username : null);

            // Check if invitation already exists
            const checkInviteSql = 'SELECT id FROM trip_invitations WHERE trip_id = ? AND invited_email = ?';
            db.query(checkInviteSql, [tripId, email], (err, inviteResults) => {
                if (err) {
                    console.error('Error checking invitation:', err);
                    return res.status(500).json({ error: 'Error checking invitation' });
                }

                if (inviteResults.length > 0) {
                    return res.status(409).json({ error: 'Invitation already sent to this email' });
                }

                // Create invitation
                const insertSql = `INSERT INTO trip_invitations (trip_id, invited_user_id, invited_email, invited_name, custom_message, status)
                                   VALUES (?, ?, ?, ?, ?, 'pending')`;
                const values = [tripId, invitedUserId, email, invitedName, customMessage || null];

                db.query(insertSql, values, (err, result) => {
                    if (err) {
                        console.error('Error creating invitation:', err);
                        return res.status(500).json({ error: 'Error sending invitation' });
                    }

                    res.status(201).json({
                        message: 'Invitation sent successfully',
                        invitationId: result.insertId
                    });
                });
            });
        });
    });
};

// Get all invitations for a trip
export const getTripInvitations = (req, res) => {
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
            return res.status(403).json({ error: 'You are not authorized to view invitations for this trip' });
        }

        const sql = `SELECT ti.*, u.username, u.email as user_email
                     FROM trip_invitations ti
                     LEFT JOIN users u ON ti.invited_user_id = u.id
                     WHERE ti.trip_id = ?
                     ORDER BY ti.invited_at DESC`;

        db.query(sql, [tripId], (err, inviteResults) => {
            if (err) {
                console.error('Error fetching invitations:', err);
                return res.status(500).json({ error: 'Error fetching invitations' });
            }

            res.status(200).json({ invitations: inviteResults });
        });
    });
};

// Cancel an invitation
export const cancelInvitation = (req, res) => {
    const { invitationId } = req.params;
    const organizerId = req.user.id;

    // Check if user is the organizer of the trip
    const checkSql = `SELECT t.organizer_id 
                      FROM trip_invitations ti
                      JOIN trips t ON ti.trip_id = t.id
                      WHERE ti.id = ?`;
    db.query(checkSql, [invitationId], (err, results) => {
        if (err) {
            console.error('Error checking invitation:', err);
            return res.status(500).json({ error: 'Error checking invitation' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Invitation not found' });
        }

        if (results[0].organizer_id !== organizerId) {
            return res.status(403).json({ error: 'You are not authorized to cancel this invitation' });
        }

        const updateSql = "UPDATE trip_invitations SET status = 'cancelled' WHERE id = ?";
        db.query(updateSql, [invitationId], (err, result) => {
            if (err) {
                console.error('Error cancelling invitation:', err);
                return res.status(500).json({ error: 'Error cancelling invitation' });
            }

            res.status(200).json({ message: 'Invitation cancelled successfully' });
        });
    });
};

// Get invitation link (invite code)
export const getInviteLink = (req, res) => {
    const { tripId } = req.params;
    const organizerId = req.user.id;

    const sql = 'SELECT invite_code FROM trips WHERE id = ? AND organizer_id = ?';
    db.query(sql, [tripId, organizerId], (err, results) => {
        if (err) {
            console.error('Error fetching invite code:', err);
            return res.status(500).json({ error: 'Error fetching invite code' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const inviteCode = results[0].invite_code;
        const inviteLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/join/${inviteCode}`;

        res.status(200).json({ inviteCode, inviteLink });
    });
};

// Join trip via invite code (for travelers)
export const joinTripByCode = (req, res) => {
    const { inviteCode } = req.body;
    const userId = req.user.id;

    if (!inviteCode) {
        return res.status(400).json({ error: 'Invite code is required' });
    }

    // Find trip by invite code
    const tripSql = 'SELECT id, organizer_id, max_participants, status FROM trips WHERE invite_code = ?';
    db.query(tripSql, [inviteCode], (err, tripResults) => {
        if (err) {
            console.error('Error finding trip:', err);
            return res.status(500).json({ error: 'Error finding trip' });
        }

        if (tripResults.length === 0) {
            return res.status(404).json({ error: 'Invalid invite code' });
        }

        const trip = tripResults[0];

        // Check if trip is published or active
        if (trip.status !== 'published' && trip.status !== 'active') {
            return res.status(400).json({ error: 'This trip is not available for joining' });
        }

        // Check if user is the organizer
        if (trip.organizer_id === userId) {
            return res.status(400).json({ error: 'You are the organizer of this trip' });
        }

        // Check if user is already a participant
        const checkParticipantSql = 'SELECT id FROM trip_participants WHERE trip_id = ? AND user_id = ?';
        db.query(checkParticipantSql, [trip.id, userId], (err, participantResults) => {
            if (err) {
                console.error('Error checking participant:', err);
                return res.status(500).json({ error: 'Error checking participant' });
            }

            if (participantResults.length > 0) {
                return res.status(409).json({ error: 'You are already a participant in this trip' });
            }

            // Check if trip has reached max participants
            const countSql = 'SELECT COUNT(*) as count FROM trip_participants WHERE trip_id = ?';
            db.query(countSql, [trip.id], (err, countResults) => {
                if (err) {
                    console.error('Error counting participants:', err);
                    return res.status(500).json({ error: 'Error counting participants' });
                }

                const currentCount = countResults[0].count;
                if (currentCount >= trip.max_participants) {
                    return res.status(400).json({ error: 'This trip has reached maximum participants' });
                }

                // Add user as participant
                const insertSql = 'INSERT INTO trip_participants (trip_id, user_id, role) VALUES (?, ?, ?)';
                db.query(insertSql, [trip.id, userId, 'participant'], (err, result) => {
                    if (err) {
                        console.error('Error joining trip:', err);
                        return res.status(500).json({ error: 'Error joining trip' });
                    }

                    res.status(201).json({
                        message: 'Successfully joined the trip',
                        tripId: trip.id
                    });
                });
            });
        });
    });
};
