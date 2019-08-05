import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Clos÷
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const Register = ({ setAlert }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackbarmsg, setsnackbarmsg] = React.useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    open: false
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { name, email, password, password2 } = formData;

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Password does not match", "danger");
    } else {
      console.log("SUCCESS");

      //   var config = {
      //     headers: {'Authorization': "bearer " + token}
      // };

      axios
        .post("/api/users", {
          name: name,
          email: email,
          password: password
        })
        .then(data => {
          console.log(data);
          localStorage.setItem("jwt", data.token);
          setOpen(true);
          setsnackbarmsg("reg succsessfull");
        })
        .catch(err => {
          console.log(err.response.data.errors[0].msg);
          setsnackbarmsg(err.response.data.errors[0].msg);
          setOpen(true);
          //setsnackbarmsg("reg succsessfull");
        });
    }
  };

  function handleClick() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              minLength="1"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
      <div>
        <Button onClick={handleClick}>Open simple snackbar</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackbarmsg}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            />
          ]}
        />
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Register);

// import React, { Fragment, useState } from "react";
// import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
// import { setAlert } from "../../actions/alert";
// import { register } from "../../actions/auth";
// import PropTypes from "prop-types";

// const Register = ({ setAlert, register, isAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password2: ""
//   });

//   const { name, email, password, password2 } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     if (password !== password2) {
//       setAlert("Passwords do not match", "danger");
//     } else {
//       register({ name, email, password });
//     }
//   };

//   if (isAuthenticated) {
//     return <Redirect to="/dashboard" />;
//   }

//   return (
//     <Fragment>
//       <h1 className="large text-primary">Sign Up</h1>
//       <p className="lead">
//         <i className="fas fa-user" /> Create Your Account
//       </p>
//       <form className="form" onSubmit={e => onSubmit(e)}>
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="Name"
//             name="name"
//             value={name}
//             onChange={e => onChange(e)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             placeholder="Email Address"
//             name="email"
//             value={email}
//             onChange={e => onChange(e)}
//           />
//           <small className="form-text">
//             This site uses Gravatar so if you want a profile image, use a
//             Gravatar email
//           </small>
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={e => onChange(e)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="password2"
//             value={password2}
//             onChange={e => onChange(e)}
//           />
//         </div>
//         <input type="submit" className="btn btn-primary" value="Register" />
//       </form>
//       <p className="my-1">
//         Already have an account? <Link to="/login">Sign In</Link>
//       </p>
//     </Fragment>
//   );
// };

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { setAlert, register }
// )(Register);
