
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormElementType } from '@/types/form-builder';

interface SpecialElementProps {
  element: FormElementType;
}

export const SearchLookupElement = ({ element }: SpecialElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div>
      <Input 
        type="search" 
        placeholder="Search database..." 
        id={element.id}
      />
      <div className="text-xs text-muted-foreground mt-1">
        Type to search from database
      </div>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const CaptchaElement = ({ element }: SpecialElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="border border-gray-200 rounded-md p-4 bg-muted/20 flex items-center justify-center">
      <div className="text-sm text-muted-foreground">CAPTCHA verification would appear here</div>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);
