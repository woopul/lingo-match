import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';
import { BaseResponseDataType } from '@lingo-match/types/responses/baseApiResponse';
import qs from 'qs';

const fetchAPI = async <RT>(
  path: string,
  urlParamsObject: Record<any, any> = {},
  options: Record<any, any> = {},
): Promise<BaseResponseDataType<RT>> => {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const baseUrl = process.env.STARPI_API_URL;
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(
      `[FETCH STRAPI] url: ${baseUrl}${path} | status: ${response.status} | message: ${
        response.statusText
      } | params: ${JSON.stringify(urlParamsObject)}`,
    );
  }
  const data = await response.json();
  console.log('base response data', data);
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
  await fetchAPI<LayoutConfigDTO>('/layout', {
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
