import WatchedMovie from "./WatchedMovie";

function WatchedList({ watchedList, setId }) {
  return (
    <div className="watched-movie-container">
      {watchedList.map((movie) => (
        <WatchedMovie
          key={movie.id}
          poster={movie.poster}
          title={movie.title}
          year={movie.year}
          id={movie.id}
          userRating={movie.userRating}
          imdbRating={movie.imdbRating}
          setId={setId}
        />
      ))}
    </div>
  );
}

export default WatchedList;
