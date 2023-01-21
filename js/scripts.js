let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
      console.log(pokemon);
    });
  }

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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });

  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails 
  };
})();

let pokemonList= pokemonRepository.getAll();

fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })

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