
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { X, GripVertical, Copy } from 'lucide-react';
import { FormElementType } from '@/types/form-builder';

interface FormElementProps {
  element: FormElementType;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  isEditing: boolean;
  colSpan?: 1 | 2 | 3 | 4;
  onColSpanChange?: (id: string, span: 1 | 2 | 3 | 4) => void;
}

const FormElement = ({ 
  element, 
  onRemove, 
  onEdit, 
  onDuplicate,
  isEditing,
  colSpan = 1,
  onColSpanChange
}: FormElementProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(element.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(element.id);
  };
  
  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(element.id);
  };

  const getColSpanClass = () => {
    switch (colSpan) {
      case 1: return 'col-span-1';
      case 2: return 'col-span-2';
      case 3: return 'col-span-3';
      case 4: return 'col-span-4';
      default: return 'col-span-1';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative border rounded-md p-4 mb-3 bg-white form-element-hover ${getColSpanClass()}
        ${isDragging ? 'dragging' : ''}
        ${isEditing ? 'ring-2 ring-primary' : ''}
      `}
      onClick={() => onEdit(element.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div 
            {...attributes}
            {...listeners}
            className="drag-handle p-1 rounded hover:bg-gray-100 cursor-grab"
          >
            <GripVertical size={16} />
          </div>
          <div className="font-medium text-sm">{element.label || 'Untitled element'}</div>
        </div>
        
        <div className="element-actions flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleDuplicate}
          >
            <Copy size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleRemove}
          >
            <X size={14} />
          </Button>
        </div>
      </div>
      
      <div className="mt-2">
        {element.renderPreview ? element.renderPreview() : (
          <div className="text-sm text-muted-foreground">Preview not available</div>
        )}
      </div>

      {onColSpanChange && (
        <div className="absolute bottom-1 right-1 flex gap-1">
          {[1, 2, 3, 4].map(span => (
            <button
              key={span}
              onClick={(e) => {
                e.stopPropagation();
                onColSpanChange(element.id, span as 1 | 2 | 3 | 4);
              }}
              className={`w-4 h-4 rounded-full ${colSpan === span ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormElement;
