const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
module.exports = app;

app.use(morgan('dev'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', require('./apiRoutes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', '/public/index.html'))
})


app.use((err, req, res) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log('Good job Teman!');
});
