require('dotenv').config()
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env,
    express = require('express'),
    massive = require('massive'),
    session = require('express-session');

const authCtrl = require('./authController');
const cartCtrl = require('./cartController');
const productCtrl = require('./productController');

const app = express();

//Top level middleware (everything goes through this.)
app.use(express.json());
//This lets us use session in our req object. 
app.use(
    session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
  })
);

//Database connection setup.
//Massive makes a request to the database, and gets a database instance. That's what we put in the .then (). Then we do app.set to set a value onto it, and we assign it a string "db" and now if we reference db, it'll know what to access. 
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then((db) => {
    app.set('db', db);
    console.log('Database is super connected - no loneliness here!');
}).catch((err) => console.log(`Database error: ${err}`));

//ENDPOINTS - Note: you could do all the register functions here, and not in a separate controller file, but it's much easier to read in separate files. Example:

// app.post("/auth/register", async(req, res) => {
    
// });

//AUTH ENDPOINTS
//(Can't send a body on a get or delete request)
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
//Should use a post for a logout. More secure. Adam's review uses app.get.
app.post('/auth/logout', authCtrl.logout);
app.post('/auth/user', authCtrl.getUser);

//PRODUCT ENDPOINTS (more for inventory)
app.get('/api/products', productCtrl.getProducts);
// // app.get('/api/products/:id', productCtrl.getProduct);
app.post('/api/products', productCtrl.addProduct);
app.put('/api/products/:id', productCtrl.editProduct);
app.delete('/api/products/:id', productCtrl.deleteProduct);


//CART ENDPOINTS (make sure these are correct. I added the ctrl functions before we got there)
// app.get('/api/cart', cartCtrl.getCart)
// app.post('/api/cart', cartCtrl.newCart)
// app.delete('/api/cart', cartCtrl.deleteCart)


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
})