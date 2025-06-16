(() => {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  function createTaskItem(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = text;
    editInput.style.display = 'none';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.type = 'button';
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('aria-label', `Edit task: ${text}`);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete task: ${text}`);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(editInput);
    li.appendChild(btnContainer);

    // Editing state toggle
    editBtn.addEventListener('click', () => {
      const isEditing = editInput.style.display === 'inline-block' || editInput.style.display === 'block';
      if (isEditing) {
        // Save edit
        const newText = editInput.value.trim();
        if(newText.length === 0) {
          alert('Task cannot be empty.');
          editInput.focus();
          return;
        }
        taskText.textContent = newText;
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('aria-label', `Edit task: ${newText}`);
        deleteBtn.setAttribute('aria-label', `Delete task: ${newText}`);
        editInput.style.display = 'none';
        taskText.style.display = 'inline';
      } else {
        // Start edit
        editInput.style.display = 'inline-block';
        taskText.style.display = 'none';
        editBtn.textContent = 'Save';
        editInput.focus();
      }
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this task?')) {
        li.remove();
      }
    });

    // Support Enter key to save edit when editing
    editInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        editBtn.click();
      }
      if(e.key === 'Escape') {
        e.preventDefault();
        // Cancel editing revert
        editInput.value = taskText.textContent;
        editInput.style.display = 'none';
        taskText.style.display = 'inline';
        editBtn.textContent = 'Edit';
      }
    });

    return li;
  }

  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask.length === 0) {
      alert('Please enter a task.');
      taskInput.focus();
      return;
    }
    const taskItem = createTaskItem(newTask);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus();
  });
})();
