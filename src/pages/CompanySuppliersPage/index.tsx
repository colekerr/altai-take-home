import React from 'react';

import CompanySearch from '../../components/CompanySearch';
import NetworkGraph from '../../components/NetworkGraph';

import css from './index.module.css';

function App() {
  return (
    <main className={css.layoutWrapper}>
      <section className={css.leftPane}>
        <CompanySearch />
      </section>
      <aside className={css.rightPane}>
        <NetworkGraph />
      </aside>
    </main>
  );
}

export default App;
