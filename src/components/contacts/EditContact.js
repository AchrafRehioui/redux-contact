import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import { connect } from 'react-redux';
import { getContact, updateContact } from '../../actions/contactActions';

class EditContact extends Component {

componentDidMount() {
  const { id } = this.props.match.params;
  this.props.getContact(id);
}

componentWillReceiveProps(nextProps, nextState) {

  const { name, email, phone } = nextProps.contact;

  this.setState({
    name,
    email, 
    phone

  })
}

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Vérification errors
    if (name === '') {
      this.setState({ errors: { name: 'Nom est obligatoire !' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email est obligatoire !' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone est obligatoire !' } });
      return;
    }

    


    //// Mise à jour CONTACT ////
    const { id } = this.props.match.params;

    const updContact = {
      id,
      name,
      email,
      phone
    };

    this.props.updateContact(updContact);

    //// Initier state ////
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
        <div className="card-header">Modification Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Entrer Name"
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
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.myContact.contact
  }
}

export default connect(mapStateToProps, { getContact, updateContact })(EditContact);
