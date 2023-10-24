import { useState, useEffect } from 'react';

const ViewComic = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetch('/api/viewComic')
      .then((response) => response.json())
      .then((data) => setComics(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comics</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Release Date</th>
            <th className="px-4 py-2">Publisher</th>
            <th className="px-4 py-2">Writers</th>
            <th className="px-4 py-2">Colorists</th>
            <th className="px-4 py-2">Inkers</th>
            <th className="px-4 py-2">Cover Artists</th>
            <th className="px-4 py-2">Editors</th>
            <th className="px-4 py-2">Letterers</th>
          </tr>
        </thead>
        <tbody>
          {comics.map((comic) => (
            <tr key={comic.id}>
              <td className="border px-4 py-2">{comic.title}</td>
              <td className="border px-4 py-2">{comic.releaseDate}</td>
              <td className="border px-4 py-2">{comic.publisher}</td>
              <td className="border px-4 py-2">{comic.writers}</td>
              <td className="border px-4 py-2">{comic.colorists}</td>
              <td className="border px-4 py-2">{comic.inkers}</td>
              <td className="border px-4 py-2">{comic.coverArtists}</td>
              <td className="border px-4 py-2">{comic.editors}</td>
              <td className="border px-4 py-2">{comic.letterers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewComic;