import React from 'react';

import SignIn from  '../../components/sign-in/sign-in.component';
import SignUp from '../../components/signup/signup.component';

import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignOut = () =>(
    <SignInAndSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpContainer>
)

export default SignInAndSignOut;