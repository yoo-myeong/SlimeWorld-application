import { VideoComponent } from "./components/page/item/video.js";
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { PageComponent, PageComposable, PageItemComponent } from "./components/page/page.js";
import { ButtonComponent } from "./components/button/button.js";
import { UploadComponent, uploadServiceContainer } from "./components/upload/upload.js";
import { AuthProvider } from "./provider/AuthProvide.js";
import { AuthFetchService } from "./service/auth.js";
import { mediaFetchService } from "./service/media.js";
import { ImageComponent } from "./components/page/item/image.js";

export const baseURL = document.getElementById("backendURL")!.innerText as string;

export class App {
  static username?: string;
  static position?: string;
  private readonly page: Component & PageComposable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    const upload: uploadServiceContainer = new UploadComponent(InputDialog, ButtonComponent, mediaFetchService);
    AuthProvider.build(AuthFetchService, InputDialog).then(() => {
      if (App.position === "seller") {
        upload.createUploadButton();
        this.page.addChild(upload);
      }
    });
    this.createMedia(upload);
  }

  static reloadPage() {
    const main = document.querySelector(".document")! as HTMLElement;
    main.innerHTML = "";
    new App(document.querySelector(".document")! as HTMLElement);
  }

  async createMedia(upload: uploadServiceContainer) {
    const media: Array<any> = await upload.service.getMedia();
    media.forEach((mediaElement) => {
      if (mediaElement.media === "video") {
        const item = new VideoComponent(mediaElement);
        this.page.addItem(item);
      } else if (mediaElement.media === "image") {
        const item = new ImageComponent(mediaElement);
        this.page.addItem(item);
      }
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement);
