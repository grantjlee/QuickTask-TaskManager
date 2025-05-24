// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get(API_URL).then(res => setTasks(res.data));
    }, []);

    const addTask = () => {
        if (!text) return;
        axios.post(API_URL, { text }).then(res => {
            setTasks([...tasks, res.data]);
            setText('');
        });
    };

    const toggleTask = id => {
        axios.put(`${API_URL}/${id}`).then(() => {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        });
    };

    const deleteTask = id => {
        axios.delete(`${API_URL}/${id}`).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>QuickTask</h2>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="New Task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
            <span
                onClick={() => toggleTask(task.id)}
                style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                }}
            >
              {task.text}
            </span>
                        <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 10 }}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
