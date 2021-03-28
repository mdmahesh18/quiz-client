import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from '../App'
import Signup from '../auth/Signup'; 
import Signin from '../auth/Signin'; 
import Activate from '../auth/Activate'; 
import Private from '../core/Private';
import  Admin from '../core/Admin'
import PrivateRoute from '../auth/PrivateRoute';
import AdminRoute from '../auth/AdminRoute';
//import PrivateRoute from '../auth/PrivateRoute Original MD'


const Routes = () => {
return (
<BrowserRouter>
<Switch> 
    < Route path ="/" exact component ={App} />
    < Route path ="/Signup" exact component ={Signup} />
    < Route path ="/Signin" exact component ={Signin} />
    < Route path ="/auth/activate/:token" exact component ={Activate} />
    < PrivateRoute path ="/private" exact component ={Private} />
    < AdminRoute path ="/Admin" exact component ={Admin} />
</Switch>
</BrowserRouter>
  );
};

export default Routes;