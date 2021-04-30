import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import stripeButton from './../assets/images/stripeButton.png';
//import {loadStripe} from '@stripe/stripe-js';
require('dotenv').config();
import { loadStripe } from '@stripe/stripe-js';
import Stripe from '@stripe/stripe-js';
//import {Element, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
//const stripe = require ("stripe")("pk_live_51IfPHgH7u7oEkWyqVQJwA4iufXjEwYDwpQw9byxesYRFKuWocbazxbbCJ0xNqHDkb5lLWf05ONdbQZ6BcIzjZDmw00R7cWPqOT")
//const stripePromise = loadStripe('pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt');
const stripePromise = loadStripe('pk_live_51IfPHgH7u7oEkWyqVQJwA4iufXjEwYDwpQw9byxesYRFKuWocbazxbbCJ0xNqHDkb5lLWf05ONdbQZ6BcIzjZDmw00R7cWPqOT');


//const stripe = Stripe('pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt');


const ParentPaidSubscribe = ()=> {
           const [values, setValues] = useState({
            session:"",
            uniquetopicjason: [],
            index: 0
           // id: ""
       
    });
 
   const {session, uniquetopicJason, index} = values;
   //var session ="";
   var id = "";
   var i=0;
  // var index = 0;
   var uniquetopicJasontemp=[];
//const stripePromise = loadStripe("pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt");     
const token = getCookie('token');
console.log("token", token);
//var checkoutButton = document.getElementById("checkout-button");


useEffect(() => {
        loadProfile();
    }, []); 

    

 const loadProfile = () => {  
                
        axios({
            method: 'GET',
            //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            url: `${process.env.REACT_APP_API}/readuniquetopic`,
            //url: `http://localhost:8000/api/readuniquetopic`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('GET TOPIC Successful', response.data)
            uniquetopicJasontemp=response.data;
            i=uniquetopicJasontemp.length
           // return uniquetopicJasontemp
            console.log("INDEXXXXXXXXXXXXXXXXXXXXXXXXXXX", i, "topic temp", uniquetopicJasontemp)
                //uniquetopicJason = response.data;
                setValues({...values, 
                uniquetopicJason: response.data, index: response.data.length
            })   
                  console.log("in client", {index}, {uniquetopicJason})   
                  console.log("in client", {index}, response.data)   
                                         })
            .catch(error => {
                // console.log('GET TOPIC ERROR', error.response.data.error);
                console.log('GET TOPIC ERROR', error);
                   })}


                   //<ParentPaidSubscribe index = {index} />

                   return (

                    <div>
                    
                            <h1>test paid Subscribe {index}</h1>
                            </div>
                
                        
                ); 
                  };
                export default ParentPaidSubscribe;