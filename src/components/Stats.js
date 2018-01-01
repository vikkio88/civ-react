import React, { Component } from 'react';
import { PLAYER, CPU } from '../config';


export class Stats extends Component {
    render() {
        const { stats, resources } = this.props;
        return (
            <div>
                <div>
                    <span>total {stats[PLAYER].total} </span>
                    (<span>lands {stats[PLAYER].land} </span>
                    <span>mountains {stats[PLAYER].mountain} </span>
                    <span>seas {stats[PLAYER].sea} </span>
                    <span>forest {stats[PLAYER].forest} </span>)
                </div>
                <div>
                    <span>population {resources.population} </span>
                    <span>wood {resources.wood} </span>
                    <span>metal {resources.metal} </span>
                    <span>food {resources.food} </span>
                </div>
            </div>
        )
    }
}