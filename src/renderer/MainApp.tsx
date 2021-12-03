import { Stack, StackItem, TextField } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import { IpcRenderer } from "electron";
import React, { FC, useState } from "react";
import { IpcChannel } from "../shared/IpcChannel";
import { SearchResultList } from "./SearchResultList";
import { UeliColorThemes } from "./Themes";
import { UeliSpacing } from "./UeliSpacing";

export const MainApp: FC<{ ipcRenderer: IpcRenderer }> = ({ ipcRenderer }) => {
    ipcRenderer.send(IpcChannel.rendererStarted);

    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <ThemeProvider theme={UeliColorThemes.UeliDark} applyTo="body" style={{ height: "100%" }}>
            <Stack verticalFill tokens={{ childrenGap: UeliSpacing["1x"], padding: UeliSpacing["2x"] }}>
                <StackItem>
                    <TextField
                        autoFocus
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    />
                </StackItem>
                <StackItem verticalFill>
                    <SearchResultList searchTerm={searchTerm} />
                </StackItem>
            </Stack>
        </ThemeProvider>
    );
};
