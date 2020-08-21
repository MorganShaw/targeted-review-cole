import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/reducer";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    console.log(props);
    //# comes from redux
    props.getUser();
    if (props.user.email === "") {
      props.history.push("/");
    }
  }, [props.user.email, props.location.pathname]);

  return (
    <h1>
      {
        //# also comes from redux
        `email: ${props.user.email}
        id: ${props.user.user_id}`
      }
    </h1>
  );
};

const mapStateToProps = (reduxState) => {
  //# whatever we return here gets put on props
  return reduxState;
};

export default connect(mapStateToProps, { getUser })(withRouter(Nav));
