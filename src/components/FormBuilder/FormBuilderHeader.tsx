
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, Trash2, Upload, Eye, Settings, Code } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

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
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <TooltipProvider>
        <div className="flex items-center gap-4">
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
          
          <ThemeToggle />
        </div>
      </TooltipProvider>
      
      {/* Center tabs */}
      <div className="flex items-center space-x-2">
        <TooltipProvider>
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
        </TooltipProvider>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
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
        </TooltipProvider>
      </div>
    </header>
  );
};

export default FormBuilderHeader;
