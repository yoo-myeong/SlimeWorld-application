import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class ImageInputSection extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
  constructor() {
    super(`<div class="upload__Container">
              <h3>이미지 업로드</h3>
              <form id = "upload__form" name = "upload__form">
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
                  <input type="text" id="option" />
              </div>
              <div class="form__container">
                  <label for="image">사진등록</label>
                  <input type="file" id="image" />
              </div>
              </form>
              <button id="submit__button">등록</button>
          </div>`);
    const submitButton = this.element.querySelector("#submit__button")! as HTMLButtonElement;
    submitButton.onclick = async () => {
      this.SubmitListenr && this.SubmitListenr();
    };
  }
  public get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  public get url(): string {
    const element = this.element.querySelector("#option")! as HTMLInputElement;
    return element.value;
  }

  setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
  }

  getAllInputData() {
    const title = this.element.querySelector("#title")! as HTMLInputElement;
    const description = this.element.querySelector("#description")! as HTMLInputElement;
    const saleSite = this.element.querySelector("#saleSite")! as HTMLInputElement;
    const image = this.element.querySelector("#image")! as HTMLInputElement;
    const inputData = {
      title: title.value,
      description: description.value,
      saleSite: saleSite.value,
      image: image.files![0],
    };
    return inputData;
  }
}
