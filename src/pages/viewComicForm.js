import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ViewComic = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        fetch('/api/viewComic')
            .then((response) => response.json())
            .then((data) => setComics(data.comics))
            .catch((error) => console.error(error));
    }, []);

    const handleUpdate = (id) => {
        // call update method with id
        console.log(`Update comic with id ${id}`);
    };

    const handleDelete = (id) => {
        // call delete method with id
        console.log(`Delete comic with id ${id}`);
    };

    return (
        <div className="container mx-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Title</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Release Date</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Publisher</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Writers</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Colorists</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Inkers</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Cover Artists</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Editors</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Letterers</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-600">Actions</th>
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
                            <td className="border px-4 py-2">
                                <button onClick={() => handleUpdate(comic.id)} style={{marginRight: '10px', color: 'lightblue'}}>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(comic.id)} style={{color: 'red'}}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewComic;