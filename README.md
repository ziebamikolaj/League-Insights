# League Insights

**League Insights** is a web application designed for League of Legends players to explore and analyze champion statistics, player performance, and other insights. The project is built with a **NestJS** backend and a **Next.js** frontend, providing a seamless experience for users to check up-to-date data on champions, items, and other in-game metrics.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time data on champions, items, and player stats
- Responsive and user-friendly UI
- Search and filter functionality
- API integration for up-to-date League of Legends data
- Detailed champion insights and item builds

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React framework for server-rendered and statically generated web apps)
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework for scalable server-side applications)
- **Database**: PostgreSQL (or your choice of DBMS)
- **API**: League of Legends API (to fetch real-time data on champions, items, etc.)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- PostgreSQL (or an alternative database)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/league-insights.git
   cd league-insights
   ```

2. **Install Dependencies**

   - **Frontend**:

     ```bash
     cd frontend
     npm install
     ```

   - **Backend**:

     ```bash
     cd ../backend
     npm install
     ```

3. **Configure Environment Variables**

   Create `.env` files in the `frontend` and `backend` directories. See [Environment Variables](#environment-variables) for details.

4. **Start the Development Server**

   - **Backend**:

     ```bash
     cd backend
     npm run start:dev
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm run dev
     ```

5. Open `http://localhost:3000` in your browser to view the app.

## Environment Variables

### Backend (`backend/.env`)

- `DATABASE_URL`: Connection string for PostgreSQL
- `API_KEY`: League of Legends API key
- `PORT`: Port for the backend server (default: 4000)

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL`: URL for the backend server (default: `http://localhost:4000`)

## Project Structure

```plaintext
league-insights/
├── frontend/           # Next.js frontend application
│   ├── components/     # React components
│   ├── app/            # Next.js pages
│   └── public/         # Static assets
├── backend/            # NestJS backend application
│   ├── src/
│   │   ├── modules/    # Feature modules
│   │   ├── db/         # Database layer
│   │   └── Middleware/ # Middleware layer
└── README.md           # Project documentation
```
