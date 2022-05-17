import { Position, Slider, SpinButton, Stack, StackItem, Toggle } from "@fluentui/react";
import { FC, useState } from "react";
import { getSettings, saveSettings } from "../../Actions";

export const SearchEngineSettings: FC = () => {
    const settings = getSettings();

    const [threshold, setThreshold] = useState<number>(settings.searchEngineSettings.threshold);

    const updateThreshold = async (value: number) => {
        settings.searchEngineSettings.threshold = value;
        setThreshold(settings.searchEngineSettings.threshold);
        await saveSettings(settings);
    };

    const [automaticRescanEnabled, setAutomaticRescanEnabled] = useState<boolean>(
        settings.searchEngineSettings.automaticRescanEnabled
    );

    const toggleAutomaticRescanEnabled = async () => {
        settings.searchEngineSettings.automaticRescanEnabled = !automaticRescanEnabled;
        setAutomaticRescanEnabled(settings.searchEngineSettings.automaticRescanEnabled);
        await saveSettings(settings);
    };

    const [automaticRescanInterval, setAutomaticRescanInterval] = useState<number>(
        settings.searchEngineSettings.automaticRescanIntervalInSeconds
    );

    const updateAutomaticRescanInterval = async (updatedValue: number) => {
        settings.searchEngineSettings.automaticRescanIntervalInSeconds = updatedValue;
        setAutomaticRescanInterval(updatedValue);
        await saveSettings(settings);
    };

    return (
        <Stack tokens={{ childrenGap: 20, padding: 20 }}>
            <StackItem>
                <Slider
                    label="Threshold"
                    min={0}
                    max={1}
                    step={0.1}
                    value={threshold}
                    onChange={(value) => updateThreshold(value)}
                />
            </StackItem>
            <StackItem>
                <Toggle
                    label="Automatic rescan"
                    checked={automaticRescanEnabled}
                    onChange={() => toggleAutomaticRescanEnabled()}
                />
            </StackItem>
            {automaticRescanEnabled ? (
                <StackItem>
                    <SpinButton
                        label="Automatic rescan interval"
                        labelPosition={Position.top}
                        min={10}
                        value={automaticRescanInterval.toString()}
                        onChange={(_, updatedValue) => updateAutomaticRescanInterval(Number(updatedValue))}
                    />
                </StackItem>
            ) : (
                ""
            )}
        </Stack>
    );
};
