import { Composable } from "./../page/page.js";
import { BaseComponent, Component } from "./../component.js";

type Listener = () => void;

export interface dialogContainer extends Component, Composable {
  setOnCloseListenr(parent: HTMLElement): void;
}

export class InputDialog extends BaseComponent<HTMLElement> implements dialogContainer {
  private closeListener?: Listener;

  constructor(private dialogRoot: HTMLElement) {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">&times;</button>
              <div id="dialog__body"></div>
            </div>
          </dialog>`);

    this.dialogRoot = dialogRoot;
    this.attachTo(this.dialogRoot);

    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }

  attachTo(parent: HTMLElement): void {
    super.attachTo(parent);
    this.setOnCloseListenr(parent);
  }

  setOnCloseListenr(parent: HTMLElement) {
    this.closeListener = () => {
      this.removeFrom(parent);
    };
  }
}
