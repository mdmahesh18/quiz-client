import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout  from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
//import { post } from '../../../server/Routes/Auth'
//import '../style.css'
import {authenticate, isAuth} from './helpers'

const Signin = ({history}) => {
const [values, setValues] = useState({
email :'',
password: '',
buttonText:'Submit'
});

const {email, password, buttonText} = values
const handleChange = (name) => (event)=> {
// console.log(event.target.value);
setValues({...values, [name]: event.target.value});

};


const clickSubmit = event => {
//
event.preventDefault()
setValues({...values, buttonText :'Submittting'})
axios ({
method: 'POST',
url: '${process.env.REACT_APP_API}/signin',
//url: 'http://localhost:8000/api/signin',
data: {email, password}
})
//console.log('SIGNUP being requested to server', email)

.then(response=> { 
    console.log('SIGNIN SUCCESS !!', response)
    // save the response (user, token) localstorage/cookie
    authenticate (response, () => {

    setValues({...values, name:'', email:'', password:'', buttonText:'Submitted'})
    //toast.success(`Hey ${response.data.user.name}, Welcome back`)
    isAuth() && isAuth().role === 'admin' ? history.push ('/admin'): history.push('/private');

    })
    
})
.catch(error => {
console.log('SIGNIN ERROR', error.response.data)
toast.error(`SIGNIN ERROR, Please Try again`)
setValues({ buttonText:'Submit'})
})
};

const signinForm = () => (
<form> 

< div className="form-group">
    <label className="text-muted"> email</label>
    <input onChange={handleChange('email')} value = {email} type ="email" className="form-control" enabled ="true"/>
</div>

< div className="form-group">
    <label className="text-muted"> Password</label>
    <input onChange={handleChange('password')} value = {password} type ="password" className="form-control" enabled ="true"/>
</div>

< div className="form-group">
       <button className="btn btn-primary" onClick={clickSubmit}> {buttonText}</button> 
</div>

</form>
);

//{JSON.stringify({name, email, password})}

return (
<Layout>
 <div className="col-md-6 offset-md-3">
<ToastContainer />
{isAuth()?<Redirect to ="/"/>:null}
<h1 className = "p-5 text-center"> Signin </h1>
{signinForm()}
</div>
</Layout>

)};

export default Signin;

