'use client';

import { useEffect } from 'react';
import './calculator.css';

declare global {
  interface Window {
    selectCalculator?: (name: string) => void;
    toggleDropdown?: () => void;
  }
}

const CALCULATOR_OPTIONS = [
  'Brainrot Calculator',
  'Cash Forecast',
  'Fuse Machine',
  'Growth Calculator',
  'Plant Calculator',
];

export function CalculatorClient() {
  useEffect(() => {
    const initInterval = window.setInterval(() => {
      if (typeof window.selectCalculator === 'function') {
        window.selectCalculator('Plant Calculator');
        window.clearInterval(initInterval);
      }
    }, 120);

    return () => {
      window.clearInterval(initInterval);
    };
  }, []);

  const handleSelect = (name: string) => () => {
    window.selectCalculator?.(name);
  };

  return (
    <div className="pvb-calculator-page" data-calculator-root>
      <main className="main-content container mx-auto space-y-8 px-4 py-10">
        <div className="site-logo">
          <section className="hero">
            <h1>Plants vs Brainrots Calculator</h1>
          </section>
        </div>

        <section className="calculator-section">
          <div className="calculator-header">
            <div className="calculator-dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                onClick={() => window.toggleDropdown?.()}
              >
                <span id="selectedCalculator">Plant Calculator</span>
                <span>▼</span>
              </button>
              <div className="dropdown-menu" id="calculatorDropdown">
                {CALCULATOR_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="dropdown-item"
                    onClick={handleSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calculator-placeholder">
            <h3>Calculator Loading Area</h3>
            <p>
              Your selected calculator will appear here. Choose a calculator type from
              the dropdown above.
            </p>
          </div>
        </section>
      </main>


    </div>
  );
}

export default CalculatorClient;
