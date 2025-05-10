import React, { useState } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { toast } from 'sonner';
import ElementPalette from './ElementPalette';
import FormElementsList from './FormElementsList';
import ElementEditor from './ElementEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { generateElement, FormElementType, ElementType } from '@/types/form-builder';
import FormBuilderHeader from './FormBuilderHeader';
import FormPreviewPanel from './FormPreviewPanel';

const FormBuilder = () => {
  const [elements, setElements] = useState<FormElementType[]>([]);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'properties'>('properties');
  const [wizardMode, setWizardMode] = useState<boolean>(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const editingElement = elements.find(el => el.id === editingElementId) || null;

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type) {
      // This is a drag from the palette
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over events if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // If dragging from palette to the form area
    if (active.data.current?.type && over) {
      const type = active.data.current.type as ElementType;
      
      // We don't want to skip the button element type anymore since we're
      // removing it from the palette instead
      const newElement = generateElement(type);
      
      setElements([...elements, newElement]);
      setEditingElementId(newElement.id);
      setActiveTab('properties'); // Switch to properties tab when adding a new element
      
      toast.success(`Added ${type} element`);
    }
  };

  const handleWizardModeToggle = (enabled: boolean) => {
    setWizardMode(enabled);
    
    if (enabled) {
      toast.info("Wizard mode enabled. You can now add Next/Back buttons for multi-step forms.");
    }
  };

  const handleAddElement = (type: ElementType) => {
    // We don't need to skip button elements here anymore since we're
    // removing them from the palette instead
    
    const newElement = generateElement(type);
    
    // If adding a button and wizard mode is on, default to "next" type
    if (type === 'button' && wizardMode) {
      newElement.properties.buttonType = 'next';
      newElement.properties.buttonText = 'Next';
    }
    
    setElements([...elements, newElement]);
    setEditingElementId(newElement.id);
    setActiveTab('properties'); // Switch to properties tab
    toast.success(`Added ${type} element`);
  };

  const handleElementUpdate = (updatedElement: FormElementType) => {
    const newElements = elements.map(element => 
      element.id === updatedElement.id ? updatedElement : element
    );
    setElements(newElements);
  };

  const handleElementsChange = (newElements: FormElementType[]) => {
    setElements(newElements);
  };

  const handleSaveForm = () => {
    console.log('Form structure:', JSON.stringify(elements, null, 2));
    toast.success('Form structure logged to console');
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear the form? This will remove all elements.')) {
      setElements([]);
      setEditingElementId(null);
      toast.info('Form cleared');
    }
  };

  const handleExportForm = (format: 'json' | 'html') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(elements, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileName = 'form-structure.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
      
      toast.success('Form JSON exported successfully');
    } else {
      toast.info('HTML export functionality coming soon');
    }
  };

  const handleDuplicateElement = (elementId: string) => {
    const elementToDuplicate = elements.find(el => el.id === elementId);
    if (elementToDuplicate) {
      const duplicatedElement = {
        ...elementToDuplicate,
        id: generateElement(elementToDuplicate.type).id,
        label: `${elementToDuplicate.label} (Copy)`,
      };
      setElements([...elements, duplicatedElement]);
      setEditingElementId(duplicatedElement.id);
      setActiveTab('properties'); // Switch to properties when duplicating
      toast.success(`Duplicated ${elementToDuplicate.type} element`);
    }
  };

  const handleElementEdit = (id: string | null) => {
    setEditingElementId(id);
    if (id) {
      setActiveTab('properties'); // Switch to properties tab when selecting an element
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <FormBuilderHeader 
        wizardMode={wizardMode} 
        onWizardModeToggle={handleWizardModeToggle}
        onSaveForm={handleSaveForm}
        onClearForm={handleClearForm}
        onExportForm={handleExportForm}
      />
      
      <div className="flex-grow overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
              <div className="p-4">
                <ElementPalette onAddElement={handleAddElement} />
              </div>
            </ResizablePanel>
            
            <ResizablePanel defaultSize={50} className="overflow-hidden">
              <div className="p-4 h-full">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">Form Structure</h2>
                </div>
                
                <div className="overflow-auto h-[calc(100vh-120px)]">
                  <FormElementsList 
                    elements={elements} 
                    onElementsChange={handleElementsChange} 
                    editingElementId={editingElementId}
                    onEditElement={handleElementEdit}
                    onDuplicateElement={handleDuplicateElement}
                  />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={30} className="overflow-auto">
              {activeTab === 'properties' && editingElement ? (
                <ElementEditor 
                  element={editingElement} 
                  onElementUpdate={handleElementUpdate}
                  elements={elements}
                  wizardMode={wizardMode}
                />
              ) : (
                <FormPreviewPanel 
                  elements={elements}
                  onSave={handleSaveForm}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  editingElement={editingElement}
                  onElementUpdate={handleElementUpdate}
                  wizardMode={wizardMode}
                />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </DndContext>
      </div>
    </div>
  );
};

export default FormBuilder;
