const mongoose = require('mongoose')
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctOption: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now  // Default value is set to the current date and time
    }
});

// Create a compound unique index on topic and question fields
QuestionSchema.index({ topic: 1, question: 1 }, { unique: true });

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
