import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useGetQuery = routeLoader$(({ query }) => {
  return {
    query: query.get('query') ?? 'NONE',
    hash: query.get('hash') ?? 'NONE',
  };
});
export default component$(() => {
  const signal = useSignal({});
  const data = useGetQuery();

  useVisibleTask$(() => {
    const url = new URL(window.location.href);
    signal.value = {
      query: url.searchParams.get('query') ?? 'NONE',
      hash: url.hash,
    };
  });

  return (
    <div>
      <h1>Query</h1>
      <p id="loader">LOADER: {JSON.stringify(data.value)}</p>
      <p id="browser">BROWSER: {JSON.stringify(signal.value)}</p>
    </div>
  );
});
