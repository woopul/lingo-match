import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { BlogPostDTO, HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
import qs from 'qs';

const getStrapiURL = (path: string = '') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
};

export const getStrapiMediaURL = (media: any) => {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
};

const fetchAPI = async <RT>(
  path: string,
  urlParamsObject: Record<any, any> = {},
  options: Record<any, any> = {},
): Promise<BaseResponseDataWrapper<RT>> => {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(
      `Error during fetch | url: ${baseUrl}${path} | status: ${response.status} | message: ${
        response.statusText
      } | params: ${JSON.stringify(urlParamsObject)}`,
    );
  }
  const data = await response.json();
  return data;
};

const getBlogPosts = async () => {
  try {
    const response = await fetchAPI<BlogPostDTO>('/blogposts', { populate: 'deep,3' });
    return parseStrapiResponseToData<BlogPostDTO>(response);
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[BlogPosts Service Error] Cannot get blog posts - ${error.message}`);
    return null;
  }
};

const getPlatforms = async () => {
  try {
    const platformsResponse = await fetchAPI<PlatformDTO[]>('/platforms', { populate: 'deep,3' });
    return parseStrapiResponseToData<PlatformDTO[]>(platformsResponse);
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[Platforms Service Error] Cannot get platforms - ${error.message}`);
    return null;
  }
};

const getPlatformBySlug = async (slug: string) => {
  try {
    const blogPostResponse = await fetchAPI<BlogPostDTO>(`/platforms/${slug}`, {
      populate: 'deep,3',
    });
    return parseStrapiResponseToData<BlogPostDTO>(blogPostResponse);
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[Platform Service Error] Cannot get platform - ${error.message}`);
    return null;
  }
};

const getBlogPostBySlug = async (slug: string) => {
  try {
    const blogPostsResponse = await fetchAPI<BlogPostDTO>(`/blogposts/${slug}`, {
      populate: 'deep,4',
    });
    return parseStrapiResponseToData<BlogPostDTO>(blogPostsResponse);
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[BlogPost Service Error] Cannot get blog post - ${error.message}`);
    return null;
  }
};

const getHomePage = async () => {
  try {
    const homePageResponse = await fetchAPI<HomePageDTO>(`/home-page`, { populate: 'deep,3' });
    return parseStrapiResponseToData<HomePageDTO>(homePageResponse) as HomePageDTO;
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[HomePage Service Error] Cannot get home page - ${error.message}`);
    return null;
  }
};

const getLayoutConfig = async () => {
  try {
    const response = await fetchAPI<LayoutConfigDTO>('/layout', {
      populate: 'deep,4',
    });

    return parseStrapiResponseToData(response);
    //ts-ignore-next-line
  } catch (error) {
    console.error(`[Layout Service Error] Cannot get layout config - ${error.message}`);
    return null;
  }
};

const getFilteredPlatforms = async (filters: string[]) => {
  try {
    const filtersMap = filters.map((filter) => ({ tags: { type: { $eq: filter } } }));

    return await fetchAPI<PlatformDTO[]>(`/platforms`, {
      filters: {
        $and: filtersMap,
      },
    });
    //ts-ignore-next-line
  } catch (error) {
    console.error(
      `[Platforms Service Error] Filter platforms Cannot get platforms - ${error.message}`,
    );
    return null;
  }
};

export {
  fetchAPI,
  getBlogPosts,
  getBlogPostBySlug,
  getLayoutConfig,
  getHomePage,
  getPlatforms,
  getPlatformBySlug,
  getFilteredPlatforms,
};
