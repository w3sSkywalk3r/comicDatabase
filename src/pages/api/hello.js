import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addComic(req, res);
  } 
  else if (req.method === 'GET') {
    return await viewComic(req,res);
  }
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}


async function addComic(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.comic.create({
      data: {
        title: body.title,
        releaseDate: body.releaseDate,
        publisher: body.publisher
      }
    });
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error creating comic.', success: false });
  }
}

async function viewComic(req, res) {
  try{
    const comics = await prisma.comic.findMany();
    return res.status(200).json(comics, {success: true});
  } catch (error) {
    console.log}(error)
    return res.status(500).json({error: "Error reading from database", success: false});
  }