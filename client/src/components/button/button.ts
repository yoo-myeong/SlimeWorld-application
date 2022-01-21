import { BaseComponent, Component } from "../component.js";

type OnEventListener = () => void;

export interface buttonContainer extends Component {
  setOnClickListener(listener: OnEventListener): void;
}

export type buttonContainerConstructor = {
  new (buttonId: string, buttonName: string): buttonContainer;
};

export class ButtonComponent extends BaseComponent<HTMLElement> implements buttonContainer {
  private clickListener?: OnEventListener;
  constructor(private buttonId: string, private buttonName: string) {
    super(`<button class="button"></button>`);
    this.element.id = this.buttonId;
    this.element.innerText = this.buttonName;
    this.element.onclick = () => {
      this.clickListener && this.clickListener();
    };
  }

  setOnClickListener(listener: OnEventListener): void {
    this.clickListener = listener;
  }
}
