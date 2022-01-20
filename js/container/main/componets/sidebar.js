import ChatRoom from "./chatRoom.js";
import { checkName } from "../../../common/validdate.js";
import * as _noti from "../../../common/notify.js";
import { createChat, getChatList } from "../../firebase/store.js";
import { getCurrentUser } from "../../../container/firebase/auth.js";



class SidebarComp {
    $container;

    $title;
    $btnCreate;
    $listcontain;
    $chatItems;



    $modal;

    constructor() {
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
        this.handleFetchChatList();

        this.renderModal();
    }
    async handleFetchChatList() {
        let chatCount = await getChatList();
        chatCount.forEach(element => {
            let chatData = element.data();
            console.log(chatData.name);
            const chats = new ChatRoom(chatData.name, chatData.imageUrl, chatData.description)
            chats.render(this.$chatItems);
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
              <label for="recipient-desc" class="col-form-label">Description:</label>
              <input type="text" class="form-control" id="recipient-desc">
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
            const desc = document.getElementById("recipient-desc");
            const imageUrl = document.getElementById("imageUrl-text");
            const user = getCurrentUser();
            console.log(name.value, imageUrl.value);
            if (checkName(name.value)) {
                _noti.warning("Chat name", checkName(name.value));
                return;
            }
            
            await createChat(
                name.value,
                imageUrl.value,
                desc.value,
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
        this.$listcontain.append(this.$chatItems);

        document.getElementById("btn-createChat").addEventListener("click", this.handleCreate);
        document.getElementById("btn-icon-close").addEventListener("click", this.handleClose);  
    }
}
export default SidebarComp;