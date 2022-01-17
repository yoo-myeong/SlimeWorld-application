import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { PageComponent, PageComposable, PageItemComponent } from "./components/page/page.js";
import { ButtonComponent } from "./components/upload/button/button.js";
import { UploadComponent } from "./components/upload/upload.js";
import { AuthProvider } from "./context/AuthContext.js";
import { AuthFetchService } from "./service/auth.js";
import { mediaFetchService } from "./service/media.js";

export const baseURL = "http://localhost:8080";

export class App {
  static username?: string;
  static position?: string;
  private readonly page: Component & PageComposable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    AuthProvider.build(AuthFetchService, InputDialog).then(() => {
      if (App.position === "seller") {
        const post = new UploadComponent(InputDialog, ButtonComponent, mediaFetchService);
        this.page.addChild(post);
      }
    });
  }

  static reloadPage() {
    const main = document.querySelector(".document")! as HTMLElement;
    main.innerHTML = "";
    new App(document.querySelector(".document")! as HTMLElement);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
