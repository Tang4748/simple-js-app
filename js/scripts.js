let pokemonRepository = (function () {

  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] },
    { name: "Pikachu", height: 0.4, types: ["electric"] },
    { name: "Eevee", height: 0.3, types: ["normal"] },
    { name: "Charizard", height: 1.7, type: ["Fire", "Flying"] },
    { name: "Mewtwo", height: 2.001, type: ["Psychic"] },
    { name: "Blastoise", height: 1.6, type: "Water" },
    { name: "Pidgeot", height: 1.5, type: ["Normal", "Flying"] },
    { name: "Venusaur", height: 2, type: ["Grass", "Poison"] },
    { name: "Mew", height: 0.4, type: "Psychic" },
    { name: "Moltres", height: 2, type: ["Fire", "Flying"] },
    { name: "Zapdos", height: 1.6, type: ["Electric", "Flying"] },
    { name: "Articuno", height: 1.7, type: ["Ice", "Flying"] },
    { name: "Wartortle", height: 1, type: "Water" },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "type" in pokemon &&
      "height" in pokemon 
    ){
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
  }

  function getAll() {
    return pokemonList;
  }


  function addListItem (pokemon) {
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

let pokemonList= pokemonRepository.getAll();

pokemonRepository.add({name: "Pikachu", height: 1.1 , type: "fire"});


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
pokemonList.forEach (function(pokemon) {
    if (pokemon.height > 2) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a big pokemon!" + "<br>")
    } else if (pokemon.height >= 1 && pokemon.height < 2) {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a medium sized pokemon!" + "<br>")
    } else {
        document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a tiny pokemon!" + "<br>")
    }
      console.log(pokemon);
    });