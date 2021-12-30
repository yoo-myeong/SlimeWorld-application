import { InputDialog } from "./components/dialog/dialog.js";
import { Component } from "./components/component.js";
import { VideoComponent } from "./components/page/item/video.js";
import {
  PageComponent,
  PageComposable,
  PageItemComponent,
} from "./components/page/page.js";
import { PostComponent } from "./components/post/post.js";
import { ButtonComponent } from "./components/post/button/button.js";

class App {
  private readonly page: Component & PageComposable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const video = new VideoComponent(
      "비디오임돠",
      "https://www.youtube.com/watch?v=8WNwZGcYbOU"
    );
    this.page.addItem(video);

    const post = new PostComponent(
      ButtonComponent,
      InputDialog,
      this.page,
      dialogRoot
    );
    this.page.addChild(post);
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
