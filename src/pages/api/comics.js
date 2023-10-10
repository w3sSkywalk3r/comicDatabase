import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    try{
        const res = await prisma.comic.createMany(
            {//object
                    data: [{title: "Action Comics #1030", releaseDate: '01/21/21', publisher: "DC"}]
            }
        )
    } catch (error) {

    }
}

main();






router.post("/", async (req, res) => {
  try {
    const {
      title,
      releaseDate,
      publisher,
      writers,
      colorists,
      coverArtists,
      editors,
      inkers,
      letterers,
    } = req.body;

    const comic = await prisma.comic.create({
      data: {
        title,
        releaseDate,
        publisher,
        writers: {
          connect: writers.map((writerId) => ({ id: writerId })),
        },
        colorists: {
          connect: colorists.map((coloristId) => ({ id: coloristId })),
        },
        coverArtists: {
          connect: coverArtists.map((coverArtistId) => ({ id: coverArtistId })),
        },
        editors: {
          connect: editors.map((editorId) => ({ id: editorId })),
        },
        inkers: {
          connect: inkers.map((inkerId) => ({ id: inkerId })),
        },
        letterers: {
          connect: letterers.map((lettererId) => ({ id: lettererId })),
        },
      },
    });

    res.json(comic);
  } catch (error) {
    console.error('Error creating comic:', error);
    res.status(500).json({ error: 'Unable to create comic.' });
  }
});

export default router;