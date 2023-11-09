const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const Devices = {
  xxs: `(min-width: ${size.mobileS})`,
  xs: `(min-width: ${size.mobileM})`,
  sm: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  md: `(min-width: ${size.laptop})`,
  lg: `(min-width: ${size.laptopL})`,
  xl: `(min-width: ${size.desktop})`,
  xxl: `(min-width: ${size.desktop})`,
};

// REMOVABLE
const Size = {
  miniS: "320px",
  mobileS: "576px",
  mobileL: "576px",
  tablet: "768px",
  laptop: "992px",
  laptopL: "1200px",
};
export const Break = {
  xxs: `(max-width: ${Size.miniS})`,
  xs: `(max-width: ${Size.mobileS})`,
  sm: `(max-width: ${Size.tablet})`,
  md: `(max-width: ${Size.laptop})`,
  lg: `(max-width: ${Size.laptopL})`,
};
