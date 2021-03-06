import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout  from '../core/Layout'
import {isAuth} from './helpers'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
//import { post } from '../../../server/Routes/Auth'
import '../style.css'
require('dotenv').config();

const Signup = () => {
const [values, setValues] = useState({
name: '',
email :'',
password: '',
buttonText:'Submit'
});

const {name, email, password, buttonText} = values
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
url: `${process.env.REACT_APP_API}/signup`,
//url: 'http://localhost:8000/api/signup',

//url: 'http://161.35.6.245:8000/api/signup',

data: {name, email, password}
})
//console.log('SIGNUP being requested to server', email)
.then(response=> { 
    console.log('SIGNUP SUCCESS !!', response)
    setValues({...values, name:'', email:'', password:'', buttonText:'Submitted'})
    toast.success(response.data.message)
})
.catch(error => {
console.log('SIGNUP ERROR', error.response.data)
toast.error(`SIGNUP ERROR, Please Try again`)
setValues({ buttonText:'Submit'})
})
};

const signupForm = () => (
<form> 
< div className="form-group">
    <label className="text-muted"> Name</label>
    <input onChange={handleChange('name')} value = {name} type ="text" className="form-control" enabled ="true"/>
</div>

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
    <div className="col-d-6 offset-md-3">
<ToastContainer />

{isAuth()?<Redirect to ="/"/>:null}
<h1 className = "p-5"> Signup </h1>
{signupForm()}
</div>
</Layout>

)};

export default Signup;