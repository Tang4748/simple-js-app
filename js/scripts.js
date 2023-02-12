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

     // This function returns a pokemon array with all pokemons
    // that include the "search" term in their Name
  function getByName(search) {
    return pokemonList.filter(function(pokemon) {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
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
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button")
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
     
//added event listener: returns all pokemon info to console when button is clicked
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }
  
  let searchButton = $(".btn-warning");
  searchButton.on("click", function() {
      let pokemonList = $("pokemon-list");
      pokemonList.empty();
      getByName($(".form-control").val()).forEach(function(pokemon) {
          addListItem(pokemon);
      });
  })

  // This function shows the modal with the pokemon details

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
       
       modalBody.appendChild(modalText);
       modalText.appendChild(heightElement);
       modalText.appendChild(typesElement);
       modalText.appendChild(abilitiesElement);
      });
    

  
  }

    /* Hiding modal using Escape key.
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideModal(); 
    }
  });
  */

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
        details.types.forEach(function (pokemon) {
          arrayOfTypes.push(pokemon.type.name);
        });
        // Defining separator between printed array items
        pokemon.types = arrayOfTypes.join(', ');

        let arrayOfAbilities = [];
        details.abilities.forEach(function (pokemon) {
          arrayOfAbilities.push(pokemon.ability.name);
        });
        pokemon.abilities = arrayOfAbilities.join(', ');
      })
      .catch(function (e) {
        hideLoadingSpinner(spinnerLocation);
        console.error(e);
      });
    }
  
   // This function shows a modal with the pokemon details
   function showModal(pokemon) {
    let modalTitile = $(".modal-title");
    let modalBody = $(".modal-body");
    
    // Clearing previous modal content
    modalTitile.empty();
    modalBody.empty();

    
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
    let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
    



    modalTitile.append(pokemon.name);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);


  }
  


    


  return {
    showLoadingSpinner: showLoadingSpinner,
    hideLoadingSpinner: hideLoadingSpinner,
    getByName: getByName,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    hideModal: hideModal,
    showModal: showModal
  };
  
})();






pokemonRepository.loadList().then(function() {
// Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});