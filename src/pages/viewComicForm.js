import {useState, useEffect} from 'react';

const ViewComicPage = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComics() {
            try {
                const response = await fetch('/api/viewComic');
                if(response.ok) {
                    const data = await response.json();
                    setComics(data.comics);
                }
                else {
                    console.error('Error fetching comics: ', response.status);
                }
            } catch(error) {
                console.error('An error occurred: ', error);
            } finally {
                setLoading(false);
            }
        }

        fetchComics();
    },
    [])


return (
    <div>
        <h1>Comic Collection</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Publisher</th>
                        <th>Writers</th>
                        <th>Colorists</th>
                        <th>Cover Artists</th>
                        <th>Editors</th>
                        <th>Inkers</th>
                        <th>Letterers</th>
                    </tr>
                </thead>
                <tbody>
                    {comics.map((comic) => (
                        <tr key={comic.id}>
                            <td>{comic.title}</td>
                            <td>{comic.releaseDate}</td>
                            <td>{comic.publisher}</td>
                            <td>{comic.writers.map((writer) => (
                                <span key={writer.id}>{writer.name}, </span> ))}
                            </td>
                            <td>{comic.colorists.map((colorist) => (
                                <span key={colorist.id}>{colorist.name}, </span> ))}
                            </td>
                            <td>{comic.coverArtists.map((coverArtist) => (
                                <span key={coverArtist.id}>{coverArtist.name}, </span> ))}
                            </td>
                            <td>{comic.editors.map((editor) => (
                                <span key={editor.id}>{editor.name}, </span> ))}
                            </td>
                            <td>{comic.inkers.map((inker) => (
                                <span key={inker.id}>{inker.name}, </span> ))}
                            </td>
                            <td>{comic.letterers.map((letterer) => (
                                <span key={letterer.id}>{letterer.name}, </span> ))}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
)
};

export default ViewComicPage;