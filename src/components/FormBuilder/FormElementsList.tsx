
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import FormElement from './FormElement';
import { FormElementType } from '@/types/form-builder';

interface FormElementsListProps {
  elements: FormElementType[];
  onElementsChange: (elements: FormElementType[]) => void;
  editingElementId: string | null;
  onEditElement: (id: string | null) => void;
  onDuplicateElement: (id: string) => void;
}

const FormElementsList = ({
  elements,
  onElementsChange,
  editingElementId,
  onEditElement,
  onDuplicateElement
}: FormElementsListProps) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  // Track column spans for elements
  const [columnSpans, setColumnSpans] = React.useState<Record<string, 1 | 2 | 3 | 4>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((item) => item.id === active.id);
      const newIndex = elements.findIndex((item) => item.id === over.id);

      const newElements = arrayMove(elements, oldIndex, newIndex);
      onElementsChange(newElements);
    }
  };

  const handleRemoveElement = (id: string) => {
    const newElements = elements.filter((element) => element.id !== id);
    onElementsChange(newElements);
    
    // Remove column span data for removed element
    const newColumnSpans = { ...columnSpans };
    delete newColumnSpans[id];
    setColumnSpans(newColumnSpans);
    
    if (editingElementId === id) {
      onEditElement(null);
    }
  };
  
  const handleColSpanChange = (id: string, span: 1 | 2 | 3 | 4) => {
    setColumnSpans(prev => ({
      ...prev,
      [id]: span
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-4 gap-3">
          {elements.length === 0 && (
            <div className="text-center p-8 border border-dashed rounded-md text-muted-foreground col-span-4">
              Drag elements here to build your form
            </div>
          )}
          {elements.map((element) => (
            <FormElement
              key={element.id}
              element={element}
              onRemove={handleRemoveElement}
              onEdit={onEditElement}
              onDuplicate={onDuplicateElement}
              isEditing={element.id === editingElementId}
              colSpan={columnSpans[element.id] || 1}
              onColSpanChange={handleColSpanChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default FormElementsList;
