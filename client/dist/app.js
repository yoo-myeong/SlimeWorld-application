import { VideoComponent } from "./components/page/item/video.js";
import { ImageSectionInput } from "./components/dialog/input/image-input.js";
import { VideoSectionInput } from "./components/dialog/input/video-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
import { ButtonComponent } from "./components/upload/button/button.js";
import { UploadContainer } from "./components/upload/upload.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { LoginSectionInput } from "./components/dialog/input/login-input.js";
import { SearchSectionInput } from "./components/dialog/input/search-input.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        const upload = new UploadContainer();
        this.page.addChild(upload);
        const imageBtn = new ButtonComponent("image", "이미지");
        const videoBtn = new ButtonComponent("video", "비디오");
        upload.addChild(imageBtn, videoBtn);
        imageBtn.setOnClickListener(this.GetMediaButtonEventListener(ImageSectionInput, ImageComponent));
        videoBtn.setOnClickListener(this.GetMediaButtonEventListener(VideoSectionInput, VideoComponent));
        const loginBtn = document.querySelector("#login__button");
        loginBtn.onclick = this.GetButtonDialogEventListener(LoginSectionInput);
        const searchBtn = document.querySelector("#search__button");
        searchBtn.onclick = this.GetButtonDialogEventListener(SearchSectionInput);
    }
    GetButtonDialogEventListener(formConstructor) {
        return () => {
            const dialog = new InputDialog();
            const form = new formConstructor();
            dialog.addChild(form);
            dialog.attachTo(this.dialogRoot);
        };
    }
    GetMediaButtonEventListener(mediaFormConstructor, mediaConstructor) {
        return () => {
            const dialog = new InputDialog();
            const form = new mediaFormConstructor();
            dialog.addChild(form);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnSubmitListenr(() => {
                const media = new mediaConstructor(form.title, form.url);
                this.page.addItem(media);
                dialog.removeFrom(this.dialogRoot);
            });
        };
    }
}
new App(document.querySelector(".document"), document.body);
