import { Image, ImageFit, Stack, StackItem, Text, Theme } from "@fluentui/react";
import React, { FC } from "react";
import { SearchResultItem } from "./SearchResultItem";
import { UeliBorder } from "./UeliBorder";
import { UeliSpacing } from "./UeliSpacing";

type Props = {
    colorTheme: Theme;
    searchResultItem: SearchResultItem;
    selected: boolean;
};

export const SearchResultListItem: FC<Props> = ({ colorTheme, searchResultItem, selected }) => {
    return (
        <Stack
            horizontal
            verticalAlign="center"
            tokens={{ padding: UeliSpacing["0.5x"] }}
            style={{
                backgroundColor: selected ? colorTheme.palette.themeDark : "none",
                borderRadius: UeliBorder["1x"],
            }}
        >
            <StackItem>
                <Image src={searchResultItem.imageUrl} width={40} height={40} imageFit={ImageFit.centerCover} />
            </StackItem>
            <StackItem grow>
                <Stack>
                    <StackItem>
                        <Text variant="large">{searchResultItem.title}</Text>
                    </StackItem>
                    <StackItem>
                        <Text variant="medium">{searchResultItem.description}</Text>
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack>
    );
};
