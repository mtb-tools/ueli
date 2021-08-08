import mitt, { Emitter } from "mitt";
import { NotificationData } from "./NotificationData";

export const vueEventEmitter: Emitter<{
    GlobalKeyDown: KeyboardEvent;
    UserInputArrowKeyPressed: "ArrowUp" | "ArrowDown";
    UserInputEnterPressed: boolean;
    MainWindowShown: void;
    Notification: NotificationData;
}> = mitt();
