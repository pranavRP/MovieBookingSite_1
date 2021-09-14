import React from "react";
import "./Header.css"
import logo from "../../assests/logo.svg";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

// Displays the header which comprises of the logo and the required buttons
class Header extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoggedIn: false
    }
  }
  // function to set the text of the "login" button
  setText = () => this.state.isLoggedIn? "LOG OUT" : "LOGIN";
  // function to implement a mock feature of logging in and logging out
  setLogin = () => {
    this.setState((prevState)=>({
      isLoggedIn : !prevState.isLoggedIn
    }))
  }
  render(){
    return(
      <div className="header">
        <img id="logo-img" src={logo} alt= "logo" />
        {this.props.showBtns && (<div className="btn-group">
        <Button
          className="btn"
          color="primary"
          variant="contained"
        ><Typography>BOOK SHOW</Typography>
        </Button>
        <Button
          className="btn"
          color="secondary"
          variant="contained"
          onClick={this.setLogin}
        ><Typography>{this.setText()}</Typography>
        </Button>
        </div>)}
      </div>
    )
  }
}

export default Header;