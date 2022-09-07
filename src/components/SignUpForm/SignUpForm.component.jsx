import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../FormInput/FormInput.component";
import Button from "../Button/Button.component";

import { signUpStart } from "../../store/user/user.action";

import './SignUpForm.styles.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));

            resetFormFields();
            
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.error('Error creating user', err);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                />
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
                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;