
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FormElementType } from '@/types/form-builder';

interface BasicElementProps {
  element: FormElementType;
}

export const TextInput = ({ element }: BasicElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Input 
      id={element.id}
      type="text"
      placeholder={element.properties.placeholder || ''}
      defaultValue={element.properties.defaultValue || ''}
      disabled={element.properties.disabled}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const TextareaInput = ({ element }: BasicElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Textarea 
      id={element.id}
      placeholder={element.properties.placeholder || ''}
      defaultValue={element.properties.defaultValue || ''}
      disabled={element.properties.disabled}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const NumberInput = ({ element }: BasicElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Input 
      id={element.id}
      type="number"
      min={element.properties.min}
      max={element.properties.max}
      step={element.properties.step}
      placeholder={element.properties.placeholder || ''}
      defaultValue={element.properties.defaultValue || ''}
      disabled={element.properties.disabled}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const EmailInput = ({ element }: BasicElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Input 
      id={element.id}
      type="email"
      placeholder={element.properties.placeholder || ''}
      defaultValue={element.properties.defaultValue || ''}
      disabled={element.properties.disabled}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const PasswordInput = ({ element }: BasicElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Input 
      id={element.id}
      type="password"
      placeholder={element.properties.placeholder || ''}
      disabled={element.properties.disabled}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const HiddenInput = ({ element }: BasicElementProps) => (
  <Input 
    id={element.id}
    type="hidden"
    defaultValue={element.properties.defaultValue || ''}
  />
);
