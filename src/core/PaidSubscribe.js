import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import stripeButton from './../assets/images/stripeButton.png';
//import {loadStripe} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from '@stripe/stripe-js';
//import {Element, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
//const stripe = require ("stripe")("pk_live_51IfPHgH7u7oEkWyqVQJwA4iufXjEwYDwpQw9byxesYRFKuWocbazxbbCJ0xNqHDkb5lLWf05ONdbQZ6BcIzjZDmw00R7cWPqOT")
//const stripePromise = loadStripe('pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt');
const stripePromise = loadStripe('pk_live_51IfPHgH7u7oEkWyqVQJwA4iufXjEwYDwpQw9byxesYRFKuWocbazxbbCJ0xNqHDkb5lLWf05ONdbQZ6BcIzjZDmw00R7cWPqOT');
require('dotenv').config();

//const stripe = Stripe('pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt');


const PaidSubscribe = ()=> {
           const [values, setValues] = useState({
            session:"",
            index:0,
            uniquetopicJason: [],
            selectedtopic: [],
            totalprice: 0
       
    });
 
   const {session, selectedtopic, uniquetopicJason, index, totalprice} = values;
   const{topicID, price} = uniquetopicJason;
 
   //var session ="";
   var id = "";
   var counter =0;
   var selectedtopictemp=[];
   var filteredselectedtopic
   var i=0;
  // var index = 0;
   var uniquetopicJasontemp=[];
   var currentuser = []
//const stripePromise = loadStripe("pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt");     
const token = getCookie('token');
currentuser=JSON.parse(localStorage.getItem('user'))
const{email} = currentuser;
var totalpricetemp=0;
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
            const {topicID, topicprice} = response.data
            uniquetopicJasontemp=response.data;
            i=uniquetopicJasontemp.length
           // return uniquetopicJasontemp
            //console.log("INDEXXXXXXXXXXXXXXXXXXXXXXXXXXX", i, uniquetopicJasontemp)
                //uniquetopicJason = response.data;
                setValues({...values, 
                uniquetopicJason: response.data, 
                               
                index: response.data.length
            })   
                  //console.log("in client", {index}, {uniquetopicJason})   
                  //console.log("in client", response.data)   
                                         })
            .catch(error => {
                // console.log('GET TOPIC ERROR', error.response.data.error);
                console.log('GET TOPIC ERROR', error);
                   })}
               
                 
    const changeHandler = (event) => {
    totalpricetemp=totalprice;
    selectedtopictemp=selectedtopic;

    const {select, uniquetopicJason} = values;

    uniquetopicJasontemp=uniquetopicJason;
                   
    console.log ("inside changehandler etarget checked", event.target.checked);

    if (event.target.checked) 
    {
    console.log("totalprice topicID", event.target.value)

    for(counter=0; counter<uniquetopicJason.length; counter++)
      {
        if (event.target.value===uniquetopicJason[counter].topicID)
        {
          totalpricetemp = totalpricetemp+uniquetopicJason[counter].topicprice
          selectedtopictemp.push({topicID:event.target.value, email:email, topicprice:uniquetopicJason[counter].topicprice })
        }
        } 

    
    console.log("selected topics after add", selectedtopictemp)

    {
      setValues({...values, 
        //totalprice: totalprice+counter.topicprice,
        selectedtopic: selectedtopictemp, //////////////// CHANGE MADE
        totalprice: totalpricetemp
      })
    }}
        
    if (!event.target.checked)
    {

      console.log("totalprice topicID", event.target.value)

      for(counter=0; counter<uniquetopicJason.length; counter++)
        {
          if (event.target.value===uniquetopicJason[counter].topicID)
          {
            totalpricetemp = totalpricetemp - uniquetopicJason[counter].topicprice
            //selectedtopictemp.push({topicID:event.target.value, email:currentusermail, topicprice:uniquetopicJason[counter].topicprice })
          }
        } 

        filteredselectedtopic = selectedtopictemp.filter(X => X.topicID !=event.target.value)
      //var filteredselectedtopic = selectedtopictemp.filter(function(topicID, index, arr){ 
       // return topicID !== event.target.value})
        selectedtopictemp=filteredselectedtopic;
        console.log("selected topics after delete", selectedtopictemp)
      //totalpricetemp=totalpricetemp-counter.topicpric
      setValues({...values, 
        selectedtopic: selectedtopictemp,
        totalprice: totalpricetemp})
    }
    console.log("totalprice", totalprice)
    }

   
 const clickSubmit = async (event) => {
    event.preventDefault();
    console.log("inside new clicksubmit")
  
  /////IMPORTANT PLEASE DON'T DELETE ** - TEMP COMMENTED - STRIPE functionality
   // const stripe = await stripePromise;
    //const {id} = values;
    // var stripe = Stripe("pk_test_51IfPHgH7u7oEkWyqx1brH7ZPp10k0hF5t3sbprOVkEU3bTgyDyXhPshxVdprj44trznYvlYNQsV09cbA2EgQ5BJv00iLj4UIXt");
      
   // const requestOptions = {
   //   method: 'POST',
   //   headers: { 'Content-Type': 'application/json' }};
   //   //body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  
 // fetch('http://localhost:8000/api/createcheckoutsession', requestOptions)
   //   .then(response => response.json())
     // .then(data => setPostId(data.id));

  //    .then (data => {
   //     console.log("id inside fetch redirect", data.id)
   //     stripe.redirectToCheckout({sessionId: data.id})})

  //      .then (result => {
   //       if (result.error) {
   //        alert(result.error.message)
     //        }
   //      }
      //   );
        
      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API}/updatetopicsubscription`,
       // url:    `http://localhost:8000/api/updatetopicsubscription`,
        headers: {
            Authorization: `Bearer ${token}`

        },
         data: selectedtopic
        
        })

         .then(response => {
            console.log('Topic Subscription Updated', response);
                setValues({ ...values, buttonText: 'Submitted' });
                toast.success('Topic subscription updated successfully');
            })
        
        .catch(error => {
            console.log('TOPIC SUBSCRIPTION UPDATE ERROR', error.response.data.error);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(error.response.data.error);
        });                  

}
      
const updateForm = () => (

  uniquetopicJason.map((counter) => 
  
  <form>
    <div className="form-group">
           
            <input onChange={changeHandler} type = "checkbox" value = {counter.topicID} className="form-group" enabled ="true" />
            <label className="text-muted"> Topic  {counter.topicID} -  Price {counter.topicprice} </label>
            
            </div>
            </form>
  
)               
           
  )

return (

    <Layout>
        
                <div className="col-md-6 offset-md-3">
                    <ToastContainer />
            <h1 className="pt-5 text-center">Subscribe</h1>
            <p className="lead text-center">Quiz Render</p>
            <p className="lead text-center">Total Price of Selected Topics ${totalprice}</p>
            {updateForm()}
            <button onClick={clickSubmit} className="btn btn-primary"  value="Pay">
                    Pay
                </button>
              

            </div>
    </Layout>
); 
  };
export default PaidSubscribe;