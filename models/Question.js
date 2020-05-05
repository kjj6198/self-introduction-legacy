const mongoose = require('mongoose');
const schema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    min: [1, 'too short'],
    max: 1000,
  },
  name: {
    type: String,
    max: 100,
  },
  link: {
    type: String,
    max: 500,
  },
  createdAt: Date,
  reply: String,
});

schema.methods.getQuestion = function () {
  return {
    question: this.question,
    name: this.name,
    link: this.link,
    createdAt: this.createdAt,
    reply: this.reply,
  };
};

module.exports = mongoose.model('Quetion', schema);
