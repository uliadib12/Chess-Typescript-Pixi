const express = require('express')
const app = express()
const port = 3000
var path = require('path');
var public = path.join(__dirname + "/../", 'dist');

app.get('/', (req, res) => {
  res.sendFile(path.join(public, 'index.html'));
})

app.use('/', express.static(public));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})