function login(req, res) {
    res.status(200).json({
        login: 'from controller'
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