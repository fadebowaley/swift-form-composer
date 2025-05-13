
import React from 'react';
import { ElementType, FormElementType } from './types';
import { generateId } from './utils';
import { ELEMENT_TYPES } from './element-types';
import * as PreviewRenderers from './preview-renderers';

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
      colSpan: 1 as 1 | 2 | 3 | 4,
    },
  };

  switch (type) {
    case 'text':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.textPreview,
      };
      
    case 'textarea':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.textareaPreview,
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
        renderPreview: PreviewRenderers.numberPreview,
      };
      
    case 'email':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.emailPreview,
      };
      
    case 'password':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.passwordPreview,
      };
      
    case 'checkbox':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: PreviewRenderers.checkboxPreview,
      };
      
    case 'radio':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: PreviewRenderers.radioPreview,
      };
      
    case 'dropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        renderPreview: PreviewRenderers.dropdownPreview,
      };
      
    case 'datepicker':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.datePickerPreview,
      };
      
    case 'timepicker':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.timePickerPreview,
      };
      
    case 'fileupload':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          acceptedTypes: '.jpg,.png,.pdf',
        },
        renderPreview: PreviewRenderers.fileUploadPreview,
      };
      
    case 'toggle':
      return {
        ...baseElement,
        renderPreview: PreviewRenderers.togglePreview,
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
        renderPreview: PreviewRenderers.sliderPreview,
      };
      
    case 'hidden':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          hidden: true,
        },
        renderPreview: PreviewRenderers.hiddenPreview,
      };
      
    case 'button':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          buttonText: 'Submit',
          buttonType: 'submit',
        },
        renderPreview: PreviewRenderers.buttonPreview,
      };
      
    case 'apidropdown':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          apiEndpoint: '',
        },
        renderPreview: PreviewRenderers.apiDropdownPreview,
      };
      
    case 'rating':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          ratingType: 'star',
          maxRating: 5,
        },
        renderPreview: PreviewRenderers.ratingPreview,
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
        renderPreview: PreviewRenderers.dependentDropdownPreview,
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
        renderPreview: PreviewRenderers.searchLookupPreview,
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
        renderPreview: PreviewRenderers.captchaPreview,
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
        renderPreview: PreviewRenderers.signaturePreview,
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
        renderPreview: PreviewRenderers.locationPickerPreview,
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
        renderPreview: PreviewRenderers.headerPreview,
      };
      
    case 'paragraph':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          defaultValue: 'Enter descriptive text for your form here.',
          paragraphAlignment: 'left',
        },
        renderPreview: PreviewRenderers.paragraphPreview,
      };
      
    case 'divider':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          dividerOrientation: 'horizontal',
          dividerThickness: 'thin',
        },
        renderPreview: PreviewRenderers.dividerPreview,
      };
      
    case 'spacer':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          size: 'medium',
        },
        renderPreview: PreviewRenderers.spacerPreview,
      };
      
    case 'container':
      return {
        ...baseElement,
        properties: {
          ...baseElement.properties,
          containerVariant: 'outlined',
          containerPadding: 'medium',
        },
        renderPreview: PreviewRenderers.containerPreview,
      };
      
    default:
      return baseElement;
  }
};
