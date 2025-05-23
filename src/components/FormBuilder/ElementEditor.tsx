import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { FormElementType } from '@/types/form-builder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle, X, Database, List, Search, ShieldCheck } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ElementEditorProps {
  element: FormElementType | null;
  onElementUpdate: (element: FormElementType) => void;
  elements: FormElementType[]; // Added for conditional logic
  wizardMode?: boolean; // Add wizardMode as an optional prop
}

const ElementEditor = ({ element, onElementUpdate, elements, wizardMode = false }: ElementEditorProps) => {
  const [apiUrl, setApiUrl] = useState<string>(element?.properties?.apiUrl || '');
  const [apiValueField, setApiValueField] = useState<string>(element?.properties?.apiValueField || 'value');
  const [apiLabelField, setApiLabelField] = useState<string>(element?.properties?.apiLabelField || 'label');
  const [selectedParentOption, setSelectedParentOption] = useState<string>('');
  
  // Dropdown elements that could be parents (excluding the current element)
  const dropdownElements = elements.filter(
    elem => elem.type === 'dropdown' && elem.id !== element?.id
  );
  
  useEffect(() => {
    if (element?.properties?.parentDropdown) {
      const parent = elements.find(elem => elem.id === element.properties.parentDropdown);
      if (parent?.properties?.options && parent.properties.options.length > 0) {
        setSelectedParentOption(parent.properties.options[0]);
      }
    }
  }, [element?.properties?.parentDropdown, elements]);
  
  if (!element) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Select an element to edit its properties
      </div>
    );
  }

  const handlePropertyChange = <K extends keyof FormElementType>(
    key: K,
    value: FormElementType[K]
  ) => {
    onElementUpdate({ ...element, [key]: value });
  };

  const handleNestedPropertyChange = <K extends keyof FormElementType['properties']>(
    key: K,
    value: any
  ) => {
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        [key]: value,
      },
    });
  };

  const handleValidationChange = (key: keyof FormElementType['properties']['validation'], value: any) => {
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        validation: {
          ...element.properties.validation,
          [key]: value,
        },
      },
    });
  };

  const addOption = () => {
    const currentOptions = element.properties.options || [];
    handleNestedPropertyChange('options', [...currentOptions, `Option ${currentOptions.length + 1}`]);
  };

  const removeOption = (index: number) => {
    const currentOptions = [...(element.properties.options || [])];
    currentOptions.splice(index, 1);
    handleNestedPropertyChange('options', currentOptions);
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = [...(element.properties.options || [])];
    currentOptions[index] = value;
    handleNestedPropertyChange('options', currentOptions);
  };

  const handleApiIntegration = () => {
    // Save API settings to element properties
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        apiUrl,
        apiValueField,
        apiLabelField,
        useApiData: true
      },
    });
  };

  // Functions for handling dependent dropdown configuration
  const handleParentChange = (parentId: string) => {
    // Get the parent dropdown element
    const parent = elements.find(elem => elem.id === parentId);
    
    // Initialize the options map with empty arrays for each parent option
    const optionsMap: Record<string, string[]> = {};
    if (parent?.properties?.options) {
      parent.properties.options.forEach(option => {
        // Initialize with existing values or empty array
        optionsMap[option] = element.properties.optionsMap?.[option] || [];
      });
    }
    
    // Update the element with the new parent and options map
    onElementUpdate({
      ...element,
      properties: {
        ...element.properties,
        parentDropdown: parentId,
        optionsMap,
      },
    });
    
    // Select the first parent option
    if (parent?.properties?.options && parent.properties.options.length > 0) {
      setSelectedParentOption(parent.properties.options[0]);
    }
  };
  
  const addChildOption = (parentOption: string) => {
    const optionsMap = { ...(element.properties.optionsMap || {}) };
    const currentOptions = optionsMap[parentOption] || [];
    optionsMap[parentOption] = [...currentOptions, `Child ${currentOptions.length + 1}`];
    
    handleNestedPropertyChange('optionsMap', optionsMap);
  };
  
  const updateChildOption = (parentOption: string, index: number, value: string) => {
    const optionsMap = { ...(element.properties.optionsMap || {}) };
    const currentOptions = [...(optionsMap[parentOption] || [])];
    currentOptions[index] = value;
    optionsMap[parentOption] = currentOptions;
    
    handleNestedPropertyChange('optionsMap', optionsMap);
  };
  
  const removeChildOption = (parentOption: string, index: number) => {
    const optionsMap = { ...(element.properties.optionsMap || {}) };
    const currentOptions = [...(optionsMap[parentOption] || [])];
    currentOptions.splice(index, 1);
    optionsMap[parentOption] = currentOptions;
    
    handleNestedPropertyChange('optionsMap', optionsMap);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium">Element Properties</h3>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="conditional">Conditional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={element.label}
                onChange={(e) => handlePropertyChange('label', e.target.value)}
                placeholder="Enter label"
              />
            </div>
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'number' || 
              element.type === 'email' || element.type === 'password' || element.type === 'dropdown' || 
              element.type === 'fileupload' || element.type === 'dependentDropdown' || 
              element.type === 'searchLookup') && (
              <div>
                <Label htmlFor="placeholder">Placeholder</Label>
                <Input
                  id="placeholder"
                  value={element.properties.placeholder || ''}
                  onChange={(e) => handleNestedPropertyChange('placeholder', e.target.value)}
                  placeholder="Enter placeholder text"
                />
              </div>
            )}
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'number' ||
              element.type === 'email' || element.type === 'password' || element.type === 'dropdown' ||
              element.type === 'hidden' || element.type === 'slider' || element.type === 'dependentDropdown') && (
              <div>
                <Label htmlFor="defaultValue">Default Value</Label>
                <Input
                  id="defaultValue"
                  value={element.properties.defaultValue || ''}
                  onChange={(e) => handleNestedPropertyChange('defaultValue', e.target.value)}
                  placeholder="Enter default value"
                />
              </div>
            )}
            
            {(element.type === 'number' || element.type === 'slider') && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="min">Min</Label>
                  <Input
                    id="min"
                    type="number"
                    value={element.properties.min || 0}
                    onChange={(e) => handleNestedPropertyChange('min', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max">Max</Label>
                  <Input
                    id="max"
                    type="number"
                    value={element.properties.max || 100}
                    onChange={(e) => handleNestedPropertyChange('max', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="step">Step</Label>
                  <Input
                    id="step"
                    type="number"
                    value={element.properties.step || 1}
                    onChange={(e) => handleNestedPropertyChange('step', Number(e.target.value))}
                  />
                </div>
              </div>
            )}
            
            {element.type === 'rating' && (
              <>
                <div>
                  <Label htmlFor="rating-type">Rating Type</Label>
                  <RadioGroup 
                    defaultValue={element.properties.ratingType || 'star'}
                    onValueChange={(value) => handleNestedPropertyChange('ratingType', value)}
                    className="flex flex-col space-y-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="star" id="rating-star" />
                      <Label htmlFor="rating-star">Stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emoji" id="rating-emoji" />
                      <Label htmlFor="rating-emoji">Emojis</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="max-rating">Maximum Rating</Label>
                  <Input
                    id="max-rating"
                    type="number"
                    min={1}
                    max={10}
                    value={element.properties.maxRating || 5}
                    onChange={(e) => handleNestedPropertyChange('maxRating', Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Maximum number of stars or emojis (1-10)</p>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="description">Help Text</Label>
              <Textarea
                id="description"
                value={element.properties.helpText || ''}
                onChange={(e) => handleNestedPropertyChange('helpText', e.target.value)}
                placeholder="Help text displayed below the field"
                rows={2}
              />
            </div>
            
            {(element.type === 'dropdown' || element.type === 'checkbox' || element.type === 'radio') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addOption} 
                    className="flex items-center gap-1"
                  >
                    <PlusCircle size={14} />
                    Add Option
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {(element.properties.options || []).map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeOption(index)}
                        className="h-8 w-8"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                  {(element.properties.options || []).length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No options added yet. Click "Add Option" to create options.
                    </div>
                  )}
                </div>
                
                {element.type === 'dropdown' && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Database size={16} />
                        <h4 className="font-medium">API Data Integration</h4>
                      </div>
                      
                      <div>
                        <Label htmlFor="apiUrl">API URL</Label>
                        <Input
                          id="apiUrl"
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                          placeholder="https://api.example.com/data"
                        />
                        <p className="text-xs text-muted-foreground mt-1">URL to fetch dropdown options</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="valueField">Value Field</Label>
                          <Input
                            id="valueField"
                            value={apiValueField}
                            onChange={(e) => setApiValueField(e.target.value)}
                            placeholder="id"
                          />
                        </div>
                        <div>
                          <Label htmlFor="labelField">Label Field</Label>
                          <Input
                            id="labelField"
                            value={apiLabelField}
                            onChange={(e) => setApiLabelField(e.target.value)}
                            placeholder="name"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="button"
                        onClick={handleApiIntegration}
                        className="w-full"
                      >
                        Use API Data
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {element.type === 'dependentDropdown' && (
              <div className="space-y-4 border border-border rounded-md p-4">
                <div className="flex items-center gap-2">
                  <List size={16} />
                  <h4 className="font-medium">Dependent Dropdown Configuration</h4>
                </div>
                
                <div>
                  <Label htmlFor="parent-dropdown">Parent Dropdown</Label>
                  <Select 
                    value={element.properties.parentDropdown || ''} 
                    onValueChange={handleParentChange}
                  >
                    <SelectTrigger id="parent-dropdown">
                      <SelectValue placeholder="Select parent dropdown" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownElements.length === 0 ? (
                        <SelectItem value="none" disabled>No dropdown fields available</SelectItem>
                      ) : (
                        dropdownElements.map(dropdown => (
                          <SelectItem key={dropdown.id} value={dropdown.id}>
                            {dropdown.label}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select which dropdown's value will determine this dropdown's options
                  </p>
                </div>
                
                {element.properties.parentDropdown && (
                  <div className="space-y-2">
                    <Label>Configure Child Options</Label>
                    
                    <div className="border border-border rounded-md p-2">
                      <Label className="text-sm font-medium mb-2 block">
                        For each parent option, define the child options:
                      </Label>
                      
                      <Select 
                        value={selectedParentOption} 
                        onValueChange={setSelectedParentOption}
                        disabled={!element.properties.parentDropdown}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent option" />
                        </SelectTrigger>
                        <SelectContent>
                          {(elements.find(
                            elem => elem.id === element.properties.parentDropdown
                          )?.properties?.options || []).map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedParentOption && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Child options for "{selectedParentOption}"</Label>
                            <Button 
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addChildOption(selectedParentOption)}
                              className="flex items-center gap-1"
                            >
                              <PlusCircle size={14} />
                              Add Option
                            </Button>
                          </div>
                          
                          <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {((element.properties.optionsMap || {})[selectedParentOption] || []).map((option, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => updateChildOption(selectedParentOption, index, e.target.value)}
                                  placeholder={`Child option ${index + 1}`}
                                />
                                <Button 
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeChildOption(selectedParentOption, index)}
                                  className="h-8 w-8"
                                >
                                  <X size={14} />
                                </Button>
                              </div>
                            ))}
                            
                            {!(element.properties.optionsMap || {})[selectedParentOption]?.length && (
                              <div className="text-sm text-muted-foreground text-center py-2">
                                No child options added yet. Click "Add Option" to create options.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {element.type === 'button' && (
              <>
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={element.properties.buttonText || 'Submit'}
                    onChange={(e) => handleNestedPropertyChange('buttonText', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="buttonType">Button Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {/* Show all button types in normal mode, or include next/back in wizard mode */}
                    {(wizardMode 
                      ? ['submit', 'reset', 'next', 'back'] 
                      : ['submit', 'reset']
                    ).map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          id={`button-${type}`}
                          name="buttonType"
                          value={type}
                          checked={element.properties.buttonType === type}
                          onChange={() => handleNestedPropertyChange('buttonType', type)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor={`button-${type}`} className="text-sm capitalize">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="apiEndpoint">API Endpoint (Optional)</Label>
                  <Input
                    id="apiEndpoint"
                    value={element.properties.apiEndpoint || ''}
                    onChange={(e) => handleNestedPropertyChange('apiEndpoint', e.target.value)}
                    placeholder="https://api.example.com/submit"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Where form data will be submitted when this button is clicked
                  </p>
                </div>
              </>
            )}
            
            {element.type === 'fileupload' && (
              <div>
                <Label htmlFor="accepted-types">Accepted File Types</Label>
                <Input
                  id="accepted-types"
                  value={element.properties.acceptedTypes || ''}
                  onChange={(e) => handleNestedPropertyChange('acceptedTypes', e.target.value)}
                  placeholder="e.g. .jpg, .pdf, .doc"
                />
                <p className="text-xs text-muted-foreground mt-1">Comma separated list of file extensions</p>
              </div>
            )}
            
            {element.type === 'searchLookup' && (
              <div className="space-y-4 border border-border rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Search size={16} />
                  <h4 className="font-medium">Live Database Lookup Configuration</h4>
                </div>
                
                <div>
                  <Label htmlFor="searchEndpoint">API Endpoint</Label>
                  <Input
                    id="searchEndpoint"
                    value={element.properties.searchEndpoint || ''}
                    onChange={(e) => handleNestedPropertyChange('searchEndpoint', e.target.value)}
                    placeholder="https://api.example.com/search"
                  />
                  <p className="text-xs text-muted-foreground mt-1">URL to query as user types</p>
                </div>
                
                <div>
                  <Label htmlFor="searchKey">Search Parameter Name</Label>
                  <Input
                    id="searchKey"
                    value={element.properties.searchKey || 'query'}
                    onChange={(e) => handleNestedPropertyChange('searchKey', e.target.value)}
                    placeholder="query"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Parameter name for search term (e.g., "query", "search", "term")</p>
                </div>
                
                <div>
                  <Label htmlFor="searchResultsKey">Results Path</Label>
                  <Input
                    id="searchResultsKey"
                    value={element.properties.searchResultsKey || 'results'}
                    onChange={(e) => handleNestedPropertyChange('searchResultsKey', e.target.value)}
                    placeholder="results"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Path to results array in response (e.g., "data.results")</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="searchLabelKey">Label Field</Label>
                    <Input
                      id="searchLabelKey"
                      value={element.properties.searchLabelKey || 'name'}
                      onChange={(e) => handleNestedPropertyChange('searchLabelKey', e.target.value)}
                      placeholder="name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Field to show in dropdown</p>
                  </div>
                  <div>
                    <Label htmlFor="searchValueKey">Value Field</Label>
                    <Input
                      id="searchValueKey"
                      value={element.properties.searchValueKey || 'id'}
                      onChange={(e) => handleNestedPropertyChange('searchValueKey', e.target.value)}
                      placeholder="id"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Field for actual value</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minChars">Min. Characters</Label>
                    <Input
                      id="minChars"
                      type="number"
                      value={element.properties.minChars || 2}
                      onChange={(e) => handleNestedPropertyChange('minChars', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Start search after X chars</p>
                  </div>
                  <div>
                    <Label htmlFor="debounceMs">Debounce (ms)</Label>
                    <Input
                      id="debounceMs"
                      type="number"
                      value={element.properties.debounceMs || 300}
                      onChange={(e) => handleNestedPropertyChange('debounceMs', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Wait time between searches</p>
                  </div>
                </div>
              </div>
            )}
            
            {element.type === 'captcha' && (
              <div className="space-y-4 border border-border rounded-md p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <h4 className="font-medium">CAPTCHA Configuration</h4>
                </div>
                
                <div>
                  <Label htmlFor="captchaType">CAPTCHA Type</Label>
                  <RadioGroup 
                    defaultValue={element.properties.captchaType || 'recaptcha'}
                    onValueChange={(value) => handleNestedPropertyChange('captchaType', value)}
                    className="flex flex-col space-y-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recaptcha" id="captcha-recaptcha" />
                      <Label htmlFor="captcha-recaptcha">Google reCAPTCHA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="turnstile" id="captcha-turnstile" />
                      <Label htmlFor="captcha-turnstile">Cloudflare Turnstile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="captcha-custom" />
                      <Label htmlFor="captcha-custom">Custom CAPTCHA</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="siteKey">Site Key</Label>
                  <Input
                    id="siteKey"
                    value={element.properties.siteKey || ''}
                    onChange={(e) => handleNestedPropertyChange('siteKey', e.target.value)}
                    placeholder="Your site key from Google/Cloudflare"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Public key for CAPTCHA service</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="captchaTheme">Theme</Label>
                    <Select 
                      value={element.properties.captchaTheme || 'light'} 
                      onValueChange={(value) => handleNestedPropertyChange('captchaTheme', value)}
                    >
                      <SelectTrigger id="captchaTheme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="captchaSize">Size</Label>
                    <Select 
                      value={element.properties.captchaSize || 'normal'} 
                      onValueChange={(value) => handleNestedPropertyChange('captchaSize', value)}
                    >
                      <SelectTrigger id="captchaSize">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="validation" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={element.properties.validation?.required || false}
                onCheckedChange={(value) => handleValidationChange('required', Boolean(value))}
              />
              <Label htmlFor="required">Required Field</Label>
            </div>
            
            {(element.type === 'text' || element.type === 'textarea' || element.type === 'email' ||
              element.type === 'password') && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minLength">Min Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={element.properties.validation?.minLength || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        handleValidationChange('minLength', value);
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLength">Max Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      value={element.properties.validation?.maxLength || ''}
                      onChange={(e) => {
                        const value = e.target.value ? Number(e.target.value) : undefined;
                        handleValidationChange('maxLength', value);
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pattern">Pattern (Regex)</Label>
                  <Input
                    id="pattern"
                    value={element.properties.validation?.pattern || ''}
                    onChange={(e) => handleValidationChange('pattern', e.target.value)}
                    placeholder="e.g. ^[a-zA-Z0-9]+$"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Regular expression for validation</p>
                </div>
              </>
            )}
            
            {(element.type === 'number' || element.type === 'slider') && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="minValue">Min Value</Label>
                  <Input
                    id="minValue"
                    type="number"
                    value={element.properties.validation?.min || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      handleValidationChange('min', value);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="maxValue">Max Value</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    value={element.properties.validation?.max || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined;
                      handleValidationChange('max', value);
                    }}
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="conditional" className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="conditional"
                  checked={element.properties.conditional || false}
                  onCheckedChange={(value) => handleNestedPropertyChange('conditional', value)}
                />
                <Label htmlFor="conditional" className="text-sm">Enable conditional display</Label>
              </div>
              
              {element.properties.conditional && (
                <div className="mt-2 space-y-2 border border-input rounded-md p-3">
                  <div>
                    <Label htmlFor="dependsOn">Show this field when</Label>
                    <select 
                      id="dependsOn"
                      className="w-full mt-1 rounded-md border border-input p-2"
                      value={element.properties.conditionalLogic?.dependsOn || ''}
                      onChange={(e) => {
                        const dependsOn = e.target.value;
                        handleNestedPropertyChange('conditionalLogic', {
                          ...element.properties.conditionalLogic,
                          dependsOn
                        });
                      }}
                    >
                      <option value="">Select a field</option>
                      {elements
                        .filter(e => e.id !== element.id)
                        .map(e => (
                          <option key={e.id} value={e.id}>
                            {e.label || `Unnamed ${e.type}`}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                  
                  {element.properties.conditionalLogic?.dependsOn && (
                    <div>
                      <Label htmlFor="showWhen">Has value</Label>
                      <Input
                        id="showWhen"
                        value={element.properties.conditionalLogic?.showWhen || ''}
                        onChange={(e) => {
                          handleNestedPropertyChange('conditionalLogic', {
                            ...element.properties.conditionalLogic,
                            showWhen: e.target.value
                          });
                        }}
                        placeholder="Value that triggers display"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default ElementEditor;
