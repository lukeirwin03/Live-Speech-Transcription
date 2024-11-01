import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript((prev) => prev + finalTranscript);
        setInterimTranscript(interimTranscript);
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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

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
    fetch('/dummy.txt') // Fetches from public
      .then((response) => response.text()) // Converts to text
      .then((text) => {
        setTranscript((prev) => prev + text); // Appends text content
      })
      .catch((error) => console.error("Error loading text file:", error));
  };
  

  return (
    <div className="App">
      <h1 className="web-header">transcribe.io</h1>
      <div className="transcript">
        <h2>Transcript:</h2>
        <textarea
          value={transcript + (isListening ? interimTranscript : '')}
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
      </div>
    </div>
  );
}

export default App;
