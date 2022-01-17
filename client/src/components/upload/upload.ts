import { VideoInputSection } from "./../dialog/section/video-input.js";
import { ImageInputSection } from "./../dialog/section/image-input.js";
import { Component, BaseComponent } from "../component.js";
import { Dialog, DialogConstructor, InputSection, InputSectionConstructor } from "../dialog/dialog.js";
import { buttonContainerConstructor } from "./button/button.js";
import { postService, postServiceConstructor } from "../../service/media.js";
import { HttpClient } from "../../network/http.js";
import { App } from "../../app.js";

export class UploadComponent extends BaseComponent<HTMLElement> {
  private postService: postService;
  private dialog?: Dialog;
  constructor(
    private dialogMaker: DialogConstructor,
    button: buttonContainerConstructor,
    service: postServiceConstructor
  ) {
    super(`<div class="post__container">uploadcontainer test</div>`);
    this.postService = new service(HttpClient);
    const videoBtn = new button("video__button", "비디오");
    const imageBtn = new button("image__button", "이미지");
    imageBtn.setOnClickListener(this.getClickListener(ImageInputSection, "file"));
    videoBtn.setOnClickListener(this.getClickListener(VideoInputSection, "json"));
    this.addChilds(videoBtn, imageBtn);
  }

  getClickListener(section: InputSectionConstructor, postType: "json" | "file") {
    return () => {
      this.dialog = new this.dialogMaker();
      const inputSection = new section();
      inputSection.setOnSubmitListenr(this.getSectionSubmitListener(inputSection, postType));
      this.dialog.addChild(inputSection);
      this.dialog.attachTo(document.body);
    };
  }

  getSectionSubmitListener(inputSection: InputSection, postType: "json" | "file") {
    return () => {
      try {
        const formdata = inputSection.getAllInputData();
        this.postService.post(formdata, postType);
        this.dialog && this.dialog.removeFrom(document.body);
        App.reloadPage();
      } catch (error) {
        alert(error);
      }
    };
  }

  addChild(component: Component): void {
    component.attachTo(this.element);
  }

  addChilds(...components: Component[]): void {
    components.forEach((component) => {
      component.attachTo(this.element);
    });
  }
}
