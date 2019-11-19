const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

async function login(req, res) {
    const userData = req.body;
    const candidate = await User.findOne({email: userData.email});

    if (candidate) {
        // check pass
        const passwordResult = bcrypt.compareSync(userData.password);
        if (passwordResult) {
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt , {expiresIn: 60 * 60});

            res.status(200).json({
                token: token
            });
        } else {
            //incorrect password
            res.status(401).json({
                message: 'incorrect password'
            });
        }

    } else {
        //err
        res.status(404).json({
            message: 'email not found'
        });
    }
}

async function register(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
// exists , throw err
        res.status(409).json({
            message: 'email already exists, try another'
        })
    } else {
// create another user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user); // respond with user obj
        } catch (e) {

        }
    }

}

module.exports = {
    login,
    register
}
