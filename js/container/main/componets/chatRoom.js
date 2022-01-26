import { deleteChat, updateChat } from "../../../container/firebase/store.js";
import * as _noti from "../../../common/notify.js";
import ButtonComponent from "../../../conponent/button.js";
import myModal from "./myModal.js";
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
    $updateContent;
    $updateDialog;
    $updateHeader;
    $updateBody;
    $updateFooter;

    $updateNameContain;
    $updateNameLabel;
    $updateNameInput;


    $updateUrlContain;
    $updateUrlLabel;
    $updateUrlInput;


    $updateTitle;
    $updateClose;
    $btnUpdateModal;
    $updateForm;


    $deleteModal;

    $chatData = {};

    constructor(chatid, name, imageUrl, desc) {


        this.$container = document.createElement("div");
        this.$container.classList.add("chatRoom-contain");

        this.$imageContain = document.createElement("div");
        this.$imageContain.classList.add("image-container");
        this.$chatAva = document.createElement("div");
        this.$chatAva.classList.add("chatAva");

        this.$subContain = document.createElement("div");
        this.$subContain.classList.add("sub-contain");

        this.$description = document.createElement("div");

        this.$roomName = document.createElement("div");


        this.$btnContain = document.createElement("div");
        this.$btnContain.classList.add("btnContain");

        this.$btnUpdate = document.createElement("div");
        this.$btnUpdate.classList.add("btn-update");
        this.$btnUpdate.setAttribute("data-bs-toggle", "modal");
        this.$btnUpdate.setAttribute("data-bs-target", `#update${chatid}`);
        this.$btnUpdate.innerText = "U";
        this.$btnUpdate.addEventListener("click", this.handleUpdate);

        this.$btnDelete = document.createElement("div");
        this.$btnDelete.classList.add("btn-delete");
        this.$btnDelete.setAttribute("data-bs-toggle", "modal");
        this.$btnDelete.setAttribute("data-bs-target", `#delete${chatid}`);
        this.$btnDelete.addEventListener("click", this.handleDelete);
        this.$btnDelete.innerText = "-";
        this.setupData(chatid, name, imageUrl, desc);


        this.$updateModal = new myModal(chatid, "update", "form", name);
        // this.renderUpdateModal();
        this.$deleteModal = new myModal(chatid, "delete", "noti", name);
        // this.renderDeleteModal();
    }
    setupData = (chatid, name, imageUrl, desc) => {
        this.$chatData = {
            chatid,
            name,
            imageUrl,
            desc
        };
        this.fillDataToEle();
    }
    fillDataToEle = () => {
        this.$chatAva.style.backgroundImage = `url(${this.$chatData.imageUrl})`;
        this.$roomName.innerText = this.$chatData.name;
        this.$description.innerText = this.$chatData.desc +" users";
    }

    handleUpdate = () => {
        let udName = document.getElementById("Name"+this.$chatData.chatid);
        udName.value = this.$chatData.name;
        let udUrl = document.getElementById("Url"+this.$chatData.chatid);
        udUrl.value = this.$chatData.imageUrl;
        document.getElementById("upBtn"+this.$chatData.chatid).addEventListener("click", () => {
            try {
                updateChat(this.$chatData.chatid, udName.value, udUrl.value);
                const btnClose = document.getElementById("upclose"+this.$chatData.chatid);
                btnClose.click();
            } catch (error) {
                _noti.error(error.errorCode, error.errorMessage);
            }
        })
    }

    unMuont = () => {
        this.$container.remove();
    }
    handleDelete = (e) => {
        e.preventDefault();
        document.getElementById("deBtn"+this.$chatData.chatid).addEventListener("click", () => {
            try {
                deleteChat(this.$chatData.chatid);
                const btnClose = document.getElementById("declose"+this.$chatData.chatid);
                btnClose.click();
            } catch (error) {
                _noti.error(error.errorCode, error.errorMessage);
            }
        });

    }

    render(parentContainer) {
        parentContainer.append(this.$container);
        this.$container.append(this.$imageContain, this.$subContain, this.$btnContain);
        this.$imageContain.appendChild(this.$chatAva);
        this.$subContain.append(this.$roomName, this.$description);
        this.$btnContain.append(this.$btnUpdate, this.$btnDelete, this.$updateModal.render(),this.$deleteModal.render());
    }
}
export default ChatRoom;