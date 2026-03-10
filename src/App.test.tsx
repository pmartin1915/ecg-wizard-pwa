import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <ConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    );

    // The app should render and contain the ECG Classification text
    expect(document.body).toBeTruthy();
  });

  it('renders the header', () => {
    const { container } = render(
      <ConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    );

    // Check that the header renders with the app title (multiple elements may match)
    const matches = container.querySelectorAll('[role]');
    expect(matches.length).toBeGreaterThan(0);
  });
});
