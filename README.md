# 📝 React Todo App

A fully functional and visually appealing Todo Application built with **React 19+, React Router, Tailwind CSS, TanStack Query**, and **React Aria**. This project is designed to be accessible, performant, and developer-friendly, showcasing modern frontend practices.

---

## ✨ Features

- 🧾 **Create, Read, Update, Delete (CRUD)** todos
- 🔍 **Search** todos by keyword
- ✅ **Filter** todos by status (All, Completed, Incomplete)
- 📄 **View** full details of a single todo
- ♿ **Accessible UI** using [React Aria](https://react-spectrum.adobe.com/react-aria/)
- 📦 **State management & caching** with TanStack Query
- 📱 **Responsive design**
- 🧪 **Error boundaries** and fallback UIs

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js
- npm 


## install dependencies


npm create vite@latest todo-app -- --template react
npm intsall
npm install react-router-dom@7 @tanstack/react-query axios tailwindcss postcss autoprefixer @react-aria/button @react-aria/checkbox @react-aria/listbox @react-aria/textfield @react-aria/visually-hidden lucide-react
npx tailwindcss init -p

## start the develpoment server

npm run dev


## Open your browser:

Navigate to http://localhost:5173


## 🧱 Tech Stack & Architecture


| Layer         | Tech Stack                                     |
| ------------- | ---------------------------------------------- |
| Frontend      | React 19, Vite, Tailwind CSS                   |
| Routing       | React Router v7+                               |
| State & Data  | TanStack Query (for data fetching & caching)   |
| Forms/Modals  | React Aria, Tailwind Modal + Controlled Inputs |
| UI Components | Custom + Utility-based styling (Tailwind)      |
| APIs          | REST-style functions using Fetch/Axios         |


## Folder Structures

src/
├── api/             # API functions (fetchTodos, deleteTodo etc.)
├── components/      # Reusable UI components (TodoCard, Modal, etc.)
├── pages/           # Main pages (Home, TodoDetail)
├── App.jsx          # Root component with routing
├── main.jsx         # Entry file
└── styles/          # Tailwind + Global styles (if any)


## 📡 API Documentation & Usage

Base URL: http://localhost:5173
Fetch All Todos
GET /todos

Create Todo
POST /todos

{
  "title": "Task name",
  "description": "Optional",
  "completed": false
}

Update Todo
PUT /todos/:id

Delete Todo
DELETE /todos/:id

Get Single Todo
GET /todos/:id

Note: If you're mocking with local state or using a fake server like JSON Server, adapt routes accordingly.

### SCREENSHOTS
![alt text](<public/Screenshot 2025-06-15 at 11.04.05.png>)
![alt text](<public/Screenshot 2025-06-15 at 11.04.13.png>)


### ⚠️ Known Issues
Todos are not persisted to a backend/database (in-memory or local fake API only).
Lacks authentication or user roles.


### 🔭 Future Improvements
🔐 Add user authentication (e.g., Auth0 or Firebase)
🧩 Add due dates and reminders
☁️ Connect to a backend (e.g., Express + PostgreSQL or Supabase)
