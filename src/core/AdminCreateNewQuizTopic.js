import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
require('dotenv').config();
//require ('dotenv').config;
//const process = require('process');

const AdminCreateNewQuizTopic = ({ history }) => {
    const [values, setValues] = useState({
        topicJason: [""],
        topicID:"",
        examNbr: "",
        currentIndex: 0,
        totalscore: 0,
        quizend: false,
        individualscore:0,
        disabled: true,
        loading: true,
        savesubmitmode: true,
        searchmode: true,
        insertmode: false,
        insertsavequestionmode: false
         });
            //const topicID = "10";
            //const examNbr ="1";
            var topicJasontemp =[""];
            var searchexamNbr;
            var searchtopicID; 

            const {savesubmitmode, topicID, examNbr, topicaccess, topicprice, desc, currentIndex, insertsavequestionmode, insertmode, button1Text, searchmode, button2Text, quizend, score, individualscore, loading, topicJason, totalscore} = values;
            //topicJason = [""];


    const token = getCookie('token');
    const url = process.env.REACT_APP_API;
   // let env = process.env["REACT_APP_API"];
  // const urltemp = `${process.env.REACT_APP_API}/user/topic`
    //console.log("URL", url)
/*
    useEffect(() => {
        loadProfile();
    }, []);
*/
    const loadProfile = () => {  
               
      

        axios({
            method: 'GET',
           // url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
          
           url: `${process.env.REACT_APP_API}/topic`,
          // url: `http://localhost:8000/api/topic`,
           //url: urltemp,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('GET TOPIC Successful', response.data)
            const {topicJason} = response.data;
                setValues({...values, 
                loading: false,
                topicJason: response.data
            })   
            console.log ('topicjason', loading);
                                   })
            .catch(error => {
                // console.log('GET TOPIC ERROR', error.response.data.error);
                console.log('GET TOPIC ERROR', error);
                //if (error.response.status === 401) {
                //  signout(() => {
                //    history.push('/');
                // }
                //);
                //}
                })}
               

        const clickSubmit = event => {
        event.preventDefault();
        console.log("inside clicksavesubmit")
        
        if (event.target.value === 'savesubmit') {
                 
            event.preventDefault();

            if (topicID === "" || 
            examNbr === "" ||
            desc ==="" ||
            topicprice === "" ||
            topicaccess === "" 
            )

            {
              console.log("value blank")

              setValues({ ...values, 
                 errormessagetemp: "Values Blank"})
              toast.error("Value/s Blank");
          }

            else 
            {
            if ( topicaccess !== "Paid" && topicaccess !== "Free")
            {
            console.log("value blank")

              setValues({ ...values, 
                 errormessagetemp: "Topic Access needs to be either Paid or Free"})
              toast.error("Topic Access needs to be either Paid or Free");

            }

            else {
           // setValues({ ...values, buttonText: 'Submitting' });
            axios({
                method: 'POST',
                //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
                //url: `http://localhost:8000/api/createnewtopic`,
               url: `${process.env.REACT_APP_API}/createnewtopic`,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    Content: `application/json`
                     },
                 data: {topicID, examNbr, desc,topicprice, topicaccess}

            })
                .then(response => {
                    console.log('NEW TOPIC CREATION SUCCESSFUL', response.data)
                                   
                        setValues({...values, 
                        savesubmitmode: false
                                            })    
                   
                    toast.success('Topic inserted successfully');
                   //topicJason = response.data
                       
                         // })
                         
                         topicJasontemp = {topicJason}
                         console.log ('topicjason currentindex', topicJasontemp, {currentIndex});
                                   })
                .catch(error => {
                   // console.log('GET TOPIC ERROR', error.response.data.error);
                   console.log('TOPIC INSERT ERROR', error.response.data.error);
                   toast.error(error.response.data.error);
                    //if (error.response.status === 401) {
                      //  signout(() => {
                        //    history.push('/');
                       // }
                        //);
                    //}
                }
                );
    }}} // end brace for the if of the empty fields

    } //main end

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };





    const updateForm = () => (
        <form>  
                 
        {savesubmitmode && (<div className="form-group">
                <label className="text-muted">Enter New Topic ID</label>
                <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control" enabled="true"/>
            </div>)}
           

            {savesubmitmode && (<div className="form-group">
                <label className="text-muted">Enter New Exam Number </label>
                <input onChange={handleChange('examNbr')} value={examNbr} type="text" className="form-control"/>
            </div>)}

            {savesubmitmode && (<div className="form-group">
                <label className="text-muted">Enter Topic Description </label>
                <input onChange={handleChange('desc')} value={desc} type="text" className="form-control"/>
            </div>)}

            {savesubmitmode && (<div className="form-group">
                <label className="text-muted">Enter Topic Price</label>
                <input onChange={handleChange('topicprice')} value={topicprice} type="text" className="form-control"/>
            </div>)}

            {savesubmitmode && (<div className="form-group">
                <label className="text-muted">Enter Topic Access (Paid or Free)</label>
                <input onChange={handleChange('topicaccess')} value={topicaccess} type="text" className="form-control"/>
            </div>)}

        
            { savesubmitmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="savesubmit">
                Save & Submit
            </button>
        </div>}

            </form> 
        );    

        return (
            <Layout>
                <div className="col-md-6 offset-md-3">
                    <ToastContainer />
                    <h2 className="pt-3 text-center">Create New Quiz Topic</h2>
                     {updateForm()}
                    </div>
            </Layout>
        );

        };
    
export default AdminCreateNewQuizTopic;
