# Speech Transcription and Translation App

A real-time speech-to-text transcription application built with React that uses the Web Speech API to convert spoken words into written text. Translation feature will be added later.

## Overview

This application allows users to:

- Convert speech to text in real-time
- See interim results as they speak
- Start and stop voice recording with a toggle button
- Clear the transcript history
- View both final and interim transcriptions simultaneously

## Features

- **Real-time Transcription**: Converts speech to text as you speak
- **Interim Results**: Shows preliminary transcription results while speaking
- **Continuous Recording**: Maintains an active listening session until manually stopped
- **Simple Controls**: Easy-to-use interface with start/stop and clear functionality
- **Browser Compatible**: Works with browsers that support the Web Speech API. Currently, this does not support Firefox web browser.

## Technologies Used

- React
- Web Speech API (specifically webkitSpeechRecognition)
- CSS for styling

## Prerequisites

- A modern web browser that supports the Web Speech API (Chrome recommended)
- Node.js and npm installed on your system

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:

```bash
cd [project-folder-name]
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Usage

1. Open the application in your web browser
2. Click the "Start Listening" button to begin voice recognition
3. Speak into your microphone
4. View the transcription in real-time
5. Click "Stop Listening" to end the recording session
6. Use the "Clear Transcript" button to reset the transcript

## Browser Support

The application primarily supports Chrome and Chrome-based browsers, as it uses the `webkitSpeechRecognition` API. Support in other browsers may be limited.

## Known Limitations

- Requires an active internet connection
- Browser compatibility is limited to those supporting the Web Speech API
- Best performance is achieved in Chrome-based browsers
- Requires microphone access permission

## Troubleshooting

If you encounter issues:

1. Ensure your browser supports the Web Speech API
2. Check that you've granted microphone permissions
3. Verify your internet connection is stable
4. Make sure your microphone is working properly
