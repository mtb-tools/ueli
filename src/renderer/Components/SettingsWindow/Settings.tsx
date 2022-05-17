import { FC, useState } from "react";
import { Stack, StackItem, ThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { getColorTheme } from "../../ColorTheme/UeliColorThemes";
import { Navigation } from "./Navigation";
import { Route, Routes } from "react-router-dom";
import { GeneralSettings } from "./GeneralSettings";
import { SearchEngineSettings } from "./SearchEngineSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { getSettings } from "../../Actions";

initializeIcons();

export const Settings: FC = () => {
    const [colorThemeName, setColorThemeName] = useState<string>(getSettings().appearanceSettings.colorTheme);

    return (
        <ThemeProvider theme={getColorTheme(colorThemeName)} style={{ height: "100vh" }}>
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
                            element={
                                <AppearanceSettings
                                    colorTheme={colorThemeName}
                                    onColorThemeChanged={setColorThemeName}
                                />
                            }
                        />
                    </Routes>
                </StackItem>
            </Stack>
        </ThemeProvider>
    );
};
