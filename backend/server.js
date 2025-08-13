const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const promptCreate = require('./prompts');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.get('/', (req, res) => {
	res.send('Test');
})

app.post('/api/generate', async (req, res) => {
	try {
		const { prompt, goal } = req.body;
		if (!prompt)
			return res.status(400).send({ error: "Prompt Required" });
		const model = genAi.getGenerativeModel({ model: 'gemini-2.5-flash' });
		const fullPrompt = promptCreate(prompt, goal);
		const result = await model.generateContent(fullPrompt);
		const response = result.response;
		const text = response.text();
		console.log(text);
		let data;
		
		try {
			data = JSON.parse(text);
			// Optionally, validate required fields:
			if (data && typeof data === 'object' && data.hasOwnProperty('well') && data.hasOwnProperty('notWell') && data.hasOwnProperty('improvements') && data.hasOwnProperty('score')) {
				data.prompt = prompt;
				data.goal = goal;
				res.send(data);
			} else {
				res.status(500).send({ error: 'Failure to generate content.' });
			}
		} catch (e) {
			// Not valid JSON
			console.error('Invalid JSON:', e);
			res.status(500).send({ error: 'Failure to generate content.' });

		}

	}
	catch (error) {
		console.log('error ', error);
		res.status(500).send({ error: 'Failure to generate content.' });
	}
})

app.listen(5000, () => { console.log("Listining on Port 5000") });
