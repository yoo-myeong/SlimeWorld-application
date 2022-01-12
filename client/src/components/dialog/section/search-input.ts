import { ClientNetwork } from "../../../network/http.js";
import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class SearchSectionInput extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
  constructor(private network: ClientNetwork) {
    super(`<div>
            <h3>검색</h3>
            <div class="form__container">
                옵션 1
            </div>
            <div class="form__container">
                옵션 2
            </div>
        </div>`);
    console.log(this.network); ///////////////////////////////////////////////////////
  }

  public get userId(): string {
    const element = this.element.querySelector("#userId")! as HTMLInputElement;
    return element.value;
  }
  public get password(): string {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    return element.value;
  }

  async setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
    console.log(this.SubmitListenr);
  }
}
