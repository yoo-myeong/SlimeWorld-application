import { Dialog } from "./../components/dialog/dialog.js";
import { HttpClient } from "./../network/http.js";
import { AuthService, AuthServiceConstructor } from "../service/auth.js";
import { DialogConstructor } from "../components/dialog/dialog.js";
import { LoginInputSection } from "../components/dialog/section/login-input.js";
import { JoinInputSection } from "../components/dialog/section/signup-input.js";

export class AuthProvider {
  private loginBtn = document.querySelector("#login__button")! as HTMLButtonElement;
  private logoutBtn = document.querySelector("#logout__button")! as HTMLButtonElement;
  private authService: AuthService;
  private dialog?: Dialog;
  constructor(service: AuthServiceConstructor, dialogConstructor: DialogConstructor) {
    this.authService = new service(HttpClient);
    this.SetOnClickEventListener(this.loginBtn, this.GetLoginClickListener(dialogConstructor));
    this.SetOnClickEventListener(this.logoutBtn, this.GetLogoutClickListener());
    this.authRequest(this.authService).then((btnName) => {
      this.exposeAuthButton(btnName);
    });
  }

  SetOnClickEventListener(button: HTMLButtonElement, listener: () => void) {
    button.onclick = listener;
  }

  GetLoginClickListener(dialogConstructor: DialogConstructor) {
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
    loginInputSection.setOnJoinListener(this.getJoinListener(loginInputSection));
    return loginInputSection;
  }

  getLoginInputSubmitListenr(loginInputSection: LoginInputSection) {
    return async () => {
      const data = loginInputSection.getAllInputData();
      try {
        await this.authService.login(data);
        location.reload();
      } catch (error) {
        console.error(error);
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        loginInputSection.email = "";
        loginInputSection.password = "";
      }
    };
  }

  getJoinListener(loginInputSection: LoginInputSection) {
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

  GetLogoutClickListener() {
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
}
