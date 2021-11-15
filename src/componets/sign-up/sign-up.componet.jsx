import React from 'react';

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.componet';
import CustomeButton from '../custome-button/custome-button.componet';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        if(password != confirmPassword){
            alert('password does not match');
            return;
        }

        try{
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );

        await createUserProfileDocument(user, {displayName} );

        this.setState(
            {
                displayName: '',
                email: '',
                password: '',
                conformPassword: ''
            }
        );

        }catch(error){
            console.log("Error has occured: ", error)
        }
    }

    handleChange = (event) =>{
        const {name, value} = event.target;

        this.setState({[name] : value });
    }

    render(){
        return (
            <div className="sign-up">
                <h2>I don't have an account</h2>
                <span>Sign up with your Email and Password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        onChange={this.handleChange}
                        value={this.state.displayName}
                        label="Name"
                        required
                    />
                    <FormInput
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                        label="Confirm Password"
                        required
                    />
                    <CustomeButton type="submit">Sign Up</CustomeButton>
                </form>
            </div>
        );
    }
}

export default SignUp;