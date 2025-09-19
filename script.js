// Element selection
const startButton = document.getElementById('start-button');
const splashScreen = document.getElementById('splash-screen');
const loginSection = document.getElementById('login-section');
const mainApp = document.getElementById('main-app');

// Three.js Scene Setup
let scene, camera, renderer, cubes = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Create floating cubes with monochromatic color palette
    const colors = [0x333333, 0x555555, 0x777777, 0x999999, 0xbbbbbb];
    
    for (let i = 0; i < 50; i++) {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5
        );
        
        const material = new THREE.MeshLambertMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.6
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (Math.random() - 0.5) * 50;
        cube.position.y = (Math.random() - 0.5) * 50;
        cube.position.z = (Math.random() - 0.5) * 50;
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        cubes.push(cube);
        scene.add(cube);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 30;
    
    // Mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    
    animate();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.01;
    mouseY = (event.clientY - windowHalfY) * 0.01;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Also resize login renderer if it exists
    if (loginRenderer) {
        loginCamera.aspect = window.innerWidth / window.innerHeight;
        loginCamera.updateProjectionMatrix();
        loginRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Also resize main app renderer if it exists
    if (mainRenderer) {
        mainCamera.aspect = window.innerWidth / window.innerHeight;
        mainCamera.updateProjectionMatrix();
        mainRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
    });
    
    renderer.render(scene, camera);
}

// Initialize Three.js when page loads
window.addEventListener('load', initThreeJS);

// Login Section Three.js Setup
let loginScene, loginCamera, loginRenderer, grid, characters = [];

function initLoginThreeJS() {
    // Scene setup
    loginScene = new THREE.Scene();
    loginCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    loginRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    loginRenderer.setSize(window.innerWidth, window.innerHeight);
    loginRenderer.setClearColor(0x000000, 0);
    
    document.getElementById('login-three-container').appendChild(loginRenderer.domElement);
    
    // Create 3D Grid
    const gridSize = 50;
    const gridDivisions = 50;
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    const gridMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x333333, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -10;
    loginScene.add(grid);
    
    // Create dancing characters (simplified geometric shapes)
    const characterColors = [0x666666, 0x888888, 0xaaaaaa, 0xcccccc];
    
    for (let i = 0; i < 8; i++) {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 2 + 1,
            Math.random() * 3 + 2,
            Math.random() * 2 + 1
        );
        
        const material = new THREE.MeshLambertMaterial({
            color: characterColors[Math.floor(Math.random() * characterColors.length)],
            transparent: true,
            opacity: 0.7
        });
        
        const character = new THREE.Mesh(geometry, material);
        character.position.x = (Math.random() - 0.5) * 40;
        character.position.y = Math.random() * 5;
        character.position.z = (Math.random() - 0.5) * 40;
        
        characters.push(character);
        loginScene.add(character);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    loginScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    loginScene.add(directionalLight);
    
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);
    
    animateLogin();
}

function animateLogin() {
    requestAnimationFrame(animateLogin);
    
    // Rotate grid
    grid.rotation.z += 0.001;
    
    // Animate characters (dancing motion)
    characters.forEach((character, index) => {
        character.rotation.y += 0.02;
        character.position.y += Math.sin(Date.now() * 0.002 + index) * 0.02;
        character.rotation.x = Math.sin(Date.now() * 0.003 + index) * 0.1;
    });
    
    loginRenderer.render(loginScene, loginCamera);
}

// Smooth scroll to login section function
function scrollToLogin() {
    loginSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Start button click event
startButton.addEventListener('click', scrollToLogin);

// Enter key press event
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        scrollToLogin();
    }
});

// Intersection Observer for login section animation
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideInFromBottom');
            // Initialize login Three.js when section becomes visible
            if (!loginScene) {
                initLoginThreeJS();
            }
        }
    });
}, observerOptions);

// Observe login section
observer.observe(loginSection);

// Static credentials
const STATIC_USERNAME = 'admin';
const STATIC_PASSWORD = '123456';

// Login form submission
const loginForm = document.querySelector('#login-section form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form inputs
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Check credentials
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
        // Clear any existing error messages
        clearErrorMessage();
        
        // Add fade-out animation to login section
        loginSection.classList.add('fade-out');
        
        // Listen for animation end
        loginSection.addEventListener('animationend', () => {
            // Hide login section
            loginSection.classList.add('hidden');
            
            // Show main app
            mainApp.classList.remove('hidden');
            mainApp.classList.add('flex');
            
            // Initialize main app
            initMainApp();
        });
    } else {
        // Show error message
        showErrorMessage('Kullanıcı adı veya şifre hatalı!');
    }
});

// Function to show error message
function showErrorMessage(message) {
    // Remove existing error message if any
    clearErrorMessage();
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message mt-4 p-3 bg-red-900/50 border border-red-500 text-red-300 text-sm text-center';
    errorDiv.textContent = message;
    
    // Add to form
    loginForm.appendChild(errorDiv);
    
    // Add shake animation to form
    const formContainer = loginForm.closest('div');
    formContainer.classList.add('animate-shake');
    
    // Remove shake animation after it completes
    setTimeout(() => {
        formContainer.classList.remove('animate-shake');
    }, 500);
}

// Function to clear error message
function clearErrorMessage() {
    const existingError = loginForm.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// ==================== TODO APP FUNCTIONALITY ====================

// Task & Folder data structures
let tasks = [];
let folders = [];
let selectedFolderId = null;
let selectedDeletedFolderId = null; // For viewing deleted folder tasks
let currentFilter = 'all'; // 'all', 'active', 'completed'
let deletedCompletedTasks = []; // Backup for undo functionality
let undoTimeout = null; // Timer for undo functionality

// DOM elements for main app
let taskInput, addTaskBtn, taskList, emptyState, taskStats;
let showAllBtn, showActiveBtn, showCompletedBtn, clearCompletedBtn;
let dueDatetimeInput, duePickerBtn;
let folderListEl, addFolderBtn, currentFolderLabel, folderSelectEl, deleteFolderBtn;
let deletedFolderSelectEl, purgeFolderBtn, restoreFolderBtn;
let calendarGridEl, calendarHeaderEl, calPrevBtn, calNextBtn;
let calendarViewDate = new Date();

// Initialize main app
function initMainApp() {
    // Get DOM elements
    taskInput = document.getElementById('task-input');
    addTaskBtn = document.getElementById('add-task-btn');
    taskList = document.getElementById('task-list');
    emptyState = document.getElementById('empty-state');
    taskStats = document.getElementById('task-stats');
    showAllBtn = document.getElementById('show-all');
    showActiveBtn = document.getElementById('show-active');
    showCompletedBtn = document.getElementById('show-completed');
    clearCompletedBtn = document.getElementById('clear-completed');
    dueDatetimeInput = document.getElementById('due-datetime');
    duePickerBtn = document.getElementById('due-picker-btn');
    folderListEl = document.getElementById('folder-list');
    folderSelectEl = document.getElementById('folder-select');
    addFolderBtn = document.getElementById('add-folder-btn');
    currentFolderLabel = document.getElementById('current-folder-label');
    calendarGridEl = document.getElementById('calendar-grid');
    calendarHeaderEl = document.getElementById('calendar-header');
    calPrevBtn = document.getElementById('cal-prev');
    calNextBtn = document.getElementById('cal-next');
    deleteFolderBtn = document.getElementById('delete-folder-btn');
    deletedFolderSelectEl = document.getElementById('deleted-folder-select');
    purgeFolderBtn = document.getElementById('purge-folder-btn');
    restoreFolderBtn = document.getElementById('restore-folder-btn');
    
    // Load tasks & folders from localStorage
    loadState();
    ensureDefaultFolder();
    
    // Add event listeners
    addTaskBtn.addEventListener('click', addTask);
      taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
            addTask();
        }
    });

    // Folder events
    if (addFolderBtn) addFolderBtn.addEventListener('click', onAddFolder);
    if (folderSelectEl) folderSelectEl.addEventListener('change', onFolderSelectChange);
    if (deleteFolderBtn) deleteFolderBtn.addEventListener('click', onDeleteFolder);
    if (purgeFolderBtn) purgeFolderBtn.addEventListener('click', onPurgeFolder);
    if (restoreFolderBtn) restoreFolderBtn.addEventListener('click', onRestoreFolder);
    if (deletedFolderSelectEl) deletedFolderSelectEl.addEventListener('change', onDeletedFolderSelectChange);
    if (calPrevBtn) calPrevBtn.addEventListener('click', () => changeMonth(-1));
    if (calNextBtn) calNextBtn.addEventListener('click', () => changeMonth(1));

    // Initialize and enforce min for datetime input
    if (dueDatetimeInput) {
        const updateMin = () => {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const localISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
            dueDatetimeInput.min = localISO;
            // If current value is before min, clear it
            if (dueDatetimeInput.value && dueDatetimeInput.value < localISO) {
                dueDatetimeInput.value = localISO;
            }
        };
        updateMin();
        // Refresh min every minute to keep up with time
        setInterval(updateMin, 60000);

        // Prevent manual selection of the past
        dueDatetimeInput.addEventListener('change', () => {
            if (!dueDatetimeInput.value) return;
            const minVal = dueDatetimeInput.min;
            if (dueDatetimeInput.value < minVal) {
                dueDatetimeInput.value = minVal;
            }
        });
    }

    // Visible button to open native picker where supported
    if (duePickerBtn && dueDatetimeInput) {
        const openPicker = () => {
            try {
                if (typeof dueDatetimeInput.showPicker === 'function') {
                    dueDatetimeInput.showPicker();
                    return;
                }
            } catch (_) {}
            // Fallback: focus to trigger built-in UI
            dueDatetimeInput.focus();
            dueDatetimeInput.click();
        };
        duePickerBtn.addEventListener('click', openPicker);
    }
    
    // Filter buttons
    showAllBtn.addEventListener('click', () => setFilter('all'));
    showActiveBtn.addEventListener('click', () => setFilter('active'));
    showCompletedBtn.addEventListener('click', () => setFilter('completed'));
    
    // Clear completed button
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // Initialize main app Three.js background
    initMainAppThreeJS();
    
    // Render initial UI
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

// Filter selection
function setFilter(filterKey) {
    if (!['all', 'active', 'completed'].includes(filterKey)) return;
    currentFilter = filterKey;
    // Update active button UI
    const allFilterButtons = document.querySelectorAll('.filter-btn');
    allFilterButtons.forEach(btn => btn.classList.remove('active'));
    if (filterKey === 'all' && showAllBtn) showAllBtn.classList.add('active');
    if (filterKey === 'active' && showActiveBtn) showActiveBtn.classList.add('active');
    if (filterKey === 'completed' && showCompletedBtn) showCompletedBtn.classList.add('active');
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

// Task management functions
function addTask() {      
    const text = taskInput.value.trim();
    if (text === '') return;
    if (!selectedFolderId) ensureDefaultFolder();
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        dueAt: dueDatetimeInput && dueDatetimeInput.value ? new Date(dueDatetimeInput.value).toISOString() : null,
        folderId: selectedFolderId
    };
    
    tasks.push(task);
    taskInput.value = '';
    if (dueDatetimeInput) {
        dueDatetimeInput.value = '';
    }
    saveState();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveState();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveState();
    renderTasks();
    renderCalendar();
}

function clearCompleted() {
    // Store deleted tasks for undo functionality
    deletedCompletedTasks = tasks.filter(t => t.completed && (!selectedFolderId || t.folderId === selectedFolderId));
    
    // Remove completed tasks
    tasks = tasks.filter(t => !t.completed || t.folderId !== selectedFolderId);
    saveState();
    renderTasks();
    
    // Show undo button
    showUndoButton();
}

function showUndoButton() {
    // Clear any existing timeout
    if (undoTimeout) {
        clearTimeout(undoTimeout);
    }
    
    // Create or show undo button
    let undoBtn = document.getElementById('undo-clear-btn');
    if (!undoBtn) {
        undoBtn = document.createElement('button');
        undoBtn.id = 'undo-clear-btn';
        undoBtn.className = 'px-6 py-3 border border-yellow-500 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300 transition-all duration-300';
        undoBtn.style.fontFamily = "'Inter', 'Helvetica Neue', sans-serif";
        undoBtn.style.letterSpacing = '0.1em';
        undoBtn.textContent = 'DEĞİŞİKLİĞİ GERİ AL';
        undoBtn.addEventListener('click', undoClearCompleted);
        
        // Insert before clear completed button
        const clearBtn = document.getElementById('clear-completed');
        clearBtn.parentNode.insertBefore(undoBtn, clearBtn);
    }
    
    undoBtn.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    undoTimeout = setTimeout(() => {
        hideUndoButton();
        deletedCompletedTasks = []; // Clear backup
    }, 5000);
}

function hideUndoButton() {
    const undoBtn = document.getElementById('undo-clear-btn');
    if (undoBtn) {
        undoBtn.classList.add('hidden');
    }
}

function undoClearCompleted() {
    // Clear timeout
    if (undoTimeout) {
        clearTimeout(undoTimeout);
        undoTimeout = null;
    }
    
    // Restore deleted tasks
    tasks = [...tasks, ...deletedCompletedTasks];
    deletedCompletedTasks = [];
    
    saveState();
    renderTasks();
    hideUndoButton();
}

function onClearFolderCompleted() {
    // Don't allow clearing completed tasks in deleted folders
    if (selectedDeletedFolderId) {
        return;
    }
    
    if (!selectedFolderId) {
        return;
    }
    
    // Store deleted tasks for undo functionality
    deletedCompletedTasks = tasks.filter(t => t.completed && t.folderId === selectedFolderId);
    
    // Remove completed tasks from current folder
    tasks = tasks.filter(t => !t.completed || t.folderId !== selectedFolderId);
    saveState();
    renderTasks();
    renderCalendar();
    
    // Show undo button
    showUndoButton();
}


function getFilteredTasks() {
    // If viewing deleted folder tasks, show those instead
    if (selectedDeletedFolderId) {
        const deletedFolderTasks = tasks.filter(t => t.folderId === selectedDeletedFolderId);
        // Apply calendar day filter if any
        let inDate = deletedFolderTasks;
        if (selectedCalendarDate) {
            const start = new Date(selectedCalendarDate);
            start.setHours(0,0,0,0);
            const end = new Date(selectedCalendarDate);
            end.setHours(23,59,59,999);
            inDate = deletedFolderTasks.filter(t => t.dueAt && (new Date(t.dueAt)).getTime() >= start.getTime() && (new Date(t.dueAt)).getTime() <= end.getTime());
        }
        switch (currentFilter) {
            case 'active':
                return inDate.filter(t => !t.completed);
            case 'completed':
                return inDate.filter(t => t.completed);
            default:
                return inDate;
        }
    }
    
    // Normal folder filtering
    const inFolder = tasks.filter(t => !selectedFolderId || t.folderId === selectedFolderId);
    // Apply calendar day filter if any
    let inDate = inFolder;
    if (selectedCalendarDate) {
        const start = new Date(selectedCalendarDate);
        start.setHours(0,0,0,0);
        const end = new Date(selectedCalendarDate);
        end.setHours(23,59,59,999);
        inDate = inFolder.filter(t => t.dueAt && (new Date(t.dueAt)).getTime() >= start.getTime() && (new Date(t.dueAt)).getTime() <= end.getTime());
    }
    switch (currentFilter) {
        case 'active':
            return inDate.filter(t => !t.completed);
        case 'completed':
            return inDate.filter(t => t.completed);
        default:
            return inDate;
    }
}

// Render functions
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // Clear task list
    taskList.innerHTML = '';
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
    
    // Render tasks
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    // Update stats & folder label
    updateStats();
    updateCurrentFolderLabel();
    // Refresh folder counts
    renderFolders();
    // Refresh calendar badges
    renderCalendar();
    
    // Show/hide clear completed button (but not when viewing deleted folders)
    if (selectedDeletedFolderId) {
        // Hide clear completed button when viewing deleted folder
        clearCompletedBtn.classList.add('hidden');
        // Also hide undo button if it exists
        const undoBtn = document.getElementById('undo-clear-btn');
        if (undoBtn) {
            undoBtn.classList.add('hidden');
        }
    } else {
        const completedCount = tasks.filter(t => t.completed && (!selectedFolderId || t.folderId === selectedFolderId)).length;
        if (completedCount > 0) {
            clearCompletedBtn.classList.remove('hidden');
        } else {
            clearCompletedBtn.classList.add('hidden');
        }
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    const isDeletedFolderView = selectedDeletedFolderId !== null;
    
    li.className = `flex items-center gap-2 sm:gap-4 p-3 sm:p-4 ${isDeletedFolderView ? 'bg-red-900/20 border-red-500/50' : 'bg-black/30 border-gray-500'} hover:border-gray-400 transition-all duration-300 group task-item-enter`;
    li.dataset.taskId = task.id;
    
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="w-4 h-4 sm:w-5 sm:h-5 text-white bg-transparent border border-gray-500 focus:ring-0 focus:ring-offset-0 shrink-0"
            ${task.completed ? 'checked' : ''}
            ${isDeletedFolderView ? 'disabled' : ''}
        >
        <div class="flex-1 flex flex-col min-w-0">
            <span class="text-white font-light transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : ''} ${isDeletedFolderView ? 'text-red-200' : ''} text-sm sm:text-base break-words" style="font-family: 'Inter', 'Helvetica Neue', sans-serif;">
                ${escapeHtml(task.text)}
            </span>
            ${task.dueAt ? `<span class="text-xs ${isDeletedFolderView ? 'text-red-300' : 'text-gray-400'} mt-1">${formatLocalDateTime(task.dueAt)}</span>` : ''}
        </div>
        ${!isDeletedFolderView ? `<button class="opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300 text-red-400 hover:text-red-300 p-1 sm:p-2 shrink-0" title="Sil">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>` : ''}
    `;
    
    // Add event listeners only for active folders
    if (!isDeletedFolderView) {
        const checkbox = li.querySelector('input[type="checkbox"]');
        const deleteBtn = li.querySelector('button');
        
        checkbox.addEventListener('change', () => toggleTask(task.id));
        deleteBtn.addEventListener('click', () => deleteTaskWithAnimation(task.id, li));
    }
    
    return li;
}

function deleteTaskWithAnimation(id, element) {
    // Add exit animation
    element.classList.add('task-item-exit');
    
    // Wait for animation to complete, then delete
    setTimeout(() => {
        deleteTask(id);
    }, 300);
}

function updateStats() {
    let inFolder;
    if (selectedDeletedFolderId) {
        inFolder = tasks.filter(t => t.folderId === selectedDeletedFolderId);
    } else {
        inFolder = tasks.filter(t => !selectedFolderId || t.folderId === selectedFolderId);
    }
    const total = inFolder.length;
    const completed = inFolder.filter(t => t.completed).length;
    const remaining = total - completed;
    
    const prefix = selectedDeletedFolderId ? 'Silinecek - ' : '';
    taskStats.textContent = `${prefix}Toplam: ${total} | Tamamlanan: ${completed} | Kalan: ${remaining}`;
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format ISO datetime to local readable string
function formatLocalDateTime(isoString) {
    try {
        const d = new Date(isoString);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch (_) {
        return '';
    }
}

// LocalStorage functions (state)
function saveState() {
    localStorage.setItem('todoState', JSON.stringify({ tasks, folders, selectedFolderId }));
}

function loadState() {
    const saved = localStorage.getItem('todoState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
            folders = Array.isArray(parsed.folders) ? parsed.folders : [];
            selectedFolderId = parsed.selectedFolderId || null;
        } catch (e) {
            console.error('Error loading state:', e);
            tasks = [];
            folders = [];
            selectedFolderId = null;
        }
    } else {
        // Migrate from old storage if exists
        const legacy = localStorage.getItem('todoTasks');
        if (legacy) {
            try {
                tasks = JSON.parse(legacy) || [];
            } catch (_) { tasks = []; }
        }
        folders = [];
        selectedFolderId = null;
        saveState();
    }
}

function ensureDefaultFolder() {
    if (!folders || folders.length === 0) {
        const defaultFolder = { id: 'default', name: 'Genel' };
        folders = [defaultFolder];
        // Assign any tasks without folderId to default
        tasks.forEach(t => { if (!t.folderId) t.folderId = defaultFolder.id; });
        selectedFolderId = defaultFolder.id;
        saveState();
    } else if (!selectedFolderId) {
        selectedFolderId = folders[0].id;
        saveState();
    }
}

// Folder UI & actions
function renderFolders() {
    // Back-compat: clear legacy list if exists
    if (folderListEl) folderListEl.innerHTML = '';
    if (!folderSelectEl) return;
    folderSelectEl.innerHTML = '';
    folders.filter(f => !f.deletedAt).forEach(folder => {
        const opt = document.createElement('option');
        opt.value = folder.id;
        opt.textContent = `${folder.name}`;
        if (folder.id === selectedFolderId) opt.selected = true;
        folderSelectEl.appendChild(opt);
    });
}

function onFolderSelectChange() {
    selectedFolderId = folderSelectEl.value;
    selectedDeletedFolderId = null; // Clear deleted folder selection when selecting active folder
    selectedCalendarDate = null;
    saveState();
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

function onAddFolder() {
    const name = prompt('Klasör adı:');
    if (!name) return;
    const folder = { id: `f_${Date.now()}`, name: name.trim(), deletedAt: null };
    folders.push(folder);
    selectedFolderId = folder.id;
    saveState();
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    updateDeleteFolderButton();
}

function updateCurrentFolderLabel() {
    if (!currentFolderLabel) return;
    
    // If viewing deleted folder
    if (selectedDeletedFolderId) {
        const deletedFolder = folders.find(f => f.id === selectedDeletedFolderId && f.deletedAt);
        const taskCount = tasks.filter(t => t.folderId === selectedDeletedFolderId).length;
        currentFolderLabel.textContent = deletedFolder ? 
            `Silinecek Klasör: ${deletedFolder.name} (${taskCount} görev)` : 
            'Silinecek klasör bulunamadı';
        currentFolderLabel.className = 'text-red-400 text-sm font-light';
        return;
    }
    
    // Normal folder display
    const current = folders.find(f => f.id === selectedFolderId);
    currentFolderLabel.textContent = current ? `Klasör: ${current.name}` : 'Görevlerinizi organize edin';
    currentFolderLabel.className = 'text-gray-400 text-sm font-light';
}

function updateDeleteFolderButton() {
    if (!deleteFolderBtn) return;
    const isDefault = selectedFolderId === 'default';
    deleteFolderBtn.disabled = isDefault;
    deleteFolderBtn.classList.toggle('opacity-50', isDefault);
    deleteFolderBtn.classList.toggle('cursor-not-allowed', isDefault);
    
    // Update clear completed button visibility
    
}

function renderDeletedFolders() {
    if (!deletedFolderSelectEl) return;
    deletedFolderSelectEl.innerHTML = '';
    const deleted = folders.filter(f => f.deletedAt);
    
    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = deleted.length === 0 ? '—' : 'Klasör seçin...';
    defaultOpt.selected = !selectedDeletedFolderId;
    deletedFolderSelectEl.appendChild(defaultOpt);
    
    // Add deleted folders
    deleted.forEach(folder => {
        const taskCount = tasks.filter(t => t.folderId === folder.id).length;
        const opt = document.createElement('option');
        opt.value = folder.id;
        opt.textContent = `${folder.name} (${taskCount} görev)`;
        opt.selected = selectedDeletedFolderId === folder.id;
        deletedFolderSelectEl.appendChild(opt);
    });
}
function onDeletedFolderSelectChange() {
    const selectedValue = deletedFolderSelectEl.value;
    if (selectedValue) {
        selectedDeletedFolderId = selectedValue;
        selectedFolderId = null; // Clear active folder selection
        selectedCalendarDate = null;
    } else {
        selectedDeletedFolderId = null;
    }
    renderTasks();
    updateCurrentFolderLabel();
}

function onRestoreFolder() {
    if (!deletedFolderSelectEl || !deletedFolderSelectEl.value) return;
    const id = deletedFolderSelectEl.value;
    const folder = folders.find(f => f.id === id && f.deletedAt);
    if (!folder) return;
    const tasksInFolder = tasks.filter(t => t.folderId === id).length;
    const ok = confirm(`"${folder.name}" klasörünü geri getirmek istiyor musunuz?\nBu klasörde ${tasksInFolder} görev var.`);
    if (!ok) return;
    
    // Restore folder: remove deletedAt timestamp
    folder.deletedAt = null;
    
    // Switch to the restored folder
    selectedFolderId = folder.id;
    selectedDeletedFolderId = null; // Clear deleted folder selection
    
    saveState();
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

function onPurgeFolder() {
    if (!deletedFolderSelectEl || !deletedFolderSelectEl.value) return;
    const id = deletedFolderSelectEl.value;
    const folder = folders.find(f => f.id === id && f.deletedAt);
    if (!folder) return;
    const tasksInFolder = tasks.filter(t => t.folderId === id).length;
    const ok = confirm(`Kalıcı olarak silinsin mi?\nKlasör: ${folder.name}\nGörev sayısı: ${tasksInFolder}`);
    if (!ok) return;
    tasks = tasks.filter(t => t.folderId !== id);
    folders = folders.filter(f => f.id !== id);
    selectedDeletedFolderId = null; // Clear selection after deletion
    saveState();
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

function onDeleteFolder() {
    if (!selectedFolderId || selectedFolderId === 'default') return;
    const current = folders.find(f => f.id === selectedFolderId);
    if (!current) return;
    const tasksInFolder = tasks.filter(t => t.folderId === selectedFolderId).length;
    const ok = confirm(`"${current.name}" klasörünü silmek istiyor musunuz?\nBu klasörde ${tasksInFolder} görev var. Klasör ve görevler 'Silinen Klasörler' menüsüne taşınacaktır.`);
    if (!ok) return;
    // Soft delete: mark folder as deleted
    current.deletedAt = new Date().toISOString();
    // Choose next active folder
    const firstActive = folders.find(f => !f.deletedAt && f.id !== 'default');
    selectedFolderId = firstActive ? firstActive.id : 'default';
    saveState();
    renderFolders();
    renderDeletedFolders();
    renderTasks();
    renderCalendar();
    updateDeleteFolderButton();
}

// ===== Calendar =====
function changeMonth(delta) {
    calendarViewDate.setMonth(calendarViewDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    if (!calendarGridEl || !calendarHeaderEl) return;
    // Header
    const monthFormatter = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' });
    calendarHeaderEl.textContent = monthFormatter.format(calendarViewDate);

    // Grid
    calendarGridEl.innerHTML = '';
    // Weekday headers
    const weekdayShort = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
    weekdayShort.forEach(d => {
        const h = document.createElement('div');
        h.className = 'text-[11px] text-gray-500 text-center py-1';
        h.textContent = d;
        calendarGridEl.appendChild(h);
    });

    const first = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1);
    const last = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0);
    // Convert Sunday(0) to 7 to make Monday-first grid
    const startOffset = (first.getDay() === 0 ? 7 : first.getDay()) - 1;
    const totalDays = last.getDate();
    const cellsBefore = startOffset;
    const cellsTotal = cellsBefore + totalDays;
    const trailing = (7 - (cellsTotal % 7)) % 7;

    // Helper to get tasks on a day within selected folder
    const tasksByDay = {};
    const inFolder = tasks.filter(t => !selectedFolderId || t.folderId === selectedFolderId);
    inFolder.forEach(t => {
        if (!t.dueAt) return;
        const d = new Date(t.dueAt);
        if (d.getMonth() !== calendarViewDate.getMonth() || d.getFullYear() !== calendarViewDate.getFullYear()) return;
        const key = d.getDate();
        tasksByDay[key] = (tasksByDay[key] || 0) + 1;
    });

    const today = new Date();
    today.setHours(0,0,0,0);

    // Leading empty cells
    for (let i = 0; i < cellsBefore; i++) {
        const c = document.createElement('div');
        c.className = 'h-8 text-xs text-gray-600 opacity-30 border border-gray-800';
        calendarGridEl.appendChild(c);
    }
    // Day cells
    for (let day = 1; day <= totalDays; day++) {
        const cellDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day);
        const isToday = cellDate.getTime() === today.getTime();
        const count = tasksByDay[day] || 0;
        const btn = document.createElement('button');
        btn.className = `relative h-8 text-xs border ${isToday ? 'border-white' : 'border-gray-700'} hover:border-white transition-all duration-200`;
        btn.innerHTML = `<span class="absolute left-1 top-1/2 -translate-y-1/2">${day}</span>` +
                        (count > 0 ? `<span class="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] px-1 border ${count>0?'border-white':'border-gray-700'}">${count}</span>` : '');
        btn.addEventListener('click', () => onCalendarDayClick(cellDate));
        calendarGridEl.appendChild(btn);
    }
    // Trailing empty cells
    for (let i = 0; i < trailing; i++) {
        const c = document.createElement('div');
        c.className = 'h-8 text-xs text-gray-600 opacity-30 border border-gray-800';
        calendarGridEl.appendChild(c);
    }
}

function onCalendarDayClick(dateObj) {
    // Set filter to show all, but constrain via date when rendering
    setFilter('all');
    // Store selected date for render filter
    selectedCalendarDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    renderTasks();
    // Visual feedback: bold header for selected day in month label
    if (calendarHeaderEl) {
        const fmt = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
        calendarHeaderEl.textContent = `${new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(calendarViewDate)} • ${fmt.format(selectedCalendarDate)}`;
    }
}

let selectedCalendarDate = null;

// Main App Three.js Background
let mainScene, mainCamera, mainRenderer, mainCubes = [];

function initMainAppThreeJS() {
    // Scene setup
    mainScene = new THREE.Scene();
    mainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    mainRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    mainRenderer.setSize(window.innerWidth, window.innerHeight);
    mainRenderer.setClearColor(0x000000, 0);
    
    document.getElementById('main-three-container').appendChild(mainRenderer.domElement);
    
    // Create subtle floating elements
    const colors = [0x222222, 0x333333, 0x444444, 0x555555];
    
    for (let i = 0; i < 30; i++) {
        const geometry = new THREE.SphereGeometry(
            Math.random() * 0.5 + 0.2,
            8, 6
        );
        
        const material = new THREE.MeshLambertMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.3
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = (Math.random() - 0.5) * 100;
        sphere.position.y = (Math.random() - 0.5) * 100;
        sphere.position.z = (Math.random() - 0.5) * 100;
        
        mainCubes.push(sphere);
        mainScene.add(sphere);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    mainScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(1, 1, 1);
    mainScene.add(directionalLight);
    
    mainCamera.position.z = 50;
    
    animateMain();
}

function animateMain() {
    requestAnimationFrame(animateMain);
    
    mainCubes.forEach((sphere, index) => {
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
        sphere.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.01;
    });
    
    mainRenderer.render(mainScene, mainCamera);
}


