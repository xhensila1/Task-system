import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../../app/store';
import { fetchTasks, updateTask, addColumn, removeColumn } from '../../features/tasks/taskSlice';
import { TaskType } from '../../types/taskTypes';
import { selectTaskColumns } from 'features/tasks/taskSelectors';
import { RootState } from '../../app/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from 'features/auth/authSelectors';


const TimesheetPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks as TaskType[]);
  const columns = useSelector(selectTaskColumns);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role === 'admin';
  const [showConfirm, setShowConfirm] = useState(false);
  const [columnToRemove, setColumnToRemove] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.droppableId !== result.source.droppableId) {
      const task = tasks.find(t => t.id === result.draggableId);
      if (task) {
        dispatch(updateTask({
          ...task,
          status: result.destination.droppableId as TaskType['status']
        }));
      }
    }
  };

  const openTaskDetails = (id: string) => {
    navigate(`/task/${id}`);
  };

  const handleAddColumn = () => {
    const columnName = prompt(t('promptEnterColumnName'));
    if (columnName) {
      dispatch(addColumn(columnName));
    }
  };

  const handleRemoveColumn = (column: string) => {
    setColumnToRemove(column);
    setShowConfirm(true);
  };

  const confirmRemoveColumn = () => {
    if (columnToRemove) {
      dispatch(removeColumn(columnToRemove));
      setColumnToRemove(null);
    }
    setShowConfirm(false);
  };

  const sortedColumns = [...columns.filter(col => col !== 'Done'), 'Done'];

  return (
    <div className="flex justify-between items-stretch w-full min-h-screen bg-transparent">
      <DragDropContext onDragEnd={onDragEnd}>
        {sortedColumns.map((status, index) => (
          <Droppable key={index} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 min-w-0 p-4 m-2 rounded-lg shadow-lg bg-blue-200"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg mb-2 text-center">{t(status)}</h2>
                  {isAdmin && status !== 'Done' && (
                    <button onClick={() => handleRemoveColumn(status)} className="text-red-500 ml-2">
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>
                {tasks.filter(task => task.status === status).map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 mb-2 bg-white rounded shadow ${snapshot.isDragging ? "bg-blue-100" : "bg-white"}`}
                        onClick={() => openTaskDetails(task.id)}
                      >
                        <p>{task.description}</p>
                        <p>{task.startDate}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        {isAdmin && (
          <div className="flex-1 min-w-0 p-4 m-2 rounded-lg shadow-lg bg-green-200 flex justify-center items-center">
            <button onClick={handleAddColumn} className="text-3xl text-white bg-green-500 hover:bg-green-700 rounded-full w-12 h-12 flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </DragDropContext>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>{t('promptRemoveColumn')} "{columnToRemove}"?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmRemoveColumn}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                {t('buttonYes')}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                {t('buttonNo')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimesheetPage;
