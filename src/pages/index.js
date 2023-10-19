import React, { useState } from "react";
import {useEffect} from 'react';
import {useRouter} from 'next/router';

import ViewComicPage from './viewComic';
import AddComicPage from './addComic'

const CollectionPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

const [comicTitle, setComicTitle] = useState(""); //instantiates state for title
const [publisher, setPublisher] = useState(""); //instantiates state for publisher
const [releaseDate, setReleaseDate] = useState("");

const [writerName, setWriterName] = useState("");
const [coloristName, setColoristName] = useState("");
const [coverArtistName, setCoverArtistName] = useState("");
const [editorName, setEditorName] = useState("");
const [inkerName, setInkerName] = useState("");
const [lettererName, setLettererName] = useState("");


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddClick = () => {
    router.push('/addComic');
  };

  useEffect(() => {
    console.log("comicTitle", comicTitle);
    console.log("publisher", publisher);
    console.log("releaseDate", releaseDate);
    console.log("Writer", writerName);
    console.log("Colorist", coloristName);
    console.log("CoverArtist", coverArtistName);
    console.log("Editor", editorName);
    console.log("Inker", inkerName);
    console.log("Letterer", lettererName);
    
  }, [comicTitle, publisher, releaseDate, writerName, coloristName, coverArtistName, editorName, inkerName, lettererName]) //Array of variables so they update as user types

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {comicTitle, publisher, releaseDate, writerName, coloristName, coverArtistName, editorName, inkerName, lettererName}
  }

  return (
    <div>
      <h1>Comic Collection</h1>
      <ViewComicPage />
      <button type="button" onClick={handleAddClick}>+ Add Comic</button>
    </div>
  )
};

export default CollectionPage;