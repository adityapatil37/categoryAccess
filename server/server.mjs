import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

const app = express();

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
}));

// Initialize Passport and use its session handling middleware
app.use(passport.initialize());
app.use(passport.session());



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
