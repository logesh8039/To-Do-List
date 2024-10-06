let inputText = document.querySelector('.input-text');
let tableBody = document.querySelector('.table-body');

function updateTaskNumber() {
    let rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.querySelector('td').textContent = index + 1;
    });
}

function createTaskRow(taskTextContent, completed = false) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td></td>
        <td><input type="checkbox" class="check" ${completed ? 'checked' : ''} onchange="updateTaskStatus(this)"></td>
        <td class="task-text ${completed ? 'complete' : ''}">${taskTextContent}</td>
        <td class="status">${completed ? 'Completed' : 'Pending'}</td>
        <td>
            <div class="btns">
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
            </div>
        </td>
    `;
    return tr;
}

function addTask() {
    let inputValue = inputText.value.trim();
    if (inputValue !== '') {
        let tasks = getTasks();
        tasks.push({ text: inputValue, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        let newRow = createTaskRow(inputValue);
        tableBody.appendChild(newRow);
        inputText.value = '';
        updateTaskNumber();
    } else {
        alert('Enter Your Task...');
    }
}

function deleteTask(button) {
    let row = button.closest('tr');
    let index = Array.from(tableBody.children).indexOf(row);
    
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    row.remove();
    updateTaskNumber();
}

function editTask(button) {
    let row = button.closest('tr');
    let taskText = row.querySelector('.task-text');
    let currentValue = prompt('Current Input Text', taskText.textContent);
    if (currentValue !== null && currentValue.trim() !== '') {
        let index = Array.from(tableBody.children).indexOf(row);
        
        let tasks = getTasks();
        tasks[index].text = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        taskText.textContent = tasks[index].text;
        updateTaskNumber();
    }
}

function updateTaskStatus(checkbox) {
    let row = checkbox.closest('tr');
    let statusCell = row.querySelector('.status');
    let taskText = row.querySelector('.task-text');
    let index = Array.from(tableBody.children).indexOf(row);
    
    let tasks = getTasks();
    tasks[index].completed = checkbox.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (checkbox.checked) {
        statusCell.textContent = 'Completed';
        taskText.classList.add('complete');
    } else {
        statusCell.textContent = 'Pending';
        taskText.classList.remove('complete');
    }
}

function cancelTask() {
    inputText.value = '';
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => {
        let newRow = createTaskRow(task.text, task.completed);
        tableBody.appendChild(newRow);
    });
    updateTaskNumber();
}

loadTasks();
