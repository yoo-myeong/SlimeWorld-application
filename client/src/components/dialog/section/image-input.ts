import { ClientNetwork } from "../../../network/http.js";
import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class ImageSectionInput extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
  constructor(private network: ClientNetwork) {
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
    console.log(this.network); ///////////////////////////////////////////////////////
  }
  public get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  public get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }

  async setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
    console.log(this.SubmitListenr);
  }
}
