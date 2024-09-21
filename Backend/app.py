from flask import Flask, jsonify, request
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import GetAssetsRequest
from alpaca.trading.enums import AssetClass
from alpaca.common.enums import BaseURL
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest, StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from config import api_key, api_secret
from datetime import datetime, timedelta

# Import the Hugging Face integration module
from huggingface_integration import generate_response

app = Flask(__name__)

# Initialize Alpaca API client
trading_client = TradingClient(api_key, api_secret, paper=True)

@app.route('/')
def get_account():
    account = trading_client.get_account()
    return jsonify({
        'id': account.id,
        'cash': account.cash,
        'portfolio_value': account.portfolio_value,
        'equity': account.equity,
        'last_equity': account.last_equity,
    })

@app.route('/positions')
def get_positions():
    positions = trading_client.get_all_positions()
    return jsonify([{
        'symbol': position.symbol,
        'qty': position.qty,
        'market_value': position.market_value
    } for position in positions])

@app.route('/stock/<symbol>')
def get_stock_info(symbol):
    data_client = StockHistoricalDataClient(api_key, api_secret)
    request_params = StockLatestQuoteRequest(symbol_or_symbols=symbol)
    
    try:
        quote = data_client.get_stock_latest_quote(request_params)
        return jsonify({
            'symbol': symbol,
            'ask_price': quote[symbol].ask_price,
            'bid_price': quote[symbol].bid_price,
            'last_price': quote[symbol].ask_price,  # Using ask_price as an approximation
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/stock/<symbol>/history')
def get_stock_history(symbol):
    data_client = StockHistoricalDataClient(api_key, api_secret)
    
    end = datetime.now()
    start = end - timedelta(days=7)
    
    request_params = StockBarsRequest(
        symbol_or_symbols=symbol,
        timeframe=TimeFrame.Day,
        start=start,
        end=end
    )
    
    try:
        bars = data_client.get_stock_bars(request_params)
        
        history = [{
            'date': bar.timestamp.date().isoformat(),
            'open': bar.open,
            'high': bar.high,
            'low': bar.low,
            'close': bar.close,
            'volume': bar.volume
        } for bar in bars[symbol]]
        
        return jsonify({
            'symbol': symbol,
            'history': history
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Hugging Face Route to handle chat-like responses
@app.route('/ask', methods=['POST'])
def ask_question():
    user_input = request.json.get('prompt')
    
    # Call the generate_response function from the huggingface_integration module
    response, status_code = generate_response(user_input)
    
    return jsonify(response), status_code

if __name__ == '__main__':
    app.run(debug=True)