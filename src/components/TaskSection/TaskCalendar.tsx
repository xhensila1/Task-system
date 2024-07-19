
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const TaskCalendar: React.FC = () => {
    return (
      <div className="p-4 rounded-lg" style={{ maxHeight: '500px', overflow: 'auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          events={[{ title: 'Project Meeting', date: new Date().toISOString().split('T')[0] }]}
        />
      </div>
    );
  };
  
export default TaskCalendar;
