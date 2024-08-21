import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function AddAQuestion() {
   
    const [topic, setTopic] = useState("")
    const [question, setQuestion] = useState("")
    const [option1, setOption1] = useState("")
    const [option2, setOption2] = useState("")
    const [option3, setOption3] = useState("")
    const [option4, setOption4] = useState("")
    const [correctOption, setCorrectOption] = useState("")
    const [buttonName, setButtonName] = useState("New Topic?")
    const [showTopics, setShowTopics] = useState(true)
    const [newTopic, setNewTopic] = useState(false)
    const [topics, setTopics] = useState([])
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const requestData = {
            topic,
            question,
            option1,
            option2,
            option3,
            option4,
            correctOption
        };

        try {
            const response = await axios.post('http://localhost:4000/addAQuestion', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("The response was", response.data);
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };
    const handleToggleAndTopicSelection = (event) => {
        event.preventDefault();
        if (buttonName == "New Topic?") {
            setButtonName("Select an existing Topic")
            setShowTopics(false)
            setNewTopic(true)
        } else {
            setButtonName("New Topic?")
            setShowTopics(true)
            setNewTopic(false)
        }
    }
    const fetchTopics = async () => {
        try {
            const response = await axios.post('http://localhost:4000/fetchAllTheTopics', {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data
            setTopics(data.topics)

        } catch (error) {
            console.error('Error fetching all dresses:', error);
        }
    };
    useEffect(() => {
        fetchTopics()
    }, [])
    return (
        <>
            <div className="container-fluid m-3">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">

                        {showTopics && (<select className="form-select" aria-label="Default select example" value={topic} onChange={(event) => { setTopic(event.target.value) }}>
                            <option defaultValue="none">Select a Topic</option>
                            {topics.map((topic, index) => {
                                return <option value={topic} key={index} >{topic}</option>

                            })}
                        </select>)
                        }
                        {
                            newTopic && (
                                <div className="mb-3">
                                    <label htmlFor="newTopic" className="form-label">Add the New Topic Name:</label>
                                    <input type="text" className="form-control" id="newTopic" value={topic} onChange={(event) => { setTopic(event.target.value) }} />
                                </div>
                            )
                        }
                        <button className='btn btn-primary mt-3' onClick={handleToggleAndTopicSelection} >{buttonName}</button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="question" className="form-label">Question</label>
                        <input type="text" value={question} className="form-control" id="question" onChange={(event) => { setQuestion(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="option1" className="form-label">Option1:</label>
                        <input type="text" value={option1} className="form-control" id="option1" onChange={(event) => { setOption1(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="option2" className="form-label">Option2:</label>
                        <input type="text" value={option2} className="form-control" id="option2" onChange={(event) => { setOption2(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="option3" className="form-label">Option3:</label>
                        <input type="text" value={option3} className="form-control" id="option3" onChange={(event) => { setOption3(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="option4" className="form-label">Option4:</label>
                        <input type="text" value={option4} className="form-control" id="option4" onChange={(event) => { setOption4(event.target.value) }} />
                    </div>
                    <select className="form-select mb-3" id='correctOption' value={correctOption} onChange={(event) => { setCorrectOption(event.target.value) }}>
                        <option defaultValue="">Open this select menu</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option3">Option 4</option>
                    </select>
                  
                    <button type="submit" className="btn btn-primary">Add Question</button>
                </form>
            </div>
        </>
    )
}
