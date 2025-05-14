
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormElementType } from '@/types/form-builder';

interface AdvancedElementProps {
  element: FormElementType;
}

export const DatePickerElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="flex w-full relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{element.properties.defaultValue || 'Pick a date'}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 bg-background border rounded-md shadow-md">
            <div className="text-center p-2">Calendar (date picker UI)</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const TimePickerElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Button variant="outline" className="w-full justify-start text-left">
      <Clock className="mr-2 h-4 w-4" />
      <span>{element.properties.defaultValue || 'Select time'}</span>
    </Button>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const FileUploadElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="w-full">
        <Upload className="mr-2 h-4 w-4" />
        <span>Choose file</span>
      </Button>
      <div className="text-xs text-muted-foreground">
        {element.properties.acceptedTypes ? 
          `Accepted formats: ${element.properties.acceptedTypes}` : 
          'All files accepted'}
      </div>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const SliderElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Slider 
      defaultValue={[parseInt(element.properties.defaultValue || '50')]} 
      max={element.properties.max || 100} 
      min={element.properties.min || 0}
      step={element.properties.step || 1}
    />
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const RatingElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="flex items-center">
      {Array.from({ length: element.properties.maxRating || 5 }).map((_, i) => (
        <button 
          key={i}
          type="button" 
          className="text-yellow-400 text-lg focus:outline-none"
        >
          ★
        </button>
      ))}
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const SignatureElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div 
      className="border border-gray-200 rounded-md h-32 flex items-center justify-center bg-white"
      style={{ height: `${element.properties.signatureHeight || 150}px` }}
    >
      <div className="text-sm text-muted-foreground italic">Sign here</div>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);

export const LocationPickerElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="border border-gray-200 rounded-md h-48 flex items-center justify-center bg-muted/20">
      <div className="text-sm text-muted-foreground">Map location picker would appear here</div>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);
