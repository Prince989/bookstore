import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import { signIn, signOut } from 'aws-amplify/auth';
import UserPool from "./UserPool";

export const authenticate = async (email: string, password: string) => {
    return new Promise(async (res, rej) => {
        try {
            const { isSignedIn, nextStep } = await signIn({ username : email, password });
            res(isSignedIn);
        } catch (error) {
            rej(error);
        }
    })
/* 
    return new Promise((res, rej) => {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                res(result);
            },
            onFailure: (err) => {
                console.log(err);
                rej(err);
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                const user = UserPool.getCurrentUser()
                console.log(userAttributes, user);
                res(userAttributes);
                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                // sessionUserAttributes = userAttributes;
            }
        })
    }) */
}

export const logout = async () => {
    try {
        await signOut({ global: true });
        window.location.href = "/login";
    } catch (error) {
        console.log('error signing out: ', error);
    }
}