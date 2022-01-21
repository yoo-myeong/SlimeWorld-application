import { BaseComponent } from "../../component.js";

type ImageMediaData = {
  title: string;
  createdAt: string;
  mediaURL: string;
  description: string;
  saleSite: string;
};

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(data: ImageMediaData) {
    super(`
    <section class="imgae">
      <div class="image__holder">
        <h3 class="image__title">제목: </h3>
        <div class="image__container">
          <img class="image__thumbnail" />
          <p class="image__description">글: </p>
          <a class="image__saleSite"></a>
        </div>
      </div>
    </section>
    `);

    const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement;
    imageElement.src = data.mediaURL;
    imageElement.alt = data.title;

    const titleElement = this.element.querySelector(".image__title")! as HTMLParagraphElement;
    titleElement.textContent += data.title;

    const description = this.element.querySelector(".image__description")! as HTMLParagraphElement;
    description.textContent += data.description;

    const saleSite = this.element.querySelector(".image__saleSite")! as HTMLAnchorElement;
    saleSite.href = data.saleSite;
    saleSite.textContent += "새 탭에서 판매처 열기";
  }
}
