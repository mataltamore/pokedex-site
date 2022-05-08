// HomePage Props

export type PokeAPI = { name: string; url: string };
export type CardProps = { name: string; id: string; imageUrl: string };
export type SearchBarProps = {
  data: Array<PokeAPI>;
  setPokemons: React.Dispatch<React.SetStateAction<PokeAPI[]>>;
};
export type ArrayChildrenProp = { children: Array<JSX.Element> };

// DetailPage Props

export type DetailPagePropsType = {
  data: DataType;
  detail: DetailType;
};

export type DataType = {
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
};

export type DetailType = {
  chain: ChainType;
  base_happiness: number;
  capture_rate: number;
  color: ColorGroupType;
  egg_groups: EggGroupsType[];
  flavor_text_entries: FlavorTextEntryType[];
  gender_rate: number;
  generation: GenerationType;
  habitat: HabitatType;
  has_gender_differences: boolean;
  hatch_counter: 20;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  pokedex_numbers: PokedexNumbersType[];
  shape: ShapeType;
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

export type FlavorTextEntryType = {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
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

export type RomanNumbersType =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII";
