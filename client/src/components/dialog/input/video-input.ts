import { BaseComponent, Component } from "./../../component.js";

export interface VideoContainer extends Component{
  title: string;
  url: string;
}
export class VideoSectionInput extends BaseComponent<HTMLElement> implements VideoContainer {
  constructor() {
    super(`<div>
            <div class="form__container">
                <label for="title">Title</label>
                <input type="text" id="title" />
            </div>
            <div class="form__container">
                <label for="url">URL</label>
                <input type="text" id="url" />
            </div>
        </div>`);
  }

  public get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  public get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }
}
