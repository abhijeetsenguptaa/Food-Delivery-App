const jsonwebtoken = require('jsonwebtoken');


const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            jsonwebtoken.verify(token, process.env.secret_key, async (err, decode) => {
                if (decode) {
                    req.body.user = decode[0].user - id;
                    next()
                }
            })
        }
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Please Login'
        })
    }
}


module.exports = { authentication };