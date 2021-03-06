import React, { Component } from 'react';
import axios from "axios";
import Charting from './chart';

class PersonInput extends Component {

    //Defines all the functions and variables at the class scope
    constructor(props) {
      super(props);
      this.state = {
        ticker: [],
        prices: [],
        volume: [],
        showComponent: false
      };
      // this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    //Gets data from the text-box and intializes it to this.ticker
    handleChange = event => {
      this.setState({ticker: event.target.value});
    }

    //Gets data and displays chart when ticker in textbox is submitted
    handleSubmit = event => {
      event.preventDefault();

      //Does not render chart and sets prices and volumes to null to clear them out every time ticker is submitted
      this.setState({
        showComponent: false,
        prices: null,
        volume: null
       });

      //Intializes a variable called ticker and sets it equal to the ticker that was entered
      const stock = {
        ticker: this.state.ticker
      }

      //Getting stock prices and volume from flask backend by passing ticker variable through axios
      axios.post("/prices", {stock}).then(res=> {

        //Logs response from backend and sets prices and volume to the appropriate data from the backend
        console.log("Backend Response", res)
        this.setState({prices: res.data.prices, volume: res.data.volume, showComponent: true })
        console.log("class level prices", this.state.prices)
      })

      //Getting stock_info data from flask backend
      // axios.post("/stock_info", {user}).then(res=> {
      //   console.log(res);
        
      // })
     
    }

    //Resets everything on the page and unrenders chart
    handleRemove = event => {
      event.preventDefault();
      this.setState({
        showComponent: false,
        ticker: "",
        prices: null,
        volume: null,
       });
      document.getElementById('ticker_form').reset()
    }



    render() {
      return (
        <div>
        <form id="ticker_form">
          <label>
            Symbol :
            <input id = "ticker" type="text" ticker="ticker"  onChange={this.handleChange}/>
          </label>
          <button type="submit" onClick={this.handleSubmit}>Add</button>
          <button type="submit" onClick={this.handleRemove}>Reset</button>
        </form>
        {this.state.showComponent ?
           <Charting prices={this.state.prices} volume={this.state.volume} ticker={this.state.ticker}></Charting>
           :
           null
        }
        

        </div>
      )
    }


}
export default PersonInput;