import { useState, useEffect } from "react";
import { IoMdLink } from "react-icons/io";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const handleChange = (e) => {
    setArticle({
      ...article,
      url: e.target.value,
    });
  };

  return (
    <section className="demo-section">
      <div className="search-container">
        <form onSubmit={() => {}}>
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
      </div>
      {/* TODO: Display results */}
    </section>
  );
};

export default Demo;
