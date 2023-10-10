import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'GET') {
        try {
            //Query to get all comics for the main dashboard
            const comics = await prisma.comic.findMany({
                include: {
                    writers:true,
                    colorists: true,
                    coverArtists: true,
                    editors: true,
                    inkers: true,
                    letterers: true,
                },
            });

            res.status(200).json({comics});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}