import qs from 'qs';

export function getStrapiURL(path: string = '') {
  return `${process.env.STARPI_API_URL || 'http://localhost:1337'}${path}`;
}

const fetchAPI = async (
  path: string,
  urlParamsObject: Record<any, any> = {},
  options: Record<any, any> = {},
) => {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

  console.log('Strapi url', requestUrl);

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(
      `[FETCH STRAPI] Error during fetch on ${requestUrl} | options?: ${options} | error message: ${response.statusText}`,
    );
    // throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
};

const getBlogPosts = async () => {
  const posts = await fetchAPI('/blogposts', {}, { method: 'GET' });
  return posts;
};

const getPlatforms = async () => {
  const platforms = await fetchAPI('/platforms', {}, { method: 'GET' });
  return platforms;
};

const getPlatformBySlug = async (slug: string) => {
  const platforms = await fetchAPI(`/platforms${slug}`, {}, { method: 'GET' });
  return platforms;
};

const getBlogPostBySlug = async (slug: string) => {
  const post = await fetchAPI(`/blogposts/${slug}`, {}, { method: 'GET' });
  return post;
};

const getLayoutConfig = async () =>
  await fetchAPI('/layout', {
    populate: {
      Header: {
        populate: '*',
      },
      defaultSeo: '*',
    },
  });

export {
  fetchAPI,
  getBlogPosts,
  getBlogPostBySlug,
  getLayoutConfig,
  getPlatforms,
  getPlatformBySlug,
};
