const Size = {
    mobileS: '576px',
    mobileL: '576px',
    tablet: '768px',
    laptop: '992px',
    laptopL: '1200px',
}
export const Device = {
    xs: `(max-width: ${Size.mobileS})`,
    sm: `(min-width: ${Size.mobileL}) and (max-width: ${Size.tablet})`,
    md: `(min-width: ${Size.tablet}) and (max-width: ${Size.laptop})`,
    lg: `(min-width: ${Size.laptop}) and (max-width: ${Size.laptopL})`,
    xl: `(min-width: ${Size.laptopL})`,
};
export const Break = {
    xs: `(max-width: ${Size.mobileS})`,
    sm: `(max-width: ${Size.tablet})`,
    md: `(max-width: ${Size.laptop})`,
    lg: `(max-width: ${Size.laptopL})`,
};