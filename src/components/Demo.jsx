import { useState, useEffect } from "react";
import { IoMdLink } from "react-icons/io";
import { useLazyGetSummaryQuery } from "../services/article";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import loadingImg from "../assets/loading.gif";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

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

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleDelete = (urlToDelete) => {
    const updatedArticles = allArticles.filter(
      (article) => article.url !== urlToDelete
    );
    setAllArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
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

        <div className="history-container">
          <h3>History</h3>
          {allArticles.map((article, index) => (
            <div
              className="link-card"
              key={`link-${index}`}
              onClick={() => setArticle(article)}
            >
              <div onClick={() => handleCopy(article.url)}>
                {copied === article.url ? (
                  <FaCheck className="check" />
                ) : (
                  <FaRegCopy />
                )}
              </div>
              <p>{article.url}</p>
              <div>
                <MdDeleteForever
                  onClick={() => handleDelete(article.url)}
                  className="delete-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* TODO: Display results */}
      <div>
        {isFetching ? (
          <div className="loading-image">
            <img src={loadingImg} alt="loading_img" />
          </div>
        ) : error ? (
          <p>
            Opps... this was not supposed to happen :/
            <br />
            <span>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="summary-container">
              <h2>Article Summary</h2>
              <div>
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
