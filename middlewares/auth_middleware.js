const checkPassword = (req, res, next) => {
    const apiPassword = process.env.API_PASSWORD; 
    const providedPassword = req.headers['x-api-password'];

    if (!providedPassword || providedPassword !== apiPassword) {
        console.log(providedPassword + " | " + apiPassword);
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = { checkPassword };