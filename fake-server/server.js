const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
    if (userdb.users.findIndex(user => (user.username === username) && user.password === password) > 0) {
        return 'user'
    }
    else if (userdb.users.findIndex(user => (user.username === username) && user.password === password) === 0) {
        return 'admin'
    }
    else {
        return 'false'
    }
}

function updateProduct(id, newProduct) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(p => p.id === id)
            if (!product) {
                reject(new Error('Product not found'))
            }
            resolve(newProduct)
        }, 5000)
    })
}

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const { username, password } = req.body;
    if (isAuthenticated({ username, password }) === 'user') {
        const access_token = createToken({ username, password })
        console.log("Access Token:" + access_token);
        res.status(200).json({ access_token })
    }
    else if (isAuthenticated({ username, password }) === 'admin') {
        const access_token = createToken({ username, password })
        console.log("Access Token:" + access_token);
        res.status(200).json({ access_token })
    }
    else {
        const status = 401
        const message = 'Incorrect username/email or password'
        res.status(status).json({ status, message })
        return
    }
})

router.post('/products', (req, res) => {
    const { id, name, price, description } = req.body
    const newProduct = { id, name, price, description }
    updateProduct(id, newProduct).then(product => {
        res.status(201).json({ product })
    }
    ).catch(err => {
        res.status(500).json({ err })
    }
    )
})

router.put('/products/:id', (req, res) => {
    const { id } = req.params
    const product = req.body
    const found = router.db.get('products').find({ id }).assign(product).write()
    if (found) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

router.delete('/products/:id', (req, res) => {
    const { id } = req.params
    const removed = router.db.get('products').remove({ id }).write()
    if (removed) {
        res.status(200).json({ message: 'Product removed' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

// server.use(/^(?!\/auth).*$/, (req, res, next) => {
//     if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//         const status = 401
//         const message = 'Error in authorization format'
//         res.status(status).json({ status, message })
//         return
//     }
//     try {
//         let verifyTokenResult;
//         verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

//         if (verifyTokenResult instanceof Error) {
//             const status = 401
//             const message = 'Access token not provided'
//             res.status(status).json({ status, message })
//             return
//         }
//         next()
//     } catch (err) {
//         const status = 401
//         const message = 'Error access_token is revoked'
//         res.status(status).json({ status, message })
//     }
// })


server.use(router)

server.listen(3100, () => {
    console.log('Server run at port 3100')
})
