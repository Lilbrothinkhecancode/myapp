<script>
    let isDarkMode = true;
  
    function toggleTheme() {
      isDarkMode = !isDarkMode;
      document.body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
      updateButtonTextColor(isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  
    function updateButtonTextColor(isDarkMode) {
      const buttons = document.querySelectorAll('.theme-button');
      const buttonTextColor = isDarkMode ? 'white' : 'black';
  
      buttons.forEach(button => {
        button.style.color = buttonTextColor;
      });
    }
  
    if (localStorage.getItem('theme') === 'light') {
      isDarkMode = false;
      document.body.setAttribute('data-theme', 'light');
      updateButtonTextColor(false);
    }
  
    let buttonText = isDarkMode ? "Toggle Dark Mode" : "Toggle Light Mode";
  
    $: {
      buttonText = isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode";
    }
  </script>
  
  <div>
    <button on:click={toggleTheme} class="theme-button" style="color: white; border: none; padding: 12px 24px; border-radius: 5px; position: relative; top: 50px; right: 15px;">
      {buttonText}
    </button>
  </div>
  
  <style>
    :global(body) {
      transition: background-color 0.3s, color 0.3s;
    }
  
    :global(body[data-theme='dark']) {
      background-color: white;
      color: black;
    }
  </style>
  