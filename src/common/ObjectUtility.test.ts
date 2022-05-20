import { ObjectUtility } from "./ObjectUtility";
import { Settings } from "./Settings/Settings";

describe(ObjectUtility, () => {
    describe(ObjectUtility.clone, () => {
        it("should correctly clone an object", () => {
            const candidates: unknown[] = [
                { name: "Oliver" },
                {
                    thisIsAnArray: [1, 2, 3],
                    numberOfRecords: 3,
                    thisIsAnObject: { name: "Oliver", lastName: "Schwendener" },
                },
                ["This", "is", "an", "array", "of", "strings"],
                ["This", "Is", "a", "mixed", "array", 1, 399, {}, []],
            ];

            candidates.forEach((candidate) => expect(ObjectUtility.clone(candidate)).toStrictEqual(candidate));
        });
    });

    describe(ObjectUtility.toRecord, () => {
        it("should correctly convert an typed object to a record", () => {
            const expected = <Record<string, unknown>>{ generalSettings: { hideWindowOnBlur: false } };
            const actual = ObjectUtility.toRecord<Settings>(<Settings>{ generalSettings: { hideWindowOnBlur: false } });
            expect(actual).toEqual(expected);
        });
    });
});
