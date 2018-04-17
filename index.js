import React from "react";
import HeatMapGraph from "./src/heatMapGraph";

const HeatmapCalendar = ({receiveDates, data, weekdayLabels, showDate, highAccuracy, showBorder, addGap, showTooltip, keyNavigation, setYear, onClick}) => (
    <HeatMapGraph 
        receiveDates={(dates) => receiveDates === undefined ? dates : receiveDates(dates)} 
        data={data}
        weekdayLabels={weekdayLabels}
        showDate={showDate}
        highAccuracy={highAccuracy}
        showBorder={showBorder}
        addGap={addGap}
        showTooltip={showTooltip}
        keyNavigation={keyNavigation}
        setYear={setYear}
        onClick={(e, day) => onClick === undefined ? e : onClick(e, day)}
    />
);

export default HeatmapCalendar;