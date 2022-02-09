import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(section: Component, position?: InsertPosition): void;
}
export interface PageComposable extends Composable {
  addItem(item: Component, closeListener: () => Promise<void>, tagListener: () => Promise<tagList[]>): void;
}

interface PageItemContainer extends Component, Composable {
  setOnCloseListener(parent: HTMLElement, listener: () => Promise<void>): void;
  setTagBtnListener(listener: () => Promise<tagList[]>): void;
}

type PageItemContainerConstructor = {
  new (): PageItemContainer;
};

type OnListener = () => void;
type tagList = {
  option: string;
};
type OnPromiseListener = () => Promise<tagList[]>;

export class PageItemComponent extends BaseComponent<HTMLElement> implements PageItemContainer {
  private closeListener?: OnListener;
  private tagBtnListener?: OnPromiseListener;
  private tagBtnClickCnt: number = 0;
  constructor() {
    super(`<li class="page-item">
            <div class="tag__container"></div>
            <div class="page-item__controls">
              <button class="close">삭제&times;</button>
              <button class="tag__button" style="float:left">태그</button>
            </div>
            <section class="page-item__body"></section>
          </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const tagBtn = this.element.querySelector(".tag__button")! as HTMLButtonElement;
    tagBtn.onclick = () => {
      const container = this.element.querySelector(".tag__container")! as HTMLDivElement;
      if (this.tagBtnClickCnt % 2 !== 0) {
        container.innerHTML = "";
      } else {
        this.tagBtnListener &&
          this.tagBtnListener().then((tags: tagList[]) => {
            tags.forEach((tag: tagList) => {
              const tagName = tag.option;
              container.innerHTML += `<div class="option__container">
                  ${tagName}
              </div>`;
            });
          });
      }
      this.tagBtnClickCnt++;
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container, "afterbegin");
  }

  setOnCloseListener(parent: HTMLElement, listener: () => Promise<void>) {
    this.closeListener = () => {
      listener()
        .then(() => {
          this.removeFrom(parent);
        })
        .catch((error) => {
          alert(error);
        });
    };
  }

  setTagBtnListener(listener: () => Promise<tagList[]>): void {
    this.tagBtnListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements PageComposable {
  constructor(private pageItemConstructor: PageItemContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component, position: InsertPosition = "beforebegin") {
    section.attachTo(this.element, position);
  }

  addItem(item: Component, closeListener: () => Promise<void>, tagListener: () => Promise<tagList[]>): void {
    const pageItem = new this.pageItemConstructor();
    pageItem.addChild(item);
    pageItem.attachTo(this.element, "beforeend");
    pageItem.setOnCloseListener(this.element, closeListener);
    pageItem.setTagBtnListener(tagListener);
  }
}
