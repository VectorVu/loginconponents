import LoginScreen from "./container/login/index.js";

const mySignInForm = document.getElementById("my-SignIn-Form");
const loginScreen = new LoginScreen();
mySignInForm.appendChild(loginScreen.render());

