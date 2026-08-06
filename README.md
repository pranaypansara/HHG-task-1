# HH Goa 2026 Builder Card Generator

A web application that generates a personalized **HH Goa 2026 Builder Card** from a user's photo and basic information. The generated card can be downloaded as a PNG and shared on X.

Built as a submission for the **Hacker House Goa 2026 Shortlisting Task**.

## Features

- Upload a profile photo
- Enter name, role, status, and college/company
- Live Builder Card preview
- Generate a branded Builder Card
- Download as a PNG
- Share on X using a pre-filled tweet

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Sharp

## Project Structure

```text
hh-goa-builder/
│
├── client/
└── server/
```

## Local Setup

### Clone the repository

```bash
git clone https://github.com/your-username/hh-goa-builder.git
cd hh-goa-builder
```

### Install dependencies

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

BASE_URL=http://localhost:5000

CLIENT_URL=http://localhost:5173
```

## Screenshots

### Landing Page

_Add screenshot_

### Builder Generator

_Add screenshot_

## Roadmap

- [ ] Multiple card themes
- [ ] Additional customization options
- [ ] QR code support
- [ ] Public Builder Card gallery

## License

This project was created for the Hacker House Goa 2026 shortlisting task.
