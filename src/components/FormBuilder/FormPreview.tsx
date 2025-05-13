
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormElementType } from '@/types/form-builder';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface FormPreviewProps {
  elements: FormElementType[];
  onSave: () => void;
  wizardMode?: boolean;
}

const FormPreview = ({ elements, onSave, wizardMode = false }: FormPreviewProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm();
  
  // If wizard mode is on, split elements into steps based on "next" buttons
  const steps = React.useMemo(() => {
    if (!wizardMode) return [elements];
    
    const result: FormElementType[][] = [];
    let currentStepElements: FormElementType[] = [];
    
    // Iterate through elements and split them by "next" button
    elements.forEach((element) => {
      if (element.type === 'button' && element.properties.buttonType === 'next' && currentStepElements.length > 0) {
        result.push([...currentStepElements]);
        currentStepElements = [element]; // Include the button in the next step
      } else if (element.type === 'button' && element.properties.buttonType === 'back') {
        currentStepElements.push(element);
      } else {
        currentStepElements.push(element);
      }
    });
    
    // Add the remaining elements as the last step
    if (currentStepElements.length > 0) {
      result.push(currentStepElements);
    }
    
    // If no steps were created (no "next" buttons), use all elements as a single step
    return result.length ? result : [elements];
  }, [elements, wizardMode]);
  
  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    toast.success('Form submitted!');
    onSave();
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      toast.info(`Moving to step ${currentStep + 2}`);
    } else {
      form.handleSubmit(handleSubmit)();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      toast.info(`Moving back to step ${currentStep}`);
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;
  const currentElements = wizardMode ? steps[currentStep] : elements;

  // Organize elements in rows based on column spans
  const renderElements = () => {
    let currentRow: JSX.Element[] = [];
    let currentRowSpan = 0;
    const rows: JSX.Element[] = [];
    const totalColumns = 4;
    
    currentElements.forEach((element, index) => {
      // Get element span (default to 1 if not set)
      const elementSpan = element.properties.colSpan || 1;
      
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
        currentRow.push(
          <div className={widthClass} key={element.id}>
            {size === 'h1' && <h1 className="text-2xl font-bold">{element.properties.headerText || 'Header'}</h1>}
            {size === 'h2' && <h2 className="text-xl font-bold">{element.properties.headerText || 'Header'}</h2>}
            {size === 'h3' && <h3 className="text-lg font-bold">{element.properties.headerText || 'Header'}</h3>}
            {size === 'h4' && <h4 className="text-base font-bold">{element.properties.headerText || 'Header'}</h4>}
            {size === 'h5' && <h5 className="text-sm font-bold">{element.properties.headerText || 'Header'}</h5>}
          </div>
        );
      } else if (element.type === 'paragraph') {
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <p className="text-muted-foreground">{element.properties.paragraphText || 'Paragraph text'}</p>
          </div>
        );
      } else if (element.type === 'button') {
        const buttonType = element.properties.buttonType || 'submit';
        
        // In wizard mode, only show back/next buttons if they're relevant
        if (wizardMode) {
          if (buttonType === 'next' && currentStep < steps.length - 1) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="button" 
                  variant={element.properties.buttonVariant || 'default'}
                  className="w-full"
                  onClick={nextStep}
                >
                  {element.properties.buttonText || 'Next'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          } else if (buttonType === 'back' && currentStep > 0) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="button" 
                  variant={element.properties.buttonVariant || 'outline'}
                  className="w-full"
                  onClick={prevStep}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {element.properties.buttonText || 'Back'}
                </Button>
              </div>
            );
          } else if ((buttonType === 'submit' || !buttonType) && isLastStep) {
            currentRow.push(
              <div className={widthClass} key={element.id}>
                <Button 
                  type="submit" 
                  variant={element.properties.buttonVariant || 'default'}
                  className="w-full"
                  onClick={form.handleSubmit(handleSubmit)}
                >
                  {element.properties.buttonText || 'Submit'}
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
                variant={element.properties.buttonVariant || 'default'}
                className="w-full"
                onClick={buttonType === 'submit' ? form.handleSubmit(handleSubmit) : undefined}
              >
                {element.properties.buttonText || 'Button'}
              </Button>
            </div>
          );
        }
      } else {
        // For all other element types (text input, checkbox, etc.)
        currentRow.push(
          <div className={widthClass} key={element.id}>
            {/* Use renderPreview function if available, otherwise show a placeholder */}
            {element.renderPreview ? (
              element.renderPreview()
            ) : (
              <div className="p-2 border rounded-md text-sm text-muted-foreground">
                {element.label || 'Form Element'}
              </div>
            )}
          </div>
        );
      }
      
      // Update current row span
      currentRowSpan += elementSpan;
      
      // If this is the last element, add the current row
      if (index === currentElements.length - 1 && currentRow.length > 0) {
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
    <div className="form-preview">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full max-w-full"
        >
          {currentElements.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-md text-muted-foreground dark:border-neutral-700 dark:text-neutral-400">
              Drag elements from the palette to build your form
            </div>
          ) : renderElements()}
          
          {/* Wizard navigation controls - only show if in wizard mode */}
          {wizardMode && (
            <div className="wizard-navigation border-t pt-4 mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
              
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                {isLastStep ? (
                  <>
                    Submit
                    <Check size={18} />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FormPreview;
