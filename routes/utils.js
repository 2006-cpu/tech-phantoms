function requireUser(req, res, next) {
    if(!req.user) {
        next({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action'
        });
} 
        next();
};

const requireAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next({
            name: 'MissingAdminError',
            message: 'You must be an administrator to perform this action'
        });
    }
        next();
  };

module.exports = {
    requireUser,
    requireAdmin
}