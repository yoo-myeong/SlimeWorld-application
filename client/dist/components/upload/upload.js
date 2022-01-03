import { BaseComponent } from "../component.js";
export class UploadContainer extends BaseComponent {
    constructor() {
        super(`<div class="post__container"></div>`);
    }
    addChild(...buttons) {
        buttons.forEach((button) => {
            const container = this.element;
            button.attachTo(container);
        });
    }
}
