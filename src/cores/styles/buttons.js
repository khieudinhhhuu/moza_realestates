import {setWidth} from "../viewComponents/baseFunctions/BaseFunctions";
import {Spacing} from "./styleBase";

export const small = {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: setWidth(40)
};
export const medium = {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: setWidth(65)
};
export const large = {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: setWidth(90)
};

export const textCenter = {
    alignItems: 'center',
    justifyContent: 'center'
};

export const borderRadius = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
};

export const roundedSmall = {
    ...small,
    ...textCenter,
    borderRadius: borderRadius.sm
};
export const roundedMedium = {
    ...medium,
    ...textCenter,
    borderRadius: borderRadius.md
};
export const roundedLarge = {
    ...large,
    ...textCenter,
    borderRadius: borderRadius.lg
};
export const buttonIconBack = {
    ...textCenter,
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
};
