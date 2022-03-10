import React from 'react';

import css from './App.module.css';
import NetworkGraph from './components/NetworkGraph';

function App() {
  return (
    <main className={css.layoutWrapper}>
      <section className={css.contentWrapper}>
        <NetworkGraph />
      </section>
    </main>
  );
}

export default App;
