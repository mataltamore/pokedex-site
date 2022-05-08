import NormalIcon from "../../public/images/pokemonTypes/normal.svg";
import BugIcon from "../../public/images/pokemonTypes/bug.svg";
import DarkIcon from "../../public/images/pokemonTypes/dark.svg";
import DragonIcon from "../../public/images/pokemonTypes/dragon.svg";
import ElectricIcon from "../../public/images/pokemonTypes/electric.svg";
import FairyIcon from "../../public/images/pokemonTypes/fairy.svg";
import FightingIcon from "../../public/images/pokemonTypes/fighting.svg";
import FireIcon from "../../public/images/pokemonTypes/fire.svg";
import FlyingIcon from "../../public/images/pokemonTypes/flying.svg";
import GhostIcon from "../../public/images/pokemonTypes/ghost.svg";
import GrassIcon from "../../public/images/pokemonTypes/grass.svg";
import GroundIcon from "../../public/images/pokemonTypes/ground.svg";
import IceIcon from "../../public/images/pokemonTypes/ice.svg";
import PoisonIcon from "../../public/images/pokemonTypes/poison.svg";
import PsychicIcon from "../../public/images/pokemonTypes/psychic.svg";
import RockIcon from "../../public/images/pokemonTypes/rock.svg";
import SteelIcon from "../../public/images/pokemonTypes/steel.svg";
import WaterIcon from "../../public/images/pokemonTypes/water.svg";

export enum ColorMapping {
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

export const IconMapping = {
  normal: NormalIcon,
  fire: FireIcon,
  fighting: FightingIcon,
  water: WaterIcon,
  flying: FlyingIcon,
  grass: GrassIcon,
  poison: PoisonIcon,
  electric: ElectricIcon,
  ground: GroundIcon,
  psychic: PsychicIcon,
  rock: RockIcon,
  ice: IceIcon,
  bug: BugIcon,
  dragon: DragonIcon,
  ghost: GhostIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

export const RomanLetterMapping = {
  I: "1",
  II: "2",
  III: "3",
  IV: "4",
  V: "5",
  VI: "6",
  VII: "7",
  VIII: "8",
};
