// HomePage Props

export type PokeAPI = { name: string; url: string };
export type CardProps = { name: string; id: string; imageUrl: string };
export type SearchBarProps = {
  data: Array<PokeAPI>;
  setPokemons: React.Dispatch<React.SetStateAction<PokeAPI[]>>;
};

// DetailPage Props

export type DataPropsType = {
  data: {
    abilities: AbilitiesType[];
    forms: FormsType[];
    game_indices: GameIndicesType[];
    height: number;
    id: number;
    location_area_encounters: string;
    name: string;
    past_types: PastTypes[];
    species: SpeciesType;
    sprites: SpritesType;
    stats: StatTypes[];
    types: TypesType[];
    weight: number;
    chain: ChainType;
    base_happiness: number;
    capture_rate: number;
    color: ColorGroupType;
    egg_groups: EggGroupsType[];
    gender_rate: number;
    generation: GenerationType[];
    habitat: HabitatType;
    has_gender_differences: boolean;
    hatch_counter: 20;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    pokedex_numbers: PokedexNumbersType[];
    shape: ShapeType;
  };
  detail: any;
};

export type AbilitiesType = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type FormsType = {
  name: string;
  url: string;
};

export type GameIndicesType = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

export type PastTypes = {
  generation: {
    name: string;
    url: string;
  };
  types: {
    slot: 1;
    type: {
      name: string;
      url: string;
    };
  };
};

export type SpeciesType = {
  name: string;
  url: string;
};

export type SpritesType = {
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

export type StatTypes = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type TypesType = {
  slot: number;
  type: {
    name:
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
    url: string;
  };
};

export type ChainType = {
  evolution_details: EvolutionDetailsType[];
  evolves_to: ChainType[];
  is_baby: boolean;
  species: { name: string };
};

export type EvolutionDetailsType = {
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
  party_species: string; //not sure
  party_type: string;
  relative_physical_stats: string;
  time_of_day: string;
  trade_species: string;
  trigger: {
    name: string;
  };
  turn_upside_down: boolean;
};

export type ColorGroupType = {
  name: string;
};

export type EggGroupsType = {
  name: string;
};

export type GenerationType = {
  name: string;
};

export type HabitatType = {
  name: string;
};

export type PokedexNumbersType = {
  entry_number: NumberConstructor;
  pokedex: {
    name: string;
  };
};

export type ShapeType = {
  name: string;
};

export enum ColorType {
  normal = "rgb(168, 168, 120)",
  fire = "rgb(240, 128, 48)",
  fighting = "rgb(192, 48, 40)",
  water = "rgb(104, 144, 240)",
  flying = "rgb(168, 144, 240)",
  grass = "rgb(120, 200, 80)",
  poison = "rgb(160, 64, 160)",
  electric = "rgb(248, 208, 48)",
  ground = "rgb(224, 192, 104)",
  psychic = "rgb(248, 88, 136)",
  rock = "rgb(184, 160, 56)",
  ice = "rgb(152, 216, 216)",
  bug = "rgb(168, 184, 32)",
  dragon = "rgb(112, 56, 248)",
  ghost = "rgb(112, 88, 152)",
  dark = "rgb(112, 88, 72)",
  steel = "rgb(184, 184, 208)",
  fairy = "rgb(238, 153, 172)",
}
