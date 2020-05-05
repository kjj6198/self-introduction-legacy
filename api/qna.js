const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('../models/Question');

const user = process.env.USER;
const password = process.env.PASSWORD;
const proto = process.env.PROTO;
const port = process.env.MY_PORT;
const host = process.env.HOST;
const db = process.env.DB;

const str = `${proto}://${user}:${password}@${host}:${port}/${db}`;

mongoose.connect(str);

module.exports = (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
  }

  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  if (req.method === 'POST') {
    const { question, name } = req.body;
    const q = new Question({
      question,
      name,
      createdAt: Date.now(),
      reply: '',
    });
    const error = q.validateSync();
    if (error) {
      res
        .status(400)
        .json(Object.keys(error.errors).map((k) => error.errors[k].message));
      return;
    }
    q.save({ validateBeforeSave: true }).then((doc) => res.json(doc));
  } else if (req.method === 'GET') {
    Question.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .exec((err, docs) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(docs);
        }
      });
  }
};
