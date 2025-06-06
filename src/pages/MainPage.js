import * as React from 'react';

import MainContent from '../components/MainPageContent';
import TemplatePage from '../components/shared/TemplateContent';

export default function MainPage() 
{
  return (
    <TemplatePage mode='dark'>
          <MainContent />
    </TemplatePage>
  );
}
