import { BaseComponent } from "./../../component.js";
export class LoginSectionInput extends BaseComponent {
    constructor() {
        super(`<div>
            <h3>로그인</h3>
            <div class="form__container">
                <label for="userId">아이디</label>
                <input type="text" id="userId" />
            </div>
            <div class="form__container">
                <label for="password">비밀번호</label>
                <input type="text" id="password" />
            </div>
        </div>`);
    }
    get userId() {
        const element = this.element.querySelector("#userId");
        return element.value;
    }
    get password() {
        const element = this.element.querySelector("#password");
        return element.value;
    }
}
