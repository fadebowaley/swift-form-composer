
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code, Settings } from 'lucide-react';
import FormPreview from './FormPreview';
import { FormElementType } from '@/types/form-builder';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormPreviewPanelProps {
  elements: FormElementType[];
  onSave: () => void;
  activeTab: 'preview' | 'json' | 'properties';
  onTabChange: (value: 'preview' | 'json' | 'properties') => void;
  editingElement: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
  elements: FormElementType[];
  wizardMode?: boolean;
}

const FormPreviewPanel = ({ 
  elements, 
  onSave, 
  activeTab, 
  onTabChange,
  editingElement,
  onElementUpdate,
  wizardMode = false
}: FormPreviewPanelProps) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-center mb-3">
        <TooltipProvider>
          <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'preview' | 'json' | 'properties')}>
            <TabsList className="grid grid-cols-3 w-32">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="properties" className="p-2">
                    <Settings size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Properties</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="preview" className="p-2">
                    <Eye size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="json" className="p-2">
                    <Code size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>JSON</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </TooltipProvider>
      </div>
      
      <div className="flex-grow overflow-auto">
        {activeTab === 'preview' && (
          <FormPreview elements={elements} onSave={onSave} />
        )}
        {activeTab === 'json' && (
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[calc(100vh-200px)]">
            {JSON.stringify(elements, null, 2)}
          </pre>
        )}
        {activeTab === 'properties' && editingElement && (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">Element Properties</h3>
            {/* We'll use the ElementEditor component here but it will be controlled by the parent */}
            <div className="text-sm text-muted-foreground">
              {editingElement ? 
                `Editing: ${editingElement.label || editingElement.type}` : 
                'Select an element to edit its properties'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreviewPanel;
