
import React from 'react';
import FormPreview from './FormPreview';
import { FormElementType } from '@/types/form-builder';
import ElementEditor from './ElementEditor';

interface FormPreviewPanelProps {
  elements: FormElementType[];
  onSave: () => void;
  activeTab: 'preview' | 'json' | 'properties';
  editingElement: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
  wizardMode?: boolean;
}

const FormPreviewPanel = ({ 
  elements, 
  onSave, 
  activeTab, 
  editingElement,
  onElementUpdate,
  wizardMode = false
}: FormPreviewPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-4">
        {activeTab === 'preview' && (
          <FormPreview elements={elements} onSave={onSave} />
        )}
        
        {activeTab === 'json' && (
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[calc(100vh-200px)] dark:bg-neutral-800 dark:text-neutral-200">
            {JSON.stringify(elements, null, 2)}
          </pre>
        )}
        
        {activeTab === 'properties' && editingElement ? (
          <ElementEditor 
            element={editingElement} 
            onElementUpdate={onElementUpdate}
            elements={elements}
            wizardMode={wizardMode}
          />
        ) : activeTab === 'properties' ? (
          <div className="p-4 text-center text-muted-foreground">
            Select an element to edit its properties
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormPreviewPanel;
