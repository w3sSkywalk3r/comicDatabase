import {useState } from 'react';

const AddComicForm = () => {
    const [comicData, setComicData] = useState({
        title: '',
        releaseData: '',
        publisher: '',
        writers: [],
        colorists: [],
        coverArtists: [],
        editors: [], 
        inkers: [],
        letterers: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addComic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comicData),
            });
            if(response.ok) {
                //Handle Successes
                const data = await response.json();
                console.log(data.message);
            }
            else {
                //Handle Error
                const errorData = await response.json();
                console.error('An error occurred: ', error);
            }
        } catch (error) {

        }
    }
};

return (
    <form 
        class="w-full max-w-lg"
        onSubmit = {handleSubmit}
    >
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Title
        </label>
        <input 
          onChange={(e) => setComicTitle(e.target.value)} //When an input is triggered will save response
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
          id="grid-first-name" 
          type="text" 
          placeholder="Action Comics #1"/>
      </div>
      <div class="w-full md:w-1/2 px-3">
      
      <div class="relative focus-within:text-gray-600 text-gray-400">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Release Date
          </label>
                    <input 
                      onChange={(e) => setReleaseDate(e.target.value)}
                      type="text" 
                      class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      placeholder="04/18/1938"
                    />
                    <div class="absolute left-3 top-2">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Writer(s)
        </label>
        <input 
          onChange={(e) => setWriterName(e.target.value)}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-password" 
          type="text"
           placeholder="Jerry Siegel"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Inker(s)
        </label>
        <input
          onChange={(e) => setInkerName(e.target.value)} 
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city" 
          type="text" 
          placeholder="Albuquerque"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Colorist(s)
        </label>
        <input 
          onChange={(e) => setColoristName(e.target.value)}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-city" 
          type="text" 
          placeholder="Joe Schuster"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Cover Artist(s)
        </label>
        <input 
          onChange={(e) => setCoverArtistName(e.target.value)}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-city" 
          type="text"
          placeholder="Joe Schuster"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Letterer(s)
        </label>
        <input 
          onChange={(e) => setLettererName(e.target.value)}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-city" 
          type="text"
          placeholder="Albuquerque"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Editor(s)
        </label>
        <input 
          onChange={(e) => setEditorName(e.target.value)}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
          id="grid-city"
          type="text" 
          placeholder="Albuquerque"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          Publisher
        </label>
        <div class="relative">
          <select 
            onChange={(e) => setPublisher(e.target.value)}
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="grid-state"
          >
            <option>Marvel</option>
            <option>DC</option>
            <option>Independent</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </div>
  </form>
  );

export default AddComicForm;

