import MessageItem from "./message-item.js";
import {getCurrentUser} from "../../firebase/auth.js";
import db from "../../firebase/firebase.js"

class MessageList{
    $container;
    $title;
    $listItem;

    $activeConv;
    constructor(conv){
        this.$activeConv = conv;

        this.$container = document.createElement("div");
        this.$container.classList.add("message-contain", "d-flex");

        this.$title = document.createElement("div");
        this.$title.classList.add("messageList-title");
        this.$title.innerText = conv.name;

        this.$listItem = document.createElement("div");
        this.$listItem.classList.add("listMes-contain", "d-flex");

        this.messageListener();
    }
    messageListener=()=>{
        const user = getCurrentUser();
        db.collection("message").where("convID", "==", this.$activeConv.id)
            .orderBy("sendAt")
          .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                  const msgFb = change.doc.data();  
                  const mesEle = new MessageItem(
                     {
                        ...msgFb,
                        isAuth: msgFb.sender === user.email
                     }
                  );
                  this.$listItem.append(mesEle.render());
              }  
          });
      });
    }
    unMout=()=>{
        this.$container.remove();
    }
    render(){  
        this.$container.append(this.$title, this.$listItem);
        return this.$container;
    }
}
export default MessageList;