import { NextResponse } from "next/server";

let fakeTodos = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Finish project", completed: true },
];

// GET /api/todos/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const todo = fakeTodos.find((t) => t.id === Number(params.id));
  return todo
    ? NextResponse.json(todo)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// PUT /api/todos/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json();
  const id = Number(params.id);
  fakeTodos = fakeTodos.map((t) => (t.id === id ? { ...t, ...updates } : t));
  const updated = fakeTodos.find((t) => t.id === id);
  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// DELETE /api/todos/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  fakeTodos = fakeTodos.filter((t) => t.id !== id);
  return NextResponse.json({ id });
}
