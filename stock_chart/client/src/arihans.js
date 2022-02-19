import React from "react";
import axios from "axios"

export default class PersonList extends React.Component {
    state = {
      persons: [],
    };

    componentDidMount() {
      axios.get('/prices').then(res=>{
        console.log(res.data);
        this.setState({ persons: res.data.prices})
      });
    }

    render() {
      return (
        <ul>
          {(typeof this.state.persons === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        this.state.persons.map((person, i) => (
          <p key={i}>{person}</p>
        ))
        )}
        </ul>
      )
    }
}
