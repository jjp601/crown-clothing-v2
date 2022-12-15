import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';

import FormInput from "../FormInput/FormInput.component";
import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import { SignInContainer, ButtonsContainer } from "./SignInForm.styles";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));

            resetFormFields();
            
        } catch (error) {
            console.log('User sign in failed', error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(e) => handleSubmit}>
                <FormInput 
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                <FormInput 
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    );
};

export default SignInForm;