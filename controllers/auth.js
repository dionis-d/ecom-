function login(req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

function register(req, res) {
    res.status(200).json({
        register: 'from controller'
    })
}

module.exports = {
    login,
    register
}
// module.exports.register = function () {
//
// }