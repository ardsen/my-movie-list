function WatchedMovie({
  title,
  year,
  id,
  poster,
  imdbRating,
  userRating,
  setId,
}) {
  return (
    <div className="watched-movie-card" onClick={() => setId(id)}>
      <img src={poster} alt={title} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          width: "25rem",
        }}
      >
        <p>
          {title} ({year})
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>IMDb: {imdbRating}⭐</p>
          <p>Your Rating: {userRating}⭐</p>
        </div>
      </div>
    </div>
  );
}

export default WatchedMovie;
