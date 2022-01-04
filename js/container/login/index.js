import ButtonComponent from "../../conponent/button.js";
import InputConponent from "../../conponent/input.js"
import { checkMail, checkPassword } from "../../common/validdate.js"

class LoginScreen {
    $email;
    $password;
    $container;

    $formLogin;
    $btnSubmit;
    $titleScreen;
    $linkContian;
    $link;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("login-form", "d-flex");

        this.$formLogin = document.createElement("form");
        this.$formLogin.classList.add("login-container");
        this.$formLogin.addEventListener("submit", this.handleSubmit);


        this.$titleScreen = document.createElement("div");
        this.$titleScreen.classList.add("big-title");
        this.$titleScreen.innerText = "Welcome back!";


        this.$linkContian = document.createElement("div");
        this.$linkContian.innerText = "Not a member? ";
        this.$linkContian.classList.add("mt-4", "text-white");

        this.$link = document.createElement("a");
        this.$link.innerText = "Register";
        this.$link.setAttribute("href", "singup.html");
        this.$linkContian.appendChild(this.$link);

        this.$email = new InputConponent(
            "Email address",
            "email",
            "login-email",
            "email"
        );
        this.$password = new InputConponent(
            "Password",
            "password",
            "login-password",
            "password"
        );
        this.$btnSubmit = new ButtonComponent(
            "Sign In",
            ["btn", "btn-primary"],
            "submit"
        );


    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        let isError = false;
        let errorFlag = [0, 0];
        if (checkMail(email.value) !== null) {
            isError = true;
            errorFlag[0] = 1;
            this.$email.setError(checkMail(email.value));
        }
        if (checkPassword(password.value) !== null) {
            isError = true;
            errorFlag[1] = 1;
            this.$password.setError(checkPassword(password.value));
        }
        if (errorFlag[0] === 0) {
            this.$email.$error.classList.remove("d-block");
            this.$email.$error.classList.add("d-none");
        }
        if (errorFlag[1] === 0) {
            this.$password.$error.classList.remove("d-block");
            this.$password.$error.classList.add("d-none");
        }
        if (!isError) {
            console.log("Dang nhap thanh cong");
        }
    }
    render() {
        this.$formLogin.append(
            this.$titleScreen,
            this.$email.render(),
            this.$password.render(),
            this.$btnSubmit.render(),
            this.$linkContian
        );
        this.$container.append(this.$formLogin);
        return this.$container;

    }

}
export default LoginScreen