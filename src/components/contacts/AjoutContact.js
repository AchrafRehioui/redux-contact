import React, { Component } from 'react'
import { Consumer } from '../context';
import GroupeTextesInput from '../assistants/GroupeTextesInput';
import axios from 'axios';


class AjoutContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChangeInput = (e) => this.setState({ [e.target.name]: e.target.value })

    submit = async (dispatch, size, e) => {
        e.preventDefault();

        const {name, email, phone} = this.state;

        if(name == ""){
            this.setState({errors: {name: "Le nom est obligatoire!"}})
            return;
        }

        if(email == ""){
            this.setState({errors: {email: "L'email est obligatoire!"}})
            return;
        }

        if(phone == ""){
            this.setState({errors: {phone: "Le telephone est obligatoire!"}})
            return;
        }

        const nouveauContact = {
            name,
            email,
            phone
        }

        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', nouveauContact);

            dispatch({
                type: "AJOUT_CONTACT",
                payload: res.data
            })
        }
        catch(e){
            console.log(e);
        }

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}

        })
        /* Pour la redirection à la page liste des contacts */
        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;
        return (
            <Consumer>
                { value => {
                    const { dispatch } = value;
                    return (
                        <div>
                            <form onSubmit={this.submit.bind(this, dispatch, value.contacts.length)}>
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Ajout Contact</h4>
                                        <div className="card-text">
                                            <GroupeTextesInput 
                                                    label="Name" 
                                                    type="text"
                                                    name="name" 
                                                    value={name}
                                                    onChange={this.onChangeInput}
                                                    error={errors.name}
                                            />
                                             <GroupeTextesInput 
                                                    label="Email" 
                                                    type="email"
                                                    name="email" 
                                                    value={email}
                                                    onChange={this.onChangeInput}
                                                    error={errors.email}
                                            />
                                             <GroupeTextesInput 
                                                    label="Telephone"
                                                    type="text" 
                                                    name="phone" 
                                                    value={phone}
                                                    onChange={this.onChangeInput}
                                                    error={errors.phone}
                                            />
                                            <button className="btn btn-success btn-block">Ajout un nouveau Contact</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AjoutContact;