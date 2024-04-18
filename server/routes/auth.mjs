import express from 'express';
import { query } from '../config/db.mjs';
import { compareSync } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
const { use, serializeUser, deserializeUser, authenticate } = passport;
const router = express.Router();







passport.use(
    new LocalStrategy((username, password, done) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
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
    })
);



// use(new LocalStrategy((username, password, done) => {
//     query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//         if (err) return done(err);
//         if (results.length === 0) return done(null, false, { message: 'Incorrect username' });

//         const user = results[0];
//         const isPasswordValid = compareSync(password, user.password);

//         if (isPasswordValid) {
//             return done(null, user);
//         } else {
//             return done(null, false, { message: 'Incorrect password' });
//         }
//     });
// }));





passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        const user = results[0];
        done(null, user);
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure',
    failureFlash: true,
}));

router.get('/login-success', (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

router.get('/login-failure', (req, res) => {
    res.json({ success: false });
});

export default router;
