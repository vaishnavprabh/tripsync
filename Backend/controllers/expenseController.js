import db from '../config/db.js';

// Add an expense
export const addExpense = (req, res) => {
    const { tripId } = req.params;
    const { description, amount, expenseDate, splitMethod, category, paidByUserId } = req.body;
    const userId = req.user.id;

    if (!description || !amount || !expenseDate) {
        return res.status(400).json({ error: 'Description, amount, and date are required' });
    }

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to add expenses for this trip' });
        }

        const paidBy = paidByUserId || userId;
        const sql = `INSERT INTO expenses (trip_id, paid_by_user_id, description, amount, expense_date, split_method, category)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            tripId,
            paidBy,
            description,
            amount,
            expenseDate,
            splitMethod || 'equal',
            category || null
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding expense:', err);
                return res.status(500).json({ error: 'Error adding expense' });
            }

            // If split method is custom, we'll handle splits separately
            res.status(201).json({
                message: 'Expense added successfully',
                expenseId: result.insertId
            });
        });
    });
};

// Get all expenses for a trip
export const getTripExpenses = (req, res) => {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or participant
    const checkSql = `SELECT organizer_id FROM trips WHERE id = ? AND organizer_id = ?
                      UNION
                      SELECT user_id FROM trip_participants WHERE trip_id = ? AND user_id = ?`;
    db.query(checkSql, [tripId, userId, tripId, userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view expenses for this trip' });
        }

        const sql = `SELECT e.*, u.username as paid_by_name, u.email as paid_by_email
                     FROM expenses e
                     JOIN users u ON e.paid_by_user_id = u.id
                     WHERE e.trip_id = ?
                     ORDER BY e.expense_date DESC, e.created_at DESC`;

        db.query(sql, [tripId], (err, expenseResults) => {
            if (err) {
                console.error('Error fetching expenses:', err);
                return res.status(500).json({ error: 'Error fetching expenses' });
            }

            // Calculate totals
            const totalExpenses = expenseResults.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

            // Get participant count
            const participantSql = 'SELECT COUNT(*) as count FROM trip_participants WHERE trip_id = ?';
            db.query(participantSql, [tripId], (err, partResults) => {
                if (err) {
                    console.error('Error fetching participants:', err);
                    return res.status(500).json({ error: 'Error fetching participants' });
                }

                const participantCount = partResults[0].count || 1;
                const perPerson = totalExpenses / participantCount;

                res.status(200).json({
                    expenses: expenseResults,
                    summary: {
                        totalExpenses,
                        participantCount,
                        perPerson: perPerson.toFixed(2)
                    }
                });
            });
        });
    });
};

// Update an expense
export const updateExpense = (req, res) => {
    const { expenseId } = req.params;
    const { description, amount, expenseDate, splitMethod, category } = req.body;
    const userId = req.user.id;

    // Check if user is organizer or the one who paid
    const checkSql = `SELECT e.trip_id, e.paid_by_user_id, t.organizer_id
                      FROM expenses e
                      JOIN trips t ON e.trip_id = t.id
                      WHERE e.id = ?`;
    db.query(checkSql, [expenseId], (err, results) => {
        if (err) {
            console.error('Error checking expense:', err);
            return res.status(500).json({ error: 'Error checking expense' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        const expense = results[0];
        if (expense.organizer_id !== userId && expense.paid_by_user_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to update this expense' });
        }

        // Build update query
        const updates = [];
        const values = [];

        if (description) {
            updates.push('description = ?');
            values.push(description);
        }
        if (amount) {
            updates.push('amount = ?');
            values.push(amount);
        }
        if (expenseDate) {
            updates.push('expense_date = ?');
            values.push(expenseDate);
        }
        if (splitMethod) {
            updates.push('split_method = ?');
            values.push(splitMethod);
        }
        if (category !== undefined) {
            updates.push('category = ?');
            values.push(category);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        values.push(expenseId);
        const updateSql = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;

        db.query(updateSql, values, (err, result) => {
            if (err) {
                console.error('Error updating expense:', err);
                return res.status(500).json({ error: 'Error updating expense' });
            }

            res.status(200).json({ message: 'Expense updated successfully' });
        });
    });
};

// Delete an expense
export const deleteExpense = (req, res) => {
    const { expenseId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer or the one who paid
    const checkSql = `SELECT e.trip_id, e.paid_by_user_id, t.organizer_id
                      FROM expenses e
                      JOIN trips t ON e.trip_id = t.id
                      WHERE e.id = ?`;
    db.query(checkSql, [expenseId], (err, results) => {
        if (err) {
            console.error('Error checking expense:', err);
            return res.status(500).json({ error: 'Error checking expense' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        const expense = results[0];
        if (expense.organizer_id !== userId && expense.paid_by_user_id !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this expense' });
        }

        const deleteSql = 'DELETE FROM expenses WHERE id = ?';
        db.query(deleteSql, [expenseId], (err, result) => {
            if (err) {
                console.error('Error deleting expense:', err);
                return res.status(500).json({ error: 'Error deleting expense' });
            }

            res.status(200).json({ message: 'Expense deleted successfully' });
        });
    });
};
