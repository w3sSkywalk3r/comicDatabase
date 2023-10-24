import mysql from 'mysql';

export default function handler(req, res) {
  // create a connection to the database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'comic_database',
  });

  // connect to the database
  connection.connect();

  // query the database for all comics and their related data
  connection.query(
    `SELECT Comic.*, GROUP_CONCAT(DISTINCT Writer.name ORDER BY Writer.name ASC SEPARATOR ', ') AS writers, 
    GROUP_CONCAT(DISTINCT Colorist.name ORDER BY Colorist.name ASC SEPARATOR ', ') AS colorists, 
    GROUP_CONCAT(DISTINCT Inker.name ORDER BY Inker.name ASC SEPARATOR ', ') AS inkers, 
    GROUP_CONCAT(DISTINCT CoverArtist.name ORDER BY CoverArtist.name ASC SEPARATOR ', ') AS coverArtists, 
    GROUP_CONCAT(DISTINCT Editor.name ORDER BY Editor.name ASC SEPARATOR ', ') AS editors 
    FROM Comic 
    LEFT JOIN ComicWriter ON Comic.id = ComicWriter.comicId 
    LEFT JOIN Writer ON ComicWriter.writerId = Writer.id 
    LEFT JOIN ComicColorist ON Comic.id = ComicColorist.comicId 
    LEFT JOIN Colorist ON ComicColorist.coloristId = Colorist.id 
    LEFT JOIN ComicInker ON Comic.id = ComicInker.comicId 
    LEFT JOIN Inker ON ComicInker.inkerId = Inker.id 
    LEFT JOIN ComicCoverArtist ON Comic.id = ComicCoverArtist.comicId 
    LEFT JOIN CoverArtist ON ComicCoverArtist.coverArtistId = CoverArtist.id 
    LEFT JOIN ComicEditor ON Comic.id = ComicEditor.comicId 
    LEFT JOIN Editor ON ComicEditor.editorId = Editor.id 
    GROUP BY Comic.id`,
    (error, results, fields) => {
      if (error) throw error;

      // create an array to hold the comics
      const comics = [];

      // loop through the results and add each comic to the array
      results.forEach((comic) => {
        comics.push({
          id: comic.id,
          title: comic.title,
          releaseDate: comic.releaseDate,
          publisher: comic.publisher,
          writers: comic.writers,
          colorists: comic.colorists,
          inkers: comic.inkers,
          coverArtists: comic.coverArtists,
          editors: comic.editors,
          letterers: comic.letterers,
        });
      });

      // return the comics as JSON data
      res.status(200).json(comics);
    }
  );

  // close the database connection
  connection.end();
}