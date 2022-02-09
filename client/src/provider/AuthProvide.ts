import { Dialog } from "../components/dialog/dialog.js";
import { HttpClient } from "../connection/http.js";
import { AuthService, AuthServiceConstructor } from "../service/auth.js";
import { DialogConstructor } from "../components/dialog/dialog.js";
import { LoginInputSection } from "../components/dialog/section/login-input.js";
import { JoinInputSection } from "../components/dialog/section/signup-input.js";
import { App } from "../app.js";

export interface Authorize {
  authService: AuthService;
}

export class AuthProvider implements Authorize {
  public authService: AuthService;
  private loginBtn = document.querySelector("#login__button")! as HTMLButtonElement;
  private logoutBtn = document.querySelector("#logout__button")! as HTMLButtonElement;
  private dialog?: Dialog;
  constructor(serviceConstructor: AuthServiceConstructor, private dialogConstructor: DialogConstructor) {
    this.authService = new serviceConstructor(HttpClient);
  }

  static async build(
    serviceConstructor: AuthServiceConstructor,
    dialogConstructor: DialogConstructor
  ): Promise<Authorize> {
    const auth = new AuthProvider(serviceConstructor, dialogConstructor);
    auth.setOnAuthButtonClickListener();
    await auth.getUser();
    return auth;
  }

  setOnAuthButtonClickListener() {
    this.loginBtn.onclick = this.getLoginClickListener();
    this.logoutBtn.onclick = this.getLogoutClickListener();
  }

  getLoginClickListener() {
    return () => {
      this.dialog = new this.dialogConstructor();
      const loginInputSection = this.getLoginInputSection();
      this.dialog.addChild(loginInputSection);
      this.dialog.attachTo(document.body);
    };
  }

  getLoginInputSection() {
    const loginInputSection = new LoginInputSection();
    loginInputSection.setOnSubmitListenr(this.getLoginInputSubmitListenr(loginInputSection));
    loginInputSection.setOnJoinListener(this.getJoinClickListener(loginInputSection));
    return loginInputSection;
  }

  getLoginInputSubmitListenr(loginInputSection: LoginInputSection) {
    return async () => {
      const data = loginInputSection.getAllInputData();
      try {
        const user = await this.authService.login(data);
        this.dialog?.removeFrom(document.body);
        this.exposeAuthButton("logoutBtn");
        this.hideAuthButton("loginBtn");
        App.username = user.username;
        App.position = user.position;
        App.reloadPage();
      } catch (error) {
        console.error(error);
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        loginInputSection.email = "";
        loginInputSection.password = "";
      }
    };
  }

  getJoinClickListener(loginInputSection: LoginInputSection) {
    return () => {
      this.dialog && this.dialog.removeChild(loginInputSection);
      this.dialog && this.dialog.addChild(this.getJoinInputSection());
    };
  }

  getJoinInputSection() {
    const joinInputSection = new JoinInputSection();
    joinInputSection.setOnSubmitListenr(this.getJoinInputSubmitListener(joinInputSection));
    return joinInputSection;
  }

  getJoinInputSubmitListener(joinInputSection: JoinInputSection) {
    return async () => {
      try {
        joinInputSection.checkInputNotEmpty();
        joinInputSection.checkPassword();
        const data = joinInputSection.getAllInputData();
        await this.authService.singup(data);
        location.reload();
      } catch (error) {
        alert(error);
      }
    };
  }

  getLogoutClickListener() {
    return async () => {
      await this.authService.logout();
      App.username = undefined;
      App.position = undefined;
      App.reloadPage();
    };
  }

  async getUser(): Promise<void> {
    try {
      const user = await this.authService.me();
      App.username = user.username;
      App.position = user.position;
      this.exposeAuthButton("logoutBtn");
      this.hideAuthButton("loginBtn");
    } catch (error) {
      this.exposeAuthButton("loginBtn");
      this.hideAuthButton("logoutBtn");
      throw error;
    }
  }

  exposeAuthButton(buttonName: "loginBtn" | "logoutBtn"): void {
    this[buttonName].classList.remove("hidden");
  }

  hideAuthButton(buttonName: "loginBtn" | "logoutBtn") {
    this[buttonName].classList.add("hidden");
  }
}
