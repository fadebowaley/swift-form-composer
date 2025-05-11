
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Copy, GripVertical, X } from 'lucide-react';
import { FormElementType } from '@/types/form-builder';

interface FormElementProps {
  element: FormElementType;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  isEditing: boolean;
  colSpan?: 1 | 2 | 3 | 4;
  onColSpanChange?: (id: string, span: 1 | 2 | 3 | 4) => void;
  onIncreaseSpan?: () => void;
  onDecreaseSpan?: () => void;
}

const FormElement = ({ 
  element, 
  onRemove, 
  onEdit, 
  onDuplicate,
  isEditing,
  colSpan = 1,
  onColSpanChange,
  onIncreaseSpan,
  onDecreaseSpan
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
      className={`relative border rounded-md p-2 bg-white form-element-hover ${getColSpanClass()}
        ${isDragging ? 'dragging' : ''}
        ${isEditing ? 'ring-2 ring-primary' : ''}
        dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200
        form-element-fixed-height
      `}
      onClick={() => onEdit(element.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div 
            {...attributes}
            {...listeners}
            className="drag-handle p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-grab"
          >
            <GripVertical size={14} className="text-gray-500 dark:text-neutral-400" />
          </div>
          <div className="font-medium text-xs sm:text-sm truncate">{element.label || 'Untitled element'}</div>
        </div>
        
        <div className="element-actions flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleDuplicate}
            title="Duplicate"
          >
            <Copy size={12} className="text-gray-500 dark:text-neutral-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleRemove}
            title="Remove"
          >
            <X size={12} className="text-gray-500 dark:text-neutral-400" />
          </Button>
        </div>
      </div>
      
      <div className="mt-2 text-xs form-preview-content">
        {element.renderPreview ? element.renderPreview() : (
          <div className="text-xs text-muted-foreground dark:text-neutral-400">Preview not available</div>
        )}
      </div>

      <div className="absolute bottom-1 right-1 flex items-center gap-1">
        {onDecreaseSpan && colSpan > 1 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 p-0 bg-muted hover:bg-muted/80 dark:bg-neutral-700 dark:hover:bg-neutral-600" 
            onClick={(e) => {
              e.stopPropagation();
              onDecreaseSpan();
            }}
            title="Decrease width"
          >
            <ArrowLeft size={10} className="dark:text-neutral-200" />
          </Button>
        )}
        
        {onIncreaseSpan && colSpan < 4 && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 p-0 bg-muted hover:bg-muted/80 dark:bg-neutral-700 dark:hover:bg-neutral-600" 
            onClick={(e) => {
              e.stopPropagation();
              onIncreaseSpan();
            }}
            title="Increase width"
          >
            <ArrowRight size={10} className="dark:text-neutral-200" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormElement;
