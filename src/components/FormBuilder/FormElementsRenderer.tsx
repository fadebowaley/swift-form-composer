
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import ElementRenderer from './ElementRenderers/ElementRenderer';

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
      
      currentRow.push(
        <div className={widthClass} key={element.id}>
          <ElementRenderer 
            element={element}
            handleSubmit={handleSubmit}
            nextStep={nextStep}
            prevStep={prevStep}
            isLastStep={isLastStep}
            currentStep={currentStep}
            wizardMode={wizardMode}
          />
        </div>
      );
      
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
