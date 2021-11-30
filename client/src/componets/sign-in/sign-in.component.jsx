import React, { useState } from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.componet';
import CustomeButton from '../custome-button/custome-button.componet';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';


const SignIn = () => {
   
    const [userCredentials, setCredentials] = useState({email: '', password:''});

    const {email, password} = userCredentials;

    const handleSubmit = async event => {;
        event.preventDefault();

        try{
            await auth.signInWithEmailAndPassword(email, password)
            setCredentials({email: '', password: ''});
        }catch(error){
            console.log("Error: ",error);
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;

        setCredentials({ ...userCredentials,[name] : value })
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required
                />
                <FormInput 
                    name="password" 
                    type="password"
                    value={password} 
                    handleChange={handleChange}
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

export default SignIn;