import { Composable } from "./../page/page.js";
import { BaseComponent, Component } from "./../component.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface dialogContainer extends Component, Composable {
  setOnCloseListenr(parent: HTMLElement): void;
  setOnSubmitListenr(listener: OnSubmitListener): void;
}

export class InputDialog extends BaseComponent<HTMLElement> implements dialogContainer {
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">&times;</button>
              <div id="dialog__body"></div>
              <button class="dialog__submit">ADD</button>
            </div>
          </dialog>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListenr(parent: HTMLElement) {
    this.closeListener = () => {
      this.removeFrom(parent);
    };
  }

  setOnSubmitListenr(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }

  attachTo(parent: HTMLElement): void {
    super.attachTo(parent);
    this.setOnCloseListenr(parent);
  }
}
