import { BaseComponent } from "../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page-item">
            <div class="page-item__controls">
              <button class="close">&times;</button>
              <button class="like">좋아요버튼</button>
            </div>
            <section class="page-item__body"></section>
          </li>`);
        const closeBtn = this.element.querySelector(".close");
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container, "afterbegin");
    }
    setOnCloseListener(parent) {
        this.closeListener = () => this.removeFrom(parent);
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
    }
    addChild(section, position = "beforebegin") {
        section.attachTo(this.element, position);
    }
    addItem(child) {
        const item = new this.pageItemConstructor();
        item.addChild(child);
        item.attachTo(this.element, "beforeend");
        item.setOnCloseListener(this.element);
    }
}
