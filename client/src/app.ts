import { VideoComponent } from "./components/page/item/video.js";
import { Component } from "./components/component.js";
import { ImageContainer, ImageSectionInput } from "./components/dialog/input/image-input.js";
import { VideoContainer, VideoSectionInput } from "./components/dialog/input/video-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent, PageComposable, PageItemComponent } from "./components/page/page.js";
import { ButtonComponent } from "./components/upload/button/button.js";
import { UploadContainer } from "./components/upload/upload.js";
import { InputDialog } from "./components/dialog/dialog.js";

type formContainerConstructor = {
  new (): ImageContainer | VideoContainer;
};

type mediaComponentConstructor = {
  new (title: string, url: string): Component;
};

type OnEventListener = () => void;

class App {
  private readonly page: Component & PageComposable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const upload = new UploadContainer();
    this.page.addChild(upload);
    const imageBtn = new ButtonComponent("image", "이미지");
    const videoBtn = new ButtonComponent("video", "비디오");
    upload.addChild(imageBtn, videoBtn);
    imageBtn.setOnClickListener(this.GetMediaButtonEventListener(ImageSectionInput, ImageComponent));
    videoBtn.setOnClickListener(this.GetMediaButtonEventListener(VideoSectionInput, VideoComponent));

    const loginBtn = document.querySelector("#login__button")! as HTMLButtonElement;
    loginBtn.onclick = this.GetMediaButtonEventListener(ImageSectionInput, ImageComponent);
  }

  GetMediaButtonEventListener(formConstructor: formContainerConstructor, mediaConstructor: mediaComponentConstructor): OnEventListener {
    return () => {
      const dialog = new InputDialog();
      const form = new formConstructor();
      dialog.addChild(form);
      dialog.attachTo(this.dialogRoot);
      dialog.setOnSubmitListenr(() => {
        const media = new mediaConstructor(form.title, form.url);
        this.page.addItem(media);
        dialog.removeFrom(this.dialogRoot);
      });
    };
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
