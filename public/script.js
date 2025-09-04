document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const API_URL = 'http://localhost:5000/todos';

    // --- Fetch and Display Todos ---
    const fetchTodos = async () => {
        try {
            const response = await fetch(API_URL);
            const todos = await response.json();
            todoList.innerHTML = ''; // Clear the list before rendering
            todos.forEach(todo => {
                renderTodoItem(todo);
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // --- Render a single todo item ---
    const renderTodoItem = (todo) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo._id;
        if (todo.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleComplete(todo._id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.addEventListener('click', () => deleteTodo(todo._id));

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };

    // --- Add a new todo ---
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text === '') return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            const newTodo = await response.json();
            renderTodoItem(newTodo);
            todoInput.value = ''; // Clear input field
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    // --- Toggle complete status ---
    const toggleComplete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
            });
            // Visually update the item
            const todoItem = document.querySelector(`[data-id="${id}"]`);
            todoItem.classList.toggle('completed');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // --- Delete a todo ---
    const deleteTodo = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            // Remove item from the UI
            const todoItem = document.querySelector(`[data-id="${id}"]`);
            todoItem.remove();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };


    // Initial fetch of todos when the page loads
    fetchTodos();
});