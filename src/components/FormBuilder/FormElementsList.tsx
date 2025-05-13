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
    // Update the column span in the element's properties
    const updatedElements = elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          properties: {
            ...element.properties,
            colSpan: span
          }
        };
      }
      return element;
    });
    
    onElementsChange(updatedElements);
    
    // Also keep track in our local state
    setColumnSpans(prev => ({
      ...prev,
      [id]: span
    }));
  };

  const increaseColumnSpan = (id: string) => {
    const element = elements.find(el => el.id === id);
    const currentSpan = element?.properties.colSpan ? 
      (typeof element.properties.colSpan === 'number' ? 
        Math.min(Math.max(1, element.properties.colSpan), 4) : 
        element.properties.colSpan) : 
      1;
    
    if (currentSpan < 4) {
      handleColSpanChange(id, (currentSpan + 1) as 1 | 2 | 3 | 4);
    }
  };

  const decreaseColumnSpan = (id: string) => {
    const element = elements.find(el => el.id === id);
    const currentSpan = element?.properties.colSpan ? 
      (typeof element.properties.colSpan === 'number' ? 
        Math.min(Math.max(1, element.properties.colSpan), 4) : 
        element.properties.colSpan) : 
      1;
    
    if (currentSpan > 1) {
      handleColSpanChange(id, (currentSpan - 1) as 1 | 2 | 3 | 4);
    }
  };

  // Initialize column spans from elements
  React.useEffect(() => {
    const initialSpans: Record<string, 1 | 2 | 3 | 4> = {};
    elements.forEach(element => {
      if (element.properties.colSpan) {
        initialSpans[element.id] = typeof element.properties.colSpan === 'number' ? 
          Math.min(Math.max(1, element.properties.colSpan), 4) as 1 | 2 | 3 | 4 : 
          element.properties.colSpan;
      } else {
        initialSpans[element.id] = 1;
      }
    });
    setColumnSpans(initialSpans);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
        {elements.length === 0 && (
          <div className="text-center p-8 border border-dashed rounded-md text-muted-foreground col-span-4 dark:border-neutral-700 dark:text-neutral-400">
            Drag elements here to build your form
          </div>
        )}
        {elements.map((element) => {
          const elementColSpan = element.properties.colSpan ? 
            (typeof element.properties.colSpan === 'number' ? 
              Math.min(Math.max(1, element.properties.colSpan), 4) as 1 | 2 | 3 | 4 : 
              element.properties.colSpan) : 
            1;
            
          return (
            <FormElement
              key={element.id}
              element={element}
              onRemove={handleRemoveElement}
              onEdit={onEditElement}
              onDuplicate={onDuplicateElement}
              isEditing={element.id === editingElementId}
              colSpan={elementColSpan}
              onColSpanChange={handleColSpanChange}
              onIncreaseSpan={() => increaseColumnSpan(element.id)}
              onDecreaseSpan={() => decreaseColumnSpan(element.id)}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default FormElementsList;
