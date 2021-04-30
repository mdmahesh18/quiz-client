import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
require('dotenv').config();

const InsertUpdateQuestion = ({ history }) => {
    const [values, setValues] = useState({
        topicID:"",
        examNbr:"", 
        question:"",
        option1:"",
        option2:"", 
        option3:"", 
        option4:"", 
        answer:"",
        currentIndex: 0,
        totalscore: 0,
        quizend: false,
        individualscore:0,
        disabled: true,
        loading: true,
        searchmode: true,
        insertmode: false,
        insertsavequestionmode: false
         });
            
            
            var maxquestionNbr;
            var questioninput;
            var optionAinput;
            var optionBinput;
            var optionCinput;
            var optionDinput;
            var answerinput;
            var searchexamNbr;
            var searchtopicID; 


            const {currentIndex, insertsavequestionmode, topicID, examNbr, question, option1, option2, option3, option4, answer} = values;
            //topicJason = [""];


    const token = getCookie('token');
/** 
    useEffect(() => {
        //loadProfile();
    }, []); **/

    const loadProfile = () => {  
                
        axios({
            method: 'GET',
            //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            url: `${process.env.REACT_APP_API}/topic`,
           // url: `http://localhost:8000/api/topic`,
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
               

    //const { role, name, email, password, buttonText } = values;

    //const handleChange = name => event => {
        // console.log(event.target.value);
      //  setValues({ ...values, [name]: event.target.value });
   // };


   /**
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/topicquestioninsert`,
           // url:    `http://localhost:8000/api/topicquestioninsert`,
            headers: {
                Authorization: `Bearer ${token}`
            },
 // #######           data: {topicJasontemp}
        })
            .then(response => {
                console.log('TOPIC QUESTION INSERTED', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('question inserted successfully');
                });
            })
            .catch(error => {
                console.log('QUESTION INSERT ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

**/
    const clickSubmit = event => {
        event.preventDefault();
        console.log("inside clicksubmit")
        //checkAnswer();
        //currentIndextemp={currentIndex}

               if (event.target.value === 'prevbutton')
        {
                setValues({ ...values, currentIndex: currentIndex-1,
                    insertmode: true, 
                    insertsavequestionmode: false});
        }
    
        if (event.target.value === 'nextbutton') {
        setValues({ ...values, 
            currentIndex: currentIndex+1, 
           })

           /** 
        if (({currentIndex}) >= topicJason.length)
        {

            topicJasontemp=topicJason
            topicJason.push ("");
            setValues({ ...values, insertsavequestionmode: true, insertmode: false, topicJason: topicJasontemp});

        } **/
        console.log("currentIndex in next button", currentIndex)
                }


           if (event.target.value === 'insertquestion') {
                          
                event.preventDefault();
                const {topicJason} = values;
                //const {topicID, examNbr, question, option1} = topicJason;

                //var obj = JSON.parse(topicJason);
                //topicJasontemp.push(obj.topicJasontemp);


                console.log("currentindex topicJason", topicJason, {currentIndex})
                //topicJasontemp=topicJason
               // console.log("jasontemp question", topicJasontemp[currentIndex].question)
               // topicJasontemp.push({topicis:"10", examNbr: "1",question:"", option1:"",option2:"",option3:"",option4:"", answer:""});
                //topicJasontemp[currentIndex+1].question="New";
                //topicJasontemp[currentIndex+1].option1="New1"

                setValues({ ...values, 
                    currentIndex: currentIndex+1, insertsavequestionmode: true                   })              

               // setValues({ ...values, buttonText: 'Submitting', insertsavequestionmode: true, insertmode: false});

           };


           if (event.target.value === 'insertsavequestion') {
                                            
            
            setValues({ ...values, buttonText: 'Submitting', insertsavequestionmode: true    
                        });

                        console.log("topicJason values SENDING REQ", {topicID, question, option1, answer})

                    axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/topicquestioninsert`,
                   // url:    `http://localhost:8000/api/topicquestioninsert`,
                    headers: {
                        Authorization: `Bearer ${token}`

                    },
                     data: {topicID, examNbr, question, option1, option2, option3, option4, answer} 
                    
                    })

                     .then(response => {
                        console.log('TOPIC QUESTION INSERTED', response);
                            setValues({ ...values, buttonText: 'Submitted' });
                            toast.success('question inserted successfully');
                        })
                    
                    .catch(error => {
                        console.log('QUESTION INSERT ERROR', error.response.data.error);
                        setValues({ ...values, buttonText: 'Submit' });
                        toast.error(error.response.data.error);
                    });                  
            

        }
    
        if (event.target.value === 'submitsearch') {
                          
            event.preventDefault();
            setValues({ ...values, buttonText: 'Submitting' });
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/topic`,
                //url: `http://localhost:8000/api/topic`,
               // url: `${process.env.REACT_APP_API}/topic`,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    Content: `application/jason`
                     },
                 data: `{"topicID": "10"}`,

            })
                .then(response => {
                    console.log('GET TOPIC Successful', response.data)
                                   

                        setValues({...values, 
                        loading: false,
                        topicJason: response.data,
                        searchmode: false,
                        insertmode: true,
                       // maxquestionNbr: topicJason.length

                    })    
                   
                   //topicJason = response.data
                       
                         // })
                        // topicJasontemp = {topicJason}
                        // console.log ('topicjason currentindex', topicJasontemp, {currentIndex});
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

    } //main end
        
    /**           
    
    {!searchmode && (<div className="form-group">
    <label className="text-muted">Question</label>
    <input defaultValue={searchtopicID} type="text" className="form-control" value = {topicJason[currentIndex].question} disabled="false"/>
</div>)}

{!searchmode && (<div className="form-group">
    <label className="text-muted">Option 1</label>
    <input defaultValue={searchtopicID} type="text" className="form-control" value = {topicJason[currentIndex].option1} disabled="false"/>
</div>)}

**/

const handleChange = name => event => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
};

/**
const handleChangequestion = event => {
    const {currentIndex} = values 
    console.log("CI in Handlechange", currentIndex);
    topicJasontemp=topicJason;
    //setValues({ ...values, [name]: event.target.value });
    //topicJasontemp.push({topicis:"10", examNbr: "1",question:"", option1:"",option2:"",option3:"",option4:"", answer:""});
    topicJasontemp.push({question: event.target.value})
   // topicJasontemp[{currentIndex}].question = event.target.value;
    console.log("topicJasontemp thru handlechange", topicJasontemp[currentIndex].question)

};  

**/

         const updateForm = () => (
        <form>

                {(<div className="form-group">
                <label className="text-muted">topicID</label>
                <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}
            
                <div className="form-group">
                <label className="text-muted">Question</label>
                <input onChange={handleChange('question')} value={question} type="text" className="form-control" disabled={insertsavequestionmode===true} />
            </div>

           
                {(<div className="form-group">
                <label className="text-muted">Optionn 1</label>
                <input onChange={handleChange('option1')} value={option1} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {(<div className="form-group">
                <label className="text-muted">Option 2</label>
                <input onChange={handleChange('option2')} value={option2} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {(<div className="form-group">
                <label className="text-muted">Option 3</label>
                <input onChange={handleChange('option3')} value={option3} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {(<div className="form-group">
                <label className="text-muted">Option 4</label>
                <input onChange={handleChange('option4')} value={option4} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {(<div className="form-group">
                <label className="text-muted">Answer</label>
                <input onChange={handleChange('answer')} value={answer} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}
                                  
            {(<div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="insertsavequestion" disabled={insertsavequestionmode===true}>
                Save
            </button>
        </div>)}

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
    
export default InsertUpdateQuestion;
