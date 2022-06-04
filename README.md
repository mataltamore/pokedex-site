# Simple Pokedex Website

## Where you can try it

https://pokedex-site.vercel.app/

## Why I made this

I've built this project in order to understand in a better way how Next.js works (with routing, getProps methods and the others advantages it shows). Also, I wanted to understand if Context API could be a thing and it can be a good replacement of Redux, since I'm using RTK at work.

## What I used

As I said, I'm using typescript, React.js and Next.js, also I'm using SASS for the styling. State Management is done with Context API (useContext + useReducer hooks) for the global filter inside the homepage. No backend language needed for this.

## Where do I get the data

To get all of pokemons' information, I've used the PokeAPI v2.0 (https://pokeapi.co/docs/v2), but I'm not doing a for loop to get all the information inside the homepage (because it could cost a lot in terms of time) so instead I've made a little script to build a custom JSON (path: `public/api/static_pokeapi.json`) and then I fetched the data through Next.js getStaticProps (also in this way the images load ~70% faster).

#### You can find that script below

(I've just called it index.js, but you can call it however you want, just remeber to edit the <script_name>.js inside the HTML file).

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

To execute this on a boilerplate HTML file, simply add those two tags inside the body (after this, run live server and then open the console, it will take 5 minutes):

```
<a id="allPokemons" style="display: none"></a>
<script src="<script_name>.js"></script>
```

That's all, hope you find this helpful. It has been fun to do.
