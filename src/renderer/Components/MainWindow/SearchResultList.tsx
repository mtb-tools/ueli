import { Stack } from "@fluentui/react";
import { FC } from "react";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { SearchResultListItem } from "./SearchResultListItem";

interface Props {
    searchResultItems: SearchResultItem[];
    selectedIndex: number;
    colorThemeName: string;
}

export const SearchResultList: FC<Props> = ({ searchResultItems, selectedIndex, colorThemeName }) => (
    <Stack tokens={{ childrenGap: 10 }}>
        {searchResultItems.map((searchResultItem, index) => (
            <SearchResultListItem
                key={`${searchResultItem.executionArgument}-${index === selectedIndex}`}
                searchResultItem={searchResultItem}
                selected={index === selectedIndex}
                colorThemeName={colorThemeName}
            />
        ))}
    </Stack>
);
