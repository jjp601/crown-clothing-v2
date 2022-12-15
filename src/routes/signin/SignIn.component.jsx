import SignInForm from "../../components/SignInForm/SignInForm.component";
import SignUpForm from "../../components/SignUpForm/SignUpForm.component";

import { AuthContainer } from "./SignIn.styles";

const SignIn = () => {

    return (
        <AuthContainer>
            <SignInForm />
            <SignUpForm />
        </AuthContainer>
        
    )
}

export default SignIn;