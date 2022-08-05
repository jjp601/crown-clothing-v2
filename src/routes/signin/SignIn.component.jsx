import SignInForm from "../../components/SignInForm/SignInForm.component";
import SignUpForm from "../../components/SignUpForm/SignUpForm.component";

import './SignIn.styles.scss';

const SignIn = () => {

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
        
    )
}

export default SignIn;