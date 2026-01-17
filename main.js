import './style.css'
import { initScanner, stopScanner } from './src/scanner.js'
import { initGenerator } from './src/generator.js'

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Switch Active State
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Switch View
    const targetId = item.dataset.target;
    views.forEach(view => {
      view.classList.remove('active');
      if (view.id === targetId) view.classList.add('active');
    });

    // Handle Logic Switching
    if (targetId === 'scan-view') {
        initScanner();
    } else {
        stopScanner();
    }
  });
});

// Initialize Generator
initGenerator();

// Start Scanner on load if on scan view (default)
initScanner();
