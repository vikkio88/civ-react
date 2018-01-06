import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapGrid } from './components/MapGrid';
import { Stats } from './components/Stats';

import { GRID_CONFIG, ROWS, COLS, PLAYER, CPU } from './config';
import { gridHelper } from './libs/gridHelper';

class App extends Component {
  state = {
    grid: GRID_CONFIG,
    stats: {
      [PLAYER]: {
        total: 0
      },
      [CPU]: {
        total: 0
      }
    },
    resources: {
      metal: 0,
      wood: 0,
      food: 0,
      population: 0
    }
  };

  componentDidMount() {
    const stats = this.calculateStats(this.state.grid);
    const resources = this.calculateResources(stats, this.state.resources);
    this.setState({ stats });
  }

  click(row, col) {
    let { grid, stats, resources } = this.state;
    const helper = gridHelper(grid);
    grid = helper.applyToAll(tile => { return { ...tile, actioned: false } });
    grid[row][col] = helper.clicked(row, col, PLAYER);
    grid = helper.cpuTurn(grid);
    stats = this.calculateStats(grid, stats);
    resources = this.calculateResources(stats, resources);
    this.setState({ grid, stats });
  }

  calculateStats(grid) {
    const stats = {
      [PLAYER]: { total: 0 },
      [CPU]: { total: 0 }
    }
    grid.forEach(col => col.forEach(t => {
      if (t.owner && stats[t.owner][t.type]) {
        stats[t.owner][t.type] += 1;
      } else if (t.owner && !stats[t.owner][t.type]) {
        stats[t.owner][t.type] = 1;
      }
      if (t.owner) {
        stats[t.owner].total += 1;
      }
    }));
    return stats;
  }

  calculateResources(stats, resources) {
    resources.wood += stats[PLAYER].forest;
    resources.metal += stats[PLAYER].mountain;
    resources.food += stats[PLAYER].land * 10;
    resources.population += stats[PLAYER].total - stats[PLAYER].sea;
    resources.food -= resources.population;
    if (resources.food <= 0) {
      resources.population -= Math.round(resources.population * 0.5);
      resources.population = Math.max(0, resources.population);
      resources.food = 0;
    }
  }
  render() {
    const { grid, stats, resources } = this.state;
    return (
      <div className="App">
        <MapGrid rows={ROWS} cols={COLS} gridConfig={grid} onBoxClick={(row, col) => this.click(row, col)} />
        <Stats stats={stats} resources={resources} />
      </div>
    );
  }
}

export default App;
