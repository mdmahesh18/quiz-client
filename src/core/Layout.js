//import { Children } from 'react'
import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {isAuth, signout} from '../auth/helpers'
import {quizrender} from './quizrender2'



const Layout = ({children, match, history}) => {
const isActive = path => {
if (match.path === path) {
    return {color: '#000'};
    } else {
    return {color: '#fff'};
    }
};

///////////////////earlier
//{isAuth() && isAuth().role ==='admin' && (
  //  <li className="nav-item">
    //    <Link className="nav-link" style= {isActive('/InsertUpdateQuestion')} to = "/InsertUpdateQuestion">
     //       {isAuth().name} Upload Quiz
//</Link>

//</li>

//)} 

////////////////////

const nav = ()=> ( 
    <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
        <Link to ="/" className="nav-link" style={isActive('/')}
        >Home</Link>
        </li>

        {!isAuth() && (
        <Fragment>
        <li className="nav-item">
        <Link to ="/signin" className="nav-link" style={isActive('/Signin')}>Signin</Link>
        </li>

        <li className="nav-item">
        <Link to ="/signup" className="nav-link" style={isActive('/Signup')}>Signup</Link>
        </li>
        </Fragment>
    )} 
      
      {isAuth() && isAuth().role ==='admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/admin')} to = "/admin">
                        {isAuth().name} Profile Update
       </Link>
       
        </li> )} 

        {isAuth() && isAuth().role ==='admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/AdminCreateNewQuizTopic')} to = "/AdminCreateNewQuizTopic">
                         Create New Quiz Topic
       </Link>
       
        </li>
          
    )} 

        {isAuth() && isAuth().role ==='admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/AdminViewQuiz')} to = "/AdminViewQuiz">
                         View Quiz
       </Link>
       
        </li>
          
         )} 

        {isAuth() && isAuth().role ==='admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/AdminEditQuiz')} to = "/AdminEditQuiz">
                        Edit Quiz
       </Link>
       
        </li>
          
         )} 


       {isAuth() && isAuth().role ==='subscriber' && (
                <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/private')} to = "/private">
                        {isAuth().name} Profile Update

                        </Link>   </li>)}
                       
        {isAuth() && isAuth().role ==='subscriber' && (              
                       
                    <li className="nav-item">
                    <Link className="nav-link" style= {isActive('/quizrender')} to = "/quizrender">
                        {isAuth().name} Quizrender

       </Link> </li> )}

       {isAuth() && isAuth().role ==='subscriber' && (              
                       
                       <li className="nav-item">
                       <Link className="nav-link" style= {isActive('/paidsubscribe')} to = "/paidsubscribe">
                           {isAuth().name} Subscribe
   
          </Link>  
       
        </li>
          
    )}          

      {isAuth() && (
                <li className="nav-item">
       <span className="nav-link" 
      // style={{cursor: 'pointer', color: '##fff'}} 
         style={{cursor: 'pointer', color: 'red'}} 

       onClick={()=> {
           signout(()=> {

            history.push('/')
           })

       }}>Signout</span>
        </li>
          
    )} 

       </ul>


);

return (
<Fragment>
{nav()}
<div className ="container">{children}</div>
</Fragment>

);
};

export default withRouter(Layout);