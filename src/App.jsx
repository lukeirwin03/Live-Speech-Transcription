import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "AIzaSyBD-sD49Yp4BWfNJ9OntLpJA4M0PJ5hcF8";
const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en"); // Default English
  const [targetLanguage, setTargetLanguage] = useState("es"); // Default Spanish

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += result + " ";
          } else {
            interim += result;
          }
        }

        setTranscript((prev) => prev + final);
        setInterimTranscript(interim);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.log("Web Speech API is not supported in this browser.");
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleClearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
  };

  const copyText = () => {
    navigator.clipboard.writeText(transcript);
  };

  const simulateSpeech = () => {
    fetch("/assets/dummy.txt")
      .then((response) => response.text())
      .then((text) => {
        setTranscript((prev) => prev + text);
      })
      .catch((error) => console.error("Error loading text file:", error));
  };

  const translateText = async () => {
    try {
      const response = await axios.post(TRANSLATE_URL, {
        q: transcript,
        source: sourceLanguage,
        target: targetLanguage,
      });
      setTranscript(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="web-header">transcribe.io</h1>
      <div className="transcript">
        <h2>Transcript:</h2>
        <textarea
          value={transcript + interimTranscript}
          onChange={handleTranscriptChange}
          disabled={isListening}
          rows={10}
          cols={50}
        />
      </div>
      <div className="button-holder">
        <button onClick={toggleListening}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <button onClick={copyText}>Copy</button>
        <button onClick={handleClearTranscript}>Clear Transcript</button>
        <button onClick={simulateSpeech}>Simulate Speech</button>
        <button onClick={translateText}>Translate</button>
      </div>
      <div className="language-select">
        <label>
          Source Language:
          <select onChange={handleSourceLanguageChange} value={sourceLanguage}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="nl">Dutch</option>
          <option value="el">Greek</option>
          <option value="tr">Turkish</option>
          </select>
        </label>
        <label>
          Target Language:
          <select onChange={handleTargetLanguageChange} value={targetLanguage}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="nl">Dutch</option>
          <option value="el">Greek</option>
          <option value="tr">Turkish</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default App;
