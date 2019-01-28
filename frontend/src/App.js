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
            ],
            name: ""
        }

        this.complete = true;
        this.updateName = this.updateName.bind(this);
        this.addShow = this.addShow.bind(this);
    }

    updateName(event) {
        this.setState({ name: event.target.value });
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
        var newItem = JSON.parse(JSON.stringify({ id: newId, name: this.state.name, episodes_seen: 0 }));
        newState['shows'].push(newItem);
        this.setState(newState);
    }

    render() {
        return (
            <div className="App">
                <Instructions complete={this.complete} />
                <form onSubmit={this.addShow}>
                    <label>Add Show Name:
                    <input type="text" onChange={this.updateName} value={this.state.name}></input>
                    </label>
                    <input type="button" value="submit" onClick={this.addShow}></input>
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