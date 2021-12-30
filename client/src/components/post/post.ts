import { dialogContainer } from "./../dialog/dialog.js";
import { BaseComponent, Component } from "../component.js";
import { buttonContainer } from "./button/button.js";
import { PageComposable } from "../page/page.js";
import { ImageSectionInput } from "../dialog/input/image-input.js";
import { ImageComponent } from "../page/item/image.js";

type buttonContainerConstructor = {
  new (buttonId: string, buttonName: string): buttonContainer;
};

type dialogContainerConstructor = {
  new (): dialogContainer;
};

export class PostComponent
  extends BaseComponent<HTMLElement>
  implements Component
{
  constructor(
    private Button: buttonContainerConstructor,
    private Dialog: dialogContainerConstructor,
    private Page: PageComposable,
    private DialogRoot: HTMLElement
  ) {
    super(`<div class="post__container"></div>`);
    const dialog = new this.Dialog();
    const ImageButton = new this.Button("image", "이미지");
    const VideoButton = new this.Button("video", "비디오");
    const dialogRoot = this.DialogRoot;
    ImageButton.setOnClickListener(() => {
      dialog.createDialog(
        ImageSectionInput,
        ImageComponent,
        this.Page,
        dialogRoot
      );
    });
    this.addChild(ImageButton);
    this.addChild(VideoButton);
  }

  addChild(child: Component): void {
    const container = this.element! as HTMLElement;
    child.attachTo(container);
  }
}
