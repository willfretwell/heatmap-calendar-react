# heatmap-calendar-react
A calendar with heatmap visualization. Based on GitHub's commit graph.

PLEASE NOTE: This is a work in progress and may not work as expected.

[![npm version](https://badge.fury.io/js/heatmap-calendar-react.svg)](https://badge.fury.io/js/heatmap-calendar-react)

## Installation

Install:

```bash
npm install heatmap-calendar-react
```

## Usage

Import:

```javascript
import HeatmapCalendar from 'heatmap-calendar-react';
import 'heatmap-calendar-react/build/style.css';
```

Display empty heatmap:

```javascript
<HeatmapCalendar/>
```

Display basic heatmap:

```javascript
<HeatmapCalendar
    data={[
        { date: '2018-01-01' },
        { date: '2018-01-02' },
        { date: '2018-01-03' }
    ]}
/>
```

Display heatmap with density:

```javascript
<HeatmapCalendar
    data={[
        { date: '2018-01-01', total: 10 },
        { date: '2018-01-02', total: 12 },
        { date: '2018-01-03', total: 14 }
    ]}
/>
```

Display heatmap with density and tooltips:

```javascript
<HeatmapCalendar
    data={[
      { date: '2018-01-01', total: 10, name: "Total" },
      { date: '2018-01-02', total: 12, name: "Total" },
      { date: '2018-01-03', total: 14, name: "Total" }
    ]}
/>
```

### All options

```javascript
<HeatmapCalendar
    receiveDates={(dates) => console.log(dates)} 
    //Optional --- When this is used you will receive the dates that the user selects, they will be able to select multiple dates.
    
    data={[
      { date: '2018-01-01', total: 10, name: "Total" },
      { date: '2018-01-02', total: 12, name: "Total" },
      { date: '2018-01-03', total: 14, name: "Total" }
    ]} 
    //Optional --- An array of objects that need a date field but can have a total (which is used to show density for the date) as well as a name field which is used for the tooltip.
    
    weekdayLabels={["","M","","W","","F",""]} 
    //Optional --- You can pass custom weekday labels, this may need to be adjusted with css.
    
    showDate={boolean} 
    //Optional --- Display the date inside the calendar day.
    
    highAccuracy={boolean} 
    //Optional --- When activated, the days opacity is used to represent density as well as colour.
    
    showBorder={boolean} 
    //Optional --- Apply a border around months.
    
    addGap={boolean} 
    //Optional --- Apply a gap between months.
    
    showTooltip={boolean} 
    //Optional --- Displays a tooltip when a day is hovered. Uses the name field in the data object. 
    
    keyNavigation={boolean} 
    //Optional --- Allows user to navigate their selection using the arrows keys and close their selection using the escape key.
    
    setYear={number} 
    //Optional --- The default year will be the current year, however this can be changed by entering a numeric value e.g. 2010
    
    onClick={(e, day) => console.log(e, day)} 
    //Optional --- Instead on using receiveDates, you can use onClick. This will only allow the user to make one selection at a time.
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
