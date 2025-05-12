
import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ElementType } from '@/types/form-builder';
import { FormFieldIcon } from './FormFieldIcon';

interface ElementPaletteProps {
  onAddElement: (type: ElementType) => void;
}

interface DraggableElementProps {
  type: ElementType;
  label: string;
  onAddElement: (type: ElementType) => void;
}

const DraggableElement = ({ type, label, onAddElement }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: {
      type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  return (
    <Button
      ref={setNodeRef}
      variant="outline"
      className="justify-start w-full mb-2 gap-2 bg-white dark:bg-neutral-800 text-xs"
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onAddElement(type)}
    >
      <FormFieldIcon type={type} size={16} />
      <span className="truncate">{label}</span>
    </Button>
  );
};

const ElementPalette = ({ onAddElement }: ElementPaletteProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('basic');

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <Tabs defaultValue="basic" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic" className="text-xs px-1">Basic</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs px-1">Advanced</TabsTrigger>
            <TabsTrigger value="special" className="text-xs px-1">Special</TabsTrigger>
            <TabsTrigger value="layout" className="text-xs px-1">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-1">
            <DraggableElement type="text" label="Text Input" onAddElement={onAddElement} />
            <DraggableElement type="email" label="Email" onAddElement={onAddElement} />
            <DraggableElement type="number" label="Number" onAddElement={onAddElement} />
            <DraggableElement type="password" label="Password" onAddElement={onAddElement} />
            <DraggableElement type="textarea" label="Text Area" onAddElement={onAddElement} />
            <DraggableElement type="checkbox" label="Checkbox" onAddElement={onAddElement} />
            <DraggableElement type="radio" label="Radio Group" onAddElement={onAddElement} />
            <DraggableElement type="dropdown" label="Dropdown" onAddElement={onAddElement} />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-1">
            <DraggableElement type="datepicker" label="Date Picker" onAddElement={onAddElement} />
            <DraggableElement type="timepicker" label="Time Picker" onAddElement={onAddElement} />
            <DraggableElement type="fileupload" label="File Upload" onAddElement={onAddElement} />
            <DraggableElement type="toggle" label="Toggle" onAddElement={onAddElement} />
            <DraggableElement type="slider" label="Range Slider" onAddElement={onAddElement} />
            <DraggableElement type="hidden" label="Hidden Field" onAddElement={onAddElement} />
            <DraggableElement type="rating" label="Rating" onAddElement={onAddElement} />
            <DraggableElement type="dependentDropdown" label="Linked Dropdown" onAddElement={onAddElement} />
            <DraggableElement type="signature" label="Signature" onAddElement={onAddElement} />
            <DraggableElement type="locationPicker" label="Location" onAddElement={onAddElement} />
          </TabsContent>
          
          <TabsContent value="special" className="space-y-1">
            <DraggableElement type="button" label="Button" onAddElement={onAddElement} />
            <DraggableElement type="apidropdown" label="API Dropdown" onAddElement={onAddElement} />
            <DraggableElement type="searchLookup" label="DB Lookup" onAddElement={onAddElement} />
            <DraggableElement type="captcha" label="CAPTCHA" onAddElement={onAddElement} />
          </TabsContent>

          <TabsContent value="layout" className="space-y-1">
            <DraggableElement type="header" label="Form Header" onAddElement={onAddElement} />
            <DraggableElement type="paragraph" label="Text Paragraph" onAddElement={onAddElement} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ElementPalette;
