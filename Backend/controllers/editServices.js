import db from "../config/db.js";

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email, number, password, role, status } = req.body;
    const currentUser = req.user; // From authentication middleware
    
    console.log("Updating user:", id, req.body);

    // Validate user ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // Authorization check: Users can only update themselves unless they are admin
    // Admin can update anyone and change role/status
    if (currentUser.role !== 'admin') {
        // Non-admin users can only update themselves
        if (parseInt(id) !== currentUser.id) {
            return res.status(403).json({ error: "You can only update your own profile" });
        }
        // Non-admin users cannot change role or status
        if (role || status) {
            return res.status(403).json({ error: "You do not have permission to change role or status" });
        }
    }

    // If email is being updated, check if it already exists for another user
    if (email) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const checkEmailSql = "SELECT id FROM users WHERE email = ? AND id != ?";
        db.query(checkEmailSql, [email.trim(), id], (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ error: 'Error checking email' });
            }
            
            if (results.length > 0) {
                return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
            }
            
            // Email is unique, proceed with update
            performUpdate();
        });
    } else {
        // No email update, proceed directly
        performUpdate();
    }

    function performUpdate() {
        // Build update query dynamically based on provided fields
        const updates = [];
        const values = [];

        if (username) {
            // Validate username
            if (username.trim().length === 0) {
                return res.status(400).json({ error: "Username cannot be empty" });
            }
            updates.push("username = ?");
            values.push(username.trim());
        }
        
        if (email) {
            updates.push("email = ?");
            values.push(email.trim());
        }
        
        if (number) {
            // Validate phone number (basic validation)
            if (number.trim().length < 10) {
                return res.status(400).json({ error: "Invalid phone number" });
            }
            updates.push("number = ?");
            values.push(number.trim());
        }
        
        if (password) {
            // Validate password length
            if (password.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }
            updates.push("password = ?");
            values.push(password);
        }
        
        if (role) {
            // Validate role
            if (role !== 'traveler' && role !== 'organizer') {
                return res.status(400).json({ error: 'Invalid role. Role must be either "traveler" or "organizer"' });
            }
            updates.push("role = ?");
            values.push(role);
        }
        
        if (status) {
            // Validate status
            if (status !== 'active' && status !== 'blocked') {
                return res.status(400).json({ error: 'Invalid status. Status must be either "active" or "blocked"' });
            }
            updates.push("status = ?");
            values.push(status);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        values.push(id);
        const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                
                // Handle duplicate email error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
                }
                
                return res.status(500).json({ error: 'Error updating user' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            console.log('User updated successfully');
            res.status(200).json({ 
                message: 'User updated successfully', 
                affectedRows: result.affectedRows 
            });
        });
    }
};
