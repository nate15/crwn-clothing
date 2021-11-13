import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.componet';
import CustomeButton from '../custome-button/custome-button.componet';
import {signInWithGoogle} from '../../firebase/firebase.utils';


class SignIn extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name] : value })
    }

   

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your Email and Password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="email"
                        required
                    />
                    <FormInput 
                        name="password" 
                        type="password"
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />
                    <div class="buttons">
                        <CustomeButton type="submit"> Sign In </CustomeButton>
                        <CustomeButton isGoogleSignIn onClick={signInWithGoogle}> Sign In with Google  </CustomeButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;