import db from '../config/db.js'

export const addusers = (req, res) => {
    const { name, email, phone, password, role } = req.body;
    
    console.log('Registration request:', { name, email, phone, role });

    // Validation
    if (!name || !email || !phone || !password || !role) {
        return res.status(400).json({ 
            message: 'All fields are required including role' 
        });
    }

    // Validate role
    if (role !== 'traveler' && role !== 'organizer') {
        return res.status(400).json({ 
            message: 'Invalid role. Role must be either "traveler" or "organizer"' 
        });
    }

    // Check if email already exists
    const checkEmailSql = "SELECT id FROM users WHERE email = ?";
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ message: 'Error checking email' });
        }

        if (results.length > 0) {
            return res.status(409).json({ 
                message: 'Email already exists. Please use a different email.' 
            });
        }

        // Insert new user with default status 'active'
        const sql = "INSERT INTO users (username, email, number, password, role, status) VALUES (?, ?, ?, ?, ?, 'active')";
        const values = [name, email, phone, password, role];
      
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding user:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ 
                        message: 'Email already exists. Please use a different email.' 
                    });
                }
                return res.status(500).json({ message: 'Error adding user' });
            }
            
            console.log('User added successfully:', { 
                id: result.insertId, 
                email, 
                role 
            });
            
            res.status(200).json({ 
                message: `${role === 'organizer' ? 'Organizer' : 'Traveler'} registered successfully`,
                user: {
                    id: result.insertId,
                    username: name,
                    email: email,
                    role: role
                }
            });
        });
    });
}




