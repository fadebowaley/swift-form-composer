
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code, Settings } from 'lucide-react';
import FormPreview from './FormPreview';
import { FormElementType } from '@/types/form-builder';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ElementEditor from './ElementEditor';

interface FormPreviewPanelProps {
  elements: FormElementType[];
  onSave: () => void;
  activeTab: 'preview' | 'json' | 'properties';
  onTabChange: (value: 'preview' | 'json' | 'properties') => void;
  editingElement: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center mb-3 sticky top-0 z-10 bg-background py-2">
        <TooltipProvider>
          <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'preview' | 'json' | 'properties')}>
            <TabsList className="grid grid-cols-3 w-32">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="properties" className="p-2">
                    <Settings size={18} className="dark:text-white" />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Properties</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="preview" className="p-2">
                    <Eye size={18} className="dark:text-white" />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="json" className="p-2">
                    <Code size={18} className="dark:text-white" />
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
        <TabsContent value="preview" className="h-full">
          <FormPreview elements={elements} onSave={onSave} />
        </TabsContent>
        
        <TabsContent value="json" className="h-full">
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[calc(100vh-200px)] dark:bg-neutral-800 dark:text-neutral-200">
            {JSON.stringify(elements, null, 2)}
          </pre>
        </TabsContent>
        
        <TabsContent value="properties" className="h-full">
          {editingElement ? (
            <ElementEditor 
              element={editingElement} 
              onElementUpdate={onElementUpdate}
              elements={elements}
              wizardMode={wizardMode}
            />
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Select an element to edit its properties
            </div>
          )}
        </TabsContent>
      </div>
    </div>
  );
};

export default FormPreviewPanel;
