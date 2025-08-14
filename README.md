# Meal Rate
### Description
This is a website that rates a users meal (list of food items) using a Large Language Model.

### Setup
The website has a frontend react app and a backend node/express app. Both will need to have their packages installed.

Install packages: `npm install`


A .env file will need to be created in the backend folder that contains the LLM API Key.

Example .env: `GEMINI_API_KEY="Your key here"`

I used googles Gemini API keys avaliable here (free to use, with some limits): https://ai.google.dev/aistudio

### Running
Open two command windows and run the frontend and backend in each one (Remeber to be in the corresponding folder).

Run Backend: `node server` 

Run Frontend: `npm start`