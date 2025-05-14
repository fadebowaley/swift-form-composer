
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FormDivider, FormSpacer, FormContainer } from './FormLayoutComponents';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface FormElementsRendererProps {
  elements: FormElementType[];
  handleSubmit: () => void;
  nextStep?: () => void;
  prevStep?: () => void;
  isLastStep?: boolean;
  currentStep?: number;
  wizardMode?: boolean;
}

const FormElementsRenderer = ({ 
  elements, 
  handleSubmit, 
  nextStep, 
  prevStep, 
  isLastStep = true,
  currentStep = 0,
  wizardMode = false 
}: FormElementsRendererProps) => {
  // Organize elements in rows based on column spans
  const renderElements = () => {
    let currentRow: JSX.Element[] = [];
    let currentRowSpan = 0;
    const rows: JSX.Element[] = [];
    const totalColumns = 4;
    
    elements.forEach((element, index) => {
      // Get element span (default to 1 if not set)
      const elementSpan = element.properties.colSpan ? 
        (typeof element.properties.colSpan === 'number' ? 
          Math.min(Math.max(1, element.properties.colSpan), 4) as 1 | 2 | 3 | 4 : 
          element.properties.colSpan) : 
        1;
      
      // If this element won't fit in current row, start a new row
      if (currentRowSpan + elementSpan > totalColumns) {
        rows.push(
          <div key={`row-${rows.length}`} className="grid grid-cols-4 gap-4 mb-4 w-full">
            {currentRow}
          </div>
        );
        currentRow = [];
        currentRowSpan = 0;
      }
      
      // Add element to the current row
      const widthClass = `col-span-${elementSpan}`;
      
      // Render different elements based on type
      if (element.type === 'header') {
        const size = element.properties.headerSize || 'h2';
        const text = element.properties.headerText || element.properties.defaultValue || 'Header';
        const alignment = element.properties.headerAlignment || 'left';
        
        currentRow.push(
          <div className={widthClass} key={element.id}>
            {size === 'h1' && <h1 className={`text-2xl font-bold text-${alignment}`}>{text}</h1>}
            {size === 'h2' && <h2 className={`text-xl font-bold text-${alignment}`}>{text}</h2>}
            {size === 'h3' && <h3 className={`text-lg font-bold text-${alignment}`}>{text}</h3>}
            {size === 'h4' && <h4 className={`text-base font-bold text-${alignment}`}>{text}</h4>}
            {size === 'h5' && <h5 className={`text-sm font-bold text-${alignment}`}>{text}</h5>}
          </div>
        );
      } else if (element.type === 'paragraph') {
        const text = element.properties.paragraphText || element.properties.defaultValue || 'Paragraph text';
        const alignment = element.properties.paragraphAlignment || 'left';
        
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <p className={`text-muted-foreground text-${alignment}`}>{text}</p>
          </div>
        );
      } else if (element.type === 'divider') {
        const orientation = element.properties.dividerOrientation || 'horizontal';
        const thickness = element.properties.dividerThickness || 'thin';
        
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <FormDivider orientation={orientation} thickness={thickness} />
          </div>
        );
      } else if (element.type === 'spacer') {
        const size = element.properties.size || 'medium';
        
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <FormSpacer size={size} />
          </div>
        );
      } else if (element.type === 'container') {
        const variant = element.properties.containerVariant || 'default';
        const padding = element.properties.containerPadding || 'medium';
        
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <FormContainer variant={variant} padding={padding}>
              <div className="text-center text-sm text-muted-foreground">Container Content</div>
            </FormContainer>
          </div>
        );
      } else if (element.type === 'button') {
        const buttonType = element.properties.buttonType || 'submit';
        const buttonText = element.properties.buttonText || 'Button';
        const buttonVariant = element.properties.buttonVariant || 'default';
        
        // In wizard mode, only show back/next buttons if they're relevant
        if (wizardMode) {
          if (buttonType === 'next' && !isLastStep) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="button" 
                  variant={buttonVariant}
                  className="w-full"
                  onClick={nextStep}
                >
                  {buttonText || 'Next'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          } else if (buttonType === 'back' && currentStep > 0) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="button" 
                  variant={buttonVariant || 'outline'}
                  className="w-full"
                  onClick={prevStep}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {buttonText || 'Back'}
                </Button>
              </div>
            );
          } else if ((buttonType === 'submit' || !buttonType) && isLastStep) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="submit" 
                  variant={buttonVariant}
                  className="w-full"
                  onClick={handleSubmit}
                >
                  {buttonText || 'Submit'}
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          }
        } else {
          // Not in wizard mode, render all buttons
          currentRow.push(
            <div className={widthClass} key={element.id}>
              <Button 
                type={buttonType === 'submit' ? "submit" : "button"} 
                variant={buttonVariant}
                className="w-full"
                onClick={buttonType === 'submit' ? handleSubmit : undefined}
              >
                {buttonText || 'Button'}
              </Button>
            </div>
          );
        }
      } else {
        // For different input field types
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <div className="space-y-2">
              {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
              
              {/* Text input field */}
              {element.type === 'text' && (
                <Input 
                  id={element.id}
                  type="text"
                  placeholder={element.properties.placeholder || ''}
                  defaultValue={element.properties.defaultValue || ''}
                />
              )}
              
              {/* Textarea field */}
              {element.type === 'textarea' && (
                <Textarea 
                  id={element.id}
                  placeholder={element.properties.placeholder || ''}
                  defaultValue={element.properties.defaultValue || ''}
                />
              )}
              
              {/* Number field */}
              {element.type === 'number' && (
                <Input 
                  id={element.id}
                  type="number"
                  min={element.properties.min}
                  max={element.properties.max}
                  step={element.properties.step}
                  placeholder={element.properties.placeholder || ''}
                  defaultValue={element.properties.defaultValue || ''}
                />
              )}
              
              {/* Email field */}
              {element.type === 'email' && (
                <Input 
                  id={element.id}
                  type="email"
                  placeholder={element.properties.placeholder || ''}
                  defaultValue={element.properties.defaultValue || ''}
                />
              )}
              
              {/* Password field */}
              {element.type === 'password' && (
                <Input 
                  id={element.id}
                  type="password"
                  placeholder={element.properties.placeholder || ''}
                />
              )}
              
              {/* Checkbox group */}
              {element.type === 'checkbox' && element.properties.options && (
                <div className="space-y-2">
                  {element.properties.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`${element.id}-${idx}`} />
                      <Label htmlFor={`${element.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Radio group */}
              {element.type === 'radio' && element.properties.options && (
                <RadioGroup defaultValue={element.properties.defaultValue}>
                  {element.properties.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${element.id}-${idx}`} />
                      <Label htmlFor={`${element.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {/* Dropdown */}
              {element.type === 'dropdown' && element.properties.options && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={element.properties.placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent>
                    {element.properties.options.map((option, idx) => (
                      <SelectItem key={idx} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {/* Toggle/Switch */}
              {element.type === 'toggle' && (
                <div className="flex items-center space-x-2">
                  <Switch id={element.id} />
                  <Label htmlFor={element.id}>
                    {element.properties.defaultValue || 'Toggle'}
                  </Label>
                </div>
              )}
              
              {/* Slider */}
              {element.type === 'slider' && (
                <Slider 
                  defaultValue={[parseInt(element.properties.defaultValue || '50')]} 
                  max={element.properties.max || 100} 
                  min={element.properties.min || 0}
                  step={element.properties.step || 1}
                />
              )}
              
              {/* Fallback for other element types */}
              {!['text', 'textarea', 'number', 'email', 'password', 'checkbox', 'radio', 'dropdown', 'toggle', 'slider'].includes(element.type) && 
               !['header', 'paragraph', 'divider', 'spacer', 'container', 'button'].includes(element.type) && (
                <div className="p-2 border rounded-md text-sm text-muted-foreground">
                  {element.label || 'Form Element'}
                </div>
              )}
              
              {/* Help text if available */}
              {element.properties.helpText && (
                <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
              )}
            </div>
          </div>
        );
      }
      
      // Update current row span
      currentRowSpan += elementSpan;
      
      // If this is the last element, add the current row
      if (index === elements.length - 1 && currentRow.length > 0) {
        rows.push(
          <div key={`row-${rows.length}`} className="grid grid-cols-4 gap-4 mb-4 w-full">
            {currentRow}
          </div>
        );
      }
    });
    
    return rows;
  };

  return (
    <div className="form-elements-container w-full">
      {renderElements()}
    </div>
  );
};

export default FormElementsRenderer;
