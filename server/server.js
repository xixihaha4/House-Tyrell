const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log("Connected to port:", port));
