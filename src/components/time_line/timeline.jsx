import React, { Component } from "react";

const ParentGazette = [
    { date: "2010-April-30" },
    { date: "2015-January-10" },
    { date: "2020-Aug-09" },
    { date: "2022-July-22" },
];

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { curIdx: 0 };
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(',', '');
    };

    handleArrowClick = (direction) => {
        this.setState(prevState => ({
            curIdx: direction === "left"
                ? Math.max(0, prevState.curIdx - 1)
                : Math.min(ParentGazette.length - 1, prevState.curIdx + 1)
        }));
    };

    render() {
        const { curIdx } = this.state;

        // Calculate percentage width of the colored section of the bar
        const progressWidth = (curIdx / (ParentGazette.length - 1)) * 100;

        return (
            <div style={{
                width: "100%",
                margin: "0",
                padding: "20px",
                borderRadius: "12px",
                position: "relative"
            }}>
                {/* Timeline */}
                <div style={{ position: "relative", height: "150px" }}>
                    {/* Horizontal line with progressive color */}
                    <div style={{
                        position: "absolute",
                        left: "0",
                        right: "0",
                        top: "45px",
                        height: "4px",
                        background: `linear-gradient(to right, #1A79AD ${progressWidth}%, #e0e0e0 ${progressWidth}%)`,
                        borderRadius: "2px",
                        transition: "all 0.3s ease"
                    }} />

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => this.handleArrowClick("left")}
                        aria-label="Previous Minister"
                        style={{
                            ...buttonStyle,
                            position: "absolute",
                            left: "-70px",
                            top: "27px",
                            opacity: curIdx === 0 ? 0.5 : 1,
                            cursor: curIdx === 0 ? "not-allowed" : "pointer"
                        }}
                    >
                        ←
                    </button>

                    <button
                        onClick={() => this.handleArrowClick("right")}
                        aria-label="Next Minister"
                        style={{
                            ...buttonStyle,
                            position: "absolute",
                            right: "-70px",
                            top: "27px",
                            opacity: curIdx === ParentGazette.length - 1 ? 0.5 : 1,
                            cursor: curIdx === ParentGazette.length - 1 ? "not-allowed" : "pointer"
                        }}
                    >
                        →
                    </button>

                    {/* Timeline Items */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                        margin: "0 20px",
                        overflowX: "auto",
                        scrollBehavior: "smooth"
                    }}>
                        {ParentGazette.map((item, index) => (
                            <div key={index} style={timelineItemStyle}>
                                {/* Date */}
                                <div style={dateStyle}>
                                    {this.formatDate(item.date)}
                                </div>

                                {/* Clickable Dot */}
                                <div
                                    onClick={() => this.setState({ curIdx: index })}
                                    style={{
                                        ...dotStyle,
                                        backgroundColor: curIdx >= index ? "#1A79AD" : "#e0e0e0",
                                        border: curIdx === index ? "3px solid #1A79AD" : "none",
                                        boxShadow: curIdx === index ? "0 0 8px rgba(0, 0, 0, 0.1)" : "none",
                                        cursor: "pointer"
                                    }}
                                />

                                {/* Ministry Title */}
                                <div style={{
                                    ...ministryStyle,
                                    visibility: curIdx === index ? "visible" : "hidden"
                                }}>
                                    {item.minister}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

// Styles
const buttonStyle = {
    backgroundColor: "transparent",
    color: "#1A79AD",
    padding: "8px 12px",
    borderRadius: "50%",
    border: "2px solid #1A79AD",
    cursor: "pointer",
    fontSize: "20px",
    transition: "all 0.3s ease",
};

const timelineItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    minWidth: "120px",
    flexShrink: 0,
    margin: "0 15px",
};

const dateStyle = {
    marginBottom: "12px",
    fontSize: "14px",
    color: "#444",
    fontWeight: "500",
    whiteSpace: "nowrap"
};

const dotStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    position: "relative",
    zIndex: 1,
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
};

const ministryStyle = {
    position: "absolute",
    top: "60px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#1A79AD",
    width: "200px",
    textAlign: "center",
    lineHeight: "1.3",
    transition: "all 0.3s ease"
};

export default Timeline;
