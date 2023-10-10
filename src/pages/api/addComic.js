import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
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
          } = req.body //destructuring syntax for req.body... can be read as req.body.title, req.body.releaseDate, etc.

          //Check if the comic title exists
          const existingComic = await prisma.comic.findFirst({
            where: {
                title: title, //here the title after the colon is the value being passed through the body
            },
          });

          if(existingComic) {
            //If the comic exists we will let the user update the fields
            await prisma.comic.update({
                where: {
                    id: existingComic.id,
                },
                data: {
                    releaseDate: releaseDate,
                    publisher: publisher,
                    writers: writers,
                    colorsits: colorists,
                    coverArtists: coverArtists,
                    editors: editors,
                    inkers: inkers,
                    letterers: letterers
                },
            });
            res.status(200).json({message: 'Comic successfully updated'}); //Status 200 is the okay code sent to the server
          }
          else {
            //If the comic does not exist now we will create a new comic along with all the junctions
            const newComic = await prisma.comic.create({
                data: {
                    title: title,
                    releaseData: releaseDate,
                    publisher: publisher,
                    writers: {
                        connectOrCreate: writers.map((writer) => ({
                            where: {name: writer.name},
                            create: {name: writer.name},
                        })),
                    },
                    colorists: {
                        connectOrCreate: colorists.map((colorist) => ({
                            where: { name: colorist.name},
                            create: {name: colorist.name},
                        })),
                    },
                    coverArtists: {
                        connectOrCreate: coverArtists.map((coverArtist) => ({
                            where: { name: coverArtist.name},
                            create: {name: coverArtist.name},
                        })),
                    },
                    editors: {
                        connectOrCreate: editors.map((editor) => ({
                            where: { name: editor.name},
                            create: {name: editor.name},
                        })),
                    },
                    inkers: {
                        connectOrCreate: inkers.map((inker) => ({
                            where: { name: inker.name},
                            create: {name: inker.name},
                        })),
                    },
                    letterers: {
                        connectOrCreate: letterers.map((letterer) => ({
                            where: { name: letterer.name},
                            create: {name: letterer.name},
                        })),
                    },         
                }
            });
            res.status(200).json({mesage: 'Comic added successfully', comic: newComic});
          }
        } catch(error) {
            console.error(error);
            res.status(500).json({error:'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}