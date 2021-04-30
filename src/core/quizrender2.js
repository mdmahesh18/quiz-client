import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {QuizData} from './QuizData'
require('dotenv').config();

const Quizrender = () => {
    
    const [values, setValues] = useState({
        topicJason: [""],
         //option:[],
        //button1Text: '',
        //button2Text: 'Next',
        //useranswer: null,
        currentIndex: 0,
        totalscore: 0,
        quizend: false,
        answerentered: false,
        score:0,
        topicID:"",
        examNbr: "",
        individualscore:0,
        searchmode: true,
        usersubscriberstatus: false,
        disabled: true,
        loading: true,
        email: ""
            });
            //var topicID = "";
            //var examnbr ="1";
            var i=0;
            var topicJasontemp =[];
            var totalscoretemp=0;
            var uniquetopicJasontemp= []
            var currentuser = []
            var usersubscriberstatustemp=false
        
            const {currentIndex, topicID, examNbr, answerentered, email, usersubscriberstatus, searchmode, button1Text, button2Text, quizend, score, individualscore, loading, topicJason, totalscore} = values;
            //topicJason = [""];
          
            const token = getCookie('token');   
            currentuser=JSON.parse(localStorage.getItem('user'))
           
          /** 
        useEffect(() => {
            loadProfile();
        }, []);
    
        **/
        const loadProfile = () => {
            console.log(token,topicID,examNbr)

            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/topic`,

               // url: `http://localhost:8000/api/topic`,
               // url: `${process.env.REACT_APP_API}/topic`,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    Content: `application/jason`
                 },
                 data: `{"topicID"': "10", "examnbr": "1"}`,

            })
                .then(response => {
                    console.log('GET TOPIC Successful', response.data)
                    const {topicJason} = response.data;
                        setValues({...values, 
                        loading: false,
                        topicJason: response.data

                    })    
                   
                   //topicJason = response.data
                       
                         // })
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
                }
                );
        };

                const checkAnswer = (event) => {
                   // event.preventDefault();


                const {buttonText, topicJason} = values;
               //totalscoretemp =0;
                topicJasontemp=topicJason;
                topicJasontemp[currentIndex].userselection=event.target.value
               
                console.log ('inside checkanswer')
                            
                if (event.target.value === topicJason[currentIndex].answer){
                topicJasontemp[currentIndex].score = 1
             

            } else 
            {
                topicJasontemp[currentIndex].score = 0
              
            }

            console.log("correct ans", {topicJasontemp})    
            {
                //totalscoretemp=
                //(topicJasontemp[0].score +
               // topicJasontemp[1].score +
               // topicJasontemp[2].score +
               // topicJasontemp[3].score )

                 //   console.log("totalscore", totalscore)

                    setValues({ ...values, 
                        topicJason: topicJasontemp,
                        answerentered: true
                   //     totalscore: totalscoretemp    
                    
                    })

                }

                }
                const clickSubmit = event => {
                event.preventDefault();
                console.log("inside clicksubmit")
                //checkAnswer();
                if (event.target.value === 'prevbutton')
               
                {
                    document.getElementById('id0').checked = false;
                    document.getElementById('id1').checked = false;
                    document.getElementById('id2').checked = false;
                    document.getElementById('id3').checked = false;

                   //
                  // switch (topicJason[currentIndex-1].userselection)
                   if ((topicJason[currentIndex-1].userselection) === "A" )              
                   document.getElementById('id0').checked = true;
                    else {
                        if ((topicJason[currentIndex-1].userselection) === "B" )   
                        document.getElementById('id1').checked = true;
                        else {
                            if ((topicJason[currentIndex-1].userselection) === "C" ) 
                            document.getElementById('id2').checked = true;  
                            else{
                                if ((topicJason[currentIndex-1].userselection) === "D" ) 
                                document.getElementById('id3').checked = true;  
                            }
                            }

                    }
                    
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
                        score: topicJason[currentIndex-1].score,
                        insertsavequestionmode: false});
            }


                if (event.target.value === 'nextbutton') {
                    document.getElementById('id0').checked = false;
                    document.getElementById('id1').checked = false;
                    document.getElementById('id2').checked = false;
                    document.getElementById('id3').checked = false;

                   //
                  // switch (topicJason[currentIndex-1].userselection)
                   if ((topicJason[currentIndex+1].userselection) === "A" )              
                   document.getElementById('id0').checked = true;
                    else {
                        if ((topicJason[currentIndex+1].userselection) === "B" )   
                        document.getElementById('id1').checked = true;
                        else {
                            if ((topicJason[currentIndex+1].userselection) === "C" ) 
                            document.getElementById('id2').checked = true;  
                            else{
                                if ((topicJason[currentIndex+1].userselection) === "D" ) 
                                document.getElementById('id3').checked = true;  
                            }
                            }
                        
                    }
                    
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
                        score: topicJason[currentIndex+1].score,
                       })}

                   if (event.target.value === 'Submit') {
                   
                    if (answerentered)         
                    {           
                    topicJason.map((counter) => {
                        totalscoretemp = counter.score+totalscoretemp;

                    })
                }
                else { totalscoretemp = 0}

                    setValues({ ...values, 
                        totalscore: totalscoretemp,
                        quizend: true
                       })
                    
                    }

    //////////////////////

                    if (event.target.value === 'searchsubmit')  {
                        event.preventDefault();
                        //setValues({ ...values, buttonText: 'Submitting' });
                        usersubscriberstatustemp=false;

                        //////////////////////////
                        axios({
                            method: 'GET',
                            url: `${process.env.REACT_APP_API}/readonetopicmaster/${topicID}`,
                            //url: `http://localhost:8000/api/readonetopicmaster/${topicID}`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            }

                        })

                        .then(response => {
                            var id = 0;
                            console.log('GET TOPIC Successful', response.data)
                            console.log('current user email', currentuser.email)
                            uniquetopicJasontemp=response.data;
/////////////////
                            const {topicID, topicprice, subscribers} =uniquetopicJasontemp

                            //function checkuser(currentuser) {
                              //  if (currentuser.email === uniquetopicJasontemp.subscriber)
                               // return true;
                             // }

                            for (id=0; id<uniquetopicJasontemp.subscribers.length;id++)
                            {
                              console.log("subscriber info", uniquetopicJasontemp.subscribers.length, uniquetopicJasontemp.subscribers[id])  
                             if (uniquetopicJasontemp.subscribers[id] ===currentuser.email)
                             {
                             usersubscriberstatustemp=true
                             
                             }}
                                console.log('inside email check');
                              //  setValues({...values, 
                                //    uniquetopicJason: response.data, 
                                  //  usersubscriberstatus: usersubscriberstatustemp,
                                 //   loading: false,
                                 //   email: currentuser.email,
                                    //index: response.data.length
                               // })
                                
                            //const usersubscriberstatus = uniquetopicJasontemp.find(checkuser);
                            console.log('user sub status', usersubscriberstatustemp)
//////////////////
                            // return uniquetopicJasontemp
                            //console.log("INDEXXXXXXXXXXXXXXXXXXXXXXXXXXX", i, uniquetopicJasontemp)
                               // uniquetopicJason = response.data;
                                //setValues({...values, 
                                //uniquetopicJason: response.data, 
                                //usersubscriberstatus: usersubscriberstatustemp,
                                //loading: false,
                                //email: currentuser.email,
                                //index: response.data.length
                            //})   
                                  //console.log("in client", {index}, {uniquetopicJason})   
                                  //console.log("in client", response.data)   
                                                         })
                            .catch(error => {
                                // console.log('GET TOPIC ERROR', error.response.data.error);
                                console.log('GET TOPIC ERROR', error);
                                   })

////////////////////////////        

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
                                    maxquestionNbr: response.data.length,

              //////                uniquetopicJason: uniquetopicJasontemp,
                                    usersubscriberstatus: usersubscriberstatustemp,
                                    loading: false,
                                    email: currentuser.email,
                                    index: response.data.length
            
                                })    
                               
                               //topicJason = response.data
                                   
                                     // })
                                     //topicJasontemp = {topicJason}
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
                                  
            } 
           
            const handleChange = name => event => {
                console.log(event.target.value);
               setValues({ ...values, [name]: event.target.value,savemode: true });
                //setValues({ ...values, savemode: true });
       
           };

           

            const updateForm = () => (

          <form>


            {searchmode && (<div className="form-group">
                <label className="text-muted">Search Topic ID</label>
                <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control" enabled = "true"/>
            </div>)}

            {!usersubscriberstatus && !loading && (<p className="lead text-center"> {email} is not subscribed to this Quiz Topic </p>)}
             
             
            {!quizend && ! searchmode && usersubscriberstatus && (<p className="lead text-center"> total score = {totalscore} </p>)}

           
            {!quizend && ! searchmode && usersubscriberstatus && (<div class="form-check">


            {(<div className="form-group">
                <label className="text-muted">Question Number</label>
                <input value={topicJason[currentIndex].questionNbr}  type="text" className="form-control" disabled="true"/>
            </div>)}


            {(<div className="form-group">
                <label className="text-muted">Question</label>
                <input value={topicJason[currentIndex].question}  type="text" className="form-control" disabled="true"/>
            </div>)}

          
            {(<div className="form-group">
            <input  type="radio"class="form-check-input" name ="o1" id="id0" value = "A" onChange = {checkAnswer}/>
                <input value= {topicJason[currentIndex].option1}  type="text" className="form-control" disabled="true"/>
            </div>)}


            {(<div className="form-group">
            <input  type="radio"class="form-check-input" name ="o1" id="id1" value = "B" onChange = {checkAnswer}/>
                <input value= {topicJason[currentIndex].option2}  type="text" className="form-control" disabled="true"/>
            </div>)}


            {(<div className="form-group">
            <input  type="radio"class="form-check-input" name ="o1" id="id2" value = "C" onChange = {checkAnswer}/>
                <input value= {topicJason[currentIndex].option3}  type="text" className="form-control" disabled="true"/>
            </div>)}


            {(<div className="form-group">
            <input  type="radio"class="form-check-input" name ="o1" id="id3" value = "D" onChange = {checkAnswer}/>
                <input value= {topicJason[currentIndex].option4}  type="text" className="form-control" disabled="true"/>
            </div>)}

            </div>)
            
            }
                                             
            {(currentIndex > 0) && !quizend && !searchmode && usersubscriberstatus && <div>
                <button className="btn btn-primary" onClick={clickSubmit} value="prevbutton">
                    Previous
                </button>
            </div>}

            {(currentIndex === 0) && !quizend && searchmode && <div>
                <button className="btn btn-primary" onClick={clickSubmit} value="searchsubmit">
                    Search
                </button>
            </div>}

            {!(currentIndex===topicJason.length-1) && !quizend && !searchmode && usersubscriberstatus && <div>
                <button className="btn btn-primary" onClick={clickSubmit} value ="nextbutton">
                    Next
                </button>
                </div>}

                {(currentIndex===topicJason.length-1) && !quizend && !searchmode && usersubscriberstatus && <div>
                <button className="btn btn-primary" onClick={clickSubmit} value ="Submit">
                    Submit
                </button>
            </div>}

            {quizend && {totalscore} && usersubscriberstatus &&
                ( <p className="lead text-center"> Quiz  ended your total score {totalscore}</p>            
                
                )}

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
        
                 
export default Quizrender;
