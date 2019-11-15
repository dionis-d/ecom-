const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function login(req, res) {
    const candidate = await User.findOne({

    });
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
