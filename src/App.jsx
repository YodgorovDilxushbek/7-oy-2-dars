import './App.css';
import { useState} from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todo, setTodo] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");
  const [addedUsers, setAddedUsers] = useState([]);
  const [counters, setCounters] = useState([0, 0, 0]);

  const handleTodo = (event) => {
    event.preventDefault();
    if (task.trim().length < 3) {
      alert("Vazifa kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    setTodo([...todo, { task, id: Date.now() }]);
    setTask('');
  };

  const handleDeleteTodo = (id) => {
    alert("Rostan ham o'chirmoqchimisiz?");
    setTodo(todo.filter((item) => item.id !== id));
  };

  const addUser = (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), name, email };
    setAddedUsers([...addedUsers, newUser]);
    setName("");
    setEmail("");
  };

  const handleDeleteUser = (id) => {
    alert("Rostan ham o'chirmoqchimisiz?");
    setAddedUsers(addedUsers.filter((user) => user.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleCounterChange = (index, type) => {
    const newCounters = [...counters];
    if (type === "increment") {
      newCounters[index] += 1;
    } else if (type === "decrement") {
      newCounters[index] -= 1;
    } else if (type === "reset") {
      newCounters[index] = 0;
    }
    setCounters(newCounters);
  };

  const filteredUsers = addedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <button
        onClick={toggleTheme}
        className="mb-6 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      <form
        onSubmit={handleTodo}
        className="w-full max-w-md bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Vazifani kiriting..."
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Qo'shish
        </button>
      </form>

      <ul className="w-full max-w-md">
        {todo.map(({ task, id }) => (
          <li
            key={id}
            className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 mb-2 rounded-lg shadow-sm"
          >
            <span>{task}</span>
            <button
              onClick={() => handleDeleteTodo(id)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              O'chirish
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Counter Dashboard</h2>
        {counters.map((counter, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 p-4 mb-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <span>Counter {index + 1}: {counter}</span>
            <div>
              <button
                onClick={() => handleCounterChange(index, "increment")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mx-1"
              >
                Increment
              </button>
              <button
                onClick={() => handleCounterChange(index, "decrement")}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mx-1"
              >
                Decrement
              </button>
              <button
                onClick={() => handleCounterChange(index, "reset")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded mx-1"
              >
                Reset
              </button>
            </div>
          </div>
        ))}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-xl font-bold">Total Sum: {counters.reduce((sum, counter) => sum + counter, 0)}</h3>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Foydalanuvchilar</h2>

        <form onSubmit={addUser} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism"
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Qo'shish
          </button>
        </form>



        <ul className="mt-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-white dark:bg-gray-700 p-4 mb-2 rounded-lg shadow-md"
            >
              <span>{user.name} - {user.email}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                O'chirish
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
