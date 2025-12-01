import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  UserPlus,
  Play,
  Clock,
  Calendar,
  User,
  Building2,
  Flag,
  FileText,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

// Components
import Button from '../components/common/Button';
import Modal, { ModalFooter } from '../components/common/Modal';
import { Textarea } from '../components/common/Input';
import { Spinner } from '../components/common/Spinner';
import TaskStatusBadge, {
  TaskStatusProgress,
  TaskStatusTimeline,
  TaskStatusHistory
} from '../components/tasks/TaskStatusBadge';
import TaskProgressIndicator from '../components/tasks/TaskProgressIndicator';
import RealtimeIndicator from '../components/dashboard/RealtimeIndicator';

// Hooks
import { useTask } from '../hooks/useTasks';
import { formatDate, formatDateLong, getDueDateStatus } from '../utils/dateUtils';
import { getPriorityLabel, getPriorityColor } from '../utils/taskUtils';
import { DEPARTMENTS_LABELS } from '../utils/constants';

/**
 * TaskDetail Page - Página de detalle de tarea individual
 */
const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Task hook
  const {
    task,
    loading,
    error,
    refresh,
    updateTask,
    deleteTask,
    acceptTask,
    finishTask,
    cancelTask
  } = useTask(id);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [evidencia, setEvidencia] = useState('');
  const [comentario, setComentario] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handlers
  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await acceptTask();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinish = async () => {
    setIsProcessing(true);
    try {
      await finishTask(evidencia);
      setIsFinishModalOpen(false);
      setEvidencia('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    setIsProcessing(true);
    try {
      await cancelTask(comentario);
      setIsCancelModalOpen(false);
      setComentario('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await deleteTask();
      navigate('/dashboard/tasks');
    } finally {
      setIsProcessing(false);
    }
  };

  // Permissions
  const canEdit = user?.rol === 'AdminEmpresa' || user?.rol === 'ManagerDepartamento';
  const canDelete = user?.rol === 'AdminEmpresa' || user?.rol === 'ManagerDepartamento';
  const canAccept = task?.estado === 1 && task?.asignadoAUsuarioId === user?.usuarioId;
  const canFinish = task?.estado === 2 && task?.asignadoAUsuarioId === user?.usuarioId;
  const canCancel = canEdit && (task?.estado === 0 || task?.estado === 1 || task?.estado === 2);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner text="Cargando tarea..." size="large" />
      </div>
    );
  }

  // Error state
  if (error || !task) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-100 border-4 border-red-600 p-8 text-center">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-red-900 uppercase mb-2">Error</h2>
          <p className="text-lg font-bold text-red-800 mb-6">
            {error || 'No se pudo cargar la tarea'}
          </p>
          <Button variant="danger" onClick={() => navigate('/dashboard/tasks')}>
            Volver a Tareas
          </Button>
        </div>
      </div>
    );
  }

  const dueDateStatus = task.dueDate ? getDueDateStatus(task.dueDate) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            icon={ArrowLeft}
            onClick={() => navigate('/dashboard/tasks')}
          >
            Volver
          </Button>
          <div className="flex items-center gap-3">
            <RealtimeIndicator variant="inline" />
            {canEdit && (
              <Button
                variant="outline"
                icon={Edit}
                onClick={() => navigate(`/dashboard/tasks/${id}/edit`)}
                size="sm"
              >
                Editar
              </Button>
            )}
            {canDelete && (
              <Button
                variant="danger"
                icon={Trash2}
                onClick={() => setIsDeleteModalOpen(true)}
                size="sm"
              >
                Eliminar
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-black mb-3 leading-tight">
              {task.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <TaskStatusBadge estado={task.estado} size="large" showIcon />
              <span
                className={`
                  ${getPriorityColor(task.prioridad)} px-3 py-1 text-xs font-black
                  border-2 border-black uppercase
                `}
              >
                {getPriorityLabel(task.prioridad)}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2">
            {canAccept && (
              <Button
                variant="success"
                icon={CheckCircle}
                onClick={handleAccept}
                disabled={isProcessing}
                loading={isProcessing}
              >
                Aceptar Tarea
              </Button>
            )}
            {canFinish && (
              <Button
                variant="success"
                icon={CheckCircle}
                onClick={() => setIsFinishModalOpen(true)}
              >
                Finalizar Tarea
              </Button>
            )}
            {canCancel && (
              <Button
                variant="danger"
                icon={XCircle}
                onClick={() => setIsCancelModalOpen(true)}
              >
                Cancelar Tarea
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Descripción
            </h2>
            <p className="text-base font-bold text-gray-700 whitespace-pre-wrap">
              {task.descripcion}
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-xl font-black text-black uppercase mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Progreso de la Tarea
            </h2>
            <TaskStatusTimeline currentEstado={task.estado} />
            <div className="mt-6">
              <TaskStatusProgress estado={task.estado} showLabel />
            </div>
          </div>

          {/* Evidence */}
          {task.evidencia && (
            <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <h2 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
                <ImageIcon className="h-6 w-6" />
                Evidencia
              </h2>
              <div className="bg-gray-100 border-2 border-black p-4">
                <p className="text-sm font-bold text-gray-700 whitespace-pre-wrap">
                  {task.evidencia}
                </p>
              </div>
            </div>
          )}

          {/* Comments Section (Placeholder) */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-xl font-black text-black uppercase mb-4 flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Comentarios
            </h2>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm font-bold text-gray-500">
                Funcionalidad de comentarios próximamente
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Task Info Card */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <h3 className="text-lg font-black text-black uppercase mb-4">
              Información
            </h3>
            <div className="space-y-4">
              {/* Created By */}
              {task.createdByUsuarioNombre && (
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Creado por</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-black text-black">
                      {task.createdByUsuarioNombre}
                    </span>
                  </div>
                </div>
              )}

              {/* Assigned To */}
              {task.asignadoANombre && (
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Asignado a</p>
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-black text-black">
                      {task.asignadoANombre}
                    </span>
                  </div>
                </div>
              )}

              {/* Department */}
              {task.departamentoId !== undefined && (
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Departamento</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-black text-black">
                      {DEPARTMENTS_LABELS[task.departamentoId] || 'N/A'}
                    </span>
                  </div>
                </div>
              )}

              {/* Priority */}
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase mb-1">Prioridad</p>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-gray-600" />
                  <span
                    className={`
                      text-sm font-black px-2 py-0.5 border border-black
                      ${getPriorityColor(task.prioridad)}
                    `}
                  >
                    {getPriorityLabel(task.prioridad)}
                  </span>
                </div>
              </div>

              {/* Created Date */}
              {task.createdAt && (
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Fecha de creación</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-black text-black">
                      {formatDateLong(task.createdAt)}
                    </span>
                  </div>
                </div>
              )}

              {/* Due Date */}
              {task.dueDate && (
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-1">Vencimiento</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className={`text-sm font-black ${dueDateStatus?.urgent ? dueDateStatus.color : 'text-black'}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  {dueDateStatus?.urgent && (
                    <p className={`text-xs font-bold mt-1 ${dueDateStatus.color}`}>
                      {dueDateStatus.text}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <TaskProgressIndicator
            currentStep={task.estado}
            variant="circular"
            showLabels
            className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
          />

          {/* Status History (if available) */}
          {task.historial && task.historial.length > 0 && (
            <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <h3 className="text-lg font-black text-black uppercase mb-4">
                Historial
              </h3>
              <TaskStatusHistory history={task.historial} />
            </div>
          )}
        </div>
      </div>

      {/* Finish Task Modal */}
      <Modal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        title="Finalizar Tarea"
      >
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-700">
            Estás a punto de marcar esta tarea como finalizada. Por favor, proporciona evidencia del trabajo realizado.
          </p>
          <Textarea
            label="Evidencia del trabajo realizado"
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
            placeholder="Describe el trabajo realizado, resultados obtenidos, etc."
            rows={4}
            required
          />
        </div>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setIsFinishModalOpen(false)}
            disabled={isProcessing}
          >
            Cancelar
          </Button>
          <Button
            variant="success"
            icon={CheckCircle}
            onClick={handleFinish}
            disabled={!evidencia.trim() || isProcessing}
            loading={isProcessing}
          >
            Finalizar Tarea
          </Button>
        </ModalFooter>
      </Modal>

      {/* Cancel Task Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancelar Tarea"
      >
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-700">
            Estás a punto de cancelar esta tarea. Esta acción puede revertirse posteriormente.
          </p>
          <Textarea
            label="Motivo de cancelación (Opcional)"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Explica por qué se cancela esta tarea..."
            rows={3}
          />
        </div>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setIsCancelModalOpen(false)}
            disabled={isProcessing}
          >
            Volver
          </Button>
          <Button
            variant="danger"
            icon={XCircle}
            onClick={handleCancel}
            disabled={isProcessing}
            loading={isProcessing}
          >
            Cancelar Tarea
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Task Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Tarea"
      >
        <div className="space-y-4">
          <div className="bg-red-100 border-2 border-red-600 p-4">
            <p className="text-sm font-black text-red-900 uppercase">
              Advertencia: Esta acción no se puede deshacer
            </p>
          </div>
          <p className="text-sm font-bold text-gray-700">
            ¿Estás seguro de que deseas eliminar permanentemente la tarea "{task.titulo}"?
          </p>
        </div>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isProcessing}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            icon={Trash2}
            onClick={handleDelete}
            disabled={isProcessing}
            loading={isProcessing}
          >
            Eliminar Definitivamente
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TaskDetail;
