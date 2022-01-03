import { BaseComponent } from "../../component.js";
export class ButtonComponent extends BaseComponent {
    constructor(buttonId, buttonName) {
        super(`<div class="container">
            <button class="button">test</button>
          </div>`);
        this.buttonId = buttonId;
        this.buttonName = buttonName;
        const button = this.element.querySelector(".button");
        button.id = this.buttonId;
        button.innerText = this.buttonName;
        button.onclick = () => {
            this.clickListener && this.clickListener();
        };
    }
    setOnClickListener(listener) {
        this.clickListener = listener;
    }
}
