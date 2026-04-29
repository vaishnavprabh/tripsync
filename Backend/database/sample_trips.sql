-- Sample Trips for TripSync
-- This file contains sample trip data for testing

USE tripsync;

-- Sample Trips (assuming you have at least one organizer user with id = 2)
-- Replace organizer_id with actual organizer user IDs from your users table

-- Trip 1: Goa Beach Trip
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Goa Beach Adventure', 
    'Goa, India', 
    'Experience the beautiful beaches of Goa with water sports, nightlife, and delicious seafood. Perfect for a fun-filled vacation!',
    '2025-03-15',
    '2025-03-20',
    15,
    25000.00,
    'published',
    'TRIP-GOA2025'
);

-- Trip 2: Manali Hill Station
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Manali Mountain Escape', 
    'Manali, Himachal Pradesh', 
    'Explore the scenic beauty of Manali with snow-capped mountains, adventure activities, and peaceful nature walks.',
    '2025-04-10',
    '2025-04-15',
    12,
    30000.00,
    'published',
    'TRIP-MANALI2025'
);

-- Trip 3: Kerala Backwaters
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Kerala Backwaters Tour', 
    'Kerala, India', 
    'Cruise through the serene backwaters of Kerala, enjoy traditional houseboats, and experience the rich culture of God\'s Own Country.',
    '2025-05-01',
    '2025-05-06',
    10,
    35000.00,
    'published',
    'TRIP-KERALA2025'
);

-- Trip 4: Rajasthan Heritage
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Rajasthan Heritage Journey', 
    'Jaipur, Udaipur, Jodhpur', 
    'Discover the royal heritage of Rajasthan with magnificent palaces, forts, and vibrant culture across the golden triangle.',
    '2025-06-15',
    '2025-06-22',
    20,
    45000.00,
    'published',
    'TRIP-RAJ2025'
);

-- Trip 5: Darjeeling Tea Gardens
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Darjeeling Tea Trail', 
    'Darjeeling, West Bengal', 
    'Visit the famous tea gardens of Darjeeling, enjoy mountain views, and experience the toy train journey.',
    '2025-07-10',
    '2025-07-14',
    8,
    28000.00,
    'published',
    'TRIP-DARJ2025'
);

-- Trip 6: Rishikesh Adventure
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Rishikesh Adventure Camp', 
    'Rishikesh, Uttarakhand', 
    'Thrilling adventure activities including river rafting, bungee jumping, and yoga sessions by the Ganges.',
    '2025-08-05',
    '2025-08-09',
    12,
    22000.00,
    'published',
    'TRIP-RISHI2025'
);

-- Trip 7: Andaman Islands
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Andaman Island Paradise', 
    'Port Blair, Havelock, Neil Island', 
    'Explore pristine beaches, coral reefs, and enjoy water activities in the beautiful Andaman Islands.',
    '2025-09-01',
    '2025-09-08',
    15,
    55000.00,
    'published',
    'TRIP-ANDAMAN2025'
);

-- Trip 8: Shimla Winter Wonderland
INSERT INTO trips (organizer_id, trip_name, destination, description, start_date, end_date, max_participants, estimated_budget, status, invite_code) 
VALUES (
    2, 
    'Shimla Winter Wonderland', 
    'Shimla, Himachal Pradesh', 
    'Experience the winter charm of Shimla with snow activities, scenic views, and colonial architecture.',
    '2025-12-20',
    '2025-12-25',
    18,
    32000.00,
    'published',
    'TRIP-SHIMLA2025'
);

-- Note: 
-- 1. Replace organizer_id (currently set to 2) with actual organizer user IDs from your users table
-- 2. Make sure you have at least one user with role='organizer' in the users table
-- 3. The invite_code should be unique - adjust if needed
-- 4. Dates are set for 2025 - adjust according to your needs
