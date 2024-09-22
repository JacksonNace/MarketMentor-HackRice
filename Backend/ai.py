from flask import Flask, jsonify, request
import google.generativeai as genai
from flask_cors import CORS
from config import GOOGLE_API_KEY

app = Flask(__name__)
CORS(app)

genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

chat_session = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
).start_chat(history=[])

@app.route('/response', methods=['POST'])
def generate_response():
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    chat_session = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config
    ).start_chat(history=[])

    try:
        response = chat_session.send_message(user_message)
        return jsonify({'response': response.text})  # Change this line
    except Exception as e:
        print(f"Error in chat session: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
