import { ITextField, TextField } from "@fluentui/react";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { IpcChannel } from "../../../common/IpcChannel";

interface Props {
    onSearchTermChanged: (searchTerm: string) => void;
    onKeyUp: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const UserInput: FC<Props> = ({ onSearchTermChanged, onKeyUp }) => {
    const userInputRef = useRef<ITextField>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const onSearchTermChange = (updatedSearchTerm: string): void => {
        setSearchTerm(updatedSearchTerm);
        onSearchTermChanged(updatedSearchTerm ?? "");
    };

    window.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => {
        userInputRef?.current?.focus();
        userInputRef?.current?.select();
    });

    return (
        <TextField
            componentRef={userInputRef}
            iconProps={{ iconName: "Search" }}
            underlined
            value={searchTerm}
            onChange={(_, newValue) => onSearchTermChange(newValue ?? "")}
            onKeyUp={onKeyUp}
        />
    );
};
