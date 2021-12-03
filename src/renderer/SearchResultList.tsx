import { Persona, PersonaSize, Stack, StackItem } from "@fluentui/react";
import React, { FC } from "react";
import { UeliSpacing } from "./UeliSpacing";

interface SearchResultItem {
    title: string;
    description: string;
    imageUrl: string;
}

export const SearchResultList: FC<{ searchTerm: string }> = ({ searchTerm }) => {
    const searchResults: SearchResultItem[] = [
        {
            title: "Adobe Lightroom Classic 2021",
            description: "",
            imageUrl: "https://img.icons8.com/color/2x/adobe-lightroom--v2.png",
        },
        {
            title: "Adobe Photoshop CC 2021",
            description: "",
            imageUrl: "https://img.icons8.com/color/2x/adobe-photoshop--v2.png",
        },
        {
            title: "Adobe After Effects CC 2021",
            description: "",
            imageUrl: "https://img.icons8.com/color/2x/adobe-after-effects--v2.png",
        },
        {
            title: "Adobe Premiere Pro CC 2021",
            description: "",
            imageUrl: "https://img.icons8.com/color/2x/adobe-premiere-pro--v2.png",
        },
    ];

    const filteredSearchResults = searchResults.filter(
        (s): boolean => searchTerm !== "" && s.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );

    return (
        <Stack tokens={{ childrenGap: UeliSpacing["1x"] }}>
            {filteredSearchResults.map((searchResult) => (
                <StackItem key={searchResult.title}>
                    <Persona
                        size={PersonaSize.size48}
                        hidePersonaDetails={false}
                        imageUrl={searchResult.imageUrl}
                        text={searchResult.title}
                        secondaryText={searchResult.description}
                    />
                </StackItem>
            ))}
        </Stack>
    );
};
