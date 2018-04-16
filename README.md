# heatmap-calendar-react
A calendar with heatmap visualization. Based on GitHub's commit graph.

[![npm version](https://badge.fury.io/js/heatmap-calendar-react.svg)](https://badge.fury.io/js/heatmap-calendar-react)

## Installation

Install:

```bash
npm install heatmap-calendar-react
```

## Usage

Import:

```javascript
import HeatMapGraph from 'heatmap-calendar-react';
```

Display empty heatmap:

```javascript
<HeatMapGraph/>
```

Display basic heatmap:

```javascript
<HeatMapGraph
   data={[
      { date: '2018-01-01'},
      { date: '2018-01-02'},
      { date: '2018-01-03'}
   ]}
/>
```

Display basic heatmap with density:

```javascript
<HeatMapGraph
   data={[
      { date: '2018-01-01', total: 10},
      { date: '2018-01-02', total: 12},
      { date: '2018-01-03', total: 14}
   ]}
/>
```

## Configuring colors

```css
.colorScale0{background-color: #ddd;}
.colorScale1{background-color: rgb(002, 184, 184);}
.colorScale2{background-color: rgb(002, 146, 146);}
.colorScale3{background-color: rgb(001, 107, 107);}
.colorScale4{background-color: rgb(001, 068, 068);}
```
