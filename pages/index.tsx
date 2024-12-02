import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    //firebase
    client.queries.sayHello({
      content: "Amplify",
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    // client.models.Todo.create({
    //   content: window.prompt("Todo content"),
    // });
    
    // ex1
    client.mutations.upsertTransaction({
      name: "Dhruv",
      age: "25",
      education: "msc",
      weight: "65kg",
      work_exp: "3years",
      action: "insert",
    });

    // ex2
    client.mutations.addTransaction({
      name: "Dhruv",
      age: "25",
      education: "msc",
      weight: "65kg",
      work_exp: "3years",
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
