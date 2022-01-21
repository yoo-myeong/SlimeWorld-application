import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class LoginInputSection extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
  private JoinListener?: () => void;
  constructor() {
    super(`<div class="Login__Container">
              <h3>로그인</h3>
              <div class="form__container">
                  <label for="email">이메일</label>
                  <input type="email" id="email" />
              </div>
              <div class="form__container">
                  <label for="password">비밀번호</label>
                  <input type="password" id="password" />
              </div>
              <button id="submit__button">로그인</button>
              <button id="join__button">회원가입</button>
          </div>`);
    const submitButton = this.element.querySelector("#submit__button")! as HTMLButtonElement;
    submitButton.onclick = async () => {
      this.SubmitListenr && this.SubmitListenr();
    };
    const joinButton = this.element.querySelector("#join__button")! as HTMLButtonElement;
    joinButton.onclick = async () => {
      this.JoinListener && this.JoinListener();
    };
  }

  set email(text: string) {
    const element = this.element.querySelector("#email")! as HTMLInputElement;
    element.value = text;
  }
  set password(text: string) {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    element.value = text;
  }

  getAllInputData(): { email: string; password: string } {
    const email = this.element.querySelector("#email")! as HTMLInputElement;
    const password = this.element.querySelector("#password")! as HTMLInputElement;
    return { email: email.value, password: password.value };
  }

  setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
  }

  setOnJoinListener(JoinListener: () => void) {
    this.JoinListener = JoinListener;
  }
}
