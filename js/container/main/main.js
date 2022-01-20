import SidebarComp from "./componets/sidebar.js";

class MainScreen {
    $container;
    $paper;
    $sidebarCompt;
    $chatCompt;
    $informationCompt;


    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("main", "d-flex");
        
        this.$paper = document.createElement("div");
        this.$paper.classList.add("chat-paper");

        this.$sidebarCompt= new SidebarComp();
    }
    render(appEle){
        appEle.appendChild(this.$container);

        this.$container.append(this.$paper);
        this.$sidebarCompt.render(this.$paper);
    }
}
export default MainScreen;