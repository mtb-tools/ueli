import { Stack, StackItem, Theme } from "@fluentui/react";
import React, { FC } from "react";
import { SearchResultItem } from "./SearchResultItem";
import { SearchResultListItem } from "./SearchResultListItem";
import { UeliSpacing } from "./UeliSpacing";

type Props = {
    colorTheme: Theme;
    searchResultItems: SearchResultItem[];
};

export const SearchResultList: FC<Props> = ({ colorTheme, searchResultItems }) => {
    return (
        <Stack tokens={{ childrenGap: UeliSpacing["1x"] }}>
            {searchResultItems.map((searchResultItem) => (
                <StackItem key={`${searchResultItem.title}`}>
                    <SearchResultListItem
                        colorTheme={colorTheme}
                        searchResultItem={searchResultItem}
                        selected={searchResultItem.selected}
                    />
                </StackItem>
            ))}
        </Stack>
    );
};
