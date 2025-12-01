import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { formatDate, isSameDay, startOfDay } from '../../utils/dateUtils';
import { getTaskColor, getTaskLabel } from '../../utils/taskUtils';
import { CompactTaskCard } from './TaskCard';
import EmptyState from '../common/EmptyState';

/**
 * TaskCalendar Component - Calendario de tareas con react-calendar
 *
 * @param {Object} props
 * @param {Array} props.tasks - Array de tareas
 * @param {Function} props.onTaskClick - Callback al hacer click en una tarea
 * @param {Function} props.onDateChange - Callback cuando cambia la fecha seleccionada
 * @param {Date} props.selectedDate - Fecha seleccionada
 * @param {string} props.className - Clases adicionales
 */
const TaskCalendar = ({
  tasks = [],
  onTaskClick,
  onDateChange,
  selectedDate: externalSelectedDate,
  className = ''
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState(new Date());
  const selectedDate = externalSelectedDate || internalSelectedDate;

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = startOfDay(new Date(task.dueDate)).toISOString();
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  // Get tasks for selected date
  const selectedDateTasks = useMemo(() => {
    const dateKey = startOfDay(selectedDate).toISOString();
    return tasksByDate[dateKey] || [];
  }, [selectedDate, tasksByDate]);

  // Handle date change
  const handleDateChange = (date) => {
    if (externalSelectedDate) {
      onDateChange?.(date);
    } else {
      setInternalSelectedDate(date);
    }
  };

  // Custom tile content - show task indicators
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const dateKey = startOfDay(date).toISOString();
    const dateTasks = tasksByDate[dateKey];

    if (!dateTasks || dateTasks.length === 0) return null;

    // Count tasks by status
    const statusCount = {
      0: 0, // Pendiente
      1: 0, // Asignada
      2: 0, // En Progreso
      3: 0, // Finalizada
      4: 0  // Cancelada
    };

    dateTasks.forEach(task => {
      statusCount[task.estado] = (statusCount[task.estado] || 0) + 1;
    });

    return (
      <div className="flex justify-center gap-0.5 mt-1">
        {statusCount[0] > 0 && (
          <div className="w-1.5 h-1.5 bg-brand-yellow-400 border border-black rounded-full" />
        )}
        {(statusCount[1] > 0 || statusCount[2] > 0) && (
          <div className="w-1.5 h-1.5 bg-brand-cyan-400 border border-black rounded-full" />
        )}
        {statusCount[3] > 0 && (
          <div className="w-1.5 h-1.5 bg-green-400 border border-black rounded-full" />
        )}
        {statusCount[4] > 0 && (
          <div className="w-1.5 h-1.5 bg-red-400 border border-black rounded-full" />
        )}
      </div>
    );
  };

  // Custom tile class name
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';

    const classes = [];
    const dateKey = startOfDay(date).toISOString();
    const dateTasks = tasksByDate[dateKey];

    if (dateTasks && dateTasks.length > 0) {
      classes.push('has-tasks');
    }

    if (isSameDay(date, selectedDate)) {
      classes.push('selected-date');
    }

    return classes.join(' ');
  };

  return (
    <div className={`bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Calendar View */}
        <div className="lg:col-span-2 p-6 border-r-0 lg:border-r-4 border-black">
          <div className="task-calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              locale="es-ES"
              prevLabel={<ChevronLeft className="h-5 w-5" />}
              nextLabel={<ChevronRight className="h-5 w-5" />}
              prev2Label={null}
              next2Label={null}
              className="task-calendar"
            />
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t-2 border-black">
            <p className="text-sm font-black text-gray-600 uppercase mb-3">Leyenda</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-yellow-400 border border-black rounded-full" />
                <span className="text-xs font-bold text-gray-700">Pendiente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-brand-cyan-400 border border-black rounded-full" />
                <span className="text-xs font-bold text-gray-700">En Progreso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 border border-black rounded-full" />
                <span className="text-xs font-bold text-gray-700">Finalizada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 border border-black rounded-full" />
                <span className="text-xs font-bold text-gray-700">Cancelada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List for Selected Date */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-6 w-6 text-black" />
            <h3 className="text-xl font-black text-black uppercase">
              {formatDate(selectedDate)}
            </h3>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {selectedDateTasks.length > 0 ? (
              selectedDateTasks.map(task => (
                <CompactTaskCard
                  key={task.id}
                  task={task}
                  onClick={onTaskClick}
                />
              ))
            ) : (
              <EmptyState
                icon={Clock}
                title="Sin tareas"
                description="No hay tareas programadas para esta fecha"
                size="small"
              />
            )}
          </div>

          {selectedDateTasks.length > 0 && (
            <div className="mt-4 pt-4 border-t-2 border-black">
              <p className="text-xs font-bold text-gray-600 text-center">
                {selectedDateTasks.length} tarea{selectedDateTasks.length !== 1 ? 's' : ''} en este día
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .task-calendar-wrapper :global(.task-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
        }

        .task-calendar-wrapper :global(.react-calendar__navigation) {
          display: flex;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid black;
          padding-bottom: 1rem;
        }

        .task-calendar-wrapper :global(.react-calendar__navigation button) {
          font-size: 1.25rem;
          font-weight: 900;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border: 2px solid black;
          background: white;
          transition: all 0.2s;
        }

        .task-calendar-wrapper :global(.react-calendar__navigation button:enabled:hover) {
          background: #fef08a;
        }

        .task-calendar-wrapper :global(.react-calendar__month-view__weekdays) {
          text-transform: uppercase;
          font-weight: 900;
          font-size: 0.75rem;
          border-bottom: 2px solid black;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .task-calendar-wrapper :global(.react-calendar__month-view__weekdays__weekday) {
          padding: 0.5rem;
        }

        .task-calendar-wrapper :global(.react-calendar__tile) {
          padding: 1rem 0.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          font-weight: 700;
          transition: all 0.2s;
          position: relative;
          min-height: 70px;
        }

        .task-calendar-wrapper :global(.react-calendar__tile:enabled:hover) {
          background: #f3f4f6;
          border: 2px solid black;
        }

        .task-calendar-wrapper :global(.react-calendar__tile--now) {
          background: #fef3c7;
        }

        .task-calendar-wrapper :global(.react-calendar__tile--active),
        .task-calendar-wrapper :global(.react-calendar__tile.selected-date) {
          background: #67e8f9 !important;
          border: 2px solid black !important;
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }

        .task-calendar-wrapper :global(.react-calendar__tile.has-tasks) {
          font-weight: 900;
        }

        .task-calendar-wrapper :global(.react-calendar__month-view__days__day--neighboringMonth) {
          color: #9ca3af;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: black #e5e7eb;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
          border: 1px solid black;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: black;
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

/**
 * MiniTaskCalendar - Versión compacta del calendario
 */
export const MiniTaskCalendar = ({
  tasks = [],
  onDateSelect,
  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = startOfDay(new Date(task.dueDate)).toISOString();
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const dateKey = startOfDay(date).toISOString();
    const dateTasks = tasksByDate[dateKey];

    if (!dateTasks || dateTasks.length === 0) return null;

    return (
      <div className="absolute top-1 right-1 w-2 h-2 bg-brand-cyan-400 border border-black rounded-full" />
    );
  };

  return (
    <div className={`bg-white border-2 border-black p-4 ${className}`}>
      <div className="mini-calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          locale="es-ES"
          prevLabel={<ChevronLeft className="h-4 w-4" />}
          nextLabel={<ChevronRight className="h-4 w-4" />}
          prev2Label={null}
          next2Label={null}
          className="mini-calendar"
        />
      </div>

      <style jsx>{`
        .mini-calendar-wrapper :global(.mini-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
          font-size: 0.75rem;
        }

        .mini-calendar-wrapper :global(.react-calendar__navigation) {
          margin-bottom: 0.5rem;
        }

        .mini-calendar-wrapper :global(.react-calendar__navigation button) {
          font-size: 0.875rem;
          font-weight: 900;
          padding: 0.25rem;
          border: 1px solid black;
          background: white;
        }

        .mini-calendar-wrapper :global(.react-calendar__tile) {
          padding: 0.5rem 0.25rem;
          font-weight: 700;
          border: 1px solid #e5e7eb;
          position: relative;
          min-height: 35px;
        }

        .mini-calendar-wrapper :global(.react-calendar__tile--active) {
          background: #67e8f9 !important;
          border: 1px solid black !important;
        }
      `}</style>
    </div>
  );
};

export default TaskCalendar;
