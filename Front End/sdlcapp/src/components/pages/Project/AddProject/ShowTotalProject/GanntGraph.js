import React, { useState, useEffect, useMemo } from "react";
import { Gantt, ViewMode, EventOption, StylingOption, DisplayOption} from 'gantt-task-react';
import './GanntGraph.css';
import "gantt-task-react/dist/index.css";


const GanntGraph = (props) => {
    const [newPhases, setNewPhases] = useState("");

    useEffect(() => {
        if (props.items.phases){
            const sortedPhases = props.items.phases.sort((a, b) => a.id - b.id).map((phase, index) => {
                return {
                    start: new Date(phase.start),
                    end: new Date(phase.end),
                    name: phase.type,
                    id: `Phase ${index}`,
                    type: 'task',
                    progress: (phase.curTasks*100)/phase.tasks,
                    styles:{ progressColor: '#48601d', progressSelectedColor: 'gray', }
                };
            });
            setNewPhases(sortedPhases);
        }
    },[props.items.phases])


    return (
        <div className="gannt">
            {newPhases !== "" && <Gantt tasks={newPhases} nextStepsCount={3} showProgress={true} barFill={60} rowHeight={60} barBackgroundColor={'gray'} barBackgroundSelectedColor={'black'} listCellWidth={'150px'} viewMode={ViewMode.Month}/>}
        </div>        
    );
};

export default GanntGraph;
