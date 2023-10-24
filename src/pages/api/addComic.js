const express = require('express');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mandalorian#35',
  database: 'comics'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

const addComic = (req, res) => {
    const {
        title,
        releaseDate,
        publisher,
        writers = [],
        colorists = [],
        coverArtists = [],
        editors = [],
        inkers = [],
        letterers = [],
    } = req.body;

    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            res.status(500).json({ error: 'Failed to add comic' });
            return;
        }

        const comicValues = {
            id: uuidv4(),
            title,
            releaseDate,
            publisher,
        };
        

        connection.query('INSERT INTO Comic SET ?', comicValues, (err, result) => {
            if (err) {
                console.error('Error inserting comic:', err);
                connection.rollback(() => {
                    res.status(500).json({ error: 'Failed to add comic' });
                });
                return;
            }
            
            const comicId = comicValues.id;

            const writerValues = writers.map((writer) => {
                if (writer.id) {
                  return { id: writer.id };
                } else {
                  const writerId = uuidv4();
                  return { id: writerId, name: writer.name };
                }
              });

            connection.query('INSERT INTO Writer SET ?', writerValues, (err, result) => {
                if (err) {
                    console.error('Error inserting writers:', err);
                    connection.rollback(() => {
                        res.status(500).json({ error: 'Failed to add comic' });
                    });
                    return;
                }

                const writerIds = writerValues.map((writer) => writer.id);

                    const coloristValues = colorists.map((colorist) => {
                        if(colorist.id) {
                            return { id: colorist.id };
                        } else {
                            const coloristId = uuidv4();
                            return { id: coloristId, name: colorist.name };
                        }
                    });

                    connection.query('INSERT INTO Colorist SET ?', coloristValues, (err, result) => {
                        if (err) {
                            console.error('Error inserting colorists:', err);
                            connection.rollback(() => {
                                res.status(500).json({ error: 'Failed to add comic' });
                            });
                            return;
                        }

                        const coloristIds = coloristValues.map((colorist) => colorist.id);

                            const coverArtistValues = coverArtists.map((coverArtist) => {
                                if(coverArtist.id) {
                                    return { id: coverArtist.id };
                                } else {
                                    const coverArtistId = uuidv4();
                                    return { id: coverArtistId, name: coverArtist.name };
                                }
                            });

                            connection.query('INSERT INTO CoverArtist SET ?', coverArtistValues, (err, result) => {
                                if (err) {
                                    console.error('Error inserting cover artists:', err);
                                    connection.rollback(() => {
                                        res.status(500).json({ error: 'Failed to add comic' });
                                    });
                                    return;
                                }

                                const coverArtistIds = coverArtistValues.map((coverArtist) => coverArtist.id);

                                    const editorValues = editors.map((editor) => {
                                        if(editor.id) {
                                            return { id: editor.id };
                                        } else {    
                                            const editorId = uuidv4();
                                            return { id: editorId, name: editor.name };
                                        }
                                    });

                                    connection.query('INSERT INTO Editor SET ?', editorValues, (err, result) => {
                                        if (err) {
                                            console.error('Error inserting editors:', err);
                                            connection.rollback(() => {
                                                res.status(500).json({ error: 'Failed to add comic' });
                                            });
                                            return;
                                        }

                                        const editorIds = editorValues.map((editor) => editor.id);

                                            const inkerValues = inkers.map((inker) => {
                                                if(inker.id) {
                                                    return { id: inker.id };
                                                } else {
                                                    const inkerId = uuidv4();
                                                    return { id: inkerId, name: inker.name };
                                                }
                                            });

                                            connection.query('INSERT INTO Inker SET ?', inkerValues, (err, result) => {
                                                if (err) {
                                                    console.error('Error inserting inkers:', err);
                                                    connection.rollback(() => {
                                                        res.status(500).json({ error: 'Failed to add comic' });
                                                    });
                                                    return;
                                                }

                                                const inkerIds = inkerValues.map((inker) => inker.id);

                                                    const lettererValues = letterers.map((letterer) => {
                                                        if(letterer.id) {
                                                            return { id: letterer.id };
                                                        } else {
                                                            const lettererId = uuidv4();
                                                            return { id: lettererId, name: letterer.name };
                                                        }
                                                    });

                                                    connection.query('INSERT INTO Letterer SET ?', lettererValues, (err, result) => {
                                                        if (err) {
                                                            console.error('Error inserting letterers:', err);
                                                            connection.rollback(() => {
                                                                res.status(500).json({ error: 'Failed to add comic' });
                                                            });
                                                            return;
                                                        }

                                                        const lettererIds = lettererValues.map((letterer) => letterer.id);


                                                        const comicWriterValues = writerIds.map((writerId) => ({
                                                            comicId: {comicId}.comicId,
                                                            writerId,
                                                        }));
                                                        
                                                        const comicColoristValues = coloristIds.map((coloristId) => ({
                                                            comicId: {comicId}.comicId,
                                                            coloristId,
                                                        }));

                                                        const comicCoverArtistValues = coverArtistIds.map((coverArtistId) => ({
                                                            comicId: {comicId}.comicId,
                                                            coverArtistId,
                                                        }));

                                                        const comicEditorValues = editorIds.map((editorId) => ({
                                                            comicId: {comicId}.comicId,
                                                            editorId,
                                                        }));

                                                        const comicInkerValues = inkerIds.map((inkerId) => ({
                                                            comicId: {comicId}.comicId,
                                                            inkerId,
                                                        }));

                                                        const comicLettererValues = lettererIds.map((lettererId) => ({
                                                            comicId: {comicId}.comicId,
                                                            lettererId,
                                                        }));
                                              
                                                        connection.query('INSERT INTO ComicWriter SET ?', comicWriterValues, (err, result) => {
                                                            if (err) {
                                                                console.error('Error inserting comic writers:', err);
                                                                connection.rollback(() => {
                                                                    res.status(500).json({ error: 'Failed to add comic' });
                                                                });
                                                                return;
                                                            }
                                                        });

                                                        connection.query('INSERT INTO ComicColorist SET ?', comicColoristValues, (err, result) => {
                                                            if (err) {
                                                                console.error('Error inserting comic colorists:', err);
                                                                connection.rollback(() => {
                                                                    res.status(500).json({ error: 'Failed to add comic' });
                                                                });
                                                                return;
                                                            }
                                              
                                                        connection.query('INSERT INTO ComicCoverArtist SET ?', comicCoverArtistValues, (err, result) => {
                                                            if (err) {
                                                                console.error('Error inserting comic cover artists:', err);
                                                                connection.rollback(() => {
                                                                    res.status(500).json({ error: 'Failed to add comic' });
                                                                });
                                                                return;
                                                            }
                                              
                                                        connection.query('INSERT INTO ComicEditor SET ?', comicEditorValues, (err, result) => {
                                                            if (err) {
                                                                console.error('Error inserting comic editors:', err);
                                                                connection.rollback(() => {
                                                                    res.status(500).json({ error: 'Failed to add comic' });
                                                                });
                                                                return;
                                                            }
                                              
                                                        connection.query('INSERT INTO ComicInker SET ?', comicInkerValues, (err, result) => {
                                                            if (err) {
                                                                console.error('Error inserting comic inkers:', err);
                                                                connection.rollback(() => {
                                                                    res.status(500).json({ error: 'Failed to add comic' });
                                                                });
                                                                return;
                                                            }
                                              
                                                        connection.query('INSERT INTO ComicLetterer SET ?', comicLettererValues, (err, result) => {
                                                                    if (err) {
                                                                            console.error('Error inserting comic letterers:', err);
                                                                            connection.rollback(() => {
                                                                                res.status(500).json({ error: 'Failed to add comic' });
                                                                            });
                                                                            return;
                                                                             }
                                              
                                              
                                                            connection.commit((err) => {
                                                                if (err) {
                                                                    console.error('Error committing transaction:', err);
                                                                    connection.rollback(() => {
                                                                        res.status(500).json({ error: 'Failed to add comic' });
                                                                    });
                                                                    return;
                                                                }

                                                                console.log('Comic added successfully!');
                                                                res.status(200).json({ message: 'Comic added successfully!' });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

export default addComic;