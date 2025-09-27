import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

// Fake in-memory database
let todos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a Todo App", completed: true },
];

// GET /api/todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST /api/todos
export async function POST(req: Request) {
  const body = await req.json();
  const newTodo = { id: Date.now(), title: body.title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// PUT /api/todos/:id
export async function PUT(req: Request) {
  const body = await req.json();
  todos = todos.map((t) =>
    t.id === body.id ? { ...t, title: body.title, completed: body.completed } : t
  );
  return NextResponse.json({ success: true });
}

// DELETE /api/todos/:id
export async function DELETE(req: Request) {
  const body = await req.json();
  todos = todos.filter((t) => t.id !== body.id);
  return NextResponse.json({ success: true });
}


 // 🔥 Trigger real-time event
  await pusherServer.trigger("todos", "todo-created", newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, completed } = await req.json();
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed } : todo
  );

  const updatedTodo = todos.find((t) => t.id === id);

  // 🔥 Trigger real-time event
  await pusherServer.trigger("todos", "todo-updated", updatedTodo);

  return NextResponse.json(updatedTodo);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  todos = todos.filter((t) => t.id !== id);

  // 🔥 Trigger real-time event
  await pusherServer.trigger("todos", "todo-deleted", { id });

  return NextResponse.json({ success: true });
}