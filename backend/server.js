const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai'); 
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.get('/', (req,res) => {
	res.send('Test');
})

app.post('/api/generate', async (req,res) =>{
	try{
		const { prompt } = req.body;
		if(!prompt)
			return res.status(400).send({error:"Prompt Required"});
		const model = genAi.getGenerativeModel({model:'gemini-2.5-flash'});
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();
		res.send({generated_text:text});
	}
	catch (error){
		console.log('error ', error);
		res.status(500).send({error:'Failure to generate content.'});
	}
})

app.listen(5000, () => {console.log("Listining on Port 5000")});
