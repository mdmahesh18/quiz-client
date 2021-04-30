import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
require('dotenv').config();

const AdminEditQuiz = ({ history }) => {
    const [values, setValues] = useState({
        topicJason: [""],
        question:"",
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
        savemode: false,
        submitmode: false,
        maxquestionNbr:0,
        insertsavequestionmode: false
         });
           // const topicID = "10";
            //const examNbr ="1";
            var topicJasontemp =[""];
            var searchexamNbr = "1" ;
            var searchtopicID = "10"; 
            
            const {currentIndex, maxquestionNbr, question, questionNbr, examNbr, topicID, option1, option2, option3, option4, answer, insertsavequestionmode, submitmode, savemode, insertmode, button1Text, searchmode, button2Text, quizend, score, individualscore, loading, topicJason, totalscore} = values;
            //topicJason = [""];


    const token = getCookie('token');
/*
    useEffect(() => {
        loadProfile();
    }, []);
*/
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

           if (event.target.value === 'insertquestionbutton') {
            setValues({ ...values, 
                currentIndex: currentIndex+1, 
                question: "",
                questionNbr: currentIndex+2,
                examNbr: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
               })

            console.log("topicJasontemp", topicJasontemp)   
           // topicJasontemp.push({topicID:"",examNbr: "", question: "", option1:"", option2: "", option3:'', option4:"", answer:""})
            console.log("max length new", topicJasontemp)
            }

           if (event.target.value === 'savebutton')
           {
               //topicJasontemp= topicJason;
               //topicJasontemp[currentIndex].question = question;
              // topicJasontemp = topicJason;
              if (question === "" || 
                  option1 === "" ||
                  option2 ==="" ||
                  option3 === "" ||
                  option4 === "" ||
                  answer ==="")

                  {
                    console.log("value blank")
    
                    setValues({ ...values, 
                       errormessagetemp: "Values Blank"})
                    toast.error("Value Blank");
                }
                else 
                {

                if (answer !== "A"&& answer !== "B" && answer !== "C" && answer !== "D")

                {
                    console.log("Answer needs to be A, B, C or D")
    
                    setValues({ ...values, 
                       errormessagetemp: "Answer needs to be A, B, C or D"})
                    toast.error("Answer needs to be A, B, C or D");
                } else {

              topicJasontemp.push({topicID:topicID, examNbr: "1", questionNbr: questionNbr, question: "", option1:"", option2: "", option3:'', option4:"", answer:""})
              
              topicJasontemp[currentIndex].question=question;
               //topicJasontemp[currentIndex].examNbr=examNbr;
               //topicJasontemp[currentIndex].questionNbr=questionNbr;
               topicJasontemp[currentIndex].option1=option1;
               topicJasontemp[currentIndex].option2=option2;
               topicJasontemp[currentIndex].option3=option3;
               topicJasontemp[currentIndex].option4=option4;
               topicJasontemp[currentIndex].answer=answer;

                console.log("inside clicksave")
                       setValues({ ...values, 
                       savemode: false, 
                       //topicJason[currentIndex].question:  question,
                       submitmode: true,
                       topicJason: topicJasontemp,
                       insertsavequestionmode: false});

            } } // end of the if statement for checking the blank values
           }

/////////////////////////////////

           if (event.target.value === 'submitbutton')
           {
            console.log("inside clicksubmitbutton");
                                        
          
        //console.log("topicJason values SENDING REQ", {topicID, question, option1, answer})
        console.log("topicJason values SENDING REQ", {topicJason})


    axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API}/topicquestionupdatebulk`,
   // url:    `http://localhost:8000/api/topicquestionupdatebulk`,
    headers: {
        Authorization: `Bearer ${token}`,
        Content: `application/json`

    },
     //data: {topicID, examNbr, questionNbr, question, option1, option2, option3, option4, answer} 
     data: topicJason
    
    })

     .then(response => {    
        console.log("TOPIC QUESTION updated bulk", response);
            setValues({ ...values, buttonText: 'Submitted' });
            toast.success('Topic/questions updated successfully');
            setValues({ ...values, 
                submitmode: false,
                savemode: false,
                searchmode: false,
                insertsavequestionmode: false});   
        })
    
    .catch(error => {
        console.log('Topic/questions update ERROR', error.response.data.error);
        //setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
    });                  
    

}        

           /** 
        if (({currentIndex}) >= topicJason.length)
        {

            topicJasontemp=topicJason
            topicJason.push ("");
            setValues({ ...values, insertsavequestionmode: true, insertmode: false, topicJason: topicJasontemp});

        } **/
        //console.log("currentIndex in next button", currentIndex)
                              
        if (event.target.value === 'submitsearch') {
                 
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
                       
            axios({

                method: 'GET',
                //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
                url: `http://localhost:8000/api/topic/${topicID}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                
            
            //axios({
              //  method: 'GET',
                //url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
                //url: `http://localhost:8000/api/topic`,
               // url: `${process.env.REACT_APP_API}/topic`,
                  //  headers: {
                //    Authorization: `Bearer ${token}`,
                //    Content: `application/jason`
                 //    },
              //   data: `{topicID: ${searchtopicID}, examNbr=${searchexamNbr}}`

          //  })
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
    }  //end of the if loop
    } //main end

    const handleChange = name => event => {

         console.log(event.target.value);
         if (event.target.value === topicID || event.target.value === examNbr)
         setValues({ ...values, [name]: event.target.value,savemode: false});
         else 
         setValues({ ...values, [name]: event.target.value,savemode: true});
         
         //setValues({ ...values, savemode: true });

    };
         const updateForm = () => (
        <form>

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
                <input onChange={handleChange('question')} value={question} type="text" className="form-control" disabled={insertsavequestionmode===true} />
            </div>)}
          
                {!searchmode && (<div className="form-group">
                <label className="text-muted">Optionn 1</label>
                <input onChange={handleChange('option1')} value={option1} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}


            {!searchmode && (<div className="form-group">
                <label className="text-muted">Optionn 2</label>
                <input onChange={handleChange('option2')} value={option2} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Optionn 3</label>
                <input onChange={handleChange('option3')} value={option3} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}

            {!searchmode && (<div className="form-group">
                <label className="text-muted">Optionn 4</label>
                <input onChange={handleChange('option4')} value={option4} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}


            {!searchmode && (<div className="form-group">
                <label className="text-muted">Answer</label>
                <input onChange={handleChange('answer')} value={answer} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
            </div>)}
          
                            
        {searchmode && (<div className="form-group">
                <label className="text-muted">Search Topic ID</label>
                <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control"/>
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

            {(currentIndex === topicJason.length-1) && !searchmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="insertquestionbutton">
                Insert Question
            </button>
            </div>}

            {(savemode) && !searchmode && <div>
            <button className="btn btn-primary" onClick={clickSubmit} value ="savebutton">
                Save Changes
            </button>
            </div>}

            {(submitmode) && !searchmode && (<div>
        <button className="btn btn-primary" onClick={clickSubmit} value ="submitbutton">
            Submit
        </button>
        </div>)}

           {searchmode && <div>
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
    
export default AdminEditQuiz;
/**
const updateForm = () => (
    <form>

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
            <input onChange={handleChange('question')} value={question} type="text" className="form-control" disabled={insertsavequestionmode===true} />
        </div>)}
      
            {!searchmode && (<div className="form-group">
            <label className="text-muted">Optionn 1</label>
            <input onChange={handleChange('option1')} value={option1} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
        </div>)}


        {!searchmode && (<div className="form-group">
            <label className="text-muted">Optionn 2</label>
            <input onChange={handleChange('option2')} value={option2} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
        </div>)}

        {!searchmode && (<div className="form-group">
            <label className="text-muted">Optionn 3</label>
            <input onChange={handleChange('option3')} value={option3} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
        </div>)}

        {!searchmode && (<div className="form-group">
            <label className="text-muted">Optionn 4</label>
            <input onChange={handleChange('option4')} value={option4} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
        </div>)}


        {!searchmode && (<div className="form-group">
            <label className="text-muted">Answer</label>
            <input onChange={handleChange('answer')} value={answer} type="text" className="form-control" disabled={insertsavequestionmode===true}/>
        </div>)}
      
                        
    {searchmode && (<div className="form-group">
            <label className="text-muted">Search Topic ID</label>
            <input onChange={handleChange('topicID')} value={topicID} type="text" className="form-control"/>
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

        {(currentIndex === topicJason.length-1) && !searchmode && <div>
        <button className="btn btn-primary" onClick={clickSubmit} value ="insertquestionbutton">
            Insert Question
        </button>
        </div>}

        {(savemode) && !searchmode && <div>
        <button className="btn btn-primary" onClick={clickSubmit} value ="savebutton">
            Save
        </button>
        </div>}

        {submitmode && (<div>
        <button className="btn btn-primary" onClick={clickSubmit} value ="submitbutton">
            Submit
        </button>
        </div>)}


        { searchmode && <div>
        <button className="btn btn-primary" onClick={clickSubmit} value ="submitsearch">
            Submit Search
        </button>
    </div>}

        </form> 
    );    **/