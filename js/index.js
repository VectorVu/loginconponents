import LoginScreen from "./container/login/login.js";

class App {
    $activeScreen;
    constructor() { }
    changeActiveScreen(screen) {
        const appEle = document.getElementById("app");
        if (appEle) {
            if (this.$activeScreen) {
                appEle.innerHTML = "";
            }
            this.$activeScreen = screen;
            appEle.appendChild(screen.render());
        }
    }
}
const app = new App();
const signIn = new LoginScreen();
app.changeActiveScreen(signIn);
export default app;

