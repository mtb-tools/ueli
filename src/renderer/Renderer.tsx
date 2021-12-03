import { initializeIcons } from "@fluentui/react";
import React from "react";
import { render } from "react-dom";
import { MainApp } from "./MainApp";

initializeIcons();

document.addEventListener("DOMContentLoaded", () =>
    render(<MainApp ipcRenderer={window.ipcRenderer}></MainApp>, document.getElementById("react-app"))
);
