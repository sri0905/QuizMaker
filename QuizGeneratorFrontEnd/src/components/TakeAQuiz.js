import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

export default function TakeAQuiz() {
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
    const [submission, setSubmission] = useState(false)
    const [numberOfQuestions, setNumberOfQuestions] = useState(0)
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showTopicsAndSubmit, setShowTopicsAndSubmit] = useState(true);
    const [showTest, setShowTest] = useState(false);
    const [savedOptions, setSavedOptions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({})
    const selectOption = (questionIndex, option) => {
        console.log("the saved options are: ", savedOptions)
        const updatedOptions = { ...savedOptions };
        console.log(updatedOptions)
        updatedOptions[questionIndex + 1] = option;
        console.log("the updated options are", updatedOptions);
        setSavedOptions(updatedOptions);

    };

    const handleTopicSubmit = async (event) => {
        event.preventDefault();
        if (selectedTopic === "") {
            setShowAlert(true);
        } else {
            try {
                const formData = { selectedTopic };
                setShowTopicsAndSubmit(false);
                setShowTest(true);
                const response = await axios.post('http://localhost:4000/fetchQuestionsInATopic', formData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setQuestions(response.data.questions);
                const responseData = response.data.questions
                console.log("The number of questions",responseData.length)
                setNumberOfQuestions(responseData.length)
                console.log("the response data is :", responseData)
                const correctOptions = { ...correctAnswers }
                responseData.map((question, index) => {
                    correctOptions[index + 1] = question.correctOption
                })
                console.log("The correct options are: ", correctOptions)
                setCorrectAnswers(correctOptions)
            } catch (error) {
                console.log("Error while fetching questions for the quiz: ", error);
            }
        }

    };

    const fetchTopics = async () => {
        try {
            const response = await axios.post('http://localhost:4000/fetchAllTheTopics', {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            setTopics(response.data.topics);
        } catch (error) {
            console.error('Error fetching all topics:', error);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

   
// handling show score button 
const showScore=()=>{
    setShowResults(true)
    setSubmission(false)
}
// handling test submission
    const handleTestSubmit = async (event) => {
        event.preventDefault();
        setShowTest(false)
        setSubmission(true)
        console.log("the selectedOptions are: ",savedOptions);
        console.log("the correct answers are: ",correctAnswers)
        console.log(selectedTopic)
        const Data = { topic: selectedTopic, selectedOptions: savedOptions }
        console.log(Data)
        let localScore = 0;
        for(let i = 1; i<=numberOfQuestions; i++ ){
            if (savedOptions[i]=== correctAnswers[i]){
                localScore++;
            }
        }
        setScore(localScore)
        console.log("Your quiz score",localScore)
        try {
            const response = await axios.post('http://localhost:4000/submitQuiz', Data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data)
        } catch (error) {
            console.log("Error while submitting the quiz: ", error);
        }

    };

    return (
        <>
            <div className="container">
                {showTopicsAndSubmit && (
                    <>
                        <h5>Choose the topic you want to take the quiz on:</h5>
                        <form onSubmit={handleTopicSubmit}>
                            <select className="form-select" aria-label="Default select example" value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)}>
                                <option value="">Choose a topic</option>
                                {topics.map((topic, index) => <option key={index} value={topic}>{topic}</option>)}
                            </select>
                            {showAlert && <Alert type="info" message="Please select a topic" />}
                            <button type='submit' className='btn btn-primary mt-3'>Take a quiz</button>
                        </form>
                    </>
                )
                }
            </div>
            <form onSubmit={handleTestSubmit}>
               
                {showTest && questions.map((question, index) => (

                    <div className='m-2' key={index}>
                        <div style={{ display: "flex" }}>
                            <h4>{index + 1})</h4>
                            <label htmlFor={`${question.question}`}><h4>{question.question}</h4></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} id="option1" onClick={() => { selectOption(index, "option1") }} />
                            <label className="form-check-label" htmlFor="option1">{question.option1}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} id="option2" onClick={() => { selectOption(index, "option2") }} />
                            <label className="form-check-label" htmlFor="option2">{question.option2}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} id="option3" onClick={() => { selectOption(index, "option3") }} />
                            <label className="form-check-label" htmlFor="option3">{question.option3}</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={index} id="option4" onClick={() => { selectOption(index, "option4") }} />
                            <label className="form-check-label" htmlFor="option4">{question.option4}</label>
                        </div>
                    </div>
                ))}
                {showTest &&
                    <button type='submit' className='btn btn-primary'>Submit</button>
                }
            </form>
            {submission && (<>
                <h2>Your test has been submitted.</h2>
                <button className='btn btn-primary' type='button' onClick={showScore}>Show Results</button>
            </>)}
            {showResults && (<>
            <h1>You Scored {score} out of {numberOfQuestions}</h1>
            </>)}
        </>
    );
}
