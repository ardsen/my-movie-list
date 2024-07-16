import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import StarRating from "./StarRating";

function Details({ id, setId, setWatchedList, watchedList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedMovie, setFetchedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=b4a85ef9&i=${id}`
        );
        const data = await res.json();
        setFetchedMovie(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddWatch = function (movie) {
    const newMovie = {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      imdbRating: movie.imdbRating,
      poster: movie.Poster,
      userRating,
    };
    if (watchedList.some((watched) => watched.id === newMovie.id)) return;
    setWatchedList((watched) => [...watched, newMovie]);
  };
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watchedList));
    },
    [watchedList]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Spinner top="0" />
      ) : (
        <>
          <div>
            <h2>
              {fetchedMovie.Title} ({fetchedMovie.Year})
            </h2>
            <p style={{ textAlign: "center" }}>{fetchedMovie.Writer}</p>
          </div>
          <div className="details-bottom">
            <div>
              <img
                src={
                  fetchedMovie.Poster !== "N/A"
                    ? fetchedMovie.Poster
                    : "./default-poster.jpg"
                }
                alt={fetchedMovie.Title}
              />
            </div>
            <div className="details-right">
              <p>
                {fetchedMovie.Genre} ({capitalizeFirstLetter(fetchedMovie.Type)}
                )
              </p>
              <p>
                <span>Director:</span> {fetchedMovie.Director}
              </p>
              <p>
                <span>Actors:</span> {fetchedMovie.Actors}...
              </p>
              <p>
                <span>Released Date:</span> {fetchedMovie.Released}
              </p>
              <p>{fetchedMovie.Plot}</p>
              <p>
                <span>IMDb Rating:</span> {fetchedMovie.imdbRating}⭐
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Votes: </span>
                {fetchedMovie.imdbVotes}
              </p>
              <p>
                <span>Box Office:</span> {fetchedMovie.BoxOffice}
              </p>
              <div>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  Your Rating
                </span>
                <StarRating
                  size={24}
                  maxRating={10}
                  onSetRating={setUserRating}
                />
              </div>
              <button
                className="add-button"
                onClick={() => handleAddWatch(fetchedMovie)}
              >
                Add to Watched List
              </button>
            </div>
          </div>
          <div className="close" onClick={() => setId(null)}>
            ✖
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
