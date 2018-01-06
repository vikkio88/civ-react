import { TYPE_FOREST, TYPE_LAND, TYPE_MOUNTAIN, TYPE_SEA } from "../config/index";

import forest from '../assets/terrains/forest.svg';
import wheat from '../assets/terrains/wheat.svg';
import silo from '../assets/terrains/silo.svg';

import village from '../assets/terrains/village.svg';
import castle from '../assets/terrains/castle.svg';
import castle1 from '../assets/terrains/castle-1.svg';
import castle2 from '../assets/terrains/castle-2.svg';

import mountain from '../assets/terrains/mountains.svg';



const terrainMap = {
    [TYPE_FOREST]: {
        '0': forest,
        '1': wheat,
        '2': silo,
        max: 2
    },
    [TYPE_LAND]: {
        '0': null,
        '1': village,
        '2': village,
        '3': castle,
        '4': castle,
        '5': castle1,
        '6': castle1,
        '7': castle1,
        '8': castle2,
        max: 8
    },
    [TYPE_MOUNTAIN]: {
        '0': mountain,
        '1': null,
        '2': silo,
        max: 2
    },
    [TYPE_SEA]: {
        '0': null,
        max: 0
    }
}

export const tileHelper = tile => {
    return {
        background() {
            const config = terrainMap[tile.type];
            let level = Math.min(config.max, tile.level);
            return config[level] || config[0];
        }
    };
}