import { deleteChat, updateChat } from "../../../container/firebase/store.js";
import * as _noti from "../../../common/notify.js";
import myModal from "./myModal.js";
class ChatRoom {
    $container;

    $imageContain;
    $chatAva;
    $roomName;
    $description;
    $subContain;
    // data

    $id;
    $name;
    $imageUrl;
    $desc;
    $users;
    $creator;

    $item;

    $btnContain;
    $btnUpdate;
    $btnDelete;
    $btnAddUser;

    $updateModal;

    $deleteModal;

    $chatData = {};

    $callBackAdd;
    $callBackActive;

    constructor(chat, cbAdd, cbActive) {


        this.$container = document.createElement("div");
        this.$container.classList.add("chatRoom-contain");
        this.$container.addEventListener("click", this.handleActive);

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
        this.$btnUpdate.classList.add("btn-popup");
        this.$btnUpdate.setAttribute("data-bs-toggle", "modal");
        this.$btnUpdate.setAttribute("data-bs-target", `#update${chat.id}`);
        this.$btnUpdate.innerText = "U";
        this.$btnUpdate.addEventListener("click", this.handleUpdate);


        this.$btnAddUser = document.createElement("div");
        this.$btnAddUser.classList.add("btn-popup");
        this.$btnAddUser.innerText = "+";
        this.$btnAddUser.addEventListener("click", this.handleAddUser);


        this.$btnDelete = document.createElement("div");
        this.$btnDelete.classList.add("btn-popup");
        this.$btnDelete.setAttribute("data-bs-toggle", "modal");
        this.$btnDelete.setAttribute("data-bs-target", `#delete${chat.id}`);
        this.$btnDelete.addEventListener("click", this.handleDelete);
        this.$btnDelete.innerText = "-";
        this.setupData(chat, cbAdd, cbActive);


        this.$updateModal = new myModal(chat.id, "update", "form", chat.name);

        this.$deleteModal = new myModal(chat.id, "delete", "noti", chat.name);


    }
    setupData = (chat, cbAdd, cbActive) => {
        this.$id = chat.id,
        this.$name = chat.name,
        this.$imageUrl = chat.imageUrl,
        this.$desc = chat.users.length,
        this.$users = chat.users,
        this.$creator = chat.creator

        this.$item = chat;

        this.fillDataToEle();
        this.$callBackAdd = cbAdd;
        this.$callBackActive = cbActive;
    }
    fillDataToEle = () => {
        this.$chatAva.style.backgroundImage = `url(${this.$imageUrl})`;
        this.$roomName.innerText = this.$name;
        this.$description.innerText = this.$desc + " users";
    }
    handleAddUser = () => {
        this.$callBackAdd(this.$item);
    }
    handleActive = () => {
        this.$callBackActive(this.$item);
    }
    handleUpdate = () => {
        let mdname = document.getElementById("mdtit"+this.$id);
        mdname.innerText = `Update ${this.$name} information`;
        let udName = document.getElementById("Name" + this.$id);
        udName.value = this.$name;
        let udUrl = document.getElementById("Url" + this.$id);
        udUrl.value = this.$imageUrl;
        document.getElementById("upBtn" + this.$id).addEventListener("click", () => {
            try {
                updateChat(
                    this.$id,
                    udName.value, 
                    udUrl.value,
                    this.$users,
                    this.$creator
                );
                const btnClose = document.getElementById("upclose" + this.$id);
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
        document.getElementById("deBtn" + this.$id).addEventListener("click", () => {
            try {
                deleteChat(this.$id);
                const btnClose = document.getElementById("declose" + this.$id);
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
        this.$btnContain.append(this.$btnUpdate, this.$btnAddUser, this.$btnDelete, this.$updateModal.render(), this.$deleteModal.render());
    }
}
export default ChatRoom;