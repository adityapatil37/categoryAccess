import passport from 'passport';

// You can destructure the necessary properties from the default import
const { authenticate } = passport;


// Use passport.authenticate() to authenticate requests
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login.html');
}

function authenticateLocalStrategy(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err);
        }

        if (!user){
            return res.status(401).json({ success: false, message: info ? info.message: 'Authentication failed'})
        }

        res.logIn(user, (err) =>{
            if(err){
                return next(err);
            }

            return res.json({
                success: true,
                user:{
                    id:user.id,
                    username : user.username,
                    category_id: user.category_id,
                },
            });
        });
    })(req, res, next)
}

// Export functions
export default {
    ensureAuthenticated,
    authenticateLocalStrategy,
};

export { ensureAuthenticated };
