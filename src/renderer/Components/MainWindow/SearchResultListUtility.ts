export enum NavigationDirection {
    Next = "Next",
    Previous = "Previous",
}

const incrementValueMap: Record<NavigationDirection, number> = {
    Next: 1,
    Previous: -1,
};

export const calculateSelectedIndex = (
    currentSelectedIndex: number,
    numberOfItems: number,
    direction: NavigationDirection
): number => {
    const nextSelectedValue = currentSelectedIndex + incrementValueMap[direction];

    if (nextSelectedValue >= numberOfItems) {
        return 0;
    }

    if (nextSelectedValue < 0) {
        return numberOfItems - 1;
    }

    return nextSelectedValue;
};
