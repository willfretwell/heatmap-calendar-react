import React from "react";

function gradient() {
    return <div className="heatMapScale">
        <div className="heatMapGridItemScaleGradient" />
    </div>;
}

function box(highestTotal) {
    return <div className="heatMapScale">
        <div className="heatMapGridItem scale colorScale0">
            <span className="heatMapGridItemTooltip">
                0
            </span>
        </div>
        <div className="heatMapGridItem scale colorScale1">
            <span className="heatMapGridItemTooltip">
                {"1 - " + Math.round(highestTotal / 4 * 1)}
            </span>
        </div>
        <div className="heatMapGridItem scale colorScale2">
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 1) + " - " + Math.round(highestTotal / 4 * 2)}
            </span>
        </div>
        <div className="heatMapGridItem scale colorScale3">
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 2) + " - " + Math.round(highestTotal / 4 * 3)}
            </span>
        </div>
        <div className="heatMapGridItem scale colorScale4">
            <span className="heatMapGridItemTooltip">
                {Math.round(highestTotal / 4 * 3) + " - " + highestTotal}
            </span>
        </div>
    </div>;
}

export default {gradient, box};
