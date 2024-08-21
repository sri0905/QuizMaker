const {  body ,validationResult } = require("express-validator");
const Question = require("../models/Question");


const addAQuestion = async (req, res) => {
    try {
            const { topic, question, option1, option2, option3, option4, correctOption } = req.body;
        const ques = await Question.findOne({$and:[{topic:topic}, {question:question}]})
        if (ques){
            res.status(400).send("one topic cannot have duplicate questions")
        }
        else{
            await Question.create({
                topic: topic,
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correctOption: correctOption
            });
            res.status(200).json({ message: "Question added successfully" });
        }
    } catch (error) {
        console.error("Error while adding question to database", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = addAQuestion