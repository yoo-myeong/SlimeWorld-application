import { ImageInputSection } from "./../dialog/section/image-input.js";
import { Component, BaseComponent } from "../component.js";
import { DialogConstructor, InputSection, InputSectionConstructor } from "../dialog/dialog.js";
import { buttonContainerConstructor } from "./button/button.js";
import { postService, postServiceConstructor } from "../../service/media.js";
import { HttpClient } from "../../network/http.js";

export class UploadComponent extends BaseComponent<HTMLElement> {
  private postService: postService;
  constructor(button: buttonContainerConstructor, private dialog: DialogConstructor, service: postServiceConstructor) {
    super(`<div class="post__container">uploadcontainer test</div>`);
    this.postService = new service(HttpClient);
    const videoBtn = new button("video__button", "비디오");
    const imageBtn = new button("image__button", "이미지");
    imageBtn.setOnClickListener(this.getClickListener(ImageInputSection));
    this.addChilds(videoBtn, imageBtn);
  }

  getClickListener(section: InputSectionConstructor) {
    return () => {
      const dialog = new this.dialog();
      const inputSection = new section();
      inputSection.setOnSubmitListenr(this.getSubmitListener(inputSection));
      dialog.addChild(inputSection);
      dialog.attachTo(document.body);
    };
  }

  getSubmitListener(inputSection: InputSection) {
    return () => {
      const formdata = inputSection.getAllInputData();
      this.postService.imagePost(formdata);
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
