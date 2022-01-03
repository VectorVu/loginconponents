import RegisterScreen from "./container/Register/index.js";
const mySignUpForm = document.getElementById("my-SignUp-Form");
const registerScreen = new RegisterScreen();
mySignUpForm.appendChild(registerScreen.render());

