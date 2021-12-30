import { Composable, PageComposable } from "./../page/page.js";
import { BaseComponent, Component } from "./../component.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface formContainer extends Component {
  title: string;
  url: string;
}
type formContainerConstructor = {
  new (): formContainer;
};
type MediaComponentConstructor = {
  new (title: string, url: string): Component;
};
export interface dialogContainer extends Component, Composable {
  setOnCloseListenr(listener: OnCloseListener): void;
  setOnSubmitListenr(listener: OnSubmitListener): void;
  createDialog(
    Section: formContainerConstructor,
    Media: MediaComponentConstructor,
    Page: PageComposable,
    DialogRoot: HTMLElement
  ): void;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements dialogContainer
{
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

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListenr(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListenr(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }

  createDialog(
    Section: formContainerConstructor,
    Media: MediaComponentConstructor,
    Page: PageComposable,
    DialogRoot: HTMLElement
  ) {
    const section = new Section();
    this.addChild(section);
    this.attachTo(DialogRoot);
    this.setOnCloseListenr(() => {
      this.removeFrom(DialogRoot);
    });
    this.setOnSubmitListenr(() => {
      const media = new Media(section.title, section.url);
      Page.addItem(media);
      this.removeFrom(DialogRoot);
    });
  }
}
