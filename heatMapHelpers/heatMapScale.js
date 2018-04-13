import React from "react";

function gradient() {
    return <div className="heatMapScale">
        <div className="heatMapGridItemScaleGradient" />
    </div>;
}

function box(highestTotal) {
    return <div className="heatMapScale">
        <div className="heatMapGridItem scale" style={{ backgroundColor: "#dddddd" }}>
            <span className="heatMapGridItemTooltip">
                0
            </span>
        </div>
        <div className="heatMapGridItem scale" style={{ backgroundColor: "#02b8b8" }}>
            <span className="heatMapGridItemTooltip">
                {"1 - " + Math.round(highestTotal / 4 * 1)}
            </span>
        </div>
        <div className="heatMapGridItem scale" style={{ backgroundColor: "#029292" }}>
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 1) + " - " + Math.round(highestTotal / 4 * 2)}
            </span>
        </div>
        <div className="heatMapGridItem scale" style={{ backgroundColor: "#016b6b" }}>
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 2) + " - " + Math.round(highestTotal / 4 * 3)}
            </span>
        </div>
        <div className="heatMapGridItem scale" style={{ backgroundColor: "#014444" }}>
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 3) + " - " + highestTotal}
            </span>
        </div>
    </div>;
}

export default {gradient, box};