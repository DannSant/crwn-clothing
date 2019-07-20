import React from 'react';

import SignIn from  '../../components/sign-in/sign-in.component';
import SignUp from '../../components/signup/signup.component';

import './sig-in-and-sign-out.styles.scss';

const SignInAndSignOut = () =>(
    <div className='sig-in-and-sign-out'>
        <SignIn></SignIn>
        <SignUp></SignUp>
    </div>
)

export default SignInAndSignOut;