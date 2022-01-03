import { BaseComponent } from "../../component.js";
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`
    <section class="imgae">
      <div class="image__holder">
        <h3 class="image__title"></h3>
        <img class="image__thumbnail" />
      </div>
    </section>
    `);
        const imageElement = this.element.querySelector(".image__thumbnail");
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector(".image__title");
        titleElement.textContent = title;
    }
}
