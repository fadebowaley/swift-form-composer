
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FormElementType } from '@/types/form-builder';

interface SelectionElementProps {
  element: FormElementType;
}

export const CheckboxGroup = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    {element.label && <Label>{element.label}</Label>}
    <div className="space-y-2">
      {element.properties.options && element.properties.options.map((option, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <Checkbox 
            id={`${element.id}-${idx}`} 
            disabled={element.properties.disabled}
          />
          <Label htmlFor={`${element.id}-${idx}`}>{option}</Label>
        </div>
      ))}
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const RadioButtonGroup = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    {element.label && <Label>{element.label}</Label>}
    <RadioGroup defaultValue={element.properties.defaultValue} disabled={element.properties.disabled}>
      {element.properties.options && element.properties.options.map((option, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`${element.id}-${idx}`} />
          <Label htmlFor={`${element.id}-${idx}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const DropdownSelect = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Select disabled={element.properties.disabled}>
      <SelectTrigger id={element.id}>
        <SelectValue placeholder={element.properties.placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {element.properties.options && element.properties.options.map((option, idx) => (
          <SelectItem key={idx} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const ApiDropdown = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Select disabled={element.properties.disabled}>
      <SelectTrigger id={element.id}>
        <SelectValue placeholder="Loading options..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="example1">Example Option 1</SelectItem>
        <SelectItem value="example2">Example Option 2</SelectItem>
      </SelectContent>
    </Select>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const DependentDropdown = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Select disabled={element.properties.disabled}>
      <SelectTrigger id={element.id}>
        <SelectValue placeholder="Select dependent option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="example1">Example Dependent Option 1</SelectItem>
        <SelectItem value="example2">Example Dependent Option 2</SelectItem>
      </SelectContent>
    </Select>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const ToggleSwitch = ({ element }: SelectionElementProps) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Switch id={element.id} disabled={element.properties.disabled} />
      <Label htmlFor={element.id}>
        {element.properties.defaultValue || element.label || 'Toggle'}
      </Label>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);
