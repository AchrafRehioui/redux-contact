import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SUPPRESSION_CONTACT':
            return {
                contacts: state.contacts.filter((contact) => contact.id !== action.payload)
            };
        case 'AJOUT_CONTACT':
            return {
                contacts: [action.payload, ...state.contacts]
            };
        case 'MODIFICATION_CONTACT':
            return {
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? contact = action.payload : contact)
            };
        default:
            return state;
    }
}

export class Provider extends Component {

    state = {
        contacts: [
            { id: 1, name: "Achraf1", phone: "1234", email: "test1@test.fr" },
            { id: 2, name: "Achraf2", phone: "2234", email: "test2@test.fr" },
            { id: 3, name: "Achraf3", phone: "3234", email: "test3@test.fr" },

        ],
        dispatch: action => this.setState(state => reducer(state, action))
    }

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            
        this.setState({
                contacts: res.data
        })

    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;