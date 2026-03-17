import { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";

import EditorModule from "react-simple-code-editor";
const Editor = EditorModule.default;

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const reviewCode = async () => {
    try {
      setLoading(true);
      setReview("");

      const response = await axios.post(
        "http://localhost:3000/ai/ai-review",
        { code },
        {withCredentials:true}
      );

      setReview(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.log(error);
      setReview("Error: Failed to get review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* LEFT PANEL */}
      <div className="left">
        <div className="editor-container">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              background: "transparent",
              color: "#fff",
              minHeight: "100%",
            }}
          />
        </div>

        <button onClick={reviewCode} className="review-btn">
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">
        <div className="output">
          {loading ? (
            <div className="loader">Analyzing code...</div>
          ) : (
            <Markdown>{review}</Markdown>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;