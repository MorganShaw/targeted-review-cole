import React, { useState } from "react";
import axios from "axios";
import { getUser } from "../redux/reducer";
import { connect } from "react-redux";

const Auth = (props) => {
  const [toggle, setToggle] = useState(true);
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleEmailInput = (event) => {
    const { value } = event.target;
    setEmail(value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    axios
      .post("/auth/login", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.getUser();
        props.history.push("/dash");
      })
      .catch((err) => {
        alert("email or password incorrect");
      });
  };

  const register = () => {
    axios
      .post("/auth/register", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.getUser();
        props.history.push("/dash");
      })
      .catch((err) => {
        alert("email already registered, do you want to log in?");
      });
  };

  return (
    <div>
      <h1>{toggle ? "Login" : "Register"}</h1>
      <div>
        <input
          name="email"
          placeholder="email"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <input
          name="password"
          placeholder="password"
          value={passwordInput}
          onChange={handlePasswordInput}
          type="password"
        />
        {toggle ? (
          <>
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Haven't signed up? Click to register
            </button>
          </>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Already signed up? Click to login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(null, { getUser })(Auth);



//Cole said something about how putting password in the input value attributes or something...would show the password and be insecure?? Is that why he used passwordInput? 

// Universal input handler doesn't work here (see example below b/c of the way Cole set this up and because it has hooks. You can use a universal input handler with hooks, but it's apparently more challenging. Look that up.)

// handleEmailInput(e){
//     this.setState({[e.target.name]: e.target.value})
//  }
 

// const login = () => {
//   axios
//     .post("/auth/login", {
//       email: emailInput,
//       password: passwordInput,
//     })
//     .then((res) => {
//       //# send res.data to redux NOT SET UP YET!!
//       //# then redirect user to dashboard
//       props.history.push("/dash");
//     })
//     .catch((err) => {
//       alert("email or password incorrect");
//     });
// };

//name of property on state, name of function that updates state, and the initial value
// const [toggle, setToggle] = useState(true);