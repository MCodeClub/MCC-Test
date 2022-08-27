import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Selection>
) {
    if (req.method === 'POST') {
        // TODO: implement selection item creation
    } else {
        return res.status(501).end();
    }
}
