const express = require('express');
//const { GoogleGenerativeAI } = require('@google-generative-ai'); 
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
	res.send('Test');
})

app.listen(5000, () => {console.log("Listining on Port 5000")});
