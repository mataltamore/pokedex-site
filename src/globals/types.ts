export type StaticPokeAPI = {
  id: number;
  name: string;
  types: Array<PokemonType>;
  past_types: Array<PastPokemonType>;
  sprites: {
    official: string;
    dream_world: string;
  };
};

export type PokeAPI = {
  abilities: Array<Ability>;
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<GameIndex>;
  height: number;
  id: number;
  location_area_encounters: string;
  name: string;
  past_types: Array<PastPokemonType>;
  species: { name: string; url: string };
  sprites: Sprite;
  stats: Array<Statistic>;
  types: Array<PokemonType>;
  weight: number;
};

export type PokeSpecieAPI = {
  chain: EvolutionChain;
  base_happiness: number;
  capture_rate: number;
  color: { name: string };
  egg_groups: Array<{ name: string }>;
  flavor_text_entries: Array<FlavorTextEntry>;
  gender_rate: number;
  generation: { name: string };
  habitat: { name: string };
  has_gender_differences: boolean;
  hatch_counter: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  pokedex_numbers: Array<PokedexNumber>;
  shape: { name: string };
};

export type PokemonType = {
  slot: number;
  type: {
    name: PokemonTypeName;
    url: string;
  };
};

export type PokemonTypeName =
  | "normal"
  | "fire"
  | "fighting"
  | "water"
  | "flying"
  | "grass"
  | "poison"
  | "electric"
  | "ground"
  | "psychic"
  | "rock"
  | "ice"
  | "bug"
  | "dragon"
  | "ghost"
  | "dark"
  | "steel"
  | "fairy";

export type Ability = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PastPokemonType = {
  generation: {
    name: string;
    url: string;
  };
  types: Array<PokemonType>;
};

type GameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type Sprite = {
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
};

type Statistic = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type EvolutionChain = {
  evolution_details: Array<EvolutionDetails>;
  evolves_to: Array<EvolutionChain>;
  is_baby: boolean;
  species: { name: string };
};

type EvolutionDetails = {
  gender: string;
  held_item: string;
  item: string;
  known_move: string;
  known_move_type: string;
  location: string;
  min_affection: number;
  min_beauty: number;
  min_happiness: number;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: string; // not sure
  party_type: string;
  relative_physical_stats: string;
  time_of_day: string;
  trade_species: string;
  trigger: {
    name: string;
  };
  turn_upside_down: boolean;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
};

type PokedexNumber = {
  entry_number: number;
  pokedex: {
    name: string;
  };
};
