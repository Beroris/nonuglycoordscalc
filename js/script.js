document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const coordBoxes = document.querySelectorAll('.coord-box');
    const inputBoxes = document.querySelectorAll('.coord-box input');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const cookieName = 'darkMode';


  // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    // Function to get a cookie value
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

      // Function to set theme based on cookie
      function setThemeFromCookie(){
        const savedTheme = getCookie(cookieName);
        if (savedTheme === 'dark') {
             body.classList.add('dark-mode');
             coordBoxes.forEach(coordBox => {
                coordBox.classList.add('dark-mode');
            });
             inputBoxes.forEach(inputBox => {
                 inputBox.classList.add('dark-mode')
            });
              darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

      }

     setThemeFromCookie();


    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        coordBoxes.forEach(coordBox => {
            coordBox.classList.toggle('dark-mode');
        });
         inputBoxes.forEach(inputBox => {
            inputBox.classList.toggle('dark-mode');
        });

          if (body.classList.contains('dark-mode')) {
              setCookie(cookieName, 'dark', 30)
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            setCookie(cookieName, 'light', 30)
           darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});