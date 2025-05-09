
import React from 'react';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { FormFieldIcon } from './FormFieldIcon';
import { ELEMENT_TYPES, ElementType } from '@/types/form-builder';

interface ElementPaletteItemProps {
  type: ElementType;
  label: string;
  onAddElement: (type: ElementType) => void;
}

const ElementPaletteItem = ({ type, label, onAddElement }: ElementPaletteItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onAddElement(type)}
    >
      <Card className="p-2 flex items-center space-x-2 hover:bg-muted/50 transition-colors">
        <FormFieldIcon type={type} />
        <span className="text-sm">{label}</span>
      </Card>
    </div>
  );
};

interface ElementPaletteProps {
  onAddElement: (type: ElementType) => void;
}

const ElementPalette = ({ onAddElement }: ElementPaletteProps) => {
  return (
    <div className="space-y-2">
      <div className="font-medium mb-2">Form Elements</div>
      {Object.entries(ELEMENT_TYPES).map(([key, value]) => (
        <ElementPaletteItem 
          key={key} 
          type={key as ElementType} 
          label={value.label} 
          onAddElement={onAddElement}
        />
      ))}
      
      <div className="font-medium mt-6 mb-2">Form Actions</div>
      <ElementPaletteItem 
        type="button" 
        label="Button" 
        onAddElement={onAddElement}
      />
    </div>
  );
};

export default ElementPalette;
