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
            const writerConnectOrCreate = [];
            for (const writer of writers) {
                const existingWriter = await prisma.writer.findFirst({
                    where: {name: writer},
                });

                if (existingWriter) {
                    writerConnectOrCreate.push({writerId: existingWriter.id});
                } else {
                    const writerRecord = await prisma.writer.create({
                        data: {
                            name: writer,
                        }
                    });
                    writerConnectOrCreate.push({writerId: writerRecord.id})
                }
            }

            const coloristConnectOrCreate = [];
            for (const colorist of colorists) {
                const coloristRecord = await prisma.colorist.create({
                    data: {
                        name: colorist,
                    }
                });
                coloristConnectOrCreate.push({coloristId: coloristRecord.id})
            }

            const coverArtistConnectOrCreate = [];
            for (const coverArtist of coverArtists) {
                const coverArtistRecord = await prisma.coverArtist.create({
                    data: {
                        name: coverArtist,
                    }
                });
                coverArtistConnectOrCreate.push({coverArtistId: coverArtistRecord.id})
            }

            const editorConnectOrCreate = [];
            for (const editor of editors) {
                const editorRecord = await prisma.editor.create({
                    data: {
                        name: editor,
                    }
                });
                editorConnectOrCreate.push({editorId: editorRecord.id})
            }

            const inkerConnectOrCreate = [];
            for (const inker of inkers) {
                const inkerRecord = await prisma.inker.create({
                    data: {
                        name: inker,
                    }
                });
                inkerConnectOrCreate.push({inkerId: inkerRecord.id})
            }

            const lettererConnectOrCreate = [];
            for (const letterer of letterers) {
                const lettererRecord = await prisma.letterer.create({
                    data: {
                        name: letterer,
                    }
                });
                lettererConnectOrCreate.push({lettererId: lettererRecord.id})
            }




            //If the comic does not exist now we will create a new comic along with all the junctions
            const newComic = await prisma.comic.create({
                data: {
                    title: title,
                    releaseData: releaseDate,
                    publisher: publisher,
                    writers: {
                        connect: writerConnectOrCreate,
                    },
                    colorists: {
                        connect: coloristConnectOrCreate,
                    },
                    coverArtists: {
                        connect: coverArtistConnectOrCreate,
                    },
                    editors: {
                         connect: editorConnectOrCreate,
                    },
                    inkers: {
                        connect: inkerConnectOrCreate,
                    },
                    letterers: {
                        connect: lettererConnectOrCreate,
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