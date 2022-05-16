import { INavLink, INavLinkGroup, Nav } from "@fluentui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation: FC = () => {
    const [selectedKey, setSelectedKey] = useState<string>("general");
    const navigate = useNavigate();

    useEffect(() => navigate("/"), []);

    const navigateTo = (item: INavLink) => {
        if (item.key) {
            setSelectedKey(item.key);
        }
        navigate(item.url);
    };

    const groups: INavLinkGroup[] = [
        {
            links: [
                { name: "General", url: "/", key: "general" },
                { name: "Search Engine", url: "/search-engine", key: "search-engine" },
                { name: "Appearance", url: "/appearance", key: "appearance" },
                {
                    name: "Plugins",
                    url: "/plugins",
                    key: "plugins",
                    links: [
                        {
                            name: "Windows Application Search",
                            url: "/windows-application-search",
                            key: "windows-application-search",
                        },
                        {
                            name: "Ueli Commands",
                            url: "/ueli-commands",
                            key: "ueli-commands",
                        },
                        {
                            name: "Simple Folder Search",
                            url: "/simple-folder-search",
                            key: "simple-folder-search",
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Nav
            groups={groups}
            selectedKey={selectedKey}
            onLinkClick={(event, item) => {
                event?.preventDefault();
                if (item) {
                    navigateTo(item);
                }
            }}
        />
    );
};
