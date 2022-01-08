import { BaseComponent, Component } from "../component.js";
import { buttonContainer } from "./button/button.js";

interface IUploadContainer extends Component {
  addChild(button: buttonContainer): void;
}

export class UploadContainer extends BaseComponent<HTMLElement> implements IUploadContainer {
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
