import { BaseComponent } from "../../component.js";

type videoMediaData = {
  title: string;
  createdAt: string;
  mediaURL: string;
  description: string;
  saleSite: string;
};

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(data: videoMediaData) {
    super(
      `<section class="video">
          <div class="video__player">
            <h3 class="video__title">제목: </h3>
            <iframe class="video__iframe"></iframe>
            <p class="video__description">글: </p>
            <a class="video__saleSite" target="_blank"></a>
          </div>
        </section>`
    );
    const titleElement = this.element.querySelector(".video__title")! as HTMLHeadingElement;
    titleElement.textContent += data.title;

    const iframe = this.element.querySelector(".video__iframe")! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(data.mediaURL);

    const description = this.element.querySelector(".video__description")! as HTMLParamElement;
    description.textContent += data.description;

    const saleSite = this.element.querySelector(".video__saleSite")! as HTMLAnchorElement;
    saleSite.href = data.saleSite;
    saleSite.textContent = "새 탭에서 판매처 열기";
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
