import { FC } from "react";
import { SearchResultItemIcon } from "../../../common/SearchResult/SearchResultItemIcon";
import { SearchResultItemIconType } from "../../../common/SearchResult/SearchResultItemIconType";

interface Props {
    icon: SearchResultItemIcon;
}

export const SearchResultListItemIcon: FC<Props> = ({ icon }) => {
    const defaultElement = <></>;

    const map: Record<SearchResultItemIconType, JSX.Element> = {
        FilePath: (
            <>
                <img src={`file://${icon.icon}`} />
            </>
        ),
        Base64Image: defaultElement,
        DataUrl: (
            <>
                <img src={icon.icon} />
            </>
        ),
        Dummy: defaultElement,
        Svg: (
            <div style={{ height: 36, width: 36, fill: "white" }} dangerouslySetInnerHTML={{ __html: icon.icon }}></div>
        ),
    };

    return map[icon.type];
};
