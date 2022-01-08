import { BaseComponent, Component } from "./../../component.js";

export interface SearchContainer extends Component {
  userId: string;
  password: string;
}
export class SearchSectionInput extends BaseComponent<HTMLElement> implements SearchContainer {
  constructor() {
    super(`<div>
            <h3>검색</h3>
            <div class="form__container">
                옵션 1
            </div>
            <div class="form__container">
                옵션 2
            </div>
        </div>`);
  }

  public get userId(): string {
    const element = this.element.querySelector("#userId")! as HTMLInputElement;
    return element.value;
  }
  public get password(): string {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    return element.value;
  }
}
