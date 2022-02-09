import SidebarComp from "./componets/sidebar.js";
import MessageList from "./componets/message-list.js";
import Composer from "./componets/composer.js";

class MainScreen {
    $container;
    $paper;
    $sidebarCompt;

    $messageArea;
    $messageList;
    $composer;

    $activeConv =null;
    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("main", "d-flex");
        
        this.$paper = document.createElement("div");
        this.$paper.classList.add("chat-paper");

        this.$messageArea = document.createElement("div");
        this.$messageArea.classList.add("messageArea-contain", "d-flex");

        this.$sidebarCompt= new SidebarComp(this.setActiveConv);
    }
    setActiveConv =(conv)=>{

        if(this.$activeConv && this.$activeConv.id === conv.id) return;

        this.$activeConv = conv;

        if(this.$messageList) this.$messageList.unMout();
        if(this.$composer) this.$composer.unMout();
        this.$messageArea.innerHTML="";

        this.$messageList = new MessageList(conv);
        this.$composer = new Composer(conv);
        this.$messageArea.append(this.$messageList.render(), this.$composer.render());

    } 
    render(appEle){
        appEle.appendChild(this.$container);
        this.$container.append(this.$paper);
        this.$sidebarCompt.render(this.$paper);

        this.$paper.append(this.$messageArea);
    }
}
export default MainScreen;

