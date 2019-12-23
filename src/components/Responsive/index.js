const Size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '576px',
    tablet: '768px',
    laptop: '992px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const Device = {
    mobileS: `(min-width: ${Size.mobileS})`,
    mobileM: `(min-width: ${Size.mobileM})`,
    mobileL: `(max-width: ${Size.mobileL})`,
    tablet: `(max-width: ${Size.tablet})`,
    laptop: `(min-width: ${Size.laptop})`,
    laptopL: `(min-width: ${Size.laptopL})`,
    desktop: `(min-width: ${Size.desktop})`,
    desktopL: `(min-width: ${Size.desktop})`
};