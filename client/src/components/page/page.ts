import { BaseComponent } from "../component.js";

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    super(`<ul class="page">페이지컴포넌트임돠</ul>`);
  }
}
