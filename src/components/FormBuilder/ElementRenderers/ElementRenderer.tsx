
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import * as BasicElements from './BasicElements';
import * as SelectionElements from './SelectionElements';
import * as AdvancedElements from './AdvancedElements';
import * as SpecialElements from './SpecialElements';
import * as LayoutElements from './LayoutElements';
import * as ActionElements from './ActionElements';

interface ElementRendererProps {
  element: FormElementType;
  handleSubmit?: () => void;
  nextStep?: () => void;
  prevStep?: () => void;
  isLastStep?: boolean;
  currentStep?: number;
  wizardMode?: boolean;
}

const ElementRenderer = ({
  element,
  handleSubmit,
  nextStep,
  prevStep,
  isLastStep = true,
  currentStep = 0,
  wizardMode = false
}: ElementRendererProps) => {
  switch (element.type) {
    // Basic Elements
    case 'text':
      return <BasicElements.TextInput element={element} />;
    case 'textarea':
      return <BasicElements.TextareaInput element={element} />;
    case 'number':
      return <BasicElements.NumberInput element={element} />;
    case 'email':
      return <BasicElements.EmailInput element={element} />;
    case 'password':
      return <BasicElements.PasswordInput element={element} />;
    case 'hidden':
      return <BasicElements.HiddenInput element={element} />;
      
    // Selection Elements
    case 'checkbox':
      return <SelectionElements.CheckboxGroup element={element} />;
    case 'radio':
      return <SelectionElements.RadioButtonGroup element={element} />;
    case 'dropdown':
      return <SelectionElements.DropdownSelect element={element} />;
    case 'apidropdown':
      return <SelectionElements.ApiDropdown element={element} />;
    case 'dependentDropdown':
      return <SelectionElements.DependentDropdown element={element} />;
    case 'toggle':
      return <SelectionElements.ToggleSwitch element={element} />;
      
    // Advanced Elements
    case 'datepicker':
      return <AdvancedElements.DatePickerElement element={element} />;
    case 'timepicker':
      return <AdvancedElements.TimePickerElement element={element} />;
    case 'fileupload':
      return <AdvancedElements.FileUploadElement element={element} />;
    case 'slider':
      return <AdvancedElements.SliderElement element={element} />;
    case 'rating':
      return <AdvancedElements.RatingElement element={element} />;
    case 'signature':
      return <AdvancedElements.SignatureElement element={element} />;
    case 'locationPicker':
      return <AdvancedElements.LocationPickerElement element={element} />;
      
    // Special Elements
    case 'searchLookup':
      return <SpecialElements.SearchLookupElement element={element} />;
    case 'captcha':
      return <SpecialElements.CaptchaElement element={element} />;
      
    // Layout Elements
    case 'header':
      return <LayoutElements.HeaderElement element={element} />;
    case 'paragraph':
      return <LayoutElements.ParagraphElement element={element} />;
    case 'divider':
      return <LayoutElements.DividerElement element={element} />;
    case 'spacer':
      return <LayoutElements.SpacerElement element={element} />;
    case 'container':
      return <LayoutElements.ContainerElement element={element} />;
      
    // Action Elements
    case 'button':
      return (
        <ActionElements.ButtonElement 
          element={element}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          prevStep={prevStep}
          isLastStep={isLastStep}
          currentStep={currentStep}
          wizardMode={wizardMode}
        />
      );
      
    // Fallback
    default:
      return (
        <div className="p-2 border rounded-md text-sm text-muted-foreground">
          {element.label || 'Form Element'}
        </div>
      );
  }
};

export default ElementRenderer;
