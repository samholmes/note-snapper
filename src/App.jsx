import Snaps from "./components/Snaps";
import Camera from "./components/Camera";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getStructuredDataFromImage } from "./api";

function App() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [snaps, setSnaps] = useState(getInitialSnaps);

  const handleClearStorage = () => {
    setSnaps([])
  }

  /**
   * @param {string} img
   */
  async function onNewImage(img) {
    try {
      if (isLoading) return;
      navigate("/");
      setIsLoading(true);

      /**
       * Part 1:
       * Customize this prompt to get the data you want from the image.
       * Specify how you'd like it formatted as well.
       */
      let prompt
      if (snaps.length > 0) {
        const prev = snaps[snaps.length - 1]
        prompt = `Scan the text on this page to continue the story and summarize the general key points of the plot of the story in few short sentences. Previous page's summary:\n\n ${prev}`;
      }
      else {
        prompt = `Scan the text on this page, and summarize the general key points of the plot of the story in few short sentences.`;
      }

      const result = await getStructuredDataFromImage(img, prompt)

      /**
       * Part 2:
       * Format the result to your liking before it's added to the list of snaps.
       */
      setError('')
      setSnaps((r) => [result, ...r]);
    } catch (error) {
      setError(`${String(error)}`)
      console.error(error)
    }
    finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(snaps));
  }, [snaps]);

  return (
    <>
      <Navbar onClearStorage={handleClearStorage} />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {error !== '' ?
                <pre>{error}</pre>
              : null}
              {isLoading && (
                <div className="p-2 w-full text-center mb-2">
                  Scanning Snap...
                </div>
              )}
              <Snaps snaps={snaps} />
            </div>
          }
        />
        <Route
          path="camera"
          element={
            <div className="w-screen h-screen">
              <Camera onNewImage={onNewImage} />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default function () {
  return (
    <Router>
      <App />
    </Router>
  );
}

function getInitialSnaps() {
  const storedResults = localStorage.getItem("results");
  if (storedResults) {
    return JSON.parse(storedResults);
  }
  return [];
}
