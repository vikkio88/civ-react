import React, { Component } from 'react';
import { range } from 'uvk';
import { PLAYER, CPU } from '../config/index';

const ownerFlags = {
    [PLAYER]: 'P',
    [CPU]: 'C'
}

class MapGrid extends Component {
    render() {
        const { rows, cols, onBoxClick, gridConfig } = this.props;
        const grid = range(rows).map((_, rowIdx) => {
            const tempCols = range(cols).map((_, colIdx) => {
                let className = 'col box';
                let ownerFlag = ''
                if (gridConfig && gridConfig[rowIdx] && gridConfig[rowIdx][colIdx]) {
                    className += ` ${gridConfig[rowIdx][colIdx].type}`;
                    if (gridConfig[rowIdx][colIdx].owner) {
                        ownerFlag = ownerFlags[gridConfig[rowIdx][colIdx].owner];
                    }
                }


                return (
                    <div
                        key={`${rowIdx}_${colIdx}`}
                        className={className}
                        onClick={() => onBoxClick ? onBoxClick(rowIdx, colIdx) : null}
                    >
                        {ownerFlag}
                    </div>
                )
            });
            return (
                <div key={rowIdx} className="row">
                    {tempCols}
                </div>
            );
        });
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export { MapGrid };