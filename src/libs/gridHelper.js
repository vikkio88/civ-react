import { ROWS, COLS, PLAYER, CPU } from '../config';
import { randomizer, range } from 'uvk';

export const gridHelper = grid => {
    return {
        applyToAll(modifier) {
            return range(ROWS).map((_, rowIdx) => {
                return range(COLS).map((_, colIdx) => {
                    const currentTile = grid[rowIdx][colIdx];
                    return modifier(currentTile);
                });
            });
        },
        clicked(i, j, clicker) {
            const tile = grid[i][j];
            let { level, owner } = tile;
            if (owner !== clicker && owner !== null) {
                level -= 1;
                owner = level < 0 ? null : CPU;
                level = Math.max(0, level);
            } else {
                level += owner === clicker ? 1 : 0;
                owner = clicker;
            }

            return {
                ...tile,
                owner,
                level,
                actioned: true
            };
        },
        cpuTurn(grid) {
            const row = randomizer.int(0, ROWS - 1);
            const col = randomizer.int(0, COLS - 1);
            grid[row][col] = this.clicked(row, col, CPU);
            return grid;
        }
    };
};