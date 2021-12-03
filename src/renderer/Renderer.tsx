import { initializeIcons } from "@fluentui/react";
import React from "react";
import { render } from "react-dom";
import { IpcChannel } from "../shared/IpcChannel";
import { MainApp } from "./MainApp";

initializeIcons();

window.ipcRenderer.send(IpcChannel.rendererStarted);

document.addEventListener("DOMContentLoaded", () => render(<MainApp />, document.getElementById("react-app")));
