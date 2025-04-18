// Simulierter Login
document.getElementById('login-btn').addEventListener('click', () => {
    const demoUser = {
      name: "User",
      avatar: "assets/default-avatar.png",
      id: "demo-user"
    };
    
    // User in LocalStorage speichern
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
    updateAuthUI();
  });
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    updateAuthUI();
  });
  
  // UI aktualisieren
  function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const appContent = document.getElementById('task-container');
    
    if (user) {
      // Eingeloggt
      document.getElementById('login-btn').style.display = 'none';
      document.getElementById('user-profile').style.display = 'flex';
      appContent.style.display = 'block';
      
      document.getElementById('username').textContent = user.name;
      document.getElementById('user-avatar').src = user.avatar;
    } else {
      // Ausgeloggt
      document.getElementById('login-btn').style.display = 'block';
      document.getElementById('user-profile').style.display = 'none';
      appContent.style.display = 'none';
    }
  }
  
  // Beim Start prüfen
  updateAuthUI();
