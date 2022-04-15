export class ObjectUtility {
    public static clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value));
    }

    public static toRecord<T>(value: T): Record<string, unknown> {
        return JSON.parse(JSON.stringify(value));
    }
}
