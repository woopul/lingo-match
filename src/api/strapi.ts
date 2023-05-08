import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';
import { BaseResponseDataType } from '@lingo-match/types/strapi/baseApiResponse';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
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
  const baseUrl = process.env.STRAPI_API_URL;
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
  return data;
};

const getBlogPosts = async () => {
  const response = await fetchAPI('/blogposts');
  return parseStrapiResponseToData(response);
};

const getPlatforms = async () => {
  const platforms = await fetchAPI('/platforms');
  return platforms;
};

const getPlatformBySlug = async (slug: string) => {
  const platforms = await fetchAPI(`/platforms${slug}`);
  return platforms;
};

const getBlogPostBySlug = async (slug: string) => {
  const post = await fetchAPI(`/blogposts/${slug}`);
  return post;
};

const getLayoutConfig = async () => {
  const response = await fetchAPI<LayoutConfigDTO>('/layout', {
    populate: 'deep',
  });

  return parseStrapiResponseToData(response);
};

export {
  fetchAPI,
  getBlogPosts,
  getBlogPostBySlug,
  getLayoutConfig,
  getPlatforms,
  getPlatformBySlug,
};
