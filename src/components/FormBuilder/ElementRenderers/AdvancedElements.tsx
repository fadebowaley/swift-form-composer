
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Upload, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormElementType } from '@/types/form-builder';

interface AdvancedElementProps {
  element: FormElementType;
}

export const DatePickerElement = ({ element }: AdvancedElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <div className="flex w-full relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              disabled={element.properties.disabled}
            >
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
};

export const TimePickerElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <Button 
      variant="outline" 
      className="w-full justify-start text-left"
      disabled={element.properties.disabled}
    >
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
      <Button 
        variant="outline" 
        className="w-full"
        disabled={element.properties.disabled}
      >
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

export const SliderElement = ({ element }: AdvancedElementProps) => {
  const defaultValue = element.properties.defaultValue 
    ? [parseInt(element.properties.defaultValue)]
    : [50];
    
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <Slider 
        defaultValue={defaultValue} 
        max={element.properties.max || 100} 
        min={element.properties.min || 0}
        step={element.properties.step || 1}
        disabled={element.properties.disabled}
      />
      {element.properties.helpText && (
        <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
      )}
    </div>
  );
};

export const RatingElement = ({ element }: AdvancedElementProps) => {
  const [rating, setRating] = useState(parseInt(element.properties.defaultValue || '0'));
  const maxRating = element.properties.maxRating || 5;
  
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, i) => (
          <button 
            key={i}
            type="button" 
            className={`text-2xl focus:outline-none ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => !element.properties.disabled && setRating(i + 1)}
            disabled={element.properties.disabled}
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
};

export const SignatureElement = ({ element }: AdvancedElementProps) => {
  const [signed, setSigned] = useState(false);
  
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <div 
        className={`border ${signed ? 'border-primary' : 'border-gray-200'} rounded-md flex flex-col items-center justify-center bg-white`}
        style={{ height: `${element.properties.signatureHeight || 150}px` }}
        onClick={() => !element.properties.disabled && setSigned(true)}
      >
        {signed ? (
          <div className="italic text-primary text-xl">John Doe</div>
        ) : (
          <div className="text-sm text-muted-foreground italic">Click to sign here</div>
        )}
      </div>
      {element.properties.signatureClearable && signed && (
        <Button 
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setSigned(false)}
          disabled={element.properties.disabled}
        >
          Clear signature
        </Button>
      )}
      {element.properties.helpText && (
        <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
      )}
    </div>
  );
};

export const LocationPickerElement = ({ element }: AdvancedElementProps) => (
  <div className="space-y-2">
    {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
    <div className="border border-gray-200 rounded-md h-48 flex flex-col items-center justify-center bg-muted/20">
      <MapPin size={24} className="text-muted-foreground mb-2" />
      <div className="text-sm text-muted-foreground mb-2">Map location picker</div>
      <Button 
        variant="outline" 
        size="sm"
        disabled={element.properties.disabled}
      >
        {element.properties.autoDetectLocation ? 'Detect my location' : 'Select location'}
      </Button>
    </div>
    {element.properties.helpText && (
      <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
    )}
  </div>
);
