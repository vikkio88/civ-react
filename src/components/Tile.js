import React, { Component } from 'react';
import { PLAYER, CPU } from '../config';

import background from '../assets/terrains/village.svg';

const ownerFlags = {
    [PLAYER]: 'P',
    [CPU]: 'C'
};

class Tile extends Component {
    render() {
        const { row, col, onBoxClick, gridConfig } = this.props;
        let className = 'col box';
        let ownerFlag = '';
        if (gridConfig && gridConfig[row] && gridConfig[row][col]) {
            const currentTile = gridConfig[row][col];
            className += ` ${currentTile.type}`;
            if (currentTile.owner) {
                className += ` ${currentTile.owner}`;
                ownerFlag = `${ownerFlags[currentTile.owner]} ${currentTile.level}`;
            }
            className += currentTile.actioned ? ' actioned' : '';
        }

        return (
            <div
                key={`${row}_${col}`}
                className={className}
                onClick={() => onBoxClick ? onBoxClick(row, col) : null}
                style={{ backgroundImage: `url(${background})` }}
            >
                {ownerFlag}
            </div>
        )
    }
}


export { Tile };