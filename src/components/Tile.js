import React, { Component } from 'react';
import { PLAYER, CPU } from '../config';
import { tileHelper } from '../libs/tileHelper';

const ownerFlags = {
    [PLAYER]: 'P',
    [CPU]: 'C'
};

class Tile extends Component {
    render() {
        const { row, col, onBoxClick, gridConfig } = this.props;
        let className = 'col box';
        let ownerFlag = '';
        let background = null;
        if (gridConfig && gridConfig[row] && gridConfig[row][col]) {
            const currentTile = gridConfig[row][col];
            className += ` ${currentTile.type}`;
            if (currentTile.owner) {
                className += ` ${currentTile.owner}`;
                ownerFlag = `${ownerFlags[currentTile.owner]} ${currentTile.level}`;
            }
            className += currentTile.actioned ? ' actioned' : '';
            background = tileHelper(currentTile).background();
        }

        return (
            <div
                key={`${row}_${col}`}
                className={className}
                onClick={() => onBoxClick ? onBoxClick(row, col) : null}
                style={{ color: 'white', backgroundImage: `url(${background})` }}
            >
                {ownerFlag}
            </div>
        )
    }
}


export { Tile };