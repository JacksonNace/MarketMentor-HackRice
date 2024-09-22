from flask import Flask, jsonify, request
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import GetAssetsRequest, MarketOrderRequest
from alpaca.trading.enums import AssetClass, OrderSide, TimeInForce
from alpaca.common.enums import BaseURL
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest, StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from config import api_key, api_secret
from datetime import datetime, timedelta, date
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Initialize Alpaca API client
trading_client = TradingClient(api_key, api_secret, paper=True)

@app.route('/')
def get_account():
    account = trading_client.get_account()
    current_date = date.today().isoformat()
    return jsonify({
        'id': account.id,
        'cash': account.cash,
        'portfolio_value': account.portfolio_value,
        'equity': account.equity,
        'last_equity': account.last_equity,
        'date': current_date
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
    start = end - timedelta(days=365)
    
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
    
@app.route('/buy/<symbol>/<float:amount>', methods=['GET', 'POST'])
def buy_stock(symbol, amount):
    try:
        data_client = StockHistoricalDataClient(api_key, api_secret)
        # Get the latest quote
        request_params = StockLatestQuoteRequest(symbol_or_symbols=symbol)
        latest_quote = data_client.get_stock_latest_quote(request_params)
        
        # Use the ask price as the latest price
        latest_price = latest_quote[symbol].ask_price
        
        # Calculate quantity based on USD amount
        quantity = amount / latest_price
        
        # Prepare the market order
        market_order_data = MarketOrderRequest(
            symbol=symbol,
            qty=quantity,
            side=OrderSide.BUY,
            time_in_force=TimeInForce.DAY
        )
        
        # Submit the order
        order = trading_client.submit_order(market_order_data)
        
        return jsonify({
            'message': f'Buy order placed for {quantity} shares of {symbol}',
            'order_id': order.id
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/sell/<symbol>/<float:amount>', methods=['GET', 'POST'])
def sell_stock(symbol, amount):
    try:
        data_client = StockHistoricalDataClient(api_key, api_secret)
        # Get the latest quote
        request_params = StockLatestQuoteRequest(symbol_or_symbols=symbol)
        latest_quote = data_client.get_stock_latest_quote(request_params)
        
        # Use the bid price as the latest price
        latest_price = latest_quote[symbol].bid_price
        
        # Calculate quantity based on USD amount
        quantity = amount / latest_price
        
        # Prepare the market order
        market_order_data = MarketOrderRequest(
            symbol=symbol,
            qty=quantity,
            side=OrderSide.SELL,
            time_in_force=TimeInForce.DAY
        )
        
        # Submit the order
        order = trading_client.submit_order(market_order_data)
        
        return jsonify({
            'message': f'Sell order placed for {quantity} shares of {symbol}',
            'order_id': order.id
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
    app.run(port=5000)