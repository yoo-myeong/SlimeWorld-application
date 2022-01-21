import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class ImageInputSection extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
  private options: Array<string> = [];
  constructor() {
    super(`<div class="upload__Container">
              <h3>이미지 업로드</h3>
              <div class="form__container">
                  <label for="title">제목</label>
                  <input type="text" id="title" />
              </div>
              <div class="form__container">
                  <label for="description">글</label>
                  <textarea type="text" id="description" /></textarea>
              </div>
              <div class="form__container">
                  <label for="saleSite">판매페이지</label>
                  <input type="text" id="saleSite" />
              </div>
              <div class="form__container">
                  <label for="option">옵션입력</label>
                  <div class="form__option">
                    <input type="text" id="option" />
                  </div>
              </div>
              <div class="form__container">
                  <label for="image">사진등록</label>
                  <input type="file" id="image" />
              </div>
              <button id="submit__button">등록</button>
          </div>`);
    const submitButton = this.element.querySelector("#submit__button")! as HTMLButtonElement;
    submitButton.onclick = async () => {
      this.SubmitListenr && this.SubmitListenr();
    };
    this.setOnOptionKeyUp();
  }

  setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
  }

  setOnOptionKeyUp() {
    const formOption = this.element.querySelector(".form__option")! as HTMLDivElement;
    const optionInput = this.element.querySelector("#option")! as HTMLInputElement;
    optionInput.addEventListener("keyup", this.getOptionKeyUpListener(formOption, optionInput));
  }

  getOptionKeyUpListener(formOption: HTMLDivElement, optionInput: HTMLInputElement) {
    return () => {
      const e = window.event as KeyboardEvent;
      if (e.key == "Enter") {
        const value = optionInput.value;
        optionInput.value = "";
        this.options.push(value);
        const optionComponent = new BaseComponent(
          `<div class="option__container">
            ${value}
          </div>`
        );
        optionComponent.attachTo(formOption);
        optionComponent.element.onclick = () => {
          this.options = this.options.filter((option) => option !== value);
          optionComponent.removeFrom(formOption);
        };
      }
    };
  }

  getAllInputData() {
    const title = this.element.querySelector("#title")! as HTMLInputElement;
    const description = this.element.querySelector("#description")! as HTMLInputElement;
    const saleSite = this.element.querySelector("#saleSite")! as HTMLInputElement;
    const image = this.element.querySelector("#image")! as HTMLInputElement;
    if (!(title.value && description.value && saleSite.value && image.files![0])) {
      throw new Error("모두 입력해야 합니다.");
    }
    const inputData: any = {
      title: title.value,
      description: description.value,
      saleSite: saleSite.value,
      image: image.files![0],
      media: "image",
    };
    if (this.options.length > 0) {
      inputData["options"]! = this.options;
    }
    return inputData;
  }
}
