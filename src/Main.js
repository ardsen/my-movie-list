import { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import Spinner from "./Spinner";
import Details from "./Details";
import WatchedList from "./WatchedList";

function Main() {
  const [dataOnSubmit, setDataOnSubmit] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isWatchedListOpen, setIsWatchedListOpen] = useState(false);
  const [watchedList, setWatchedList] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  return (
    <main>
      <div className="wrapper">
        <div className="container">
          <Header
            setDataOnSubmit={setDataOnSubmit}
            setIsLoading={setIsLoading}
            setIsWatchedListOpen={setIsWatchedListOpen}
            setId={setId}
          />
          {isWatchedListOpen ? (
            <WatchedList watchedList={watchedList} setId={setId} />
          ) : (
            <div className="card-container">
              {dataOnSubmit?.map((item) => (
                <Card
                  key={item.imdbID}
                  imdbID={item.imdbID}
                  img={
                    item.Poster !== "N/A" ? item.Poster : "./default-poster.jpg"
                  }
                  title={item.Title}
                  year={item.Year}
                  type={item.Type}
                  setIsHovered={setIsHovered}
                  setId={setId}
                />
              ))}
            </div>
          )}
          {isLoading && <Spinner />}
          {id && (
            <Details
              id={id}
              setId={setId}
              setWatchedList={setWatchedList}
              watchedList={watchedList}
            />
          )}
        </div>
        {(isHovered || id) && (
          <div className="overlay" onClick={() => setId(null)}></div>
        )}
      </div>
    </main>
  );
}

export default Main;
