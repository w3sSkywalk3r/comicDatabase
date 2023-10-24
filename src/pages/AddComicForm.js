import React, { useState } from 'react';

const AddComicForm = () => {
  const [comicData, setComicData] = useState({
    title: '',
    releaseDate: '',
    publisher: '',
    writers: [],
    colorists: [],
    coverArtists: [],
    editors: [],
    inkers: [],
    letterers: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (['writers', 'colorists', 'coverArtists', 'editors', 'inkers', 'letterers'].includes(name)) {
      const index = parseInt(event.target.dataset.index);
      const field = event.target.dataset.field;

      setComicData((prevState) => {
        const newData = { ...prevState };
        newData[name][index][field] = value;
        return newData;
      });
    } else {
      setComicData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddField = (event) => {
    const { name } = event.target;

    setComicData((prevState) => ({
      ...prevState,
      [name]: [
        ...prevState[name],
        { name: '' },
      ],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.preventDefault();

    try {
      const response = await fetch('/api/addComic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comicData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setComicData({
        title: '',
        releaseDate: '',
        publisher: '',
        writers: [],
        colorists: [],
        coverArtists: [],
        editors: [],
        inkers: [],
        letterers: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={comicData.title}
          onChange={handleInputChange}
          className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="releaseDate" className="block text-gray-700 font-bold mb-2">
          Release Date
        </label>
        <input
          id="releaseDate"
          name="releaseDate"
          type="text"
          value={comicData.releaseDate}
          onChange={handleInputChange}
          className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="publisher" className="block text-gray-700 font-bold mb-2">
          Publisher
        </label>
        <select
          id="publisher"
          name="publisher"
          value={comicData.publisher}
          onChange={handleInputChange}
          className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a publisher</option>
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Independent">Independent</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="writers" className="block text-gray-700 font-bold mb-2">
          Writers
        </label>
        {comicData.writers.map((writer, index) => (
          <input
            key={index}
            type="text"
            name="writers"
            data-index={index}
            data-field="name"
            value={writer.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="writers" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Writer
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="colorists" className="block text-gray-700 font-bold mb-2">
          Colorists
        </label>
        {comicData.colorists.map((colorist, index) => (
          <input
            key={index}
            type="text"
            name="colorists"
            data-index={index}
            data-field="name"
            value={colorist.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="colorists" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Colorist
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="coverArtists" className="block text-gray-700 font-bold mb-2">
          Cover Artists
        </label>
        {comicData.coverArtists.map((coverArtist, index) => (
          <input
            key={index}
            type="text"
            name="coverArtists"
            data-index={index}
            data-field="name"
            value={coverArtist.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="coverArtists" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Cover Artist
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="editors" className="block text-gray-700 font-bold mb-2">
          Editors
        </label>
        {comicData.editors.map((editor, index) => (
          <input
            key={index}
            type="text"
            name="editors"
            data-index={index}
            data-field="name"
            value={editor.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="editors" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Editor
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="inkers" className="block text-gray-700 font-bold mb-2">
          Inkers
        </label>
        {comicData.inkers.map((inker, index) => (
          <input
            key={index}
            type="text"
            name="inkers"
            data-index={index}
            data-field="name"
            value={inker.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="inkers" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Inker
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="letterers" className="block text-gray-700 font-bold mb-2">
          Letterers
        </label>
        {comicData.letterers.map((letterer, index) => (
          <input
            key={index}
            type="text"
            name="letterers"
            data-index={index}
            data-field="name"
            value={letterer.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
        ))}
        <button type="button" name="letterers" onClick={handleAddField} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Letterer
        </button>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Comic
      </button>
    </form>
  );
};

export default AddComicForm;