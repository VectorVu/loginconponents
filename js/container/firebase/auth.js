import * as _noti from "../../common/notify.js";



const config = {
    url: "http://127.0.0.1:5500/index.html",
    handleCodeApp: true
};

const createNewAccount = (email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            let user = userCredential.user;
            return user.sendEmailVerification(config);
            // ...
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
            _noti.error(errorCode, errorMessage);
        });

}

const loginAccount = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            _noti.error(errorCode, errorMessage);
        });

}
export { createNewAccount, loginAccount };