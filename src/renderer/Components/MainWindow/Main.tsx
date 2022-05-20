import { initializeIcons, ISearchBox, SearchBox, Stack, StackItem, ThemeProvider } from "@fluentui/react";
import { FC, useEffect, useState, KeyboardEvent, useRef } from "react";
import { IpcChannel } from "../../../common/IpcChannel";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { Settings } from "../../../common/Settings/Settings";
import { getSettings } from "../../Actions";
import { getColorTheme } from "../../ColorTheme/UeliColorThemes";
import { SearchResultList } from "./SearchResultList";
import { calculateSelectedIndex, NavigationDirection } from "./SearchResultListUtility";

initializeIcons();

const navigationDirectionMap: Record<"ArrowUp" | "ArrowDown", NavigationDirection> = {
    ArrowDown: NavigationDirection.Next,
    ArrowUp: NavigationDirection.Previous,
};

export const Main: FC = () => {
    const searchBoxRef = useRef<ISearchBox>(null);
    const [searchResultItems, setSearchResultItems] = useState<SearchResultItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [colorThemeName, setColorTheme] = useState<string>(getSettings().appearanceSettings.colorThemeName);

    const registerIpcEventListeners = () => {
        window.Bridge.ipcRenderer.on<Settings>(IpcChannel.SettingsUpdated, (_, { appearanceSettings }) =>
            setColorTheme(appearanceSettings.colorThemeName)
        );

        window.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => searchBoxRef?.current?.focus());
    };

    const search = async (searchTerm: string) => {
        const result = await window.Bridge.ipcRenderer.invoke<unknown, SearchResultItem[]>(
            IpcChannel.Search,
            searchTerm
        );

        setSearchResultItems(result);
        setSelectedIndex(0);
    };

    const executeSearchResultItem = (searchResultItem: SearchResultItem, openLocation: boolean): Promise<void> => {
        const ipcChannel = openLocation ? IpcChannel.OpenLocation : IpcChannel.Execute;
        return window.Bridge.ipcRenderer.invoke<SearchResultItem, void>(ipcChannel, searchResultItem);
    };

    const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            const nextSelectedIndex = calculateSelectedIndex(
                selectedIndex,
                searchResultItems.length,
                navigationDirectionMap[event.key]
            );

            setSelectedIndex(nextSelectedIndex);
        }

        if (event.key === "Enter") {
            executeSearchResultItem(searchResultItems[selectedIndex], event.ctrlKey || event.metaKey);
        }
    };

    useEffect(() => registerIpcEventListeners(), []);

    return (
        <ThemeProvider theme={getColorTheme(colorThemeName)} style={{ height: "100vh" }}>
            <Stack verticalFill>
                <StackItem tokens={{ padding: 10 }}>
                    <SearchBox
                        autoFocus
                        underlined
                        componentRef={searchBoxRef}
                        placeholder="Type in your search term"
                        onChange={(_, searchTerm) => search(searchTerm ?? "")}
                        onKeyUp={(event) => handleKeyPress(event)}
                    />
                </StackItem>
                <StackItem grow tokens={{ padding: 10 }} styles={{ root: { overflowY: "auto" } }}>
                    <SearchResultList
                        searchResultItems={searchResultItems}
                        selectedIndex={selectedIndex}
                        colorThemeName={colorThemeName}
                    />
                </StackItem>
            </Stack>
        </ThemeProvider>
    );
};
