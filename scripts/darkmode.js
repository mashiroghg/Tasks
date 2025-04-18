/**
 * Apple-inspired Dark Mode System
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialisiere Dark Mode beim Laden
    initAppleDarkMode();
    
    // Setze Event-Listener für die Checkbox
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.addEventListener('change', () => {
            setAppleDarkMode(toggle.checked);
        });
    }
});

function setAppleDarkMode(isDark) {
    // Farbpaletten
    const palette = isDark ? {
        '--apple-light-gray': '#1d1d1f',
        '--apple-dark-gray': '#f5f5f7',
        '--apple-blue': '#2997ff',
        '--apple-light-blue': '#0071e3',
        '--apple-border-gray': '#424245',
        '--apple-bg': '#1d1d1f',
        '--apple-text': '#f5f5f7',
        '--apple-card-bg': '#2c2c2e',
        '--apple-navbar': 'rgba(29, 29, 31, 0.8)',
        '--apple-shadow': '0 4px 20px rgba(0, 0, 0, 0.2)',
        '--apple-dropdown-bg': '#2c2c2e',
        '--apple-footer-border': '#424245'
    } : {
        '--apple-light-gray': '#f5f5f7',
        '--apple-dark-gray': '#1d1d1f',
        '--apple-blue': '#0071e3',
        '--apple-light-blue': '#2997ff',
        '--apple-border-gray': '#d2d2d7',
        '--apple-bg': '#f5f5f7',
        '--apple-text': '#1d1d1f',
        '--apple-card-bg': '#ffffff',
        '--apple-navbar': 'rgba(255, 255, 255, 0.8)',
        '--apple-shadow': '0 4px 20px rgba(0, 0, 0, 0.05)',
        '--apple-dropdown-bg': '#ffffff',
        '--apple-footer-border': '#d2d2d7'
    };

    // CSS Variablen aktualisieren
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    // Bilder anpassen
    document.querySelectorAll('img:not(.no-dark)').forEach(img => {
        img.style.filter = isDark ? 'brightness(0.8)' : 'none';
    });

    // Body-Klassen für spezifische Selektoren
    document.body.classList.toggle('apple-dark-mode', isDark);
    document.body.classList.toggle('apple-light-mode', !isDark);

    // Zustand speichern
    localStorage.setItem('appleDarkMode', isDark);
}

function initAppleDarkMode() {
    // Prüfe gespeicherte Einstellung oder System-Preference
    const savedMode = localStorage.getItem('appleDarkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedMode !== null ? savedMode === 'true' : systemPrefersDark;
    
    // Setze initialen Modus
    setAppleDarkMode(initialMode);
    
    // Checkbox-Status setzen
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.checked = initialMode;
    }
    
    // Systemänderungen beobachten (nur wenn keine Benutzereinstellung)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('appleDarkMode') === null) {
            setAppleDarkMode(e.matches);
        }
    });
}