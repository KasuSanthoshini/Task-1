const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project1'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});


app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, description });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Task updated' });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Task deleted' });
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
