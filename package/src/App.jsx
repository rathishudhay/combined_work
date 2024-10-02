import React from 'react'
import { AnalyticsContextProvider, useAnalyticsContext } from './context/AnalyticsContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Console from './Components/Console';

const TestAnalytics = () => {
  const { handleEventTrigger } = useAnalyticsContext();
  return (
    <div>
      <button onClick={() => handleEventTrigger("E1")}>E1</button>
      <button onClick={() => handleEventTrigger("E2")}>E2</button>
      <button onClick={() => handleEventTrigger("E3")}>E3</button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <AnalyticsContextProvider analyticsURL="http://localhost:3001/analytics/dazzling-liger-dfbacf">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/console" element={<Console />} />
          </Routes>
        </BrowserRouter>
      </AnalyticsContextProvider>
    </div>
  )
}

export default App