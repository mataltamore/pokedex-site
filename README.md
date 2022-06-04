I've built this project in order to understand in a better way how Next.js works (with routing, getProps methods and the others advantages it shows). Also, I wanted to understand if Context API could be a thing and it can be a good replacement of Redux, since I'm using RTK at work.

To get all of pokemons' information, I've used the PokeAPI v2.0 (https://pokeapi.co/docs/v2), but I'm not doing a for loop to get all the information inside the homepage (because it could cost a lot in terms of time) so instead I've made a little script to build a custom JSON and then I fetched the data through Next.js getStaticProps (also in this way the images load ~70% faster).

You can find that script below.

```
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const BASE_URL_2 = "https://pokeapi.co/api/v2/pokemon-species/";
const LIMIT = 899;

const fetchPokemon = async () => {
  const data = [];
  for (let k = 1; k < LIMIT; k++) {
    const response = await fetch(BASE_URL.concat(k)).then((r) => r.json());
    const response2 = await fetch(BASE_URL_2.concat(k)).then((r) => r.json());

    const newMon = {
      id: response.id,
      name: response.name,
      types: response.types,
      past_types: response.past_types,
      sprites: {
        official: response.sprites.other["official-artwork"].front_default,
        dream_world: response.sprites.other.dream_world.front_default,
      },
      generation: response2.generation.name,
    };

    data.push(newMon);

    if (k % 50 === 0)
      console.log(((k / (LIMIT - 1)) * 100).toFixed(2).toString().concat("%"));
  }

  const FORMAT =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

  const anchorElem = document.getElementById("allPokemons");
  anchorElem.setAttribute("href", FORMAT);
  anchorElem.setAttribute("download", "pokemon-species.json");
  anchorElem.click();
};

fetchPokemon();
```
