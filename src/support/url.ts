const getDirectusURL = () => {
  return 'https://directus.alexlebens.net';
};

const getSiteURL = () => {
  return 'https://www.alexlebens.dev';
};

function getDirectusImageURL(image: string) {
  return `${getDirectusURL()}/assets/${image}`;
}

export { getDirectusURL, getSiteURL, getDirectusImageURL };
