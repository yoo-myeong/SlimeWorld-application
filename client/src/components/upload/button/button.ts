import { BaseComponent, Component } from "../../component.js";

export interface buttonContainer extends Component {
  setOnClickListener(listener: OnClickListener): void;
}
type OnClickListener = () => void;

export class ButtonComponent extends BaseComponent<HTMLElement> implements buttonContainer {
  private clickListener?: OnClickListener;
  constructor(private buttonId: string, private buttonName: string) {
    super(`<div class="container">
            <button class="button">test</button>
          </div>`);
    const button = this.element.querySelector(".button")! as HTMLButtonElement;
    button.id = this.buttonId;
    button.innerText = this.buttonName;
    button.onclick = () => {
      this.clickListener && this.clickListener();
    };
  }

  setOnClickListener(listener: OnClickListener): void {
    this.clickListener = listener;
  }
}
