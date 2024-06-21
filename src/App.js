import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
      <div>
        <h1>Welcome to My Steam App</h1>
        <nav>
          <ul>
            <li><Link to="/steam-services">Steam Services</Link></li>
          </ul>
        </nav>
      </div>
  );
};

export default App;
