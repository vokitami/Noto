# Noto 

**Noto** is a note-taking application designed to help users organize their ideas through folders and notes in one personal space.

The project was built with **React, Vite, Tailwind CSS and Supabase**, focusing on component organization, reusable logic, authentication, CRUD operations and responsive UI.

## Features

* User registration and login
* Create, rename and delete folders
* Create, edit and delete notes
* Automatic saving while editing notes
* Light and dark mode
* Spanish and English language support
* Responsive design
* Localized note creation dates
* Persistent data with Supabase
* User logout

## Technologies

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* react-i18next
* Lucide React

### Backend & Database

* Supabase
* Supabase Authentication

### Tools

* Git
* GitHub
* Vercel

## What I practiced

This project was also built as a learning project to strengthen my understanding of React and modern frontend development.

Some of the concepts applied include:

* React component architecture
* Props and callbacks
* State management with `useState`
* Side effects with `useEffect`
* Persistent mutable values with `useRef`
* Custom hooks
* Optional chaining and nullish coalescing
* Async/await and Promise handling
* CRUD operations
* React Router navigation and route parameters
* Responsive design with Tailwind CSS
* Internationalization (i18n)
* Separation of responsibilities
* Reusable components and logic

The application separates UI components from reusable logic through custom hooks, making the code easier to maintain and extend.

## Authentication & Data

Noto uses **Supabase** for authentication and data persistence.

Users can create an account, log in and manage their own folders and notes.

The frontend communicates with Supabase through its JavaScript client, while the database handles persistent storage.

## Internationalization

The application supports two languages:

* 🇲🇽 Spanish
* 🇺🇸 English

Translations are handled using `react-i18next`, including interface text, buttons and placeholders.

## Responsive Design

The interface was designed to adapt to different screen sizes using a mobile-first approach with Tailwind CSS.

The layout adjusts spacing, typography and component positioning depending on the available screen width.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/noto.git
```

Move into the project directory:

```bash
cd noto
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Live Demo

**Coming soon**

The application is deployed with Vercel.

## Version

**v1.0.0 — First Release**

This is the first production version of the project. Future versions may include additional features and improvements to the user experience.

## About the project

Noto started as a React learning project and evolved into a complete application where I could practice frontend development concepts in a real-world context.

Throughout the project, I focused not only on making the application work, but also on improving its structure, separating responsibilities and creating reusable logic.

---

Built with React ⚛️
