export const Size = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560
}

export const Device = {
    mobileS: `max-width: ${Size.mobileS}px`,
    mobileM: `max-width: ${Size.mobileM}px`,
    mobileL: `max-width: ${Size.mobileL}px`,
    tablet: `max-width: ${Size.tablet}px`,
    laptop: `max-width: ${Size.laptop}px`,
    laptopL: `max-width: ${Size.laptopL}px`,
    desktop: `max-width: ${Size.desktop}px`,
    desktopL: `max-width: ${Size.desktop}px`
};

// eslint-disable-next-line no-restricted-globals
export let widthScreen = screen.width;
export let widthWindow = window.innerWidth;