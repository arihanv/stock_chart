from flask import Flask, jsonify
from flask import request
import json
import yahoo_fin.stock_info as si
from yahoo_fin.stock_info import get_data
import pandas as pd
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import yfinance as yf


app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


#If you wanted to get stock info of a ticker
# @app.route('/stock_info', methods=['POST'])
# def stock_info():
#     quote = request.json
#     quote = quote.get("user")
#     quote = quote.get("name")
#     return  si.get_quote_table(quote)


#Getting data from yahoo_fin python package
@app.route("/prices", methods=['POST'])
def prices():

    #Get ticker from front-end a.k.a React
    stock = request.json.get("stock").get("ticker")

    #function to get data
    def get_price_hist(ticker, start_date, end_date):
    # stock_weekly= get_data(ticker, start_date, end_date, index_as_date = True, interval="1m")
        data = yf.download(ticker, start_date, end_date, interval="1m")
        return data

    #Get data from today's data/time to a specified date (ex: 1 year ago, 2 years ago) using datetime and the function above
    today = datetime.today().strftime("%d/%m/%Y")
    today = datetime.strptime(today + " +0000", "%d/%m/%Y %z") 
    time_ago = today-relativedelta(days=1) 

    #Store price data in a pandas dataframe
    stock_df = get_price_hist(stock, time_ago, today )
    stock_df.columns= stock_df.columns.str.lower()

    #Set time index to column and make a new dataframe with time and volume called volume_df while removing volume from the stock_df
    stock_df.reset_index(inplace=True)
    stock_df = stock_df.rename(columns={"Datetime": "time"})


    stock_df["time"] = pd.to_datetime(stock_df['time'])


    # stock_df['time'] = stock_df['time'].astype(str)
    selected_columns = stock_df[["time","volume"]]
    volume_df = selected_columns.copy()
    stock_df.drop('volume', inplace=True, axis=1)

    #Added for minute timeframe but minute interval is currently *not working*
    if 'adj close' in stock_df.columns:
        stock_df.drop('adj close', inplace=True, axis=1)

    #Convert stock_df to json and format it so that lightweight_charts can understand
    stock_df.reset_index(drop=True)
    json_df = stock_df.to_json(orient='index' ,double_precision=2)
    aDict = json.loads(json_df)
    price_dict = []
    for i in aDict:
        price_dict.append((aDict[i]))

    for i in price_dict:
        i["time"] = i["time"]/1000

    #Doing the same for volume_df
    volume_df.reset_index(drop=True)
    json_df = volume_df.to_json(orient='index' ,double_precision=2)
    aDict = json.loads(json_df)
    volume_dict = []
    for i in aDict:
        volume_dict.append((aDict[i]))

    for i in volume_dict:
        i["time"] = i["time"]/1000


    #Adding both dataframes to a json string to return to front-end
    stock_data = {
    'prices' : price_dict,
    'volume' : volume_dict
    }
    
    return stock_data
    

if __name__ == "__main__":
    app.run(debug=True)
