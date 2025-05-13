
import React from 'react';

export const textPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input" />
);

export const textareaPreview = () => (
  <div className="w-full h-20 bg-muted/50 rounded border border-input" />
);

export const numberPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input" />
);

export const emailPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input" />
);

export const passwordPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input" />
);

export const checkboxPreview = () => (
  <div className="space-y-1">
    {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
      <div key={i} className="flex items-center space-x-2">
        <div className="w-4 h-4 border border-input rounded" />
        <div className="text-sm">{option}</div>
      </div>
    ))}
  </div>
);

export const radioPreview = () => (
  <div className="space-y-1">
    {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
      <div key={i} className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full border border-input" />
        <div className="text-sm">{option}</div>
      </div>
    ))}
  </div>
);

export const dropdownPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Select an option</div>
  </div>
);

export const datePickerPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Pick a date</div>
  </div>
);

export const timePickerPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Select time</div>
  </div>
);

export const fileUploadPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Choose file</div>
  </div>
);

export const togglePreview = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-4 rounded-full bg-muted/70 flex items-center">
      <div className="w-3 h-3 rounded-full bg-background ml-0.5"></div>
    </div>
    <div className="text-sm">Toggle option</div>
  </div>
);

export const sliderPreview = () => (
  <div className="w-full pt-3">
    <div className="h-1 w-full bg-muted/70 rounded-full">
      <div className="h-1 w-1/2 bg-primary rounded-full"></div>
      <div className="h-3 w-3 rounded-full bg-primary relative -top-1" style={{ marginLeft: '50%' }}></div>
    </div>
  </div>
);

export const hiddenPreview = () => (
  <div className="p-2 border border-dashed border-muted-foreground/50 rounded bg-muted/20">
    <div className="text-sm text-muted-foreground">Hidden field (not visible in form)</div>
  </div>
);

export const buttonPreview = () => (
  <div className="bg-primary text-primary-foreground py-1 px-4 rounded text-center w-24">
    Submit
  </div>
);

export const apiDropdownPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">API Dropdown</div>
  </div>
);

export const ratingPreview = () => (
  <div className="flex">
    {Array(5).fill(0).map((_, i) => (
      <div key={i} className="text-yellow-400 text-sm">★</div>
    ))}
  </div>
);

export const dependentDropdownPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Dependent Dropdown</div>
  </div>
);

export const searchLookupPreview = () => (
  <div className="w-full h-8 bg-muted/50 rounded border border-input flex items-center px-2">
    <div className="text-sm text-muted-foreground">Live Database Lookup</div>
  </div>
);

export const captchaPreview = () => (
  <div className="p-2 border border-dashed border-muted-foreground/50 rounded bg-muted/20">
    <div className="text-sm text-muted-foreground">CAPTCHA Protection</div>
  </div>
);

export const signaturePreview = () => (
  <div className="w-full h-20 bg-muted/30 rounded border border-input flex items-center justify-center">
    <div className="text-sm text-muted-foreground italic">Signature Pad</div>
  </div>
);

export const locationPickerPreview = () => (
  <div className="w-full h-32 bg-muted/30 rounded border border-input flex items-center justify-center">
    <div className="text-sm text-muted-foreground">Map Location Picker</div>
  </div>
);

export const headerPreview = () => (
  <div className="w-full py-1 font-bold text-lg">Section Header</div>
);

export const paragraphPreview = () => (
  <div className="w-full text-sm text-muted-foreground">Description text paragraph</div>
);

export const dividerPreview = () => (
  <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2" />
);

export const spacerPreview = () => (
  <div className="w-full h-4" />
);

export const containerPreview = () => (
  <div className="w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-muted/20">
    <div className="text-sm text-center text-muted-foreground">Container</div>
  </div>
);
