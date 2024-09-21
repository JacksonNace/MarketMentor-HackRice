from flask import Flask, jsonify, request
import os
import google.generativeai as genai
from config import GOOGLE_API_KEY
from flask_cors import CORS

genai.configure(api_key=GOOGLE_API_KEY)


# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
  ]
)

response = chat_session.send_message("I am a high schooler what finance tips do you reccomend.")
# @app.route('')
# def returnmessage(response):
#     return jsonify({
#         'response': response,
#     })

