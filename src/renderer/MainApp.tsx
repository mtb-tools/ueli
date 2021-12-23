import { Stack, StackItem, TextField } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react/lib/Theme";
import React, { FC, useState } from "react";
import { dummySearchResultItems } from "./DummySearchResultItems";
import { SearchResultItem } from "./SearchResultItem";
import { SearchResultList } from "./SearchResultList";
import { UeliColorThemes } from "./Themes";
import { UeliSpacing } from "./UeliSpacing";

export const MainApp: FC = () => {
    const theme = UeliColorThemes.WindowsDark;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResultItems, setSearchResultItems] = useState<SearchResultItem[]>([]);

    const selectNext = (): void => {
        const currentlySelectedIndex = searchResultItems.findIndex((s) => s.selected);
        const nextSelectedIndex =
            currentlySelectedIndex >= searchResultItems.length - 1 ? 0 : currentlySelectedIndex + 1;
        setSearchResultItems(
            searchResultItems.map(
                (searchResultItem, index): SearchResultItem =>
                    Object.assign({}, searchResultItem, { selected: nextSelectedIndex === index })
            )
        );
    };

    const selectPrevious = (): void => {
        const currentlySelectedIndex = searchResultItems.findIndex((s) => s.selected);
        const nextSelectedIndex =
            currentlySelectedIndex === 0 ? searchResultItems.length - 1 : currentlySelectedIndex - 1;
        setSearchResultItems(
            searchResultItems.map(
                (searchResultItem, index): SearchResultItem =>
                    Object.assign({}, searchResultItem, { selected: nextSelectedIndex === index })
            )
        );
    };

    const handleSearchTermChange: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event): void => {
        const nextSearchTerm = event.currentTarget.value;
        setSearchTerm(nextSearchTerm);
        setSearchResultItems(
            dummySearchResultItems
                .filter(
                    (searchResultItem): boolean =>
                        nextSearchTerm !== "" &&
                        searchResultItem.title.toLowerCase().indexOf(nextSearchTerm.toLowerCase()) > -1
                )
                .map(
                    (searchResultItem, index): SearchResultItem =>
                        Object.assign({}, searchResultItem, { selected: index === 0 })
                )
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
