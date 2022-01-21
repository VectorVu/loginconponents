import {deleteChat} from"../../../container/firebase/store.js";
import * as _noti from "../../../common/notify.js";
class ChatRoom {
    $container;

    $imageContain;
    $chatAva;
    $roomName;
    $description;
    $subContain;

    $btnContain;
    $btnUpdate;
    $btnDelete;

    $updateModal;
    $deleteModal;

    $chatID;

    constructor(chatid, name, imageUrl, desc) {

        this.$chatID = chatid;
        this.$container = document.createElement("div");
        this.$container.classList.add("chatRoom-contain");

        this.$imageContain = document.createElement("div");
        this.$imageContain.classList.add("image-container");
        this.$chatAva = document.createElement("div");
        this.$chatAva.classList.add("chatAva");

        this.$subContain = document.createElement("div");
        this.$subContain.classList.add("sub-contain");

        this.$description = document.createElement("div");
        this.$description.innerText = desc;

        this.$roomName = document.createElement("div");
        this.$roomName.innerText = name;

        this.$chatAva.style.backgroundImage = `url(${imageUrl})`;

        this.$btnContain = document.createElement("div");
        this.$btnContain.classList.add("btnContain");

        this.$btnUpdate = document.createElement("div");
        this.$btnUpdate.classList.add("btn-update");
        this.$btnUpdate.setAttribute("data-bs-toggle", "modal");
        this.$btnUpdate.setAttribute("data-bs-target", "#updateModal");
        this.$btnUpdate.innerText = "U";

        this.$btnDelete = document.createElement("div");
        this.$btnDelete.classList.add("btn-delete");
        this.$btnDelete.setAttribute("data-bs-toggle", "modal");
        this.$btnDelete.setAttribute("data-bs-target", "#deleteModal");
        this.$btnDelete.addEventListener("click", this.handleDelete);
        this.$btnDelete.innerText = "-";

        this.renderUpdateModal();
        this.renderDeleteModal();

    }
    
    handleDelete = (e)=>{
        try {      
            e.preventDefault();
            document.getElementById("btn-delete").addEventListener("click", () =>{
                deleteChat(this.$chatID);
                const btnClose = document.getElementById("dele-close");
                btnClose.click();
            });
        } catch (error) {
            _noti.error(error.errorCode, error.errorMessage);
        }  
    }
    renderUpdateModal() {
        this.$updateModal = document.createElement("div");
        this.$updateModal.classList.add("modal", "fade");
        this.$updateModal.id = "updateModal";
        this.$updateModal.setAttribute("tabindex", "-1");
        this.$updateModal.setAttribute("aria-labelledbyd", "updateModal");
        this.$updateModal.setAttribute("aria-hidden", "true");
        this.$updateModal.innerHTML = `
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        `
    }
    
    renderDeleteModal() {
        this.$deleteModal = document.createElement("div");
        this.$deleteModal.classList.add("modal", "fade");
        this.$deleteModal.id = "deleteModal";
        this.$deleteModal.setAttribute("tabindex", "-1");
        this.$deleteModal.setAttribute("aria-labelledbyd", "deleteModal");
        this.$deleteModal.setAttribute("aria-hidden", "true");
        this.$deleteModal.innerHTML = `
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Chat</h5>
                    <button id ="dele-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are your sure you want to delete this chat?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="btn-delete" type="button" class="btn btn-primary">Delete</button>
                </div>
                </div>
            </div>
        `
    }
    
    render(parentContainer) {
        parentContainer.append(this.$container);
        this.$container.append(this.$imageContain, this.$subContain, this.$btnContain);
        this.$imageContain.appendChild(this.$chatAva);
        this.$subContain.append(this.$roomName, this.$description);
        this.$btnContain.append(this.$btnUpdate, this.$btnDelete, this.$updateModal, this.$deleteModal);

        // document.getElementById("btn-delete").addEventListener("click", this.handleDelete);
    }
}
export default ChatRoom;