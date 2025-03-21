# Note Quiz Application

A web-based application to test and improve music note reading skills. This quiz renders musical notes on a grand staff and challenges users to identify them correctly.

## Features

- Practice mode for casual learning
- Competitive mode with local high score tracking
- Student selection with password protection
- Visual feedback with confetti effects for high scores
- Audio feedback using piano sounds
- Timer-based gameplay

## Technologies Used

- Next.js
- React
- Tone.js for piano sounds
- Canvas Confetti for visual effects
- Canvas API for rendering the musical staff

## Getting Started

### Prerequisites

- Node.js (version 14.0 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3001`

### Sound Files

The application requires the following sound files to be placed in the `/public` directory:

- success.mp3 - Played when a user answers correctly
- error.mp3 - Played when a user answers incorrectly
- practiceSuccess.mp3 - Played when a practice session ends
- highScoreSuccess.mp3 - Played when a high score is achieved

You can download these sound files or create your own.

## How to Use

1. Select a mode (Practice or Competitive)
2. For competitive mode, select a student from the dropdown
   - The student data is stored locally in the browser
   - Password for student authentication: "onDeals"
3. Press "Start" to begin the quiz
4. Identify the note displayed on the staff by clicking on the correct answer
5. Try to get the highest score possible before the timer runs out!

## Quiz Range

The quiz covers notes from C3 to B4 (two octaves).
