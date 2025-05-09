
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { FormElementType } from '@/types/form-builder';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ElementEditorProps {
  element: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
}

const ElementEditor = ({ element, onElementUpdate }: ElementEditorProps) => {
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

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium">Element Properties</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={element.label}
              onChange={(e) => handlePropertyChange('label', e.target.value)}
              placeholder="Enter label"
            />
          </div>
          
          {(element.type === 'text' || element.type === 'textarea' || element.type === 'dropdown' || element.type === 'fileupload') && (
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
          
          {(element.type === 'text' || element.type === 'textarea' || element.type === 'dropdown') && (
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
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={element.properties.required}
              onCheckedChange={(value) => handleNestedPropertyChange('required', Boolean(value))}
            />
            <Label htmlFor="required">Required Field</Label>
          </div>
          
          <Separator />
          
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
          
          {element.type === 'dropdown' && (
            <div>
              <Label htmlFor="options">Options (one per line)</Label>
              <Textarea
                id="options"
                value={(element.properties.options || []).join('\n')}
                onChange={(e) => {
                  const options = e.target.value.split('\n').filter(Boolean);
                  handleNestedPropertyChange('options', options);
                }}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows={4}
              />
            </div>
          )}
          
          {element.type === 'radio' && (
            <div>
              <Label htmlFor="radio-options">Options (one per line)</Label>
              <Textarea
                id="radio-options"
                value={(element.properties.options || []).join('\n')}
                onChange={(e) => {
                  const options = e.target.value.split('\n').filter(Boolean);
                  handleNestedPropertyChange('options', options);
                }}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                rows={4}
              />
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
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id="button-submit"
                      name="buttonType"
                      value="submit"
                      checked={element.properties.buttonType === 'submit'}
                      onChange={() => handleNestedPropertyChange('buttonType', 'submit')}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="button-submit" className="text-sm">Submit</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id="button-reset"
                      name="buttonType"
                      value="reset"
                      checked={element.properties.buttonType === 'reset'}
                      onChange={() => handleNestedPropertyChange('buttonType', 'reset')}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="button-reset" className="text-sm">Reset</Label>
                  </div>
                </div>
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
            
          {(element.type !== 'button') && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="conditional">Conditional Logic</Label>
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
                  <p className="text-xs text-muted-foreground">
                    Conditional logic not fully implemented in this version.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ElementEditor;
