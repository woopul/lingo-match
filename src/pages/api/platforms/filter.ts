/* eslint-disable sort-keys */
import { getFilteredPlatforms, getPlatforms } from '@lingo-match/api/strapi';
import { isMainStrapiMetaType, MainStrapiMetaType } from '@lingo-match/types/strapi';
import { extractPaginationData, strapiData } from '@lingo-match/utlis';
import type { NextApiRequest, NextApiResponse } from 'next';

const platformFiltersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method, query } = req;

  let payload;
  const pageSize = query.pageSize;
  try {
    payload = JSON.parse(body);
    if (!Array.isArray(payload)) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: `invalid payload, filters string[] expected` });
  }

  if (method !== 'POST') {
    return res.status(405).json({ success: false, message: 'method not allowed' });
  }

  try {
    const { data, success } = await getPlatforms({
      filters: payload,
      pagination: { pageSize: pageSize ? Number(pageSize) : undefined },
    });

    const paginationData = extractPaginationData(data);

    const parsedResponse = {
      data: {
        platforms: strapiData(data),
        total: (paginationData as MainStrapiMetaType['pagination'])?.total,
        pageCount: (paginationData as MainStrapiMetaType['pagination'])?.pageCount,
      },
      success,
    };

    return res.status(200).json(parsedResponse);
  } catch (error) {
    return res.status(500).json({ success: false, data: null });
  }
};
export default platformFiltersHandler;
