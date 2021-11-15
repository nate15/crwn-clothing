import React from 'react';

import './sign-in-and-sign-up.styles.scss';

import SignIn from '../../componets/sign-in/sign-in.component';
import SignUp from '../../componets/sign-up/sign-up.componet'

const SignInAndSignUp = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>
);

export default SignInAndSignUp;
