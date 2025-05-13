
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  className?: string;
}

export const FormDivider = ({ 
  orientation = 'horizontal', 
  thickness = 'thin',
  className 
}: DividerProps) => {
  const thicknessClass = {
    'thin': 'border-[1px]',
    'medium': 'border-[2px]',
    'thick': 'border-[4px]'
  }[thickness];

  return (
    <div 
      className={cn(
        "w-full my-4",
        orientation === 'vertical' && "h-full mx-4 my-0",
        thicknessClass,
        orientation === 'horizontal' ? "border-t" : "border-l",
        "border-gray-200 dark:border-gray-700",
        className
      )}
    />
  );
};

interface SpacerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const FormSpacer = ({ size = 'medium', className }: SpacerProps) => {
  const sizeClass = {
    'small': 'h-2',
    'medium': 'h-4',
    'large': 'h-8'
  }[size];

  return <div className={cn(sizeClass, "w-full", className)} />;
};

interface ContainerProps {
  children: ReactNode;
  variant?: 'default' | 'card' | 'outlined' | 'shaded';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
}

export const FormContainer = ({ 
  children, 
  variant = 'default',
  padding = 'medium',
  className 
}: ContainerProps) => {
  const variantClass = {
    'default': '',
    'card': 'bg-white dark:bg-neutral-800 shadow-sm rounded-lg',
    'outlined': 'border border-gray-200 dark:border-gray-700 rounded-lg',
    'shaded': 'bg-gray-50 dark:bg-neutral-900 rounded-lg'
  }[variant];

  const paddingClass = {
    'small': 'p-2',
    'medium': 'p-4',
    'large': 'p-6'
  }[padding];

  return (
    <div className={cn(variantClass, paddingClass, className)}>
      {children}
    </div>
  );
};

interface ColumnLayoutProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export const FormColumnLayout = ({
  children,
  columns = 2,
  gap = 'medium',
  className
}: ColumnLayoutProps) => {
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }[columns];

  const gapClass = {
    'small': 'gap-2',
    'medium': 'gap-4',
    'large': 'gap-6'
  }[gap];

  return (
    <div className={cn("grid", columnsClass, gapClass, className)}>
      {children}
    </div>
  );
};
