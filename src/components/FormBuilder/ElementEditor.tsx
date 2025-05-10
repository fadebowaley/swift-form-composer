
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { FormElementType } from '@/types/form-builder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle, X, Database } from 'lucide-react';

interface ElementEditorProps {
  element: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
  elements: FormElementType[]; // Added for conditional logic
  wizardMode?: boolean; // Add wizardMode as an optional prop
}

const ElementEditor = ({ element, onElementUpdate, elements, wizardMode = false }: ElementEditorProps) => {
  const [apiUrl, setApiUrl] = useState<string>(element?.properties?.apiUrl || '');
  const [apiValueField, setApiValueField] = useState<string>(element?.properties?.apiValueField || 'value');
  const [apiLabelField, setApiLabelField] = useState<string>(element?.properties?.apiLabelField || 'label');
  
  if (!element) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Select an element to edit its properties
      </div>
    );
  }

  const handlePropertyChange = <K extends keyof FormElementType>(
    key: K,
    value: FormElementType[K]
  ) => {
    onElementUpdate({ ...element, [key]: value });
  };

  const handleNestedPropertyChange = <K extends keyof FormElementType['properties']>(
    key: K,
    value: any
  ) => {
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        [key]: value,
      },
    });
  };

  const handleValidationChange = (key: keyof FormElementType['properties']['validation'], value: any) => {
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        validation: {
          ...element.properties.validation,
          [key]: value,
        },
      },
    });
  };

  const addOption = () => {
    const currentOptions = element.properties.options || [];
    handleNestedPropertyChange('options', [...currentOptions, `Option ${currentOptions.length + 1}`]);
  };

  const removeOption = (index: number) => {
    const currentOptions = [...(element.properties.options || [])];
    currentOptions.splice(index, 1);
    handleNestedPropertyChange('options', currentOptions);
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = [...(element.properties.options || [])];
    currentOptions[index] = value;
    handleNestedPropertyChange('options', currentOptions);
  };

  const handleApiIntegration = () => {
    // Save API settings to element properties
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        apiUrl,
        apiValueField,
        apiLabelField,
        useApiData: true
      },
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium">Element Properties</h3>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="conditional">Conditional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={element.label}
                onChange={(e) => handlePropertyChange('label', e.target.value)}
                placeholder="Enter label"
              />
            </div>
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'number' || 
              element.type === 'email' || element.type === 'password' || element.type === 'dropdown' || 
              element.type === 'fileupload') && (
              <div>
                <Label htmlFor="placeholder">Placeholder</Label>
                <Input
                  id="placeholder"
                  value={element.properties.placeholder || ''}
                  onChange={(e) => handleNestedPropertyChange('placeholder', e.target.value)}
                  placeholder="Enter placeholder text"
                />
              </div>
            )}
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'number' ||
              element.type === 'email' || element.type === 'password' || element.type === 'dropdown' ||
              element.type === 'hidden' || element.type === 'slider') && (
              <div>
                <Label htmlFor="defaultValue">Default Value</Label>
                <Input
                  id="defaultValue"
                  value={element.properties.defaultValue || ''}
                  onChange={(e) => handleNestedPropertyChange('defaultValue', e.target.value)}
                  placeholder="Enter default value"
                />
              </div>
            )}
            
            {(element.type === 'number' || element.type === 'slider') && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="min">Min</Label>
                  <Input
                    id="min"
                    type="number"
                    value={element.properties.min || 0}
                    onChange={(e) => handleNestedPropertyChange('min', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max">Max</Label>
                  <Input
                    id="max"
                    type="number"
                    value={element.properties.max || 100}
                    onChange={(e) => handleNestedPropertyChange('max', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="step">Step</Label>
                  <Input
                    id="step"
                    type="number"
                    value={element.properties.step || 1}
                    onChange={(e) => handleNestedPropertyChange('step', Number(e.target.value))}
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="description">Help Text</Label>
              <Textarea
                id="description"
                value={element.properties.helpText || ''}
                onChange={(e) => handleNestedPropertyChange('helpText', e.target.value)}
                placeholder="Help text displayed below the field"
                rows={2}
              />
            </div>
            
            {(element.type === 'dropdown' || element.type === 'checkbox' || element.type === 'radio') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addOption} 
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={14} />
                    Add Option
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {(element.properties.options || []).map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeOption(index)}
                        className="h-8 w-8"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                  {(element.properties.options || []).length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No options added yet. Click "Add Option" to create options.
                    </div>
                  )}
                </div>
                
                {element.type === 'dropdown' && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <h4 className="font-medium">API Data Integration</h4>
                      </div>
                      
                      <div>
                        <Label htmlFor="apiUrl">API URL</Label>
                        <Input
                          id="apiUrl"
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                          placeholder="https://api.example.com/data"
                        />
                        <p className="text-xs text-muted-foreground mt-1">URL to fetch dropdown options</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="valueField">Value Field</Label>
                          <Input
                            id="valueField"
                            value={apiValueField}
                            onChange={(e) => setApiValueField(e.target.value)}
                            placeholder="id"
                          />
                        </div>
                        <div>
                          <Label htmlFor="labelField">Label Field</Label>
                          <Input
                            id="labelField"
                            value={apiLabelField}
                            onChange={(e) => setApiLabelField(e.target.value)}
                            placeholder="name"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="button"
                        onClick={handleApiIntegration}
                        className="w-full"
                      >
                        Use API Data
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {element.type === 'button' && (
              <>
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={element.properties.buttonText || 'Submit'}
                    onChange={(e) => handleNestedPropertyChange('buttonText', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="buttonType">Button Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {/* Show all button types in normal mode, or include next/back in wizard mode */}
                    {(wizardMode 
                      ? ['submit', 'reset', 'next', 'back'] 
                      : ['submit', 'reset']
                    ).map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          id={`button-${type}`}
                          name="buttonType"
                          value={type}
                          checked={element.properties.buttonType === type}
                          onChange={() => handleNestedPropertyChange('buttonType', type)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor={`button-${type}`} className="text-sm capitalize">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="apiEndpoint">API Endpoint (Optional)</Label>
                  <Input
                    id="apiEndpoint"
                    value={element.properties.apiEndpoint || ''}
                    onChange={(e) => handleNestedPropertyChange('apiEndpoint', e.target.value)}
                    placeholder="https://api.example.com/submit"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Where form data will be submitted when this button is clicked
                  </p>
                </div>
              </>
            )}
            
            {element.type === 'fileupload' && (
              <div>
                <Label htmlFor="accepted-types">Accepted File Types</Label>
                <Input
                  id="accepted-types"
                  value={element.properties.acceptedTypes || ''}
                  onChange={(e) => handleNestedPropertyChange('acceptedTypes', e.target.value)}
                  placeholder="e.g. .jpg, .pdf, .doc"
                />
                <p className="text-xs text-muted-foreground mt-1">Comma separated list of file extensions</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="validation" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={element.properties.validation?.required || false}
                onCheckedChange={(value) => handleValidationChange('required', Boolean(value))}
              />
              <Label htmlFor="required">Required Field</Label>
            </div>
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'email' ||
              element.type === 'password') && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minLength">Min Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={element.properties.validation?.minLength || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        handleValidationChange('minLength', value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLength">Max Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      value={element.properties.validation?.maxLength || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        handleValidationChange('maxLength', value);
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pattern">Pattern (Regex)</Label>
                  <Input
                    id="pattern"
                    value={element.properties.validation?.pattern || ''}
                    onChange={(e) => handleValidationChange('pattern', e.target.value)}
                    placeholder="e.g. ^[a-zA-Z0-9]+$"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Regular expression for validation</p>
                </div>
              </>
            )}
            
            {(element.type === 'number' || element.type === 'slider') && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="minValue">Min Value</Label>
                  <Input
                    id="minValue"
                    type="number"
                    value={element.properties.validation?.min || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      handleValidationChange('min', value);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="maxValue">Max Value</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    value={element.properties.validation?.max || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      handleValidationChange('max', value);
                    }}
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="conditional" className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="conditional"
                  checked={element.properties.conditional || false}
                  onCheckedChange={(value) => handleNestedPropertyChange('conditional', value)}
                />
                <Label htmlFor="conditional" className="text-sm">Enable conditional display</Label>
              </div>
              
              {element.properties.conditional && (
                <div className="mt-2 space-y-2 border border-input rounded-md p-3">
                  <div>
                    <Label htmlFor="dependsOn">Show this field when</Label>
                    <select 
                      id="dependsOn"
                      className="w-full mt-1 rounded-md border border-input p-2"
                      value={element.properties.conditionalLogic?.dependsOn || ''}
                      onChange={(e) => {
                        const dependsOn = e.target.value;
                        handleNestedPropertyChange('conditionalLogic', {
                          ...element.properties.conditionalLogic,
                          dependsOn
                        });
                      }}
                    >
                      <option value="">Select a field</option>
                      {elements
                        .filter(e => e.id !== element.id)
                        .map(e => (
                          <option key={e.id} value={e.id}>
                            {e.label || `Unnamed ${e.type}`}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  
                  {element.properties.conditionalLogic?.dependsOn && (
                    <div>
                      <Label htmlFor="showWhen">Has value</Label>
                      <Input
                        id="showWhen"
                        value={element.properties.conditionalLogic?.showWhen || ''}
                        onChange={(e) => {
                          handleNestedPropertyChange('conditionalLogic', {
                            ...element.properties.conditionalLogic,
                            showWhen: e.target.value
                          });
                        }}
                        placeholder="Value that triggers display"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default ElementEditor;
