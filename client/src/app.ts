import { VideoComponent } from "./components/page/item/video.js";
import { Component } from "./components/component.js";
import { ImageSectionInput } from "./components/dialog/input/image-input.js";
import { VideoSectionInput } from "./components/dialog/input/video-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent, PageComposable, PageItemComponent } from "./components/page/page.js";
import { ButtonComponent } from "./components/upload/button/button.js";
import { UploadContainer } from "./components/upload/upload.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { InputSection, LoginSectionInput } from "./components/dialog/input/login-input.js";
import { SearchSectionInput } from "./components/dialog/input/search-input.js";
import HttpClient, { ClientNetwork } from "./network/http.js";
import AuthService from "./service/auth.js";

const baseURL = "http://localhost:8080";

type SectionContainerConstructor = {
  new (network: ClientNetwork): InputSection;
};

type OnEventListener = () => void;

class App {
  private readonly page: Component & PageComposable;
  private username?: string;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    const network = new HttpClient(baseURL);
    const searchBtn = document.querySelector("#search__button")! as HTMLButtonElement;
    searchBtn.onclick = this.GetCreateDialogListener(SearchSectionInput, network);

    this.SetAuthState(network);

    //////////////////////////미디어 삽입 테스트
    const image = new ImageComponent("테스트이미지", "https://file.mk.co.kr/mkde/N0/2021/11/20211111_5012821_1636609089.jpeg");
    this.page.addItem(image);
    const video = new VideoComponent("테스트비디오", "https://www.youtube.com/watch?v=mzQDuGeTZhg");
    this.page.addItem(video);
  }

  SetAuthState(network: ClientNetwork) {
    const loginBtn = document.querySelector("#login__button")! as HTMLButtonElement;
    const logoutBtn = document.querySelector("#logout_button")! as HTMLButtonElement;
    const service = new AuthService(network);
    loginBtn.onclick = this.GetCreateDialogListener(LoginSectionInput, network);
    logoutBtn.onclick = () => {
      service.logout();
      location.reload();
    };
    service
      .me()
      .then((res) => {
        this.exposeLogoutButton(loginBtn, logoutBtn);
        this.username = res.username;
        if (res.position === "seller") this.SetSellerButtonContainer(network);
        console.log(`username=${this.username}`);
      })
      .catch((err) => {
        console.error(err);
        this.exposeLoginButton(loginBtn, logoutBtn);
      });
  }

  exposeLoginButton(loginBtn: HTMLElement, logoutBtn: HTMLElement) {
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }

  exposeLogoutButton(loginBtn: HTMLElement, logoutBtn: HTMLElement) {
    logoutBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
  }

  SetSellerButtonContainer(network: ClientNetwork) {
    const upload = new UploadContainer();
    this.page.addChild(upload);
    const imageBtn = new ButtonComponent("image", "이미지");
    const videoBtn = new ButtonComponent("video", "비디오");
    upload.addChild(imageBtn, videoBtn);
    imageBtn.setOnClickListener(this.GetCreateDialogListener(ImageSectionInput, network));
    videoBtn.setOnClickListener(this.GetCreateDialogListener(VideoSectionInput, network));
  }

  GetRemoveFromPageListener(component: Component): OnEventListener {
    return () => {
      component.removeFrom(this.dialogRoot);
    };
  }

  GetCreateDialogListener(sectionConstructor: SectionContainerConstructor, network: ClientNetwork): OnEventListener {
    return () => {
      const dialog = new InputDialog(this.dialogRoot);
      const section = new sectionConstructor(network);
      dialog.addChild(section);
      section.setOnSubmitListenr(this.GetRemoveFromPageListener(dialog));
    };
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
