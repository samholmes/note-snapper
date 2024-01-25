# Note Snapper

This is a boilerplate webapp for scanning images to virtualize their text to retain useful information. We encourage you to come up with your own creative ideas. Maybe make a Note Snapper for recipes, or a Note Snapper for school notes. Maybe do multiple types! The sky's the limit!

## Features

- **React**: Utilizes the latest features of React for building user interfaces.
- **React Router**: Employs React Router for seamless navigation within the app.
- **TailwindCSS**: Styling is done with TailwindCSS, providing a responsive and customizable design.
- **Tailwind Hero Icons**: Incorporates Tailwind Hero Icons for enhanced visual appeal and user interaction.

## Installation Instructions

To get Note Snapper up and running on your local machine, follow these steps:

1. **Clone the Repository**

   - Clone this repository to your local machine using your preferred method (SSH or HTTPS).

2. **Install Dependencies**

   - Navigate to the root directory of the project in your terminal.
   - Run the following command to install all the necessary dependencies:
     ```
     npm i
     ```

3. **Download Ngrok**

   - Download and install [ngrok](https://ngrok.com/) on your machine. This tool is required to expose your local server to the internet.

4. **Run Ngrok**

   - Once ngrok is installed, expose your local server (default port 5173 for React apps) by running:
     ```
     ngrok http 5173
     ```
   - This will provide you with a URL that forwards to your local server.

5. **Start the Development Server**
   - In a new terminal window, navigate back to the root directory of the project.
   - Run the following command to start the development server:
     ```
     npm run dev
     ```
   - Your app should now be running and accessible via the URL provided by ngrok.

---

Enjoy using Note Snapper for all your note-taking needs!
