import { calculateSelectedIndex, NavigationDirection } from "./SearchResultListUtility";

describe(calculateSelectedIndex, () => {
    it("should increment value by one if navigating to next item", () => {
        expect(calculateSelectedIndex(0, 10, NavigationDirection.Next)).toBe(1);
        expect(calculateSelectedIndex(8, 10, NavigationDirection.Next)).toBe(9);
    });

    it("should decrease value by one if navigating to previouse item", () => {
        expect(calculateSelectedIndex(9, 10, NavigationDirection.Previous)).toBe(8);
        expect(calculateSelectedIndex(1, 10, NavigationDirection.Previous)).toBe(0);
    });

    it("should navigate to first item if navigating over last item", () =>
        expect(calculateSelectedIndex(9, 10, NavigationDirection.Next)).toBe(0));

    it("should navigate to first item if navigating over last item", () =>
        expect(calculateSelectedIndex(0, 10, NavigationDirection.Previous)).toBe(9));
});
