import { BaseComponent } from "./../../component.js";
export class SearchSectionInput extends BaseComponent {
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
    get userId() {
        const element = this.element.querySelector("#userId");
        return element.value;
    }
    get password() {
        const element = this.element.querySelector("#password");
        return element.value;
    }
}
