import React, { useState } from "react";
import TidyTree from "./TidyTree";

const ParentGazette = [
    {
        id: 1, date: "2010-April-30", name: "Gazette 1", children: [
            { id: 11, name: "Child Gazette 1.1" },
            { id: 12, name: "Child Gazette 1.2" },
        ]
    },
    {
        id: 2, date: "2015-January-10", name: "Gazette 2", children: [
            { id: 21, name: "Child Gazette 2.1" },
            { id: 22, name: "Child Gazette 2.2" },
        ]
    },
    { id: 3, date: "2020-Aug-09", name: "Gazette 3", children: [] },
    {
        id: 4, date: "2022-July-22", name: "Gazette 4", children: [
            { id: 41, name: "Child Gazette 4.1" },
        ]
    },
];

const Timeline = () => {
    const [selectedGazette, setSelectedGazette] = useState(null);

    const handleDotClick = (gazette) => {
        setSelectedGazette(gazette);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(',', '');
    };

    return (
        <div>
            {/* Timeline */}
            <div style={{ position: "relative", height: "150px" }}>
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
                        <div key={index} style={{ textAlign: "center" }}>
                            {/* Date */}
                            <div>{formatDate(item.date)}</div>

                            {/* Clickable Dot */}
                            <div
                                onClick={() => handleDotClick(item)}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    backgroundColor: selectedGazette?.id === item.id ? "#1A79AD" : "#e0e0e0",
                                    cursor: "pointer",
                                    margin: "10px auto"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Tree for Selected Gazette */}
            {selectedGazette && selectedGazette.children && selectedGazette.children.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Children of {selectedGazette.name}</h3>
                    <TidyTree data={{ name: selectedGazette.name, children: selectedGazette.children }} />
                </div>
            )}
        </div>
    );
};

export default Timeline;
