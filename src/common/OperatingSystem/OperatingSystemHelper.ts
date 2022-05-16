import { OperatingSystem } from "./OperatingSystem";

export class OperatingSystemHelper {
    private static map: Record<string, OperatingSystem> = {
        win32: OperatingSystem.Windows,
        darwin: OperatingSystem.macOS,
    };

    public static getOperatingSystem(platform: string): OperatingSystem {
        if (OperatingSystemHelper.map[platform]) {
            return OperatingSystemHelper.map[platform];
        }

        throw new Error(`Unsupported platform: ${platform}`);
    }
}
