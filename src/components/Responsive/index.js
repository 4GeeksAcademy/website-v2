const Size = {
    mobileS: '576px',
    mobileL: '576px',
    tablet: '768px',
    laptop: '992px',
    laptopL: '1140px',
}
export const Device = {
    xs: `(max-width: ${Size.mobileS})`,
    sm: `(min-width: ${Size.mobileL})`,
    md: `(min-width: ${Size.tablet})`,
    lg: `(min-width: ${Size.laptop})`,
    xl: `(min-width: ${Size.laptopL})`,
};