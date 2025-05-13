
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormElementType } from '@/types/form-builder';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import FormElementsRenderer from './FormElementsRenderer';

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
        currentStepElements = []; // Start a new step
      } 
      
      // Add element to current step
      currentStepElements.push(element);
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
          ) : (
            <FormElementsRenderer 
              elements={currentElements}
              handleSubmit={form.handleSubmit(handleSubmit)}
              nextStep={nextStep}
              prevStep={prevStep}
              isLastStep={isLastStep}
              currentStep={currentStep}
              wizardMode={wizardMode}
            />
          )}
          
          {/* Wizard navigation controls - only show if in wizard mode and not already included in form elements */}
          {wizardMode && steps.length > 1 && !currentElements.some(el => 
            el.type === 'button' && (el.properties.buttonType === 'next' || el.properties.buttonType === 'back')
          ) && (
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
