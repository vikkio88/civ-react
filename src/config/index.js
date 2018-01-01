import { range, randomizer } from "uvk";

export const ROWS = 13;
export const COLS = 25;

export const PLAYER = 'player';
export const CPU = 'cpu';

export const TYPE_SEA = 'sea';
export const TYPE_MOUNTAIN = 'mountain';
export const TYPE_LAND = 'land';
export const TYPE_FOREST = 'forest';

const EMPTY_TILE = {
    owner: null,
    level: 0,
};

const SEA_TILE = { ...EMPTY_TILE, type: TYPE_SEA };
const LAND_TILE = { ...EMPTY_TILE, type: TYPE_LAND };
const MOUNTAIN_TILE = { ...EMPTY_TILE, type: TYPE_MOUNTAIN };
const FOREST_TILE = { ...EMPTY_TILE, type: TYPE_FOREST };

export const GRID_CONFIG = range(ROWS).map(() => range(COLS).map(() => {
    let tile = SEA_TILE;
    if (randomizer.chance(60)) {
        tile = randomizer.pickOne([LAND_TILE, MOUNTAIN_TILE, FOREST_TILE]);
    }
    return {
        ...tile,
        owner: randomizer.chance(20) ? randomizer.pickOne([PLAYER, CPU]) : null
    }
}));