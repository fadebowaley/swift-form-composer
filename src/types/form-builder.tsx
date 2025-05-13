
import { ReactNode } from "react";

export type ElementType = 
  'text' | 
  'textarea' | 
  'number' | 
  'email' | 
  'password' |
  'checkbox' | 
  'radio' | 
  'dropdown' | 
  'datepicker' |
  'timepicker' |
  'fileupload' | 
  'toggle' |
  'slider' |
  'hidden' |
  'button' |
  'apidropdown' |
  'rating' |
  'dependentDropdown' |
  'searchLookup' |
  'captcha' |
  'signature' |
  'locationPicker' |
  'header' |
  'paragraph' |
  'divider' |      // New: Divider element
  'spacer' |       // New: Spacer for vertical spacing
  'container';     // New: Container for grouping elements

export type ButtonType = 'submit' | 'reset' | 'next' | 'back';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface FormElementType {
  id: string;
  type: ElementType;
  label: string;
  properties: {
    placeholder?: string;
    defaultValue?: string;
    helpText?: string;
    options?: string[];
    conditional?: boolean;
    conditionalLogic?: {
      dependsOn?: string;
      showWhen?: string;
    };
    validation?: ValidationRules;
    buttonText?: string;
    buttonType?: ButtonType;
    acceptedTypes?: string;
    min?: number;
    max?: number;
    step?: number;
    hidden?: boolean;
    apiEndpoint?: string;
    ratingType?: 'star' | 'emoji';
    maxRating?: number;
    // Dependent dropdown properties
    parentDropdown?: string;
    optionsMap?: Record<string, string[]>;
    // Search lookup properties
    searchEndpoint?: string;
    searchKey?: string;
    searchResultsKey?: string;
    searchLabelKey?: string;
    searchValueKey?: string;
    debounceMs?: number;
    minChars?: number;
    // Captcha properties
    captchaType?: 'recaptcha' | 'custom' | 'turnstile';
    siteKey?: string;
    secretKey?: string;
    captchaTheme?: 'light' | 'dark';
    captchaSize?: 'normal' | 'compact';
    // Signature pad properties
    signatureBackgroundColor?: string;
    signaturePenColor?: string;
    signaturePenSize?: number;
    signatureHeight?: number;
    signatureClearable?: boolean;
    // Location picker properties 
    defaultLatitude?: number;
    defaultLongitude?: number;
    mapZoomLevel?: number;
    autoDetectLocation?: boolean;
    // Header properties
    headerSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    headerText?: string;
    headerAlignment?: 'left' | 'center' | 'right';
    // Paragraph properties
    paragraphText?: string;
    paragraphAlignment?: 'left' | 'center' | 'right';
    // Divider properties
    dividerOrientation?: 'horizontal' | 'vertical';
    dividerThickness?: 'thin' | 'medium' | 'thick';
    // Container properties
    containerVariant?: 'default' | 'card' | 'outlined' | 'shaded';
    containerPadding?: 'small' | 'medium' | 'large';
    // Column span (for all elements)
    colSpan?: 1 | 2 | 3 | 4;
    [key: string]: any;
  };
  renderPreview?: () => ReactNode;
}

let elementCounter = 0;

export const generateId = () => {
  return `element-${Date.now()}-${elementCounter++}`;
};

export const ELEMENT_TYPES: Record<ElementType, { label: string; category: string }> = {
  text: { label: 'Text Input', category: 'Basic' },
  textarea: { label: 'Text Area', category: 'Basic' },
  number: { label: 'Number Input', category: 'Basic' },
  email: { label: 'Email Input', category: 'Basic' },
  password: { label: 'Password Field', category: 'Basic' },
  checkbox: { label: 'Checkbox Group', category: 'Selection' },
  radio: { label: 'Radio Group', category: 'Selection' },
  dropdown: { label: 'Dropdown', category: 'Selection' },
  datepicker: { label: 'Date Picker', category: 'Advanced' },
  timepicker: { label: 'Time Picker', category: 'Advanced' },
  fileupload: { label: 'File Upload', category: 'Advanced' },
  toggle: { label: 'Toggle Switch', category: 'Selection' },
  slider: { label: 'Slider', category: 'Advanced' },
  hidden: { label: 'Hidden Field', category: 'Special' },
  button: { label: 'Button', category: 'Action' },
  apidropdown: { label: 'API Dropdown', category: 'Special' },
  rating: { label: 'Rating', category: 'Advanced' },
  dependentDropdown: { label: 'Linked Dropdown', category: 'Selection' },
  searchLookup: { label: 'DB Lookup', category: 'Special' },
  captcha: { label: 'CAPTCHA', category: 'Special' },
  signature: { label: 'Signature Pad', category: 'Advanced' },
  locationPicker: { label: 'Location Picker', category: 'Advanced' },
  header: { label: 'Form Header', category: 'Layout' },
  paragraph: { label: 'Text Paragraph', category: 'Layout' },
  divider: { label: 'Divider', category: 'Layout' },
  spacer: { label: 'Spacer', category: 'Layout' },
  container: { label: 'Container', category: 'Layout' },
};

export const generateElement = (type: ElementType): FormElementType => {
  const baseElement = {
    id: generateId(),
    type,
    label: ELEMENT_TYPES[type].label,
    properties: {
      placeholder: '',
      defaultValue: '',
      helpText: '',
      conditional: false,
      validation: {
        required: false
      },
      colSpan: 1 as 1 | 2 | 3 | 4, // Cast to the correct type
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
      
    case 'number':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          min: 0,
          max: 100,
          step: 1,
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'email':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'password':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input" />
        ),
      };
      
    case 'checkbox':
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
                <div className="w-4 h-4 border border-input rounded" />
                <div className="text-sm">{option}</div>
              </div>
            ))}
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
      
    case 'timepicker':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Select time</div>
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
      
    case 'toggle':
      return {
        ...baseElement,
        renderPreview: () => (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-4 rounded-full bg-muted/70 flex items-center">
              <div className="w-3 h-3 rounded-full bg-background ml-0.5"></div>
            </div>
            <div className="text-sm">Toggle option</div>
          </div>
        ),
      };
      
    case 'slider':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: '50',
        },
        renderPreview: () => (
          <div className="w-full pt-3">
            <div className="h-1 w-full bg-muted/70 rounded-full">
              <div className="h-1 w-1/2 bg-primary rounded-full"></div>
              <div className="h-3 w-3 rounded-full bg-primary relative -top-1" style={{ marginLeft: '50%' }}></div>
            </div>
          </div>
        ),
      };
      
    case 'hidden':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          hidden: true,
        },
        renderPreview: () => (
          <div className="p-2 border border-dashed border-muted-foreground/50 rounded bg-muted/20">
            <div className="text-sm text-muted-foreground">Hidden field (not visible in form)</div>
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
      
    case 'apidropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          apiEndpoint: '',
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">API Dropdown</div>
          </div>
        ),
      };
      
    case 'rating':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          ratingType: 'star',
          maxRating: 5,
        },
        renderPreview: () => (
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="text-yellow-400 text-sm">★</div>
            ))}
          </div>
        ),
      };
      
    case 'dependentDropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
          parentDropdown: '',
          optionsMap: {
            'Option 1': ['Child 1A', 'Child 1B', 'Child 1C'],
            'Option 2': ['Child 2A', 'Child 2B'],
            'Option 3': ['Child 3A', 'Child 3B', 'Child 3C', 'Child 3D'],
          },
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Dependent Dropdown</div>
          </div>
        ),
      };
      
    case 'searchLookup':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          searchEndpoint: 'https://api.example.com/search',
          searchKey: 'query',
          searchResultsKey: 'results',
          searchLabelKey: 'name',
          searchValueKey: 'id',
          debounceMs: 300,
          minChars: 2,
        },
        renderPreview: () => (
          <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
            <div className="text-sm text-muted-foreground">Live Database Lookup</div>
          </div>
        ),
      };
      
    case 'captcha':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          captchaType: 'recaptcha',
          siteKey: '',
          captchaTheme: 'light',
          captchaSize: 'normal',
        },
        renderPreview: () => (
          <div className="p-2 border border-dashed border-muted-foreground/50 rounded bg-muted/20">
            <div className="text-sm text-muted-foreground">CAPTCHA Protection</div>
          </div>
        ),
      };
      
    case 'signature':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          signatureBackgroundColor: '#ffffff',
          signaturePenColor: '#000000',
          signaturePenSize: 2,
          signatureHeight: 150,
          signatureClearable: true,
        },
        renderPreview: () => (
          <div className="w-full h-20 bg-muted/30 rounded border border-input flex items-center justify-center">
            <div className="text-sm text-muted-foreground italic">Signature Pad</div>
          </div>
        ),
      };
      
    case 'locationPicker':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          defaultLatitude: 40.7128,
          defaultLongitude: -74.0060, // NYC default
          mapZoomLevel: 13,
          autoDetectLocation: true,
        },
        renderPreview: () => (
          <div className="w-full h-32 bg-muted/30 rounded border border-input flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Map Location Picker</div>
          </div>
        ),
      };
      
    case 'header':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          defaultValue: 'Section Header',
          headerLevel: 'h2',
          headerAlignment: 'left',
        },
        renderPreview: () => (
          <div className="w-full py-1 font-bold text-lg">Section Header</div>
        ),
      };
      
    case 'paragraph':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          defaultValue: 'Enter descriptive text for your form here.',
          paragraphAlignment: 'left',
        },
        renderPreview: () => (
          <div className="w-full text-sm text-muted-foreground">Description text paragraph</div>
        ),
      };
      
    case 'divider':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          dividerOrientation: 'horizontal',
          dividerThickness: 'thin',
        },
        renderPreview: () => (
          <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2" />
        ),
      };
      
    case 'spacer':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          size: 'medium',
        },
        renderPreview: () => (
          <div className="w-full h-4" />
        ),
      };
      
    case 'container':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          containerVariant: 'outlined',
          containerPadding: 'medium',
        },
        renderPreview: () => (
          <div className="w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-muted/20">
            <div className="text-sm text-center text-muted-foreground">Container</div>
          </div>
        ),
      };
      
    default:
      return baseElement;
  }
};
