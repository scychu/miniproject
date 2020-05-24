import React from "react";
// import SignUp from "../components/SignUp/SignUp";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import {Route} from "react-router-dom";
import SignIn from "../components/SignIn/SignIn";

const Routes = ()=> {
    return(
        <div>
            <Route path="/" exact>
                <RegisterForm/>
                <SignIn/>
            </Route>
            {/* <Route path="/" component={SignUp} exact/> */}
        </div>
    )
}
export default Routes;
