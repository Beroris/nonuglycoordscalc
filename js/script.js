document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const coordBoxes = document.querySelectorAll('.coord-box');
    const inputBoxes = document.querySelectorAll('.coord-box input');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const cookieName = 'darkMode';
    const saveNameInput = document.getElementById('saveName');
    const saveCoordsButton = document.getElementById('saveCoords');
    const savedCoordsList = document.getElementById('savedCoordsList');

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
               updateSavedCoordStyle();
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
               updateSavedCoordStyle();
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
         updateSavedCoordStyle();
    });

   // Get input elements
    const overworldX = document.getElementById('overworld-x');
    const overworldY = document.getElementById('overworld-y');
    const overworldZ = document.getElementById('overworld-z');

    const netherX = document.getElementById('nether-x');
    const netherY = document.getElementById('nether-y');
    const netherZ = document.getElementById('nether-z');

    function updateNetherCoords() {
      if (overworldX.value !== '') {
        netherX.value = Math.floor(overworldX.value / 8);
      } else {
         netherX.value = '';
      }
       if (overworldZ.value !== '') {
        netherZ.value = Math.floor(overworldZ.value / 8);
      } else {
          netherZ.value = '';
      }
      netherY.value = overworldY.value;

    }

     function updateOverworldCoords() {
      if (netherX.value !== '') {
        overworldX.value = Math.floor(netherX.value * 8);
      } else {
         overworldX.value = '';
      }
       if (netherZ.value !== '') {
        overworldZ.value = Math.floor(netherZ.value * 8);
      } else {
          netherZ.value = '';
      }
        overworldY.value = netherY.value;

    }

     // Add event listeners
      overworldX.addEventListener('input', updateNetherCoords);
      overworldY.addEventListener('input', updateNetherCoords);
      overworldZ.addEventListener('input', updateNetherCoords);


      netherX.addEventListener('input', updateOverworldCoords);
      netherY.addEventListener('input', updateOverworldCoords);
      netherZ.addEventListener('input', updateOverworldCoords);



     saveCoordsButton.addEventListener('click', function() {
        const saveName = saveNameInput.value.trim();
        if (saveName === '') {
            alert('Please enter a save name.');
            return;
        }

        const savedData = {
            name: saveName,
            overworld: {
                x: overworldX.value,
                y: overworldY.value,
                z: overworldZ.value
            },
             nether: {
                 x: netherX.value,
                 y: netherY.value,
                 z: netherZ.value
            }
        };

        let savedCoords = JSON.parse(localStorage.getItem('savedCoords') || '[]');
        savedCoords.push(savedData);
        localStorage.setItem('savedCoords', JSON.stringify(savedCoords));
        saveNameInput.value = '';
         displaySavedCoords();
    });

    function displaySavedCoords() {
        savedCoordsList.innerHTML = '';
        const savedCoords = JSON.parse(localStorage.getItem('savedCoords') || '[]');
        savedCoords.forEach((saved, index) => {
            const div = document.createElement('div');
            div.classList.add('saved-coord-item');

            div.innerHTML = `
               <div class="coord-display">
                  <div>
                  <p><strong>${saved.name}:</strong></p>
                   </div>
                <div>
                    <p>Overworld X: ${saved.overworld.x}</p>
                    <p>Overworld Y: ${saved.overworld.y}</p>
                    <p>Overworld Z: ${saved.overworld.z}</p>
                   </div>
                   <div>
                     <p>Nether X: ${saved.nether.x}</p>
                    <p>Nether Y: ${saved.nether.y}</p>
                    <p>Nether Z: ${saved.nether.z}</p>
                   </div>
              </div>
                 <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            savedCoordsList.appendChild(div);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const indexToDelete = this.getAttribute('data-index');
                deleteSavedCoord(indexToDelete);
            });
        });
         updateSavedCoordStyle();
    }


      function deleteSavedCoord(index) {
        let savedCoords = JSON.parse(localStorage.getItem('savedCoords') || '[]');
        savedCoords.splice(index, 1);
         localStorage.setItem('savedCoords', JSON.stringify(savedCoords));
        displaySavedCoords();
    }
     function updateSavedCoordStyle() {
         const savedCoordItems = document.querySelectorAll('.saved-coord-item');
         savedCoordItems.forEach(item => {
             if(body.classList.contains('dark-mode')){
               item.classList.add('dark-mode');
            }else{
                item.classList.remove('dark-mode');
            }
         });
          const deleteButtons = document.querySelectorAll('.delete-btn');
           deleteButtons.forEach(button => {
             if(body.classList.contains('dark-mode')){
               button.classList.add('dark-mode');
            }else{
                 button.classList.remove('dark-mode');
            }
         });

     }
    displaySavedCoords();

});