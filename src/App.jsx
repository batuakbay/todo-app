import { useEffect, useState } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './components/Api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/Filter';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTodos();
        console.log("API'den dönen veri:", data);
        const todos = data.data.map((item) => ({
          row_id: item.row_id,
          text: item.text,
          completed: item.completed === "TRUE", 
          createdAt: item.createdAt,
        }));
        setTodos(todos);
        setFilteredTodos(todos); 
      } catch (err) {
        setError(err.message);
        setTodos([]);
        setFilteredTodos([]); 
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAdd = async (todo) => {
    try {
      const addedTodo = await addTodo(todo);
      setTodos((prev) => [...prev, addedTodo]);
      setFilteredTodos((prev) => [...prev, addedTodo]); 
    } catch (err) {
      console.error("Görev eklenirken hata oluştu:", err.message);
    }
  };

  const handleToggle = async (row_id) => {
    try {
      const todo = todos.find((t) => t.row_id === row_id);

      if (!todo) {
        throw new Error(`row_id ${row_id} ile eşleşen bir görev bulunamadı.`);
      }

      const updated = await updateTodo(row_id, !todo.completed, todo.text);
      setTodos((prev) =>
        prev.map((t) => (t.row_id === row_id ? { ...t, completed: updated.completed } : t))
      );
      setFilteredTodos((prev) =>
        prev.map((t) => (t.row_id === row_id ? { ...t, completed: updated.completed } : t))
      ); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (row_id) => {
    try {
      await deleteTodo(row_id);
      setTodos((prev) => prev.filter((t) => t.row_id !== row_id));
      setFilteredTodos((prev) => prev.filter((t) => t.row_id !== row_id)); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (searchText) => {
    const filtered = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase()) 
    );
    setFilteredTodos(filtered); 
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>To-Do Uygulaması</h1>
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      </header>

      <main className="app-main">
        <TodoForm onAdd={handleAdd} onSearch={handleSearch}/>
        <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;