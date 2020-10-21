import React, { Component } from 'react';
import Contact from './Contact';

class Contacts extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Achraf1',
        email: 'test1@test.fr',
        phone: '1234'
      },
      {
        id: 2,
        name: 'Achraf2',
        email: 'test2@test.fr',
        phone: '2234'
      },
      {
        id: 3,
        name: 'Achraf3',
        email: 'test3@test.fr',
        phone: '3234'
      }
    ]
  };

  render() {
    const { contacts } = this.state;
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-success">Contacts</span> List
        </h1>
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    );
  }
}

export default Contacts;
