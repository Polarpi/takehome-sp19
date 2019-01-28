import React, { Component } from 'react'
import Instructions from './Instructions'
import Counter from './Counter'
import Show from './Show'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shows: [
                { id: 1, name: "Game of Thrones", episodes_seen: 0 },
                { id: 2, name: "Naruto", episodes_seen: 220 },
                { id: 3, name: "Black Mirror", episodes_seen: 3 },
            ]
        }

        this.complete = true;
        this.name = "";
    }

    updateName(event) {
        this.name = event.target.value;
    }

    addShow(event) {
        event.preventDefault();
        var newState = Object.assign({}, this.state);
        var newId = 1;
        Object.keys(this.state.shows).map(i => {
            if (this.state.shows[i].id > newId) {
                newId = this.state.shows[i].id;
            }
        });
        newId++;
        var newItem = JSON.parse(JSON.stringify({ id: newId, name: this.name, episodes_seen: 0 }));
        newState['shows'].push(newItem);
        this.setState(newState);
    }

    render() {
        return (
            <div className="App">
                <Instructions complete={this.complete} />
                <form onSubmit={this.addShow}>
                    <input type="text" name="name" onChange="this.updateName" value={this.name}></input>
                    <input type="button" value="submit"></input>
                </form>
                {
                    this.state.shows.map(x => (
                        <Show id={x.id} name={x.name} episodes_seen={x.episodes_seen} />
                    ))
                }
            </div >
        )
    }
}

export default App