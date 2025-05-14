
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormElementType } from '@/types/form-builder';
import { Search } from 'lucide-react';

interface SpecialElementProps {
  element: FormElementType;
}

export const SearchLookupElement = ({ element }: SpecialElementProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = () => {
    if (searchValue) {
      setShowResults(true);
    }
  };
  
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input 
            type="search" 
            placeholder={element.properties.placeholder || "Search database..."} 
            id={element.id}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={element.properties.disabled}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleSearch}
            size="icon"
            disabled={element.properties.disabled}
          >
            <Search size={18} />
          </Button>
        </div>
        
        {showResults && searchValue && (
          <div className="border rounded-md p-2 bg-muted/10 text-sm">
            <div className="font-medium mb-1">Search results for "{searchValue}":</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Result item 1</li>
              <li>Result item 2</li>
              <li>Result item 3</li>
            </ul>
          </div>
        )}
      </div>
      {element.properties.helpText && (
        <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
      )}
    </div>
  );
};

export const CaptchaElement = ({ element }: SpecialElementProps) => {
  const [verified, setVerified] = useState(false);
  
  return (
    <div className="space-y-2">
      {element.label && <Label htmlFor={element.id}>{element.label}</Label>}
      <div className="space-y-4">
        {!verified ? (
          <div className="border border-gray-200 rounded-md p-4 bg-muted/20 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Verify you're not a robot</div>
              <div className="text-xs text-muted-foreground">{element.properties.captchaType || 'reCAPTCHA'}</div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Input 
                type="checkbox" 
                className="w-5 h-5"
                disabled={element.properties.disabled}
                onChange={() => !element.properties.disabled && setVerified(true)}
              />
              <span className="text-sm">I'm not a robot</span>
            </div>
          </div>
        ) : (
          <div className="border border-green-200 rounded-md p-4 bg-green-50 text-green-600 flex items-center justify-between">
            <span>Verification successful</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setVerified(false)}
              disabled={element.properties.disabled}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      {element.properties.helpText && (
        <div className="text-xs text-muted-foreground">{element.properties.helpText}</div>
      )}
    </div>
  );
};
