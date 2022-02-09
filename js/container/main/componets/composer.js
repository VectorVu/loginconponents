import ButtonComponent from "../../../conponent/button.js"
import * as _noti from "../../../common/notify.js";
import { sendMessage } from "../../firebase/store.js"
import {getCurrentUser} from "../../firebase/auth.js"

class Composer{
    $container;
    $inputMes;
    $btnSend;

    $activeConv;

    constructor(conv){
        this.$container = document.createElement("form");
        this.$container.classList.add("composer-contain", "d-flex");
        this.$container.addEventListener("submit", this.handleSendMessage);

        this.$inputMes = document.createElement("input");
        this.$inputMes.type = "text";
        this.$inputMes.placeholder="Aa";
        this.$inputMes.classList.add("grow-1");
        this.$inputMes.name ="contenMes"

        this.$btnSend = new ButtonComponent(
            "Send",
            ["btn", "btn-primary", "d-block"],
            "submit"
        )
        this.$activeConv = conv;

    }
    unMout=()=>{
        this.$container.remove();
    }
    handleSendMessage = async (event)=>{
        event.preventDefault();
        try {
            if(this.$activeConv){
                const {value}= event.target.contenMes;
                const user = getCurrentUser();
                const infor = JSON.parse(localStorage.getItem("auth-info"));
                this.$inputMes.value="";
                await sendMessage(user.email, value, this.$activeConv.id, infor.imageUrl||"");
            }
        } catch (error) {
            _noti.error(error.code, error.message);
        }
      
    }
    render(){
        this.$container.append(this.$inputMes, this.$btnSend.render());
        return this.$container;
    }
}
export default Composer;