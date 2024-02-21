import { useState, useEffect } from "react";
import { IoMdLink } from "react-icons/io";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleChange = (e) => {
    setArticle({
      ...article,
      url: e.target.value,
    });
  };

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  return (
    <section className="demo-section">
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <IoMdLink className="link-icon" />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={handleChange}
            required
          />
          <button type="submit">⏎</button>
        </form>

        {/*TODO: URL history */}
        <div className="url-history">
          {allArticles.map((article, index) => (
            <div
              className="link-card"
              key={`link-${index}`}
              onClick={() => setArticle(article)}
            >
              <div>
                <img src="" alt="copy_icon" />
              </div>
              <p>{article.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* TODO: Display results */}
      <div>
        {isFetching ? (
          <img src="" alt="loading_img" />
        ) : error ? (
          <p>
            Opps... this was not supposed to happen :/
            <br />
            <span>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div>
              <h2>Article Summary</h2>
              <div>
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
      {/* TODO: Style the output from the API fetching and find appropriate image for lading */}
    </section>
  );
};

export default Demo;
