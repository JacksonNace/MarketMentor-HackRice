import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Hugging Face API key from .env file
HUGGINGFACE_API_KEY = '_fkfgHEundtSUxkbouaDqaDTkRCabsBajCF'

# Hugging Face API URL (ChatGPT-like model like GPT-2)
HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2"

# Headers for API request
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}

def generate_response(user_input):
    """
    Sends user input to Hugging Face API and returns the generated response.
    """
    if not user_input:
        return {'error': 'No input provided'}, 400

    # Payload for the API
    payload = {"inputs": user_input}

    # Send request to Hugging Face Inference API
    response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        generated_text = response.json()[0]['generated_text']
        return {'response': generated_text}, 200
    else:
        return {'error': 'Failed to generate response'}, response.status_code