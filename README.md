# 📝Typescript Todo App

A fully type-safe Todo Application built with TypeScript.
This project demonstrates how to build a small, modular, and maintainable application using  TypeScript.
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
- ✅ **Strong typing with TypeScript**

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js
- npm 


## install dependencies


npm create vite@latest todo-app -- --template react
npm intsall
npx ts-node src/index.ts
npx tsc
node dist/index.js
npx tailwindcss init -p

## start the develpoment server

npm run dev


## Open your browser:

Navigate to http://localhost:5173

## 🧱 Tech Stack & Architecture


Language: TypeScript

Build Tool: tsc (TypeScript compiler)

Runtime: Node.js


## Folder Structures

src/
├── api/             # API functions (fetchTodos, deleteTodo etc.)
├── components/      # Reusable UI components (TodoCard, Modal, etc.)
├── pages/           # Main pages (Home, TodoDetail)
├── App.tsx          # Root component with routing
├── main.tsx         # Entry file
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
