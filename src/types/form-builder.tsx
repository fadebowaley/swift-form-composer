
import { ReactNode } from "react";

export type ElementType = 'text' | 'textarea' | 'checkbox' | 'radio' | 'dropdown' | 'datepicker' | 'fileupload' | 'button';

export interface FormElementType {
  id: string;
  type: ElementType;
  label: string;
  properties: {
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
    helpText?: string;
    options?: string[];
    conditional?: boolean;
    buttonText?: string;
    buttonType?: 'submit' | 'reset' | 'button';
    acceptedTypes?: string;
    [key: string]: any;
  };
  renderPreview?: () => ReactNode;
}

let elementCounter = 0;

export const generateId = () => {
  return `element-${Date.now()}-${elementCounter++}`;
};

export const ELEMENT_TYPES: Record<ElementType, { label: string }> = {
  text: { label: 'Text Input' },
  textarea: { label: 'Text Area' },
  checkbox: { label: 'Checkbox' },
  radio: { label: 'Radio Group' },
  dropdown: { label: 'Dropdown' },
  datepicker: { label: 'Date Picker' },
  fileupload: { label: 'File Upload' },
  button: { label: 'Button' },
};

export const generateElement = (type: ElementType): FormElementType => {
  const baseElement = {
    id: generateId(),
    type,
    label: ELEMENT_TYPES[type].label,
    properties: {
      required: false,
      placeholder: '',
      defaultValue: '',
      helpText: '',
      conditional: false,
    },
  };

  switch (type) {
    case 'text':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'textarea':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-20 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'checkbox':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-input rounded" />
            <div className="text-sm">Checkbox option</div>
          </div>
        ),
      };
      
    case 'radio':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: () => (
          <div className="space-y-1">
            {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border border-input" />
                <div className="text-sm">{option}</div>
              </div>
            ))}
          </div>
        ),
      };
      
    case 'dropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Select an option</div>
          </div>
        ),
      };
      
    case 'datepicker':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Pick a date</div>
          </div>
        ),
      };
      
    case 'fileupload':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          acceptedTypes: '.jpg,.png,.pdf',
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Choose file</div>
          </div>
        ),
      };
      
    case 'button':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          buttonText: 'Submit',
          buttonType: 'submit',
        },
        renderPreview: () => (
          <div className="bg-primary text-primary-foreground py-1 px-4 rounded text-center w-24">
            Submit
          </div>
        ),
      };
      
    default:
      return baseElement;
  }
};
