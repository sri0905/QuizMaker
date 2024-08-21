const {  body ,validationResult } = require("express-validator");
const ConnectToMongodb = require("./db");
const express = require('express');
const Question = require("./models/Question");
const app = express()
const port = 4000
const cors = require('cors');
const Results = require("./models/Result");


app.use(cors())
app.use(express.json())

//creating a question
app.post("/addAQuestion", [
    body('question').notEmpty().withMessage("Question field can't be empty"),
    body('topic').notEmpty().withMessage("Topic field can't be empty"),
    body('option1').notEmpty().withMessage("Option1 field can't be empty"),
    body('option2').notEmpty().withMessage("Option2 field can't be empty"),
    body('option3').notEmpty().withMessage("Option3 field can't be empty"),
    body('option4').notEmpty().withMessage("Option4 field can't be empty"),
    body('correctOption').notEmpty().withMessage("CorrectOption field can't be empty"),
],require('./routes/AddAQuestion'));


//api to fetch all the questions
app.post('/fetchAllQuestions', async(req, res)=>{
    try {
        const questions = await Question.find()
        if (questions.length==0){
            res.json({questions:[]})
        }
        else{
            res.status(200).json({questions})
        }
    } catch (error) {
        console.log("errort while fetching questions", error)
        res.status(500).send("Internal Server Error")
    }
})

app.post('/fetchAllTheTopics', async(req, res)=>{
    try {
       const topics  = await Question.distinct('topic')
        res.status(200).json({topics})
    } catch (error) {
        console.log("error while fecthing toics: ", error)
        res.status(500).send("Internal Server Error")
    }
})

//api to fetch all questions in certain topic
app.post('/fetchQuestionsInATopic', async(req, res)=>{
    try {
        const {selectedTopic} = req.body
        console.log(selectedTopic)
        const questions = await Question.find({topic:selectedTopic})
        console.log(questions)
        res.status(200).json({questions})
        
    } catch (error) {
        console.log("error while sending questions to the server", error)
        res.status(500).send("Internal Server Error")
    }
})
//api to submit formData
app.post('/submitQuiz', async (req, res) => {
    try {
        const { selectedOptions, topic } = req.body;
        const result = await Results.create({
            selectedOptions: selectedOptions,
            topic: topic
        });
        await result.save();
        res.status(200).json({ result });
    } catch (error) {

        console.error("Error submitting quiz:", error);
        res.status(500).json({ error: "An error occurred while submitting the quiz." });
    }
});

app.listen(port, ()=>{
    try {
        console.log(`listening on port http://localhost:${port}`)
        
    } catch (error) {
        console.log("error while listening on the port: ", error)
    }
})

ConnectToMongodb();
