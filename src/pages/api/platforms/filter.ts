import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  res.status(200).json({ name: 'John Doe' });
}
