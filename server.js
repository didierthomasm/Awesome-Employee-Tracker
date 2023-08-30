'use strict'
const express = require('express');
const routes = require('./routes/index');
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(clog);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
