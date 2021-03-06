import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import { connect } from 'react-redux';
import { addContact } from '../../actions/contactActions';


class AddContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Vérifier pour les erreurs
    if (name === '') {
      this.setState({ errors: { name: 'Nom est obligatoire !' } });
      return;
    }

    if (email === ''){
      this.setState({ errors: { email: 'Email est obligatoire !' } });
      return;
    }

    if (phone === ''){
      this.setState({ errors: { phone: 'Phone est obligatoire !' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    //// Validation ////
    this.props.addContact(newContact)

    // vider le state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Ajout Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Entrer Nom"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Entrer Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Entrer Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addContact } )(AddContact);
