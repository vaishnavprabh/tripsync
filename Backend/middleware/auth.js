import { verifyToken } from '../config/jwt.js';

// Authentication middleware - checks if user is logged in
export const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // Verify token
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({ 
                error: 'Invalid or expired token.' 
            });
        }

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            error: 'Invalid token.' 
        });
    }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Authentication required.' 
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Access denied. Insufficient permissions.' 
            });
        }

        next();
    };
};

// Combined middleware for specific roles
export const requireAdmin = (req, res, next) => {
    authenticate(req, res, () => {
        authorize('admin')(req, res, next);
    });
};

export const requireOrganizer = (req, res, next) => {
    authenticate(req, res, () => {
        authorize('organizer')(req, res, next);
    });
};

export const requireTraveler = (req, res, next) => {
    authenticate(req, res, () => {
        authorize('traveler')(req, res, next);
    });
};

export const requireOrganizerOrTraveler = (req, res, next) => {
    authenticate(req, res, () => {
        authorize('organizer', 'traveler')(req, res, next);
    });
};
