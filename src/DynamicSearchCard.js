function DynamicSearchCard({ poster, title, id, year, setId }) {
  return (
    <>
      <div className="dynamic-card" onClick={() => setId(id)}>
        <div className="dynamic-image">
          <img src={poster} alt={`${title} poster.`} />
        </div>
        <div className="dynamic-info">
          <p>
            {title} <span>({year})</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default DynamicSearchCard;
