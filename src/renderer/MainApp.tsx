import { Stack, StackItem, TextField } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import React, { FC, useState } from "react";
import { SearchResultItem } from "./SearchResultItem";
import { SearchResultList } from "./SearchResultList";
import { UeliColorThemes } from "./Themes";
import { UeliSpacing } from "./UeliSpacing";

const all: SearchResultItem[] = [
    {
        title: "Adobe Lightroom Classic 2021",
        description: "/Applications/Adobe Lightroom Classic 2021.app",
        imageUrl: "https://img.icons8.com/color/2x/adobe-lightroom--v2.png",
        selected: false,
    },
    {
        title: "Adobe Photoshop CC 2021",
        description: "/Applications/Adobe Photoshop CC 2021.app",
        imageUrl: "https://img.icons8.com/color/2x/adobe-photoshop--v2.png",
        selected: false,
    },
    {
        title: "Adobe After Effects CC 2021",
        description: "/Applications/Adobe After Effects CC 2021.app",
        imageUrl: "https://img.icons8.com/color/2x/adobe-after-effects--v2.png",
        selected: false,
    },
    {
        title: "Adobe Premiere Pro CC 2021",
        description: "/Applications/Adobe Premiere Pro CC 2021.app",
        imageUrl: "https://img.icons8.com/color/2x/adobe-premiere-pro--v2.png",
        selected: false,
    },
];

export const MainApp: FC = () => {
    const theme = UeliColorThemes.WindowsDark;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResultItems, setSearchResultItems] = useState<SearchResultItem[]>([]);

    const selectNext = (): void => {
        const currentlySelectedIndex = searchResultItems.findIndex((s) => s.selected);
        const nextSelectedIndex = currentlySelectedIndex >= searchResultItems.length ? 0 : currentlySelectedIndex + 1;
        setSearchResultItems(
            searchResultItems.map(
                (s, index): SearchResultItem => Object.assign({}, s, { selected: nextSelectedIndex === index })
            )
        );
    };

    const selectPrevious = (): void => {
        const currentlySelectedIndex = searchResultItems.findIndex((s) => s.selected);
        const nextSelectedIndex =
            currentlySelectedIndex === 0 ? searchResultItems.length - 1 : currentlySelectedIndex - 1;
        setSearchResultItems(
            searchResultItems.map(
                (s, index): SearchResultItem => Object.assign({}, s, { selected: nextSelectedIndex === index })
            )
        );
    };

    const handleSearchTermChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event): void => {
        const nextSearchTerm = event.currentTarget.value;
        setSearchTerm(nextSearchTerm);
        setSearchResultItems(
            all
                .filter(
                    (s): boolean =>
                        nextSearchTerm !== "" && s.title.toLowerCase().indexOf(nextSearchTerm.toLowerCase()) > -1
                )
                .map((s, index): SearchResultItem => {
                    s.selected = index === 0;
                    return s;
                })
        );
    };

    const handleKeyUpEvent: React.KeyboardEventHandler = (event): void => {
        if (event.key === "ArrowUp") {
            selectPrevious();
        } else if (event.key === "ArrowDown") {
            selectNext();
        }
    };

    return (
        <ThemeProvider theme={theme} applyTo="body" style={{ height: "100%" }}>
            <Stack verticalFill tokens={{ childrenGap: UeliSpacing["1x"], padding: UeliSpacing["2x"] }}>
                <StackItem>
                    <TextField
                        autoFocus
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onKeyUp={handleKeyUpEvent}
                        iconProps={{ iconName: "Search" }}
                    />
                </StackItem>
                <StackItem verticalFill>
                    <SearchResultList colorTheme={theme} searchResultItems={searchResultItems} />
                </StackItem>
            </Stack>
        </ThemeProvider>
    );
};
