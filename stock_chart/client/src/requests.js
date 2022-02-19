// import React from "react";
// import axios from "axios";
// import Charting from "./charting";
// // import { priceData } from "./priceData";



// export default class PersonInput extends React.Component {
//     state = {
//       name: [],
//     };


//     handleChange = event => {
//       this.setState({name: event.target.value});
//     }

//     handleSubmit = event => {
//       event.preventDefault();

//       const user = {
//         name: this.state.name
//       }

//       axios.post("/arihan", {user}).then(res=> {
//         // console.log(res.data);
//         priceData = res.data
//         // var priceData = res;
        
//       })

//       // axios.post("/stock_info", {user}).then(res=> {
//       //   console.log(res);
        
//       // })
//     }



//     render() {
//       return (
//         <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Person Name:
//             <input type="text" name="name" onChange={this.handleChange} />
//           </label>
//           <button type="submit">Add</button>
//         </form>
//         </div>
//       )
//     }


// }



