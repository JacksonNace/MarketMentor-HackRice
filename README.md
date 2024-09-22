# RiceHackathon
Hey! This is MarketMentor. I am writing these docs for fun so if you'd like to check it out you can either set it up locally or through this youtube link.
https://www.youtube.com/watch?v=yuofK7RWgjU&t=1s&ab_channel=ByteBreakdown

If you want to install it on your local device:
Clone the repository
cd RiceHackathon 
cd frontend
npm i

Create a config.py file in your directory under the Backend folder, next to app.py
You will need three API keys.
api_key
api_secret - these should both be from Alpaca API
Google Gemini 1.5: GOOGLE_API_KEY

Under the frontend folder create a .env file containing 
REACT_APP_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID

In your backend, create a python virtual environment (venv)
If you are on windows, activate this virtual environment with .\venv\Scripts\Activate
Pip packages:
pip install alpaca-py Flask Flask-Cors 
pip install -U google-generativeai
We 100% have other libraries/packages you will need to install, but this should get you pretty far. 

after all this is done, open two terminals side by side and you will need to
cd backend 
python app.py (our main python file, ai.py's code was moved to here so we didn't have two separate Flask applications to run.
This runs the backend (hopefully)

on your other terminal,
cd frontend
npm start
