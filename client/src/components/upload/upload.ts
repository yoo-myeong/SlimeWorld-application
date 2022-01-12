import { BaseComponent } from "../component.js";
import { buttonContainer } from "./button/button.js";

export class UploadContainer extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div class="post__container"></div>`);
  }

  addChild(...buttons: buttonContainer[]): void {
    buttons.forEach((button) => {
      const container = this.element! as HTMLElement;
      button.attachTo(container);
    });
  }
}
