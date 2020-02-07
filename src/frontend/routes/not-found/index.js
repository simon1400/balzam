import React from 'react';
import Page from '../../components/page';

export default () =>
  <Page id="not-found" title="Not Found" description="This is embarrassing." noCrawl >
    <section className="uk-container uk-margin-large-top uk-margin-large-bottom">
      <h1 className="accent_head">404: To co hledáte neexistuje a nebo se jedná o chybu.</h1>
      <p>Rači přijďte na kafe.</p>
    </section>
  </Page>
