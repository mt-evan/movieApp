import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "https://www.omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter" && state.s.trim() !== "") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        if (data.Response === "True") {
          let results = data.Search;

          setState(prevState => {
            return { ...prevState, results: results, errorMessage: "" }
          });
        } else {
          setState(prevState => {
            return { ...prevState, results: [], errorMessage: "No results found" }
          });
        }
      }).catch(error => {
        setState(prevState => {
          return { ...prevState, errorMessage: "An error occurred. Please try again later." }
        });
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App