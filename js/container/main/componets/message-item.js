class MessageItem {
    $container;
    $author;
    $subcontain;
    $content;
    $ava;
    constructor(messageData) {
        this.$container = document.createElement("div");
        this.$container.classList.add("Mes-item", "d-flex");

        this.$author = document.createElement("div");
        this.$author.classList.add("mes-author");
        this.$author.innerText = messageData.sender;

        this.$subcontain = document.createElement("div");
        this.$subcontain.classList.add("subcontain-Mes", "d-flex");

        this.$ava = document.createElement("div");
        this.$ava.classList.add("mes-ava", "d-flex");
        this.$ava.style.backgroundImage = messageData.avaSend 
        ? `url(${messageData.avaSend})` 
        : `url(https://www.kindpng.com/picc/m/685-6851196_person-icon-grey-hd-png-download.png)`;

        this.$content = document.createElement("div");
        this.$content.classList.add("mes-content", "d-flex");
        this.$content.innerText=messageData.content;  

        if(messageData.isAuth){
            this.$container.classList.add("msg-item-right");
            this.$content.classList.add("bgPink");
        }
    }
    render() {
        this.$subcontain.append(this.$ava, this.$content);
        this.$container.append(this.$author, this.$subcontain);
        return this.$container;
    }
}
export default MessageItem;