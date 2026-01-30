import db from "../config/db.js";

export const Adminlogin = (req, res) => {
    const { email, password } = req.body;
    console.log("Admin login attempt");
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Error during login' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const admin = results[0];
        // Remove password from response
        const { password: _, ...adminWithoutPassword } = admin;
        res.status(200).json({ 
            message: 'Login successful', 
            admin: adminWithoutPassword 
        });
        console.log("Admin Login successful", adminWithoutPassword);
    });
};

export const UserLogin = (req, res) => {
    const { email, password } = req.body;
    console.log("Traveler login attempt:", email);
    
    const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND role = 'traveler'";
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Error during login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ 
            message: 'Login successful', 
            user: userWithoutPassword,
            role: 'traveler'
        });
        console.log("Traveler Login successful", userWithoutPassword);
    });
};

export const OrganizerLogin = (req, res) => {
    const { email, password } = req.body;
    console.log("Organizer login attempt:", email);
    
    const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND role = 'organizer'";
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Error during login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ 
            message: 'Login successful', 
            user: userWithoutPassword,
            role: 'organizer'
        });
        console.log("Organizer Login successful", userWithoutPassword);
    });
};