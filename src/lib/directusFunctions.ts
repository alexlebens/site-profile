const getDirectusURL = () => {
  if (process.env.DIRECTUS_URL) {
    return `https://${process.env.DIRECTUS_URL}`;
  }
  return 'https://directus.alexlebens.net';
};

async function getDirectusImageURL(image: string) {
  return `${getDirectusURL()}/assets/${image}`;
}

export { getDirectusURL, getDirectusImageURL };
