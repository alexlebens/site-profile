const getDirectusURL = () => {
  if (process.env.DIRECTUS_URL) {
    return `https://${process.env.DIRECTUS_URL}`;
  }
  return 'https://directus.alexlebens.dev';
};

async function getDirectusImageURL(image: string) {
  return `${getDirectusURL()}/assets/${image}`;
}

export { getDirectusURL, getDirectusImageURL };
