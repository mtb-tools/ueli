import { OperatingSystem } from "./OperatingSystem";

export class OperatingSystemHelper {
    public static getOperatingSystem(platform: string): OperatingSystem {
        const map: Record<string, OperatingSystem> = {
            win32: OperatingSystem.Windows,
            darwin: OperatingSystem.macOS,
        };

        if (map[platform]) {
            return map[platform];
        }

        throw new Error(`Unsupported platform: ${platform}`);
    }
}
