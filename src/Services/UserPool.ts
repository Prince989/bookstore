import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId : "us-east-1_XB3snvs0q",
    ClientId : "7iscjct7a278rtf1mij2m95j1p"
}

export default new CognitoUserPool(poolData)