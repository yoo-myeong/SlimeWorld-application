import { BaseComponent } from "../../component.js";
import { InputSection } from "../dialog.js";

export class JoinInputSection extends BaseComponent<HTMLElement> implements InputSection {
  private SubmitListenr?: () => void;
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
                <div class="form__container">
                    <label for="checkingPassword">비밀번호확인</label>
                    <input type="password" id="checkingPassword" />
                </div>
                <div class="form__container">
                    <label for="username">닉네임</label>
                    <input type="username" id="username" />
                </div>
                <div class="form__container">
                    <label for="position">가입종류</label>
                    <select type="position" id="position">
                        <option value="seller">판매자</option>
                        <option value="buyer">구매자</option>
                    </select>
                </div>
                <button id="submit__button">회원가입</button>
            </div>`);
    const submitButton = this.element.querySelector("#submit__button")! as HTMLButtonElement;
    submitButton.onclick = async () => {
      this.SubmitListenr && this.SubmitListenr();
    };
    console.log(this.SubmitListenr);
  }

  get email(): string {
    const element = this.element.querySelector("#email")! as HTMLInputElement;
    return element.value;
  }
  get password(): string {
    const element = this.element.querySelector("#password")! as HTMLInputElement;
    return element.value;
  }
  get password2(): string {
    const element = this.element.querySelector("#checkingPassword")! as HTMLInputElement;
    return element.value;
  }
  get username(): string {
    const element = this.element.querySelector("#username")! as HTMLInputElement;
    return element.value;
  }
  get position(): "seller" | "buyer" {
    const element = this.element.querySelector("#position")! as HTMLInputElement;
    return element.value! as "seller" | "buyer";
  }

  getAllInputData(): { email: string; password: string; username: string; position: "seller" | "buyer" } {
    return {
      email: this.email,
      password: this.password,
      username: this.username,
      position: this.position,
    };
  }

  checkInputNotEmpty() {
    if (!(this.email && this.password && this.password2 && this.username)) {
      throw new Error("모두 기입해주세요.");
    }
  }

  checkPassword() {
    if (this.password.length < 6 || this.password.length > 15) {
      throw new Error("비밀번호는 6자리 이상, 15자리 이하로 작성해주세요");
    }
    if (this.password !== this.password2) {
      throw new Error("비밀번호가 일치하지 않습니다");
    }
  }

  setOnSubmitListenr(SubmitListenr: () => void) {
    this.SubmitListenr = SubmitListenr;
  }
}
