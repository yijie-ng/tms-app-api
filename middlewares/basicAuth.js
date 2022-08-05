const db = require("../database");
const bcrypt = require("bcrypt");

const authentication = async (req, res, next) => {
    // const authHeader = req.headers.authorization;
    // console.log(req.headers);

    // if (!authHeader || authHeader.indexOf('Basic ') === -1) {
    //     const err = new Error('You are not authenticated!');
    //     res.setHeader('WWW-Authenticate', 'Basic');
    //     err.status = 401;
    //     return next(err);
    // };

    // const base64Credentials = authHeader.split(' ')[1]
    // const auth = new Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');
    // const username = auth[0];
    // const password = auth[1];
    // const user = {username, password};

    const { username, password } = req.params;

    db.query("SELECT * FROM accounts WHERE username = ?", username, (err, results) => {
        if (err) {
            res.status(401).json({ message: 'You are not authenticated!' });
        } else {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (result) {
                        // req.user = user;
                        req.user = { username, password }
                        next();
                    } else {
                        res.status(401).json({ message: 'Wrong username/password!' });
                        const err = new Error('Wrong username/password!');
                        // res.setHeader('WWW-Authenticate', 'Basic');
                        err.status = 401;
                        return next(err);
                    };
                });
            } else {
                res.status(401).json({ message: 'Wrong username/password!' });
                const err = new Error('Wrong username/password!');
                // res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                return next(err);
            };
        };
    });
};

module.exports = {
    authentication
};