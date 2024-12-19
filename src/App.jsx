import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FetchUrl from "./FetchUrl";
import './App.css'

const App = () => {
  const [data, setData] = useState("Loading");
  const [urlContent, setUrlContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GOOGLE_API_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `summarize in detail ${urlContent}`;
        const result = await model.generateContent(prompt);
        setData(await result.response.text());
      } catch (error) {
        console.error("Error fetching or generating content:", error);
        setData("Failed to generate content.");
      }
    };

    if (urlContent) {
      fetchData();
    }
  }, [urlContent]);

  return (
    <div className="container">
      <FetchUrl setUrlContent={setUrlContent} />
 <p className="data">{data}</p>
    </div>
  );
};

export default App;
