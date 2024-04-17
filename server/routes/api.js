import { Router } from 'express';
import { query } from '../config/db';
import { hashSync } from 'bcrypt';
const router = Router();




router.post('/create-category', (req, res) => {
    const { name } = req.body;
    query('INSERT INTO categories (name) VALUES (?)', [name], (err) => {
        if (err) throw err;
        res.send('Category created successfully');
    });
});





router.post('/assign-permission', (req, res) => {
    const { categoryId, name } = req.body;


    
    query('SELECT id FROM permissions WHERE name = ?', [name], (err, results) => {
        if (err) throw err;

        let permissionId;

        if (results.length === 0) {

            // Permission does not exist, create it
            query('INSERT INTO permissions (name) VALUES (?)', [name], (err, result) => {
                if (err) throw err;
                permissionId = result.insertId;

                // Assign permission to category
                query('INSERT INTO category_permissions (category_id, permission_id) VALUES (?, ?)', [categoryId, permissionId], (err) => {
                    if (err) throw err;
                    res.send('Permission assigned successfully');
                });
            });
        } else {
            // Permission exists, get the permission ID
            permissionId = results[0].id;

            // Assign permission to category
            query('INSERT INTO category_permissions (category_id, permission_id) VALUES (?, ?)', [categoryId, permissionId], (err) => {
                if (err) throw err;
                res.send('Permission assigned successfully');
            });
        }
    });
});





router.post('/create-user', (req, res) => {
    const { username, password, categoryId } = req.body;
    const hashedPassword = hashSync(password, 10);

    query('INSERT INTO users (username, password, category_id) VALUES (?, ?, ?)', [username, hashedPassword, categoryId], (err) => {
        if (err) throw err;
        res.send('User created successfully');
    });
});



// Get categories
router.get('/categories', (req, res) => {
    query('SELECT * FROM categories', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

export default router;
