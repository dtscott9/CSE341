const express = require('express');
const app = express();
const names = require('./controllers/names');

app.get('/', names.dylanRoute);
app.use('/derek', names.derekRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Web Server is listening at port ' + port);
  });