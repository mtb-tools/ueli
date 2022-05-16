import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "./Components/SettingsWindow/Settings";

const rootElement = document.getElementById("app");

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <Settings />
        </BrowserRouter>
    );
}
