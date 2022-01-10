import { ClientNetwork } from "../../../network/http.js";
import AuthService from "../../../service/auth.js";
import { ButtonComponent } from "../../upload/button/button.js";
import { BaseComponent, Component } from "./../../component.js";

export interface InputSection extends Component {
  setOnSubmitListenr(SubmitListenr: () => void): void;
}

export class LoginSectionInput extends BaseComponent<HTMLElement> implements InputSection {
  private service: AuthService;
  private SubmitListenr?: () => void;

  constructor(network: ClientNetwork) {
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
          </div>`);

    const SignupDialogbutton = new ButtonComponent("signup", "회원가입");
    SignupDialogbutton.attachTo(this.element, "beforeend");

    this.service = new AuthService(network);
    const submitBtn = this.element.querySelector("#submit__button")! as HTMLElement;
    submitBtn.onclick = async () => {
      try {
        await this.service.login({ email: this.email, password: this.password });
        this.SubmitListenr && this.SubmitListenr();
        location.reload();
      } catch (error) {
        alert("아이디 또는 비밀번호가 잘못 입력 되었습니다.");
        this.email = "";
        this.password = "";
      }
    };
  }

  private get email(): string {
    const element = this.element.querySelector("#email")! as HTMLInputElement;
    return element.value;
  }
  private get password(): string {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    return element.value;
  }
  private set email(text: string) {
    const element = this.element.querySelector("#email")! as HTMLInputElement;
    element.value = text;
  }
  private set password(text: string) {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    element.value = text;
  }

  async setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
  }
}
