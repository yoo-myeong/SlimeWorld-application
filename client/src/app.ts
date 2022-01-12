import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { PageComponent, PageComposable, PageItemComponent } from "./components/page/page.js";
import { AuthProvider } from "./context/AuthContext.js";
import { AuthFetchService } from "./service/auth.js";

export const baseURL = "http://localhost:8080";

class App {
  private readonly page: Component & PageComposable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    new AuthProvider(AuthFetchService, InputDialog);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
