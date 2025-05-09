
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormPreviewProps {
  elements: FormElementType[];
  onSave?: () => void;
}

const FormPreview = ({ elements, onSave }: FormPreviewProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [date, setDate] = React.useState<Date>();

  const handleInputChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    if (onSave) onSave();
  };

  const renderField = (element: FormElementType) => {
    const { id, type, label, properties } = element;
    const { required, helpText, placeholder, defaultValue, options, buttonText, buttonType } = properties;

    switch (type) {
      case 'text':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'textarea':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={id}
              placeholder={placeholder}
              defaultValue={defaultValue}
              required={required}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={id} 
                required={required}
                defaultChecked={defaultValue === 'true'}
                onCheckedChange={(checked) => handleInputChange(id, checked)}
              />
              <Label htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
              </Label>
            </div>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div key={id} className="space-y-2">
            <Label>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <RadioGroup
              defaultValue={defaultValue}
              onValueChange={(value) => handleInputChange(id, value)}
            >
              {options && options.map((option, i) => (
                <div key={`${id}-option-${i}`} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${id}-option-${i}`} />
                  <Label htmlFor={`${id}-option-${i}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'dropdown':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Select defaultValue={defaultValue} onValueChange={(value) => handleInputChange(id, value)}>
              <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder || 'Select option'} />
              </SelectTrigger>
              <SelectContent>
                {options && options.map((option, i) => (
                  <SelectItem key={`${id}-option-${i}`} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'datepicker':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : placeholder || "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    handleInputChange(id, newDate);
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'fileupload':
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={id}
              type="file"
              required={required}
              className="cursor-pointer"
              accept={properties.acceptedTypes}
              onChange={(e) => handleInputChange(id, e.target.files?.[0])}
            />
            {helpText && <p className="text-sm text-muted-foreground">{helpText}</p>}
          </div>
        );
      
      case 'button':
        return (
          <div key={id} className="space-y-2">
            <Button type={buttonType === 'reset' ? 'reset' : 'submit'}>
              {buttonText || 'Submit'}
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const hasSubmitButton = elements.some(e => e.type === 'button' && e.properties.buttonType === 'submit');

  return (
    <div className="p-4 border rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {elements.map(renderField)}
          
          {!hasSubmitButton && elements.length > 0 && (
            <Button type="submit" className="mt-4">Submit Form</Button>
          )}

          {elements.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Your form preview will appear here
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
