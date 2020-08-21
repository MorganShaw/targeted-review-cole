//We use controller files to split up code and make things less complex in one file. 

const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    //# check to see if user exists
    //# if it does, send error, else
    //# hash user password
    //# store email and hash on db
    //# store new user onto session

    const { email, password } = req.body;

    const db = req.app.get("db");
    //Try this, and if any line of it fails, instead of throwing the normal error,  do whatever I tell you to. Overrides the default error behavior in js.
    try {
      //# this line actually  makes the db query
      let foundUser = await db.user.get_user([email]);
      //# user found? foundUser = user object in an array otherwise foundUser = undefined
      foundUser = foundUser[0];
    } catch (err) {
      console.log("database error on register function", err);
    }
    //# at this point, foundUser is either truthy or falsy
    if (foundUser) {
      res.status(409).send("user already exists");
    } else {
      const salt = bcrypt.getSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await db.user.add_user([email, hash])
      req.session.user = newUser[0]
      res.status(201).send(newUser[0])
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");

    //Two checks, 3 possible outcomes of these checks.
    let foundUser = await db.user.get_user(email);
    foundUser = foundUser[0];
    if (foundUser) {
      const compareHash = foundUser.password;
      const authenticated = bcrypt.compareSync(password, compareHash);
      if (authenticated) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(foundUser);
      } else {
        res.status(401).send("Email or password incorrect");
      }
    } else {
      res.status(401).send("Email or password incorrect");
    }
  },


  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.sendStatus(404)
    }
  },
};


//Where do the status codes get sent? Just to the server for our backend dev purposes? I think it gets sent to the front end. 