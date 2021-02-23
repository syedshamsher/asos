const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, _id) => {
        if (err) {
            console.log( "expired" ,err.message );
            return res.sendStatus(403)
        }
        req._id = _id;
        next();
    })
}

module.exports = { authenticateToken }