const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// Session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Serve static files (assuming 'public' directory exists)
app.use(express.static('public'));

// API routes
app.use('/api', apiRoutes);

// Authentication routes
app.use('/', authRoutes);

// Home route (e.g., redirect to a specific dashboard)
app.get('/', authMiddleware.ensureAuthenticated, (req, res) => {
    const user = req.user;
    if (user.category_id === 1) {
        res.redirect('/admin-dashboard');
    } else {
        res.redirect('/user-dashboard');
    }
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export app
module.exports = app;
