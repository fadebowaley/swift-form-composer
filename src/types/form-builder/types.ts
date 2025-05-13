
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
  'divider' |
  'spacer' |
  'container';

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
  renderPreview?: () => React.ReactNode;
}
