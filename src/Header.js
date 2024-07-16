import { useEffect, useRef, useState } from "react";
import DynamicSearch from "./DynamicSearch";
// b4a85ef9
// http://www.omdbapi.com/?i=tt3896198&apikey=b4a85ef9
function Header({
  setDataOnSubmit,
  setIsLoading,
  setIsWatchedListOpen,
  setId,
}) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  const onSubmit = async function (e) {
    e.preventDefault();
    try {
      if (query === "") return;
      setIsWatchedListOpen(false);
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=b4a85ef9&s=${query}`
      );
      if (!res.ok) throw new Error("Something went wrong! Try again later...");
      const data = await res.json();
      if (data.Response === "False") setError(true);
      setDataOnSubmit(data.Search);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
    setQuery("");
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="movielistlogo.png" alt="logo" />
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor=""></label>
        <input
          ref={inputEl}
          className="search-input"
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="header-button">Search</button>
        {query.length > 2 && <DynamicSearch query={query} setId={setId} />}
        {error && (
          <span className="error">
            <p>Cannot find any movie with that name!</p>
            <span className="timer-container"></span>
          </span>
        )}
      </form>
      <div style={{ width: "15%" }}>
        <button
          className="header-button"
          onClick={() => setIsWatchedListOpen(true)}
        >
          Watched List
        </button>
      </div>
    </header>
  );
}

export default Header;
