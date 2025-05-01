const express = require('express');
const mongoose = require('mongoose');
const Expense = require('./models/Expense');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/expensesDB');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index'); 
});

app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

app.put('/api/expenses/:id', async (req, res) => {
  const updated = await Expense.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/expenses/:id', async (req, res) => {
  await Expense.findOneAndDelete({ id: req.params.id });
  res.sendStatus(204);
});

app.listen(3000, () => console.log('Server started on port 3000'));
