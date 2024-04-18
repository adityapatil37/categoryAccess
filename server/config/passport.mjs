

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db';


passport.use(
    new LocalStrategy((username, password, done) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err){
                return done(err);
            }

            if(results.length === 0){
                return done(null, false, {message: 'Incorrect username.'});
            }

            const user = results[0];

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if(!isPasswordValid) {
                return done(null, false, {message: 'incorrect password.'})
            }

            return done(null, user);
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) =>{
        if (err) {
            return done(err);
        }

        const user = results[0];
        done(null, user);
    });
});

module.exports = passport;