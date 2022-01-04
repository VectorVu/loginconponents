import ButtonComponent from "../../conponent/button.js";
import InputConponent from "../../conponent/input.js"
import { checkComFirm, checkMail, checkName, checkPassword } from "../../common/validdate.js"

class RegisterScreen {
    $email;
    $password;
    $confirmPwd;
    $uname;
    $container;

    $formRegister;
    $btnSubmit;
    $titleScreen;
    $linkContian;
    $link;
    $successFlag;
    constructor() {

        this.$container = document.createElement("div");
        this.$container.classList.add("login-form", "d-flex");

        this.$formRegister = document.createElement("form");
        this.$formRegister.classList.add("register-container");
        this.$formRegister.addEventListener("submit", this.handleSubmit);


        this.$titleScreen = document.createElement("div");
        this.$titleScreen.classList.add("big-title");
        this.$titleScreen.innerText = "Welcome!";

        this.$linkContian = document.createElement("div");
        this.$linkContian.innerText = "I am already a member ";
        this.$linkContian.classList.add("mt-4", "text-white");

        this.$link = document.createElement("a");
        this.$link.innerText = "Login";
        this.$link.setAttribute("href", "index.html");

        this.$linkContian.appendChild(this.$link);

        this.$email = new InputConponent(
            "Email address",
            "email",
            "register-email",
            "email"
        );
        this.$uname = new InputConponent(
            "User name",
            "uname",
            "register-name",
            "text"
        );

        this.$password = new InputConponent(
            "Password",
            "password",
            "register-password",
            "password"
        );
        this.$confirmPwd = new InputConponent(
            "Confirm password",
            "confirm",
            "confirm-password",
            "password"
        );

        this.$btnSubmit = new ButtonComponent(
            "Sign Up",
            ["btn", "btn-primary"],
            "submit"
        );


    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, uname, password, confirm } = e.target;
        let isError = false;
        let errorFlag = [0, 0, 0, 0];
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
        if (checkName(uname.value) !== null) {
            isError = true;
            errorFlag[2] = 1;
            this.$uname.setError(checkName(uname.value));
        }
        if (checkComFirm(password.value, confirm.value) !== null) {
            isError = true;
            errorFlag[3] = 1;
            this.$confirmPwd.setError(checkComFirm(password.value, confirm.value));
        }
        if (errorFlag[0] === 0) {
            this.$email.$error.classList.remove("d-block");
            this.$email.$error.classList.add("d-none");
        }
        if (errorFlag[1] === 0) {
            this.$password.$error.classList.remove("d-block");
            this.$password.$error.classList.add("d-none");
        }

        if (errorFlag[2] === 0) {

            this.$uname.$error.classList.remove("d-block");
            this.$uname.$error.classList.add("d-none");
        }
        if (errorFlag[3] === 0) {

            this.$confirmPwd.$error.classList.remove("d-block");
            this.$confirmPwd.$error.classList.add("d-none");
        }
        if (!isError) {
            alert("Tạo tài khoản thành công! Hãy xác nhận tài khoản.")
            location.assign("verify.html");
        }
    }
    render() {
        this.$formRegister.append(
            this.$titleScreen,
            this.$email.render(),
            this.$uname.render(),
            this.$password.render(),
            this.$confirmPwd.render(),
            this.$btnSubmit.render(),
            this.$linkContian);
        this.$container.append(this.$formRegister);
        return this.$container;
    }

}
export default RegisterScreen