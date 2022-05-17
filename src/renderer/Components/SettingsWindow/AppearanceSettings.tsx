import { Dropdown, IDropdownOption, Stack, StackItem } from "@fluentui/react";
import { FC } from "react";
import { getSettings, saveSettings } from "../../Actions";

interface AppearanceSettingsProps {
    colorTheme: string;
    onColorThemeChanged: (key: string) => void;
}

export const AppearanceSettings: FC<AppearanceSettingsProps> = ({ colorTheme, onColorThemeChanged }) => {
    const settings = getSettings();

    const dropdownOptions: IDropdownOption[] = [
        { key: "UeliDark", text: "Ueli Dark" },
        { key: "UeliLight", text: "Ueli Light" },
        { key: "WindowsDark", text: "Windows Dark" },
        { key: "WindowsLight", text: "Windows Light" },
    ];

    const changeColorTheme = async (updatedValue: string) => {
        settings.appearanceSettings.colorTheme = updatedValue;
        onColorThemeChanged(settings.appearanceSettings.colorTheme);
        await saveSettings(settings);
    };

    return (
        <Stack tokens={{ childrenGap: 20, padding: 20 }}>
            <StackItem>
                <Dropdown
                    label="Color Theme"
                    options={dropdownOptions}
                    selectedKey={colorTheme}
                    onChange={(_, option) => {
                        if (option) {
                            changeColorTheme(option.key.toString());
                        }
                    }}
                />
            </StackItem>
        </Stack>
    );
};
