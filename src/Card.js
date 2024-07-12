function Card({ img, title, year, type, setIsHovered, imdbID, setId }) {
  return (
    <div
      className="card-inner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setId(imdbID)}
    >
      <div className="card">
        <img src={img} alt={title} />
      </div>
      <div className="title">
        <h3>{title}</h3>
        <p>{year}</p>
        {/* <p>{type.toUpperCase()}</p> */}
      </div>
    </div>
  );
}

export default Card;
