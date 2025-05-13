
import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ElementType } from '@/types/form-builder';
import { FormFieldIcon } from './FormFieldIcon';
import { LayoutDashboard, Database, Star, Type, Minimize2, Maximize2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingElementPaletteProps {
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
      <span className="truncate element-label">{label}</span>
    </Button>
  );
};

const CategoryIcon = ({ 
  category, 
  active, 
  onClick,
  children
}: { 
  category: string; 
  active: boolean; 
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Button
    variant={active ? "default" : "outline"}
    size="icon"
    className={cn(
      "h-12 w-12 mb-2 transition-all", 
      active ? "bg-blue-600 text-white" : "bg-white dark:bg-neutral-800"
    )}
    onClick={onClick}
  >
    {children}
  </Button>
);

const FloatingElementPalette = ({ onAddElement }: FloatingElementPaletteProps) => {
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<string>('basic');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.handle-bar')) {
      setIsDragging(true);
      setStartPos({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="fixed z-20"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Card className="flex shadow-lg border-2 transition-all">
        {/* Category icons column */}
        <div className="bg-muted/50 dark:bg-neutral-900/50 p-2 flex flex-col items-center">
          <div className="handle-bar w-full h-6 mb-4 flex items-center justify-center cursor-move">
            <GripVertical size={16} className="text-muted-foreground" />
          </div>
          
          <CategoryIcon 
            category="basic" 
            active={activeCategory === 'basic'} 
            onClick={() => setActiveCategory('basic')}
          >
            <Type size={20} />
          </CategoryIcon>
          
          <CategoryIcon 
            category="advanced" 
            active={activeCategory === 'advanced'}
            onClick={() => setActiveCategory('advanced')}
          >
            <Star size={20} />
          </CategoryIcon>
          
          <CategoryIcon 
            category="special" 
            active={activeCategory === 'special'}
            onClick={() => setActiveCategory('special')}
          >
            <Database size={20} />
          </CategoryIcon>
          
          <CategoryIcon 
            category="layout" 
            active={activeCategory === 'layout'}
            onClick={() => setActiveCategory('layout')}
          >
            <LayoutDashboard size={20} />
          </CategoryIcon>
          
          <div className="mt-auto">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10 mt-4"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Elements list */}
        {isExpanded && (
          <div className="p-3 w-60 max-h-[calc(100vh-200px)] overflow-y-auto">
            <h3 className="font-semibold mb-2 text-sm">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Elements</h3>
            
            {activeCategory === 'basic' && (
              <div className="space-y-1">
                <DraggableElement type="text" label="Text Input" onAddElement={onAddElement} />
                <DraggableElement type="email" label="Email" onAddElement={onAddElement} />
                <DraggableElement type="number" label="Number" onAddElement={onAddElement} />
                <DraggableElement type="password" label="Password" onAddElement={onAddElement} />
                <DraggableElement type="textarea" label="Text Area" onAddElement={onAddElement} />
                <DraggableElement type="checkbox" label="Checkbox" onAddElement={onAddElement} />
                <DraggableElement type="radio" label="Radio Group" onAddElement={onAddElement} />
                <DraggableElement type="dropdown" label="Dropdown" onAddElement={onAddElement} />
              </div>
            )}
            
            {activeCategory === 'advanced' && (
              <div className="space-y-1">
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
              </div>
            )}
            
            {activeCategory === 'special' && (
              <div className="space-y-1">
                <DraggableElement type="button" label="Button" onAddElement={onAddElement} />
                <DraggableElement type="apidropdown" label="API Dropdown" onAddElement={onAddElement} />
                <DraggableElement type="searchLookup" label="DB Lookup" onAddElement={onAddElement} />
                <DraggableElement type="captcha" label="CAPTCHA" onAddElement={onAddElement} />
              </div>
            )}
            
            {activeCategory === 'layout' && (
              <div className="space-y-1">
                <DraggableElement type="header" label="Form Header" onAddElement={onAddElement} />
                <DraggableElement type="paragraph" label="Text Paragraph" onAddElement={onAddElement} />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default FloatingElementPalette;
