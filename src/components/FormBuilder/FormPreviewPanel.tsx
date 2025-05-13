
import React from 'react';
import FormPreview from './FormPreview';
import { FormElementType } from '@/types/form-builder';
import ElementEditor from './ElementEditor';
import { cn } from '@/lib/utils';

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
      <div className={cn(
        "flex-grow overflow-auto p-4",
        activeTab === 'preview' && "bg-white dark:bg-neutral-900"
      )}>
        {activeTab === 'preview' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Form Preview</h2>
            <div className="border rounded-lg p-6 shadow-sm">
              <FormPreview elements={elements} onSave={onSave} wizardMode={wizardMode} />
            </div>
          </div>
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
