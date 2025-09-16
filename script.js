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

// Task data structure
let tasks = [];
let currentFilter = 'all'; // 'all', 'active', 'completed'

// DOM elements for main app
let taskInput, addTaskBtn, taskList, emptyState, taskStats;
let showAllBtn, showActiveBtn, showCompletedBtn, clearCompletedBtn;
let dueDatetimeInput, duePickerBtn;

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
    
    // Load tasks from localStorage
    loadTasks();
    
    // Add event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

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
    
    // Render initial tasks
    renderTasks();
}

// Task management functions
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        dueAt: dueDatetimeInput && dueDatetimeInput.value ? new Date(dueDatetimeInput.value).toISOString() : null
    };
    
    tasks.push(task);
    taskInput.value = '';
    if (dueDatetimeInput) {
        dueDatetimeInput.value = '';
    }
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

// Filter functions
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    [showAllBtn, showActiveBtn, showCompletedBtn].forEach(btn => {
        btn.classList.remove('active', 'border-white', 'text-white');
        btn.classList.add('border-gray-500', 'text-gray-400');
    });
    
    const activeBtn = filter === 'all' ? showAllBtn : 
                     filter === 'active' ? showActiveBtn : showCompletedBtn;
    activeBtn.classList.add('active', 'border-white', 'text-white');
    activeBtn.classList.remove('border-gray-500', 'text-gray-400');
    
    renderTasks();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
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
    
    // Update stats
    updateStats();
    
    // Show/hide clear completed button
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount > 0) {
        clearCompletedBtn.classList.remove('hidden');
    } else {
        clearCompletedBtn.classList.add('hidden');
    }
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-4 p-4 bg-black/30 border border-gray-500 hover:border-gray-400 transition-all duration-300 group task-item-enter';
    li.dataset.taskId = task.id;
    
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="w-5 h-5 text-white bg-transparent border border-gray-500 focus:ring-0 focus:ring-offset-0"
            ${task.completed ? 'checked' : ''}
        >
        <div class="flex-1 flex flex-col">
            <span class="text-white font-light transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : ''}" style="font-family: 'Inter', 'Helvetica Neue', sans-serif;">
                ${escapeHtml(task.text)}
            </span>
            ${task.dueAt ? `<span class="text-xs text-gray-400 mt-1">${formatLocalDateTime(task.dueAt)}</span>` : ''}
        </div>
        <button class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400 hover:text-red-300 p-2" title="Sil">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
    `;
    
    // Add event listeners
    const checkbox = li.querySelector('input[type="checkbox"]');
    const deleteBtn = li.querySelector('button');
    
    checkbox.addEventListener('change', () => toggleTask(task.id));
    deleteBtn.addEventListener('click', () => deleteTaskWithAnimation(task.id, li));
    
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
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    
    taskStats.textContent = `Toplam: ${total} | Tamamlanan: ${completed} | Kalan: ${remaining}`;
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

// LocalStorage functions
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('todoTasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading tasks:', e);
            tasks = [];
        }
    }
}

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

