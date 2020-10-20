import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../context';

class Contacts extends Component {

    supprimerContact(id) {
        const { contacts } = this.state;
        const nouvelleListeContacts = contacts.filter((contact) => contact.id !== id)
        this.setState({
            contacts: nouvelleListeContacts
        })
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <div>
                        {value.contacts.map((contact) => (
                            <Contact key={contact.id}
                                data={contact}
                                supprimerContactdeChild=
                                {this.supprimerContact.bind(this, 
                                    contact.id)} />
                        )
                        )}
                    </div>

                )}
            </Consumer>
        )
    }
}

export default Contacts