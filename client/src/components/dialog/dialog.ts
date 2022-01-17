import { Composable } from "./../page/page.js";
import { BaseComponent, Component } from "./../component.js";

export interface InputSection extends Component {
  setOnSubmitListenr(SubmitListenr: () => void): void;
  getAllInputData(): any;
}

export type InputSectionConstructor = {
  new (): InputSection;
};

export interface Dialog extends Component, Composable {
  setOnCloseListenr(parent: HTMLElement): void;
  removeChild(child: Component): void;
}

export type DialogConstructor = {
  new (): Dialog;
};

export class InputDialog extends BaseComponent<HTMLElement> implements Dialog {
  private closeListener?: () => void;
  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">&times;</button>
              <div id="dialog__body"></div>
            </div>
          </dialog>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }

  removeChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.removeFrom(body);
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
