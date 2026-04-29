import db from "../config/db.js";
import { generateToken, generateRefreshToken, verifyToken } from "../config/jwt.js";

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
        
        // Generate JWT token
        const tokenPayload = {
            id: admin.id,
            email: admin.email,
            role: 'admin'
        };
        const token = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        
        res.status(200).json({ 
            message: 'Login successful', 
            admin: adminWithoutPassword,
            token: token,
            refreshToken: refreshToken
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
        
        // Check if user is blocked
        if (user.status === 'blocked') {
            return res.status(403).json({ error: 'Your account has been blocked. Please contact administrator.' });
        }
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        // Generate JWT token
        const tokenPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: 'traveler'
        };
        const token = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: userWithoutPassword,
            role: 'traveler',
            token: token,
            refreshToken: refreshToken
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
        
        // Check if user is blocked
        if (user.status === 'blocked') {
            return res.status(403).json({ error: 'Your account has been blocked. Please contact administrator.' });
        }
        
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        // Generate JWT token
        const tokenPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: 'organizer'
        };
        const token = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: userWithoutPassword,
            role: 'organizer',
            token: token,
            refreshToken: refreshToken
        });
        console.log("Organizer Login successful", userWithoutPassword);
    });
};

// Logout - client-side token removal, but we can add token blacklisting here if needed
export const logout = (req, res) => {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return success - client should remove token
    res.status(200).json({ 
        message: 'Logout successful' 
    });
};

// Refresh token endpoint
export const refreshToken = (req, res) => {
    const { refreshToken: refreshTokenValue } = req.body;
    
    if (!refreshTokenValue) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }
    
    try {
        const decoded = verifyToken(refreshTokenValue);
        
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }
        
        // Generate new access token
        const newTokenPayload = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role
        };
        const newToken = generateToken(newTokenPayload);
        
        res.status(200).json({ 
            message: 'Token refreshed successfully',
            token: newToken
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Error refreshing token' });
    }
};

// Verify token endpoint (for frontend to check if token is still valid)
export const verifyAuth = (req, res) => {
    // This will be called with authenticate middleware
    res.status(200).json({ 
        message: 'Token is valid',
        user: req.user
    });
};