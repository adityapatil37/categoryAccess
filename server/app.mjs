import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;
import apiRoutes from './routes/api.mjs';
import authRoutes from './routes/auth.mjs';
import { ensureAuthenticated } from './middleware/auth.mjs';

const app = express();

// Middleware Setup



function listen(port, callback) {
  app.listen(port, callback);
}
// For parsing application/x-www-form-urlencoded data:
app.use(urlencoded({ extended: false }));

// For parsing application/json data:
app.use(json());

// Flash message handling for authentication (optional but recommended)
app.use(flash());

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use environment variable for security
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 1 day expiration time
  }
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session()); // Use after session middleware

// Serve static files
app.use(express.static('public')); // Assuming 'public' directory exists

// API routes
app.use('/api', apiRoutes);

// Authentication routes
app.use('/', authRoutes);

// Protected home route
app.get('/', ensureAuthenticated, (req, res) => {
  const user = req.user;
  if (user.category_id === 1) {
    res.redirect('/admin-dashboard');
  } else {
    res.redirect('/user-dashboard');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!'); // More informative error message
});

// Export the app
export default app;

export {listen};
