
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormElementType } from '@/types/form-builder';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ActionElementProps {
  element: FormElementType;
  handleSubmit?: () => void;
  nextStep?: () => void;
  prevStep?: () => void;
  isLastStep?: boolean;
  currentStep?: number;
  wizardMode?: boolean;
}

export const ButtonElement = ({ 
  element, 
  handleSubmit,
  nextStep,
  prevStep,
  isLastStep = true,
  currentStep = 0,
  wizardMode = false
}: ActionElementProps) => {
  const buttonType = element.properties.buttonType || 'submit';
  const buttonText = element.properties.buttonText || 'Button';
  const buttonVariant = element.properties.buttonVariant || 'default';
  const isDisabled = element.properties.disabled;
  
  // In wizard mode, only show back/next buttons if they're relevant
  if (wizardMode) {
    if (buttonType === 'next' && !isLastStep) {
      return (
        <Button 
          type="button" 
          variant={buttonVariant}
          className="w-full"
          onClick={nextStep}
          disabled={isDisabled}
        >
          {buttonText || 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      );
    } else if (buttonType === 'back' && currentStep > 0) {
      return (
        <Button 
          type="button" 
          variant={buttonVariant || 'outline'}
          className="w-full"
          onClick={prevStep}
          disabled={isDisabled}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {buttonText || 'Back'}
        </Button>
      );
    } else if ((buttonType === 'submit' || !buttonType) && isLastStep) {
      return (
        <Button 
          type="submit" 
          variant={buttonVariant}
          className="w-full"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {buttonText || 'Submit'}
          <Check className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    return null;
  } 
  
  // Not in wizard mode, render all buttons
  return (
    <Button 
      type={buttonType === 'submit' ? "submit" : "button"} 
      variant={buttonVariant}
      className="w-full"
      onClick={buttonType === 'submit' ? handleSubmit : undefined}
      disabled={isDisabled}
    >
      {buttonText || 'Button'}
    </Button>
  );
};
