
import React from 'react';
import { FormElementType } from '@/types/form-builder';
import { 
  FormDivider, 
  FormSpacer, 
  FormContainer 
} from '../FormLayoutComponents';

interface LayoutElementProps {
  element: FormElementType;
}

export const HeaderElement = ({ element }: LayoutElementProps) => {
  const size = element.properties.headerSize || 'h2';
  const text = element.properties.headerText || element.properties.defaultValue || 'Header';
  const alignment = element.properties.headerAlignment || 'left';
  
  return (
    <>
      {size === 'h1' && <h1 className={`text-2xl font-bold text-${alignment}`}>{text}</h1>}
      {size === 'h2' && <h2 className={`text-xl font-bold text-${alignment}`}>{text}</h2>}
      {size === 'h3' && <h3 className={`text-lg font-bold text-${alignment}`}>{text}</h3>}
      {size === 'h4' && <h4 className={`text-base font-bold text-${alignment}`}>{text}</h4>}
      {size === 'h5' && <h5 className={`text-sm font-bold text-${alignment}`}>{text}</h5>}
    </>
  );
};

export const ParagraphElement = ({ element }: LayoutElementProps) => {
  const text = element.properties.paragraphText || element.properties.defaultValue || 'Paragraph text';
  const alignment = element.properties.paragraphAlignment || 'left';
  
  return (
    <p className={`text-muted-foreground text-${alignment}`}>{text}</p>
  );
};

export const DividerElement = ({ element }: LayoutElementProps) => {
  const orientation = element.properties.dividerOrientation || 'horizontal';
  const thickness = element.properties.dividerThickness || 'thin';
  
  return (
    <FormDivider orientation={orientation} thickness={thickness} />
  );
};

export const SpacerElement = ({ element }: LayoutElementProps) => {
  const size = element.properties.size || 'medium';
  
  return (
    <FormSpacer size={size} />
  );
};

export const ContainerElement = ({ element }: LayoutElementProps) => {
  const variant = element.properties.containerVariant || 'default';
  const padding = element.properties.containerPadding || 'medium';
  
  return (
    <FormContainer variant={variant} padding={padding}>
      <div className="text-center text-sm text-muted-foreground">Container Content</div>
    </FormContainer>
  );
};
