import React, { useState } from 'react';
import Modal, { ModalFooter } from '../common/Modal';
import Button from '../common/Button';
import { Input, Textarea, Select } from '../common/Input';
import { FileText, Calendar, User, Flag, Building2, PlusCircle } from 'lucide-react';
import { PRIORITIES_LABELS, DEPARTMENTS_LABELS } from '../../utils/constants';
import { formatDateForInput } from '../../utils/dateUtils';

/**
 * CreateTaskModal Component - Modal para crear nueva tarea
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Control de apertura del modal
 * @param {Function} props.onClose - Callback al cerrar
 * @param {Function} props.onSubmit - Callback al enviar (taskData) => Promise
 * @param {Array} props.usuarios - Lista de usuarios disponibles para asignar
 * @param {Object} props.initialData - Datos iniciales para edición
 * @param {boolean} props.isEditing - Indica si es modo edición
 */
const CreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  usuarios = [],
  initialData = null,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 2, // Media por defecto
    departamentoId: '',
    asignadoAUsuarioId: '',
    dueDate: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          titulo: initialData.titulo || '',
          descripcion: initialData.descripcion || '',
          prioridad: initialData.prioridad ?? 2,
          departamentoId: initialData.departamentoId || '',
          asignadoAUsuarioId: initialData.asignadoAUsuarioId || '',
          dueDate: initialData.dueDate ? formatDateForInput(initialData.dueDate) : ''
        });
      } else {
        setFormData({
          titulo: '',
          descripcion: '',
          prioridad: 2,
          departamentoId: '',
          asignadoAUsuarioId: '',
          dueDate: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    } else if (formData.titulo.trim().length < 3) {
      newErrors.titulo = 'El título debe tener al menos 3 caracteres';
    } else if (formData.titulo.trim().length > 200) {
      newErrors.titulo = 'El título no puede exceder 200 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (formData.prioridad === undefined || formData.prioridad === '') {
      newErrors.prioridad = 'La prioridad es requerida';
    }

    if (!formData.departamentoId) {
      newErrors.departamentoId = 'El departamento es requerido';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        newErrors.dueDate = 'La fecha de vencimiento no puede ser en el pasado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para enviar
      const taskData = {
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        prioridad: parseInt(formData.prioridad),
        departamentoId: parseInt(formData.departamentoId)
      };

      // Campos opcionales
      if (formData.asignadoAUsuarioId) {
        taskData.asignadoAUsuarioId = parseInt(formData.asignadoAUsuarioId);
      }

      if (formData.dueDate) {
        taskData.dueDate = new Date(formData.dueDate).toISOString();
      }

      await onSubmit(taskData);
      onClose();
    } catch (error) {
      console.error('Error al crear/editar tarea:', error);
      setErrors({
        submit: error.message || 'Error al procesar la tarea. Intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
      size="large"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Título */}
          <Input
            label="Título"
            icon={FileText}
            value={formData.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            placeholder="Ej: Revisar documentación del proyecto"
            error={errors.titulo}
            required
            maxLength={200}
            disabled={isSubmitting}
          />

          {/* Descripción */}
          <Textarea
            label="Descripción"
            value={formData.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
            placeholder="Describe detalladamente la tarea a realizar..."
            rows={4}
            error={errors.descripcion}
            required
            disabled={isSubmitting}
          />

          {/* Grid: Prioridad y Departamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prioridad */}
            <Select
              label="Prioridad"
              icon={Flag}
              value={formData.prioridad}
              onChange={(e) => handleChange('prioridad', e.target.value)}
              options={[
                { value: '', label: 'Selecciona prioridad' },
                ...Object.entries(PRIORITIES_LABELS).map(([key, label]) => ({
                  value: key,
                  label
                }))
              ]}
              error={errors.prioridad}
              required
              disabled={isSubmitting}
            />

            {/* Departamento */}
            <Select
              label="Departamento"
              icon={Building2}
              value={formData.departamentoId}
              onChange={(e) => handleChange('departamentoId', e.target.value)}
              options={[
                { value: '', label: 'Selecciona departamento' },
                ...Object.entries(DEPARTMENTS_LABELS).map(([key, label]) => ({
                  value: key,
                  label
                }))
              ]}
              error={errors.departamentoId}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Grid: Asignar a y Fecha de vencimiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asignar a */}
            <Select
              label="Asignar a (Opcional)"
              icon={User}
              value={formData.asignadoAUsuarioId}
              onChange={(e) => handleChange('asignadoAUsuarioId', e.target.value)}
              options={[
                { value: '', label: 'Sin asignar (se asignará después)' },
                ...usuarios.map(usuario => ({
                  value: usuario.usuarioId,
                  label: usuario.nombre
                }))
              ]}
              error={errors.asignadoAUsuarioId}
              disabled={isSubmitting}
            />

            {/* Fecha de vencimiento */}
            <Input
              label="Fecha de Vencimiento (Opcional)"
              icon={Calendar}
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              error={errors.dueDate}
              min={formatDateForInput(new Date())}
              disabled={isSubmitting}
            />
          </div>

          {/* Error general */}
          {errors.submit && (
            <div className="bg-red-100 border-2 border-red-600 p-4">
              <p className="text-sm font-bold text-red-900">{errors.submit}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={PlusCircle}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

/**
 * QuickCreateTaskModal - Modal rápido con campos mínimos
 */
export const QuickCreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultDepartamento = ''
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTitulo('');
      setDescripcion('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('El título es requerido');
      return;
    }

    if (!descripcion.trim()) {
      setError('La descripción es requerida');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        prioridad: 2, // Media por defecto
        departamentoId: defaultDepartamento ? parseInt(defaultDepartamento) : undefined
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear la tarea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Tarea Rápida"
      size="medium"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Título"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              setError('');
            }}
            placeholder="Título de la tarea"
            required
            disabled={isSubmitting}
          />

          <Textarea
            label="Descripción"
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
              setError('');
            }}
            placeholder="Describe la tarea brevemente..."
            rows={3}
            required
            disabled={isSubmitting}
          />

          {error && (
            <div className="bg-red-100 border-2 border-red-600 p-3">
              <p className="text-sm font-bold text-red-900">{error}</p>
            </div>
          )}
        </div>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={PlusCircle}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Crear
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

/**
 * BulkCreateTaskModal - Modal para crear múltiples tareas
 */
export const BulkCreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [tasks, setTasks] = useState(['']);
  const [departamentoId, setDepartamentoId] = useState('');
  const [prioridad, setPrioridad] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTasks(['']);
      setDepartamentoId('');
      setPrioridad(2);
      setError('');
    }
  }, [isOpen]);

  const addTaskField = () => {
    setTasks([...tasks, '']);
  };

  const removeTaskField = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validTasks = tasks.filter(t => t.trim() !== '');

    if (validTasks.length === 0) {
      setError('Debes ingresar al menos una tarea');
      return;
    }

    if (!departamentoId) {
      setError('Debes seleccionar un departamento');
      return;
    }

    setIsSubmitting(true);

    try {
      const tasksData = validTasks.map(titulo => ({
        titulo: titulo.trim(),
        descripcion: titulo.trim(),
        prioridad: parseInt(prioridad),
        departamentoId: parseInt(departamentoId)
      }));

      await onSubmit(tasksData);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear las tareas');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Múltiples Tareas"
      size="large"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Configuración general */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Departamento"
              icon={Building2}
              value={departamentoId}
              onChange={(e) => setDepartamentoId(e.target.value)}
              options={[
                { value: '', label: 'Selecciona departamento' },
                ...Object.entries(DEPARTMENTS_LABELS).map(([key, label]) => ({
                  value: key,
                  label
                }))
              ]}
              required
              disabled={isSubmitting}
            />

            <Select
              label="Prioridad"
              icon={Flag}
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              options={Object.entries(PRIORITIES_LABELS).map(([key, label]) => ({
                value: key,
                label
              }))}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Lista de tareas */}
          <div className="space-y-3">
            <label className="block text-sm font-black text-black uppercase">
              Tareas a crear:
            </label>
            {tasks.map((task, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={task}
                  onChange={(e) => updateTask(index, e.target.value)}
                  placeholder={`Tarea ${index + 1}`}
                  disabled={isSubmitting}
                />
                {tasks.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeTaskField(index)}
                    disabled={isSubmitting}
                  >
                    X
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addTaskField}
            disabled={isSubmitting}
            fullWidth
          >
            Agregar otra tarea
          </Button>

          {error && (
            <div className="bg-red-100 border-2 border-red-600 p-3">
              <p className="text-sm font-bold text-red-900">{error}</p>
            </div>
          )}
        </div>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={PlusCircle}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Crear {tasks.filter(t => t.trim() !== '').length} tarea(s)
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
