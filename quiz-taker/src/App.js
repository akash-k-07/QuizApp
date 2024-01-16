import React from 'react';
import Header from './components/HeaderComponent'; // Update with the correct path
import AppRoutes from './routes/Routes'; // Update with the correct path


function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App