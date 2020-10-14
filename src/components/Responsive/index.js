const Size = {
    miniS: '320px',
    mobileS: '576px',
    mobileL: '576px',
    tablet: '768px',
    laptop: '992px',
    laptopL: '1200px',
}
export const Break = {
    xxs: `(max-width: ${Size.miniS})`,
    xs: `(max-width: ${Size.mobileS})`,
    sm: `(max-width: ${Size.tablet})`,
    md: `(max-width: ${Size.laptop})`,
    lg: `(max-width: ${Size.laptopL})`,
};