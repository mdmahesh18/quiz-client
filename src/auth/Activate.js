import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout  from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from 'jsonwebtoken'
require('dotenv').config();
//import { post } from '../../../server/Routes/Auth'
import '../style.css'

const Activate = ({match}) => {
const [values, setValues] = useState({
name: '',
token :'',
show: true,

});

useEffect(() => {
    let token = match.params.token
    console.log('TOKEN', token)
    let {name} = jwt.decode(token)
if (token) {
setValues ({...values, name, token})

}


},
[]);

const {name, token, show} = values

const clickSubmit = event => {
//
event.preventDefault()
console.log('in clicksubmit of account activation' )
setValues({...values, buttonText :'Submittting'})
axios ({
method: 'POST',
url: '${process.env.REACT_APP_API}/account-activation',
//url: 'http://localhost:8000/api/account-activation',
data: {token}
})
//console.log('SIGNUP being requested to server', email)
.then(response=> { 
    console.log('Account Activation successful !!', response)
    setValues({...values, show:false})
    toast.success(response.data.message)
})
.catch(error => {
console.log('Account Activation ERROR', error.response.data.error)

})
};

const activationLink= () => (
<div className="text-center">
<h1 className="p-5">Hey {name} Ready to Activate your account ?</h1>
<button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account </button>
</div>

);

 return (
<Layout>
    <div className="col-d-6 offset-md-3">
<ToastContainer />
{JSON.stringify({token})}
<h1 className = "p-5"> Activate Account </h1>
{activationLink()}
</div>
</Layout>

)};

export default Activate;