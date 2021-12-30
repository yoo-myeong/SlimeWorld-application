import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(section: Component, position?: InsertPosition): void;
}
export interface PageComposable extends Composable {
  addItem(child: Component): void;
}

type OncloseListener = () => void;
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OncloseListener): void;
}
type SectionContainerConstructor = {
  new (): SectionContainer;
};
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer
{
  private closeListener?: OncloseListener;
  constructor() {
    super(`<li class="page-item">
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
            <section class="page-item__body"></section>
          </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container, "afterbegin");
  }

  setOnCloseListener(listener: OncloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements PageComposable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component, position: InsertPosition = "beforebegin") {
    section.attachTo(this.element, position);
  }

  addItem(child: Component): void {
    const item = new this.pageItemConstructor();
    item.addChild(child);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
