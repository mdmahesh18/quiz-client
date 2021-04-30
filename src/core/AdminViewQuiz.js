import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
require('dotenv').config();

const AdminViewQuiz = ({ history }) => {
    const [values, setValues] = useState({
        topicJason: [""],
        topicID:"",
        examNbr: "",
        questionNbr:"",
        currentIndex: 0,
        totalscore: 0,
        quizend: false,
        individualscore:0,
        disabled: true,
        loading: true,
        searchmode: true,
        insertmode: false,
        insertsavequestionmode: false,
        errormessagetemp: ""
         });
            //const topicID = "10";
            //const examNbr ="1";
            var topicJasontemp =[""];
            var searchexamNbr;
            var searchtopicID; 

            const {topicID, examNbr, errormessagetemp, questionNbr, currentIndex, insertsavequestionmode, insertmode, button1Text, searchmode, button2Text, quizend, score, individualscore, loading, topicJason, totalscore} = values;
            //topicJason = [""];


    const token = getCookie('token');
/** 
    useEffect(() => {
        loadProfile();
    }, []);

    */
    const loadProfile = () => {  
                
        axios({

            method: 'GET',
            url: `${process.env.REACT_APP_API}/topic/${topicID}`,
            //url: `http://localhost:8000/api/topic/${topicID}`,
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
            console.log("inside clicksubmit")
            topicJasontemp=topicJason;
            //checkAnswer();
            //currentIndextemp={currentIndex}
    
                   if (event.target.value === 'prevbutton')
            {
                    setValues({ ...values, currentIndex: currentIndex-1,
                        insertmode: true, 
                        question: topicJason[currentIndex-1].question,
                        questionNbr: topicJason[currentIndex-1].questionNbr,
                        examNbr: topicJason[currentIndex-1].examNbr,
                        option1: topicJason[currentIndex-1].option1,
                        option2: topicJason[currentIndex-1].option2,
                        option3: topicJason[currentIndex-1].option3,
                        option4: topicJason[currentIndex-1].option4,
                        answer: topicJason[currentIndex-1].answer,
                        insertsavequestionmode: false});
            }
    
        if (event.target.value === 'nextbutton') {
            setValues({ ...values, 
                currentIndex: currentIndex+1, 
                question: topicJason[currentIndex+1].question,
                questionNbr: topicJason[currentIndex+1].questionNbr,
                examNbr: topicJason[currentIndex+1].examNbr,
                option1: topicJason[currentIndex+1].option1,
                option2: topicJason[currentIndex+1].option2,
                option3: topicJason[currentIndex+1].option3,
                option4: topicJason[currentIndex+1].option4,
                answer: topicJason[currentIndex+1].answer,
               })}

               
        if (event.target.value === 'submitsearch') {
            var temp = [""];
            console.log({topicID});
            console.log({examNbr});
            console.log("topic ex", topicID, examNbr)
            event.preventDefault();
            
            if (topicID==="")
            {
                console.log("value blank")

                setValues({ ...values, 
                   errormessagetemp: "Values Blank"})
                toast.error("Value Blank");
            }
            else 
            {
                


            setValues({ ...values, buttonText: 'Submitting' });
           axios({

                method: 'GET',
                //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
                url: `http://localhost:8000/api/topic/${topicID}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            //    method: 'GET',
                //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
              //  url: `http://localhost:8000/api/topic`,
               // url: `${process.env.REACT_APP_API}/topic`,
                //    headers: {
                  //  Authorization: `Bearer ${token}`,
                   // Content: `application/json`
                  //   },
                   // Data: `{"topicID":${topicID}, "examNbr"=${examNbr}}`
                   // data: {topicID}
                   //data: temp,

           // })
           .then(response => {
            console.log('GET TOPIC Successful', response.data)
                           
                setValues({...values, 
                loading: false,
                topicJason: response.data,
                searchmode: false,
                topicID: response.data[currentIndex].topicID,
                examNbr: response.data[currentIndex].examNbr,
                question: response.data[currentIndex].question,
                questionNbr: response.data[currentIndex].questionNbr,
                option1: response.data[currentIndex].option1,
                option2: response.data[currentIndex].option2,
                option3: response.data[currentIndex].option3, 
                option4: response.data[currentIndex].option4,
                answer: response.data[currentIndex].answer,
                insertmode: true,
                maxquestionNbr: response.data.length

            })  
                   
                   //topicJason = response.data
                       
                         // })
                         topicJasontemp=response.data;
                         console.log ('topicjason currentindex', topicJasontemp, {currentIndex});
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
                }
                );
    }
} //else end of topic id blank

    } //main end

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value});
    };

         const updateForm = () => (
        <form>

            {errormessagetemp && (<div> <label className="text-muted">{errormessagetemp} </label></div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">topicID</label>
                <input value={topicID} type="text" className="form-control" disabled="true"/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Question Number</label>
                <input onChange={handleChange('questionNbr')} value={questionNbr} type="text" className="form-control" disabled="true"/>
            </div>)}
                           
                {!searchmode && (<div className="form-group">
                <label className="text-muted">Question</label>
                <input type="text" className="form-control" name = "form-control" value = {topicJason[currentIndex].question} disabled={insertsavequestionmode===false}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Option 1</label>
                <input  type="text" className="form-control" value = {topicJason[currentIndex].option1} disabled={insertsavequestionmode===false}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Option 2</label>
                <input type="text" className="form-control" value = {topicJason[currentIndex].option2} disabled={insertsavequestionmode===false}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Option 3</label>
                <input type="text" className="form-control" value = {topicJason[currentIndex].option3} disabled={insertsavequestionmode===false}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Option 4</label>
                <input type="text" className="form-control" value = {topicJason[currentIndex].option4} disabled={insertsavequestionmode===false}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Answer</label>
                <input type="text" className="form-control" value = {topicJason[currentIndex].answer} disabled={insertsavequestionmode===false}/>
            </div>)}
                 
        {searchmode && (<div className="form-group">
                <label className="text-muted">Search Topic ID</label>
                <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control" enabled = "true"/>
            </div>)}
           

          {(currentIndex > 0) && !searchmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value="prevbutton">
                Previous
            </button>
        </div>}

        {(currentIndex < topicJason.length-1) && !searchmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="nextbutton">
                Next
            </button>
            </div>}

            { searchmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="submitsearch">
                Submit Search
            </button>
        </div>}

            </form> 
        );    
 
        return (
            <Layout>
                <div className="col-md-6 offset-md-3">
                    <ToastContainer />
                    <h1 className="pt-5 text-center">Quiz - Topic</h1>
                     {updateForm()}
                    </div>
            </Layout>
        );

        };
    
export default AdminViewQuiz;
