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
        <img class="image__thumbnail" />
        <p class="image__description">설명: </p>
        <a class="image__saleSite">판매처: </a>
      </div>
    </section>
    `);

    const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement;
    imageElement.src = data.mediaURL;
    imageElement.alt = data.title;
    imageElement.style.width = "300px";
    imageElement.style.height = "200px";

    const titleElement = this.element.querySelector(".image__title")! as HTMLParagraphElement;
    titleElement.textContent += data.title;

    const description = this.element.querySelector(".image__description")! as HTMLParagraphElement;
    description.textContent += data.description;

    const saleSite = this.element.querySelector(".image__saleSite")! as HTMLAnchorElement;
    saleSite.href = data.saleSite;
    saleSite.textContent += data.saleSite;
  }
}
