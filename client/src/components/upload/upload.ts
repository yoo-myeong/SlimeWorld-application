import { VideoInputSection } from "./../dialog/section/video-input.js";
import { ImageInputSection } from "./../dialog/section/image-input.js";
import { Component, BaseComponent } from "../component.js";
import { Dialog, DialogConstructor, InputSection, InputSectionConstructor } from "../dialog/dialog.js";
import { buttonContainerConstructor } from "../button/button.js";
import { mediaService, mediaServiceConstructor } from "../../service/media.js";
import { HttpClient } from "../../connection/http.js";
import { App } from "../../app.js";

export interface uploadServiceContainer extends Component {
  service: mediaService;
  createUploadButton(): void;
}

export class UploadComponent extends BaseComponent<HTMLElement> {
  private dialog?: Dialog;
  public readonly service: mediaService;
  constructor(
    private dialogBuilder: DialogConstructor,
    private buttonBuilder: buttonContainerConstructor,
    serviceBuilder: mediaServiceConstructor
  ) {
    super(`<div class="post__container"></div>`);
    this.service = new serviceBuilder(HttpClient);
  }

  createUploadButton(): void {
    const videoBtn = new this.buttonBuilder("video__button", "비디오");
    const imageBtn = new this.buttonBuilder("image__button", "이미지");
    imageBtn.setOnClickListener(this.getClickListener(ImageInputSection, "file"));
    videoBtn.setOnClickListener(this.getClickListener(VideoInputSection, "json"));
    this.addChilds(videoBtn, imageBtn);
  }

  getClickListener(section: InputSectionConstructor, postType: "json" | "file") {
    return () => {
      this.dialog = new this.dialogBuilder();
      const inputSection = new section();
      inputSection.setOnSubmitListenr(this.getSectionSubmitListener(inputSection, postType));
      this.dialog.addChild(inputSection);
      this.dialog.attachTo(document.body);
    };
  }

  getSectionSubmitListener(inputSection: InputSection, postType: "json" | "file") {
    return async () => {
      try {
        const formdata = inputSection.getAllInputData();
        await this.service.postMedia(formdata, postType);
        this.dialog && this.dialog.removeFrom(document.body);
        App.reloadPage();
      } catch (error) {
        alert(error);
      }
    };
  }

  addChilds(...components: Component[]): void {
    components.forEach((component) => {
      component.attachTo(this.element);
    });
  }
}
