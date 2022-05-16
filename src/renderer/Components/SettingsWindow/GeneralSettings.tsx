import { Stack, StackItem, Toggle } from "@fluentui/react";
import { FC, useState } from "react";
import { getSettings, saveSettings } from "../../Actions";

export const GeneralSettings: FC = () => {
    const settings = getSettings();
    const [hideWindowOnBlur, setHideWindowOnBlur] = useState<boolean>(settings.generalSettings.hideWindowOnBlur);

    const toggleHideWindowOnBlur = () => {
        settings.generalSettings.hideWindowOnBlur = !hideWindowOnBlur;
        setHideWindowOnBlur(settings.generalSettings.hideWindowOnBlur);
        saveSettings(settings);
    };

    return (
        <Stack horizontal={false} tokens={{ childrenGap: 20, padding: 20 }}>
            <StackItem>
                <Toggle
                    label="Hide window on blur"
                    checked={hideWindowOnBlur}
                    onChange={() => toggleHideWindowOnBlur()}
                />
            </StackItem>
        </Stack>
    );
};
