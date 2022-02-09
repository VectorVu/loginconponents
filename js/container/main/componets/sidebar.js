import ChatRoom from "./chatRoom.js";
import { checkName } from "../../../common/validdate.js";
import * as _noti from "../../../common/notify.js";
import { createChat, confirmAddUser } from "../../firebase/store.js";
import { getCurrentUser } from "../../../container/firebase/auth.js";
import db from "../../firebase/firebase.js"


class SidebarComp {
    $container;

    $title;
    $btnCreate;
    $listcontain;
    $chatItems;



    $modal;

    $objChats ={};

    $callbackActive;

    constructor(cbActive) {
        this.$callbackActive = cbActive;
        this.$container = document.createElement("div");
        this.$container.classList.add("sidebar-contain", "d-flex");


        this.$title = document.createElement("div");
        this.$title.classList.add("sidebar-title");
        this.$title.innerText = "Chat List";

        this.$btnCreate = document.createElement("div");
        this.$btnCreate.classList.add("btn-create");
        this.$btnCreate.setAttribute("data-bs-toggle", "modal");
        this.$btnCreate.setAttribute("data-bs-target", "#conversationModal");
        this.$btnCreate.innerText = "+";


        this.$listcontain = document.createElement("div");
        this.$listcontain.classList.add("cs-list");

        this.$chatItems = document.createElement("div");

        this.setUPConversationListener();

        this.renderModal();

        

    }
    handleAdd = async (item)=>{
      try {
        const response = await confirmAddUser(item);
        console.log(response);
      } catch (error) {
        _noti.error(error.code, error.message);
      }
    }
    handleActive =(item)=>{
      if(this.$callbackActive) this.$callbackActive(item);
      // console.log(item);
    }
    setUPConversationListener(){
      const user = getCurrentUser();
      db.collection("chat").where("users", "array-contains", user.email)
      .orderBy("updateAt", "desc")
        .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {  
                const chatData = {
                  ...change.doc.data(),
                  id:change.doc.id
                }
                this.$listcontain.append(this.$chatItems);
                const chats = new ChatRoom(
                  chatData,
                  this.handleAdd,
                  this.handleActive
                   );
                this.$objChats[change.doc.id]=chats;

                chats.render(this.$chatItems);
          
            }
            if (change.type === "modified") {
              this.$objChats[change.doc.id].setupData(
                {
                ...change.doc.data(),
                id:change.doc.id
                },
                this.handleAdd,
                this.handleActive
              );
            }
            if (change.type === "removed") {
                this.$objChats[change.doc.id].unMuont();
            }
        });
    });

    }
    renderModal() {
        this.$modal = document.createElement("div");
        this.$modal.classList.add("modal", "fade");
        this.$modal.id = "conversationModal";
        this.$modal.setAttribute("tabindex", "-1");
        this.$modal.setAttribute("aria-labelledbyd", "conversationModal");
        this.$modal.setAttribute("aria-hidden", "true");


        this.$modal.innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createModal">New Chat Room</h5>
            <button id ="btn-icon-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Chat Name:<span  class="caution">*</span></label>
                <input type="text" class="form-control" id="recipient-name">
              </div>
              <div class="mb-3">
                <label for="imageUrl-text" class="col-form-label">imageUrl  :</label>
                <input type="text" class="form-control" id="imageUrl-text"></input>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button id ="btn-createChat" type="button" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
        `
    }
    handleClose = () => {
        const name = document.getElementById("recipient-name");
        const imageUrl = document.getElementById("imageUrl-text");
        const btnClose = document.getElementById("btn-icon-close");

        name.value = "";
        imageUrl.value = "";
        btnClose.click();
    }
    
    handleCreate = async () => {
        try {
            const name = document.getElementById("recipient-name");
            const imageUrl = document.getElementById("imageUrl-text");
            const user = getCurrentUser();
            if (checkName(name.value)) {
                _noti.warning("Chat name", checkName(name.value));
                return;
            }
            
            await createChat(
                name.value,
                imageUrl.value,
                [user.email],
                user.email
            );
            this.handleClose();
        } catch (error) {
            _noti.error(error.code, error.message);
        }
    }
    render(parentContainer) {
        parentContainer.append(this.$container);
        this.$container.append(
            this.$title,
            this.$btnCreate,
            this.$listcontain,
            this.$modal
        );

        document.getElementById("btn-createChat").addEventListener("click", this.handleCreate);
        document.getElementById("btn-icon-close").addEventListener("click", this.handleClose);  
        
    }
}
export default SidebarComp;