
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FormDivider, FormSpacer, FormContainer } from './FormLayoutComponents';

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
        const text = element.properties.headerText || 'Header';
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
        const text = element.properties.paragraphText || 'Paragraph text';
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
        // For all other element types (text input, checkbox, etc.)
        currentRow.push(
          <div className={widthClass} key={element.id}>
            <div className="mb-1 text-sm font-medium">{element.label || 'Form Element'}</div>
            {element.renderPreview ? (
              element.renderPreview()
            ) : (
              <div className="p-2 border rounded-md text-sm text-muted-foreground">
                {element.label || 'Form Element'}
              </div>
            )}
            {element.properties.helpText && (
              <div className="mt-1 text-xs text-muted-foreground">{element.properties.helpText}</div>
            )}
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
