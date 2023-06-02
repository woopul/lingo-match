/* eslint-disable sort-keys */
import { getFilteredPlatforms } from '@lingo-match/api/strapi';
import type { NextApiRequest, NextApiResponse } from 'next';

const platformFiltersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  let payload;
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
    const response = await getFilteredPlatforms(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export default platformFiltersHandler;
