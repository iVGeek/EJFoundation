// Theme Toggle Script
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Function to toggle the theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Event Listener for Theme Toggle
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme when the page loads
window.addEventListener('load', initializeTheme);

// Hamburger Menu Script
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('nav-active');
    navLinks.classList.toggle('nav-active');
});
