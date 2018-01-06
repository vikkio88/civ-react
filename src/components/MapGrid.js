import React, { Component } from 'react';
import { range } from 'uvk';
import { Tile } from './Tile';

class MapGrid extends Component {
    render() {
        const { rows, cols } = this.props;
        const grid = range(rows).map((_, rowIdx) => {
            const tempCols = range(cols).map((_, colIdx) => (
                <Tile
                    {...this.props}
                    col={colIdx}
                    row={rowIdx}
                />
            ));
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