import InputConponent from "../../conponent/input.js";
import ButtonComponent from "../../conponent/button.js";
import { getCurrentUser } from "../firebase/auth.js";
import { checkName, checkVNPhoneNumber } from "../../common/validdate.js"
import { createUser, getUserByEmail, updateUserData } from "../firebase/store.js";
import MainScreen from"../main/main.js";
import app from "../../index.js";


class inforScreen {
    $container;

    $paper;
    $avaContainer;
    $ava;

    $form;
    $title;
    $email;
    $name;
    $phone;
    $imageUrl;

    $exitUser;

    $btnSubmit;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("infor-screen");

        this.$paper = document.createElement("div");
        this.$paper.classList.add("paper");

        this.$avaContainer = document.createElement("div");
        this.$avaContainer.classList.add("ava-container");
        this.$ava = document.createElement("div");
        this.$ava.classList.add("ava");

        this.$form = document.createElement("form");
        this.$form.classList.add("infor-container");
        this.$form.addEventListener("submit", this.handleSubmit);

        this.$title = document.createElement("div");
        this.$title.classList.add("big-title");
        this.$title.innerText = "Your Information";

        const user = getCurrentUser();

        this.$email = new InputConponent(
            "Email address",
            "email",
            "infor-email",
            "text"
        );

        this.$email.setAttribute("value", user.email);
        this.$email.setAttribute("disabled", true);

        this.$name = new InputConponent(
            "Full name",
            "name",
            "infor-name",
            "text"
        );
        this.$phone = new InputConponent(
            "Phone number",
            "phone",
            "infor-phone",
            "text"
        );
        this.$imageUrl = new InputConponent(
            "Avatar URL",
            "imageUrl",
            "infor-imageUrl",
            "text"
        );
        this.$imageUrl.setEventListener("input", this.handleChangeAva);

        this.$btnSubmit = new ButtonComponent(
            "Continue...",
            ["btn", "btn-primary"],
            "submit"
        );
        this.handleFetchUserByEmail();
        console.log(this.$exitUser);
    }
    async handleFetchUserByEmail() {
        const user = getCurrentUser();
        const userStore = await getUserByEmail(user.email);
        if (userStore) {
            this.$exitUser = true;
            this.$name.setAttribute("value", userStore.name);
            this.$phone.setAttribute("value", userStore.phone);
            this.$imageUrl.setAttribute("value", userStore.imageUrl);

            this.$ava.style.backgroundImage = `url(${userStore.imageUrl})`;
        } else {
            this.$exitUser = false;

        }
    }
    handleChangeAva = (e) => {
        this.$ava.style.backgroundImage = `url(${e.target.value})`;
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, imageUrl } = e.target;
        const user = getCurrentUser();
        console.log(user);
        let isError = false;
        // validate
        if (checkName(name.value) !== null) {
            isError = true;
            this.$name.setError(checkName(name.value));
        }
        else this.$name.setError("");

        // vì validate số điện thoại phụ thuộc quốc gia, nhà mạng... nên ở đây em chỉ valid số điện thoại của Việt Nam

        if (checkVNPhoneNumber(phone.value) !== null) {
            isError = true;
            this.$phone.setError(checkVNPhoneNumber(phone.value));
        }
        else this.$phone.setError("");
        
        // xử lý exit user
        if(!isError){
            if(this.$exitUser){
                //setloading
                await updateUserData(user.email, name.value, phone.value, imageUrl.value);
                const mainScreen = new MainScreen();
                app.changeActiveScreen(mainScreen);
                console.log(this.$exitUser);
    
            } else {
                await createUser(user.email, name.value, phone.value, imageUrl.value);
                console.log(this.$exitUser);
                this.$exitUser=true;
            }
        } 
    }

    render(appEle) {

        this.$form.append(
            this.$title,
            this.$email.render(),
            this.$name.render(),
            this.$phone.render(),
            this.$imageUrl.render(),
            this.$btnSubmit.render()
        )
        this.$avaContainer.appendChild(this.$ava);
        this.$paper.append(this.$form, this.$avaContainer);
        this.$container.appendChild(this.$paper);
        appEle.appendChild(this.$container);

    }
}
export default inforScreen;