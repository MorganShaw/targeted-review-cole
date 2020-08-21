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

      //# this line actually  makes the db query
    let foundUser = await db.user.get_user([email]);
      //# user found? foundUser = user object in an array otherwise foundUser = undefined
    if (foundUser[0]){
        res.status(409).send('User already exists');
    }   else {
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
    
        let foundUser = await db.user.get_user(email);
        foundUser = foundUser[0];

         //------------------
         //If you want to create dummy data to test how it works, you can use this during your set up phase, and then when you go to production, you can delete it. Make sure this is the right spot.
    if (email === "test" && password === "test") {
      res.status(200).send({ email: "test", user_id: 0 });
    }
    //------------------
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