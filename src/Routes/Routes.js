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
import Quizrender from '../core/quizrender2'
import InsertUpdateQuestion from '../core/InsertUpdateQuestion'
import AdminViewQuiz from '../core/AdminViewQuiz'
import AdminEditQuiz from '../core/AdminEditQuiz'
import PaidSubscribe from '../core/PaidSubscribe'
import AdminCreateNewQuizTopic from '../core/AdminCreateNewQuizTopic'
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
    < AdminRoute path ="/InsertUpdateQuestion" exact component={InsertUpdateQuestion} />
    < AdminRoute path ="/adminviewquiz" exact component={AdminViewQuiz} />
    < AdminRoute path ="/admineditquiz" exact component={AdminEditQuiz} />
    < AdminRoute path ="/admincreatenewquiztopic" exact component={AdminCreateNewQuizTopic} />
    < PrivateRoute path ="/quizrender" exact component ={Quizrender} />
    < PrivateRoute path ="/paidsubscribe" exact component ={PaidSubscribe} />
    
</Switch>
</BrowserRouter>
  );
};

export default Routes;