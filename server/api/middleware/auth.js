import jwt from 'jsonwebtoken';

// checks if the token is valid for granting access
const auth = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        jwt.verify(token, "mysecret", (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};
export default auth;
