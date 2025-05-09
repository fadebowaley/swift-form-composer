
import React from 'react';
import { 
  FileText, 
  Square, 
  Radio, 
  ListCheck, 
  Calendar, 
  Upload, 
  Plus
} from 'lucide-react';
import { ElementType } from '@/types/form-builder';

interface FormFieldIconProps {
  type: ElementType;
  size?: number;
}

export const FormFieldIcon = ({ type, size = 18 }: FormFieldIconProps) => {
  switch (type) {
    case 'text':
      return <FileText size={size} />;
    case 'textarea':
      return <FileText size={size} />;
    case 'checkbox':
      return <Square size={size} />;
    case 'radio':
      return <Radio size={size} />;
    case 'dropdown':
      return <ListCheck size={size} />;
    case 'datepicker':
      return <Calendar size={size} />;
    case 'fileupload':
      return <Upload size={size} />;
    case 'button':
      return <Plus size={size} />;
    default:
      return <FileText size={size} />;
  }
};
