import { Router } from 'express';
import { use, serializeUser, deserializeUser, authenticate } from 'passport';
import { query } from '../config/db';
import { compareSync } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
const router = express.Router();





use(new LocalStrategy((username, password, done) => {
    query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false, { message: 'Incorrect username' });

        const user = results[0];
        const isPasswordValid = compareSync(password, user.password);

        if (isPasswordValid) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    });
}));





serializeUser((user, done) => {
    done(null, user.id);
});

deserializeUser((id, done) => {
    query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        const user = results[0];
        done(null, user);
    });
});

// Login route
router.post('/login', authenticate('local', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure',
    failureFlash: true
}));

// Define your success and failure routes for login
router.get('/login-success', (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        username: user.username,
        category: user.category_id
    });
});

router.get('/login-failure', (req, res) => {
    res.json({ success: false });
});

export default router;
