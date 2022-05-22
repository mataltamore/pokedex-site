/* eslint-disable no-unused-vars */
import NormalIcon from "/public/images/pokemonTypes/normal.svg";
import BugIcon from "/public/images/pokemonTypes/bug.svg";
import DarkIcon from "/public/images/pokemonTypes/dark.svg";
import DragonIcon from "/public/images/pokemonTypes/dragon.svg";
import ElectricIcon from "/public/images/pokemonTypes/electric.svg";
import FairyIcon from "/public/images/pokemonTypes/fairy.svg";
import FightingIcon from "/public/images/pokemonTypes/fighting.svg";
import FireIcon from "/public/images/pokemonTypes/fire.svg";
import FlyingIcon from "/public/images/pokemonTypes/flying.svg";
import GhostIcon from "/public/images/pokemonTypes/ghost.svg";
import GrassIcon from "/public/images/pokemonTypes/grass.svg";
import GroundIcon from "/public/images/pokemonTypes/ground.svg";
import IceIcon from "/public/images/pokemonTypes/ice.svg";
import PoisonIcon from "/public/images/pokemonTypes/poison.svg";
import PsychicIcon from "/public/images/pokemonTypes/psychic.svg";
import RockIcon from "/public/images/pokemonTypes/rock.svg";
import SteelIcon from "/public/images/pokemonTypes/steel.svg";
import WaterIcon from "/public/images/pokemonTypes/water.svg";

export const PokemonTypeMapping = {
  normal: { color: "rgb(168, 168, 120)", icon: NormalIcon },
  fire: { color: "rgb(240, 128, 48)", icon: FireIcon },
  fighting: { color: "rgb(192, 48, 40)", icon: FightingIcon },
  water: { color: "rgb(104, 144, 240)", icon: WaterIcon },
  flying: { color: "rgb(168, 144, 240)", icon: FlyingIcon },
  grass: { color: "rgb(120, 200, 80)", icon: GrassIcon },
  poison: { color: "rgb(160, 64, 160)", icon: PoisonIcon },
  electric: { color: "rgb(248, 208, 48)", icon: ElectricIcon },
  ground: { color: "rgb(224, 192, 104)", icon: GroundIcon },
  psychic: { color: "rgb(248, 88, 136)", icon: PsychicIcon },
  rock: { color: "rgb(184, 160, 56)", icon: RockIcon },
  ice: { color: "rgb(152, 216, 216)", icon: IceIcon },
  bug: { color: "rgb(168, 184, 32)", icon: BugIcon },
  dragon: { color: "rgb(112, 56, 248)", icon: DragonIcon },
  ghost: { color: "rgb(112, 88, 152)", icon: GhostIcon },
  dark: { color: "rgb(112, 88, 72)", icon: DarkIcon },
  steel: { color: "rgb(184, 184, 208)", icon: SteelIcon },
  fairy: { color: "rgb(238, 153, 172)", icon: FairyIcon },
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
