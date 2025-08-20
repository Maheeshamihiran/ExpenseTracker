import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './AppWrapper.tsx'
import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>,
  );
}
