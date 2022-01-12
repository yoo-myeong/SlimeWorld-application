import { BaseComponent, Component } from "../../component.js";

type OnEventListener = () => void;

export interface buttonContainer extends Component {
  setOnClickListener(listener: OnEventListener): void;
}

export class ButtonComponent extends BaseComponent<HTMLElement> implements buttonContainer {
  private clickListener?: OnEventListener;
  constructor(private buttonId: string, private buttonName: string) {
    super(`<div class="button_container">
            <button class="button">test</button>
          </div>`);
    const button = this.element.querySelector(".button")! as HTMLButtonElement;
    button.id = this.buttonId;
    button.innerText = this.buttonName;
    button.onclick = () => {
      this.clickListener && this.clickListener();
    };
  }

  setOnClickListener(listener: OnEventListener): void {
    this.clickListener = listener;
  }
}
