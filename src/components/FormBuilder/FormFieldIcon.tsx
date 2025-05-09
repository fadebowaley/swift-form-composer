
import React from 'react';
import { 
  FileText, 
  Square, 
  Radio, 
  ListCheck, 
  Calendar, 
  Upload, 
  Plus,
  Hash,
  Mail,
  Lock,
  ToggleLeft,
  Sliders,
  Clock,
  Eye
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
    case 'number':
      return <Hash size={size} />;
    case 'email':
      return <Mail size={size} />;
    case 'password':
      return <Lock size={size} />;
    case 'checkbox':
      return <Square size={size} />;
    case 'radio':
      return <Radio size={size} />;
    case 'dropdown':
      return <ListCheck size={size} />;
    case 'datepicker':
      return <Calendar size={size} />;
    case 'timepicker':
      return <Clock size={size} />;
    case 'fileupload':
      return <Upload size={size} />;
    case 'toggle':
      return <ToggleLeft size={size} />;
    case 'slider':
      return <Sliders size={size} />;
    case 'hidden':
      return <Eye size={size} />;
    case 'button':
      return <Plus size={size} />;
    default:
      return <FileText size={size} />;
  }
};
