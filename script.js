document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const searchInput = document.getElementById('search');
    const showAllButton = document.getElementById('show-all');
    const showCompletedButton = document.getElementById('show-completed');
    const showActiveButton = document.getElementById('show-active');
    const noTasksMessage = document.getElementById('no-tasks-message');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'active') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            if (task.completed) taskItem.classList.add('completed');
            taskItem.dataset.id = task.id;

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(task.id));
            taskItem.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            taskItem.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Unmark' : 'Complete';
            completeButton.addEventListener('click', () => toggleComplete(task.id));
            taskItem.appendChild(completeButton);

            taskList.appendChild(taskItem);
        });

        noTasksMessage.classList.toggle('hidden', tasks.length > 0);
    };

    const addTask = () => {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        newTaskInput.value = '';
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    const toggleComplete = (id) => {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    };

    const editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    const filterTasks = (filter) => {
        renderTasks(filter);
    };

    const searchTasks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            if (task.completed) taskItem.classList.add('completed');
            taskItem.dataset.id = task.id;

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(task.id));
            taskItem.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            taskItem.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Unmark' : 'Complete';
            completeButton.addEventListener('click', () => toggleComplete(task.id));
            taskItem.appendChild(completeButton);

            taskList.appendChild(taskItem);
        });
    };

    addTaskButton.addEventListener('click', addTask);
    showAllButton.addEventListener('click', () => filterTasks('all'));
    showCompletedButton.addEventListener('click', () => filterTasks('completed'));
    showActiveButton.addEventListener('click', () => filterTasks('active'));
    searchInput.addEventListener('input', searchTasks);

    renderTasks();
});
