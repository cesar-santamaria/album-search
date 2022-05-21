import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "components/SearchBar";
import Error from "components/Error";
import Filters from "components/Filters";
import Results from "components/Results";


export default function LiveSearch(props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  
  useEffect(()=> {
    const URL = `https://itunes.apple.com/search?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;
    
    axios.get(URL)
      .then((response)=> {
        setResults(response.data.results);
      });


  },[term]);

  return (
    <Fragment>
      <header className="logo">
        <img src="images/brand.png" alt="Brand" />
      </header>
      <main>
        <SearchBar
          loading={search.loading}
          onSearch={term => setSearch({ ...search, term })}
        />
        <Error show={error} onClose={event => setError(false)}>
          The server returned an error.
        </Error>
        <Filters
          filters={filters}
          setFilter={(filter, value) =>
            setFilters({ ...filters, [filter]: value })
          }
        />
        <Results results={search.results} filters={filters} />
      </main>
    </Fragment>
  );
}
