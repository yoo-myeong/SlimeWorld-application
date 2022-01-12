import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(section: Component, position?: InsertPosition): void;
}
export interface PageComposable extends Composable {
  addItem(item: Component): void;
}

interface PageItemContainer extends Component, Composable {
  setOnCloseListener(parent: HTMLElement): void;
}

type PageItemContainerConstructor = {
  new (): PageItemContainer;
};

type OncloseListener = () => void;

export class PageItemComponent extends BaseComponent<HTMLElement> implements PageItemContainer {
  private closeListener?: OncloseListener;
  constructor() {
    super(`<li class="page-item">
            <div class="page-item__controls">
              <button class="close">&times;</button>
              <button class="like">좋아요버튼</button>
            </div>
            <section class="page-item__body"></section>
          </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container, "afterbegin");
  }

  setOnCloseListener(parent: HTMLElement) {
    this.closeListener = () => this.removeFrom(parent);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements PageComposable {
  constructor(private pageItemConstructor: PageItemContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component, position: InsertPosition = "beforebegin") {
    section.attachTo(this.element, position);
  }

  addItem(item: Component): void {
    const pageItem = new this.pageItemConstructor();
    pageItem.addChild(item);
    pageItem.attachTo(this.element, "beforeend");
    pageItem.setOnCloseListener(this.element);
  }
}
