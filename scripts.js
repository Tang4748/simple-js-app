alert('Hello world');

let favoriteFood = 'Pizza';

document.write(favoriteFood);

const greetings =
          ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

      // Add a random greeting to the page.
      function addRandomGreeting() {
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        const greetingContainer = document.getElementById('greeting-container');
        greetingContainer.innerText = greeting;
      }

