import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import DynamicSearchCard from "./DynamicSearchCard";

function DynamicSearch({ query, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicMovie, setDynamicMovie] = useState([]);
  const slicedArr = dynamicMovie ? dynamicMovie.slice(0, 5) : "";
  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=b4a85ef9&s=${query}`
        );
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setDynamicMovie(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="dynamic-search-container">
      {isLoading && <Spinner top="0" />}
      {slicedArr === "" ? (
        <span
          style={{
            marginTop: "15px",
            paddingBottom: "15px",
            color: "brown",
            fontWeight: "bold",
          }}
        >
          Could not find a movie with that name!
        </span>
      ) : (
        slicedArr
          .slice(0, 5)
          .map((movie) => (
            <DynamicSearchCard
              poster={
                movie.Poster !== "N/A" ? movie.Poster : "./default-poster.jpg"
              }
              key={movie.imdbID}
              title={movie.Title}
              id={movie.imdbID}
              year={movie.Year}
              setId={setId}
            />
          ))
      )}
      <button className="dynamic-search-button">🔍</button>
    </div>
  );
}

export default DynamicSearch;
