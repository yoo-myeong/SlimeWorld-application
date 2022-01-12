import { Dialog } from "./../components/dialog/dialog.js";
import { HttpClient } from "./../network/http.js";
import { AuthService, AuthServiceConstructor } from "../service/auth.js";
import { DialogConstructor } from "../components/dialog/dialog.js";
import { LoginInputSection } from "../components/dialog/section/login-input.js";
import { JoinInputSection } from "../components/dialog/section/signup-input.js";

export interface Authorize {
  authService: AuthService;
}

export class AuthProvider implements Authorize {
  private loginBtn = document.querySelector("#login__button")! as HTMLButtonElement;
  private logoutBtn = document.querySelector("#logout__button")! as HTMLButtonElement;
  public authService: AuthService;
  private dialog?: Dialog;
  constructor(serviceConstructor: AuthServiceConstructor, dialogConstructor: DialogConstructor) {
    this.authService = new serviceConstructor(HttpClient);
    this.setOnClickEventListener(this.loginBtn, this.getLoginClickListener(dialogConstructor));
    this.setOnClickEventListener(this.logoutBtn, this.getLogoutClickListener());
    this.authRequest(this.authService).then((btnName) => {
      this.exposeAuthButton(btnName);
    });
  }

  setOnClickEventListener(button: HTMLButtonElement, listener: () => void) {
    button.onclick = listener;
  }

  getLoginClickListener(dialogConstructor: DialogConstructor) {
    return () => {
      this.dialog = new dialogConstructor();
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
        await this.authService.login(data);
        this.dialog?.removeFrom(document.body);
        this.exposeAuthButton("logoutBtn");
        this.hideAuthButton("loginBtn");
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
    return () => {
      this.authService.logout();
      location.reload();
    };
  }

  async authRequest(authService: AuthService): Promise<"loginBtn" | "logoutBtn"> {
    let buttonName: "loginBtn" | "logoutBtn";
    try {
      await authService.me();
      buttonName = "logoutBtn";
    } catch (err) {
      console.log(err);
      buttonName = "loginBtn";
    }
    return buttonName;
  }

  exposeAuthButton(buttonName: "loginBtn" | "logoutBtn") {
    this[buttonName].classList.remove("hidden");
  }

  hideAuthButton(buttonName: "loginBtn" | "logoutBtn") {
    this[buttonName].classList.add("hidden");
  }
}
