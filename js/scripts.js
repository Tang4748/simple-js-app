let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonModal = document.querySelector(".modal-dialog");

  function showLoadingSpinner(spinnerLocation) {
    let spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("text-center");

    let loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("spinner-border");
    loadingSpinner.setAttribute("role", "status");

    let spinnerText = document.createElement('span');
    spinnerText.classList.add('sr-only');
    spinnerText.innerText = 'Loading...';

    loadingSpinner.appendChild(spinnerText);
    spinnerContainer.appendChild(loadingSpinner);
    spinnerLocation.appendChild(spinnerContainer);
  }

  function hideLoadingSpinner(spinnerLocation) {
    spinnerLocation.removeChild(spinnerLocation.lastChild);
  }


  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }

   // Called in case of loading error and when manually hiding modal
   function hideModal() {
    pokemonModal.classList.add("hidden");
  }


//Add pokemon to the list with the button format
  function addListItem (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class")
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
     
//added event listener: returns all pokemon info to console when button is clicked
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector(".modal-title");
      let modalBody = document.querySelector(".modal-body");
       // Clearing previous modal content
       modalTitle.innerHTML = "";
       modalBody.innerHTML = "";
 
       // Creating modal content elements
       let nameElement = document.querySelector(".modal-title");
       nameElement.innerText =
         pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
 
       let imageElementFront = document.createElement("img");
       imageElementFront.classList.add("modal-img");
       imageElementFront.src = pokemon.frontImageUrl;
 
       let imageElementBack = document.createElement("img");
       imageElementBack.classList.add("modal-img");
       imageElementBack.src = pokemon.backImageUrl;
 
       let modalText = document.createElement("div");
       modalText.classList.add("modal-text");
 
       let heightElement = document.createElement("p");
       heightElement.innerText = "Height: " + pokemon.height / 10 + " m";
 
       let typesElement = document.createElement("p");
       typesElement.innerText = "Types: " + pokemon.types;
 
       let abilitiesElement = document.createElement("p");
       abilitiesElement.innerText = "Abilities: " + pokemon.abilities;
      
       modalBody.appendChild(imageElementFront);
       modalBody.appendChild(imageElementBack);
       modalBody.appendChild(modalText);
       modalText.appendChild(heightElement);
       modalText.appendChild(typesElement);
       modalText.appendChild(abilitiesElement);
      });
    

  
  }

    // Hiding modal using Escape key.
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideModal(); 
    }
  });
  

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  
 function loadDetails(pokemon) {
    let spinnerLocation = document.querySelector('.modal-body');
    showLoadingSpinner(spinnerLocation);

    let url = pokemon.detailsUrl;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingSpinner(spinnerLocation);
        // Adding details to Pokemon by defining pokemon object-keys.
        pokemon.frontImageUrl = details.sprites.front_default;
        pokemon.backImageUrl = details.sprites.back_default;
        pokemon.height = details.height;

        let arrayOfTypes = [];
        details.types.forEach(function (item) {
          arrayOfTypes.push(item.type.name);
        });
        // Defining separator between printed array items
        pokemon.types = arrayOfTypes.join(', ');

        let arrayOfAbilities = [];
        details.abilities.forEach(function (item) {
          arrayOfAbilities.push(item.ability.name);
        });
        pokemon.abilities = arrayOfAbilities.join(', ');
      })
      .catch(function (e) {
        hideLoadingSpinner(spinnerLocation);
        console.error(e);
      });
  }


  return {
    showLoadingSpinner: showLoadingSpinner,
    hideLoadingSpinner: hideLoadingSpinner,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    hideModal: hideModal
  };
  
})();





/* tell 'for-loop' to look at length of variable array above first */
//for (let i=0; i < pokemonList.length; i++)//{
  /* set condition for key-value of objects in array */
    //if (pokemonList[i].height > 2){
      //console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
  /* inserted break line to put each object on a new line  */
      //document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
  /* only need to use 'else' not 'else-if' as we want the output to be on just one object  */
  //} else {
      //console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  /* inserted break line tag to put each object on a new line  */
     // document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>")
  //}
  //}

//replace for loop with forEach loop
/*pokemonList.forEach (function(pokemon) {
    if (pokemon.height > 2) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a big pokemon!" + "<br>")
    } else if (pokemon.height >= 1 && pokemon.height < 2) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a medium sized pokemon!" + "<br>")
    } else {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a tiny pokemon!" + "<br>")
    }
      console.log(pokemon);
    });*/



pokemonRepository.loadList().then(function() {
// Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});