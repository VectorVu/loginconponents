import inforScreen from "./container/infor/infor.js";
import LoginScreen from "./container/login/login.js";
import MainScreen from "./container/main/main.js";
import verifiScreen from "./container/verifi/verifi.js";
import RegisterScreen from "./container/Register/register.js";



class App {
    $activeScreen;
    constructor() {
        this.setUpAuthListener();
        // this.changeActiveScreen(new inforScreen())
    }
    setUpAuthListener(){
        firebase.auth().onAuthStateChanged((user) => {
            let screen;
            if (user && user.emailVerified) {
             screen = new inforScreen();
            } else if (user && !user.emailVerified) {
                screen = new verifiScreen();
            } else {
              screen = new LoginScreen();
            }
            this.changeActiveScreen(screen);
          });
    }
    changeActiveScreen(screen) {
        const appEle = document.getElementById("app");
        if (appEle) {
            if (this.$activeScreen) {
                appEle.innerHTML = "";
            }
            this.$activeScreen = screen;
            screen.render(appEle);
        }
    }
}
const app = new App();
export default app;

