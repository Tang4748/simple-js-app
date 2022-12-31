let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
  { name: 'Charmander', height: 0.6, types: ['fire'] },
  { name: 'Squirtle', height: 0.5, types: ['water'] },
  { name: 'Pikachu', height: 0.4, types: ['electric'] },
  { name: 'Eevee', height: 0.3, types: ['normal'] },
  { name: "Charizard", height: 1.7, type: ['Fire", "Flying'] },
  { name: "Mewtwo", height: 2.001, type: ['Psychic'] },
  { name: "Blastoise", height: 1.6, type: 'Water' },
  { name: "Pidgeot", height: 1.5, type: ['Normal', 'Flying'] },
  { name: "Venusaur", height: 2, type: ['Grass', 'Poison'] },
  { name: "Mew", height: 0.4, type: 'Psychic' },
  { name: "Moltres", height: 2, type: ['Fire', 'Flying'] },
  { name: "Zapdos", height: 1.6, type: ['Electric', 'Flying'] },
  { name: "Articuno", height: 1.7, type: ['Ice', 'Flying'] },
  { name: "Wartortle", height: 1, type: 'Water' },
];

/* tell 'for-loop' to look at length of variable array above first */
for (let i=0; i < pokemonList.length; i++){
  /* set condition for key-value of objects in array */
    if (pokemonList[i].height > 2){
      console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
  /* inserted break line to put each object on a new line  */
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
  /* only need to use 'else' not 'else-if' as we want the output to be on just one object  */
  } else {
      console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  /* inserted break line tag to put each object on a new line  */
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>")
  }
  }