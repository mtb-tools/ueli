import { SearchResultItemIconType } from "./SearchResultItemIconType";

export abstract class SearchResultItemIcon {
    protected constructor(public readonly type: SearchResultItemIconType) {}
}
