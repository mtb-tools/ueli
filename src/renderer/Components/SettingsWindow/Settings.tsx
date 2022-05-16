import { FC, useState } from "react";
import { Stack, StackItem, Theme, ThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { UeliColorThemes } from "../../ColorTheme/UeliColorThemes";
import { Navigation } from "./Navigation";
import { Route, Routes } from "react-router-dom";
import { GeneralSettings } from "./GeneralSettings";
import { SearchEngineSettings } from "./SearchEngineSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { getSettings } from "../../Actions";

initializeIcons();

export const Settings: FC = () => {
    const [colorTheme, setColorTheme] = useState<string>(getSettings().appearanceSettings.colorTheme);
    const getColorTheme = (): Theme => UeliColorThemes[colorTheme] ?? UeliColorThemes["UeliDark"];

    return (
        <ThemeProvider theme={getColorTheme()} style={{ height: "100vh" }}>
            <Stack horizontal>
                <StackItem verticalFill={true}>
                    <Navigation />
                </StackItem>
                <StackItem grow>
                    <Routes>
                        <Route path="/" element={<GeneralSettings />} />
                        <Route path="/search-engine" element={<SearchEngineSettings />} />
                        <Route
                            path="/appearance"
                            element={<AppearanceSettings colorTheme={colorTheme} onColorThemeChanged={setColorTheme} />}
                        />
                    </Routes>
                </StackItem>
            </Stack>
        </ThemeProvider>
    );
};
