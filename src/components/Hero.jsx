import logoImg from "../assets/logo.png";

const Hero = () => {
  return (
    <header className="header">
      <nav>
        <img src={logoImg} alt="" width={200} />
        <button className="github-button">GitHub</button>
      </nav>
      <h1>
        Summarize Articles with <span>OpenAI GPT-4</span>{" "}
      </h1>
      <h2>
        Simplify your reading with SumzAI, an open-source article summarizer
        that transforms lengthy articles into clear and concise summarise
      </h2>
    </header>
  );
};

export default Hero;
