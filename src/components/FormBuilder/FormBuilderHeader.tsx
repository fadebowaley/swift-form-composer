
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, Trash2, Upload, Eye, Settings, Code } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FormBuilderHeaderProps {
  wizardMode: boolean;
  onWizardModeToggle: (enabled: boolean) => void;
  onSaveForm: () => void;
  onClearForm: () => void;
  onExportForm: (format: 'json' | 'html') => void;
  activeTab: 'preview' | 'json' | 'properties';
  onTabChange: (value: 'preview' | 'json' | 'properties') => void;
}

const FormBuilderHeader = ({
  wizardMode,
  onWizardModeToggle,
  onSaveForm,
  onClearForm,
  onExportForm,
  activeTab,
  onTabChange
}: FormBuilderHeaderProps) => {
  return (
    <header className="border-b px-6 py-3 flex items-center justify-center">
      <TooltipProvider>
        <div className="flex items-center gap-3">
          {/* Wizard mode toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Switch 
                  id="wizard-mode"
                  checked={wizardMode}
                  onCheckedChange={onWizardModeToggle}
                  className="mr-1"
                />
                <LayoutGrid size={18} className="text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Wizard Mode</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Tab controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTab === 'properties' ? 'default' : 'ghost'}
                size="icon" 
                onClick={() => onTabChange('properties')}
                className="hover:scale-110 transition-transform"
              >
                <Settings size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Properties</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTab === 'preview' ? 'default' : 'ghost'}
                size="icon" 
                onClick={() => onTabChange('preview')}
                className="hover:scale-110 transition-transform"
              >
                <Eye size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={activeTab === 'json' ? 'default' : 'ghost'}
                size="icon" 
                onClick={() => onTabChange('json')}
                className="hover:scale-110 transition-transform"
              >
                <Code size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>JSON</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Action buttons */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onSaveForm} className="hover:scale-110 transition-transform">
                <Home size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onClearForm} className="hover:scale-110 transition-transform">
                <Trash2 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Form</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onExportForm('json')}
                className="hover:scale-110 transition-transform"
              >
                <Upload size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Form</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </header>
  );
};

export default FormBuilderHeader;
