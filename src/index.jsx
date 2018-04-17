import React, {Component} from "react";
import findMonthString from "./monthToString";
import heatMapScale from "./heatMapScale";
import dateHandle from "./dateHandlers";
import diff from "./getDifference";

var dateNow = dateHandle.dateNow();
var daysInYear = dateHandle.daysInYear();
var getDOY = dateHandle.getDOY;

var mouseDown;
document.body.onmousedown = function() {mouseDown = true}
document.body.onmouseup = function() {mouseDown = false}

class HeatMapGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDate: this.props.showDate || false,
            highAcc: this.props.highAccuracy || false,
            showBorder: this.props.showBorder || false,
            addGap: this.props.addGap || false,
            dates: [],
            selectedGroup: [],
            months: new Array(53).fill("blank")
        }
    }

    componentDidMount() {
        if (this.props.setYear !== undefined) {
            dateNow.setFullYear(this.props.setYear);
        }

        var data = this.props.data || [];
        var calendar = new Array(daysInYear).fill({});
        var currentDate = new Date(dateNow.getTime());
        var date = new Date(currentDate.getTime());
        calendar.forEach((e, i) => {
            var day = {i: date.getTime(), date, value: "empty", desc: {total: 0}};
            calendar[i] = day;
            date = new Date(currentDate.setDate(currentDate.getDate() - 1));
        });

        var highestTotal = 0;
        data.forEach(s => {
            if (s.total === undefined) {
                s.total = 1
            }
            var total = s.total;
            if (total >= highestTotal) {
                highestTotal = total;
            }
        });

        if (0 in data) {
                if (typeof data[0].date === "string" || typeof data[0].date === "number") {
                data.forEach(e => {
                    e.date = new Date(e.date);
                })
            }
        }

        if (this.props.keyNavigation) {
            document.onkeydown = this.checkKey.bind(this);
        }

        this.setState({calendar: calendar.reverse(), highestTotal, data});
    }

    checkKey(e) {
        e = e || window.event;
        switch (e.keyCode) {
          case 27: e.preventDefault(); this.resetDates(); break;
          case 37: e.preventDefault(); this.moveSelection(-7, e.shiftKey); break;
          case 38: e.preventDefault(); this.moveSelection(-1, e.shiftKey); break;
          case 39: e.preventDefault(); this.moveSelection(7, e.shiftKey); break;
          case 40: e.preventDefault(); this.moveSelection(1, e.shiftKey); break;
          default:;
        }
    }

    moveSelection(value, shiftKey) {
        var orignalDates = this.state.dates.slice();
        var dates = orignalDates.map(date => {
            var newDate = new Date(date);
            return new Date(newDate.setDate(newDate.getDate() + (value)));
        });
        if (shiftKey) {
            dates = dates.concat(orignalDates);
        }
        this.setState({dates});
        if (this.props.receiveDates !== undefined) {
            this.props.receiveDates(dates);
        }
    }

    updateUISelected(selected, wait) {
        function run() {
            new Array(selected.length).fill("blank").forEach((item, i) => selected[i].lastChild.classList.toggle("selected"));
        } run();
        setTimeout(function() {
            run();
        }, wait);
    }

    setSelected(grab, number, year) {
        var selected = document.getElementsByClassName( grab + number + (year !== undefined ? year : "") );
        this.updateUISelected(selected, 200);
        var dates = this.state.calendar.slice().filter(day => grab === "d" ? day.date.getDay() === number : day.date.getMonth() === number);
        this.returnDates(dates);
    }

    selectGroup(e, day) {
        var selected = e.currentTarget;
        var selectedGroup = this.state.selectedGroup.slice();
        if (mouseDown) {
            this.updateUISelected([selected], 600);
            selectedGroup.push(day);
            this.setState({selectedGroup});
        }
    }

    submitSelectGroup() {
        var selectedGroup = this.state.selectedGroup.slice();
        this.returnDates(Array.from(new Set(selectedGroup)));
        this.setState({selectedGroup: []});
    }

    returnDates(newDates) {
        var dates = this.state.dates.slice();

        if (!Array.isArray(newDates)) {
            newDates = new Array(newDates);
        }

        var removeDates = [];
        var allowDates = [];

        newDates.forEach(d => {
            var allow = true;
            dates.forEach(date => {
                if (date === d.date) {
                    allow = false;
                }
            });
            allow ? allowDates.push(d.date) : removeDates.push(d.date);
        });

        0 in allowDates ? allowDates.forEach(date => dates.push(date)) : dates = diff(dates, removeDates);

        setTimeout(function() {
            if (this.props.receiveDates !== undefined) {
                this.setState({dates});
                this.props.receiveDates(dates);
            } else {
                this.setState({dates: allowDates});
            }
        }.bind(this), 10);
    }

    resetDates() {
        this.setState({dates:[]});
        if (this.props.receiveDates !== undefined) {
            this.props.receiveDates([]);
        }
    }

    render() {
        var calendar = this.state.calendar;
        var highestTotal = this.state.highestTotal;
        var weekdayLabels = this.props.weekdayLabels || ["", "M", "", "W", "", "F", ""];

        if (calendar !== undefined) {
            this.state.data.forEach(s => {
                var day = getDOY(s.date) + (daysInYear) - getDOY(dateNow) - 1;
                if (day >= daysInYear) {
                    day = day - daysInYear;
                }
                if (s.total === undefined) {
                    s.total = 1
                }
                var opacity = s.total / highestTotal;
                var bgColor = "colorScale0";
                var decimal = Math.ceil((s.total / highestTotal) / 0.25) * 0.25;
                switch (decimal) {
                    case 0:    bgColor = "colorScale0"; break;
                    case 0.25: bgColor = "colorScale1"; break;
                    case 0.50: bgColor = "colorScale2"; break;
                    case 0.75: bgColor = "colorScale3"; break;
                    case 1:    bgColor = "colorScale4"; break;
                    default:   bgColor = "colorScale0"; break;
                }
                if (calendar[day].date.getFullYear() === s.date.getFullYear()) {
                    calendar[day] = {i: calendar[day].i, date: calendar[day].date, value: ("most" + Math.round(decimal)), desc: {label: s.name, total: s.total}, bgColor, opacity};
                }
            });
        }

        const oneYearAgo = new Date(dateNow);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        var weekdayBalancer = new Array(oneYearAgo.getDay() + 1).fill("blank");
        if (weekdayBalancer.length === 7) {
            weekdayBalancer = [];
        }
        
        var months = this.state.months.slice();

        var blankLocations = [];

        if (calendar !== undefined) {
            var weekI = 0;
            var heatMap = calendar.map((day, i) => {
                var weekday = day.date.getDay();
                var dayI = day.date.getDate();
                var monthI = day.date.getMonth();
                var year = day.date.getFullYear();

                if (dayI === 1) {
                    blankLocations.push(i + (blankLocations.length * 7));
                    if (this.state.addGap) { 
                        months.push("blank");
                    }
                }

                if (weekday === 0) {
                    weekI++
                    if (dayI < 8) {
                        if (this.state.addGap) { 
                            months[weekI + blankLocations.length] = {month: monthI, year}
                        } else {
                            months[weekI] = {month: monthI, year}
                        }
                    }
                }

                var selected = false;
                this.state.dates.forEach(date => {
                    if (getDOY(date) === getDOY(day.date)) {
                        selected = true;
                    }
                });

                var border = ((dateHandle.daysInMonth(monthI) - dayI < 7 && dateHandle.daysInMonth(monthI) - dayI >= 0) ? " last7" : "") + (dateHandle.daysInMonth(monthI) === dayI && weekday !== 6 ? " lastDay" : "");

                var _onClick = this.props.onClick || function doNothing() {}; 

                return <div 
                key={i} 
                onMouseOver={(e) => this.selectGroup(e, day)} 
                onMouseDown={(e) => this.selectGroup(e, day)} 
                onMouseUp={() => this.submitSelectGroup()} 
                onClick={(e) => _onClick(e, day)} 
                className={"heatMapGridItem " + day.value + " m" + monthI + year + " d" + weekday + (dayI === 1 ? " firstOfMonth" : "") + (this.state.showBorder ? border : "")} 
                style={{fontSize: this.state.showDate ? "inherit" : 0}}
                > 
                    <span className="heatMapGridItemContent">
                        {dayI}
                    </span>
                    {this.props.showTooltip && <span className="heatMapGridItemTooltip">
                        {day.desc.label !== undefined && <span>{day.desc.label}: {day.desc.total}<br/></span>}
                        {findMonthString(monthI, true)} {dayI} {year}
                    </span>}
                    <div className={"heatMapGridItemBackground " + (day.bgColor !== undefined ? day.bgColor : "")} style={{opacity: day.bgColor === "colorScale0" ? 1 : this.state.highAcc ? day.opacity : 1, boxShadow: selected ? "inset 0 0 0 1px #02a5a5, inset 0 0 0 3px #fff" : ""}}/>
                </div>
            });
        }

        if (this.state.addGap) {
            blankLocations.forEach(i => {
                var arr = new Array(7).fill("");
                arr.forEach((e, ii) => {
                    heatMap.splice(i, 0, <div key={i+ii + "blanks"} className="heatMapGridItem blank"/>)
                })
            });
            if (heatMap !== undefined) {
                heatMap = heatMap.map(e => {
                    var cx = require('classnames');
                    return React.cloneElement(e, {
                      className: cx(e.props.className, "shrink"),
                    });
                });
            } 
        }

        return <div className="heatMap">
            <div className="heatMapMonths">
                <div className={this.state.addGap ? "heatMapMonthShrink" : "heatMapMonth"}>{/*spacer*/}</div>
                {months !== undefined && months.map((month, i) => <div key={i} onMouseDown={() => this.setSelected("m", month.month, month.year)} className={this.state.addGap ? "heatMapMonthShrink" : "heatMapMonth"}>{findMonthString(month.month, true)}</div>)}
            </div>
            <div className="heatMapGrid" onMouseLeave={this.props.receiveDates !== undefined ? () => this.submitSelectGroup() : ""}>
                {weekdayLabels.map((dayL, i) => <div key={i} onMouseDown={() => this.setSelected("d", i)} className="heatMapGridItem legend">{dayL}</div>)}
                {weekdayBalancer.map((a, i) => <div key={i} className="heatMapGridItem"/>)}
                {heatMap}
            </div>
            {this.state.highAcc ? heatMapScale.gradient() : heatMapScale.box(highestTotal)}
        </div>
    }
};

export default HeatMapGraph;
