import ButtonComponent from "../../../conponent/button.js";
class myModal{
    $container;
    $dialog;

    $content;

    $header;
    $title;
    $close;

    $body;
    $form;
    $nameLabel;
    $urlLabel;
    $inputName;
    $inputNameContain;
    $inputUrl;
    $inputUrlContain;

    $footer;
    $btn;


    constructor(id, modalName, type, chatName){

        this.$container=document.createElement("div");
        this.$container.classList.add("modal", "fade");
        this.$container.id = modalName+id;
        this.$container.setAttribute("tabindex", "-1");
        this.$container.setAttribute("aria-labelledbyd", `${modalName+id}`);
        this.$container.setAttribute("aria-hidden", "true");

        this.$dialog = document.createElement("div");
        this.$dialog.classList.add("modal-dialog");

        this.$content = document.createElement("div");
        this.$content.classList.add("modal-content");

        this.$header = document.createElement("div");
        this.$header.classList.add("modal-header");

        this.$title = document.createElement("h5");
        this.$title.classList.add("modal-title");
        this.$title.id="mdtit"+id;

        this.$close = document.createElement("button");
        this.$close.classList.add("btn-close");
        this.$close.type = "button";
        this.$close.setAttribute("data-bs-dismiss", "modal");
        this.$close.setAttribute("aria-label", "Close");

        this.$header.append(this.$title, this.$close);

        this.$body = document.createElement("div");
        this.$body.classList.add("modal-body");


        this.$footer = document.createElement("div");
        this.$footer.classList.add("modal-footer");

        if(type ==="form"){
          
            // header
            this.$close.id = `upclose${id}`;
        
            // body
            
            this.$form = document.createElement("form");

            this.$inputNameContain = document.createElement("div");
            this.$inputNameContain.classList.add("mb-3");

            this.$nameLabel = document.createElement("label");
            this.$nameLabel.classList.add("col-form-label");
            this.$nameLabel.innerText = "Chat Name:";

            this.$inputName = document.createElement("input");
            this.$inputName.id = `Name${id}`;
            this.$inputName.classList.add("form-control");
            this.$inputName.type = "text";

            this.$inputNameContain.append(this.$nameLabel, this.$inputName);

            this.$inputUrlContain = document.createElement("div");
            this.$inputUrlContain.classList.add("mb-3");

            this.$urlLabel = document.createElement("label");
            this.$urlLabel.classList.add("col-form-label");
            this.$urlLabel.innerText = "Chat Avatar:";

            this.$inputUrl = document.createElement("input");
            this.$inputUrl.id = `Url${id}`;
            this.$inputUrl.classList.add("form-control");
            this.$inputUrl.type = "text";

            this.$inputUrlContain.append(this.$urlLabel, this.$inputUrl);

            this.$form.append(this.$inputNameContain, this.$inputUrlContain);
            this.$body.appendChild(this.$form);

            // footer
          
            this.$btn = new ButtonComponent(
                "Save",
                ["btn", "btn-success"],
                "button",
            );
            this.$btn.render().id = `upBtn${id}`;
            this.$footer.appendChild(this.$btn.render());
        }
        else if(type==="noti"){
            // header
            this.$close.id = `declose${id}`;

            this.$title.innerText = `Delete ${chatName}`;

            // body
            this.$body.innerText=`Are your sure you want to delete ${chatName}?`

            // footer
            this.$btn = new ButtonComponent(
                "Save",
                ["btn", "btn-danger"],
                "button",
            );
            this.$btn.render().id = `deBtn${id}`;
            this.$footer.appendChild(this.$btn.render());
        }

    }
    render(){
        this.$content.append(this.$header, this.$body, this.$footer);
        this.$dialog.append(this.$content);

        this.$container.append(this.$dialog);
        return this.$container;
    }
}
export default myModal;