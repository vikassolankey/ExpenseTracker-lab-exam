const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const expenseSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  title: String,
  amount: Number,
  category: String,
  date: Date,
  paymentMethod: String
});

module.exports = mongoose.model('Expense', expenseSchema);
