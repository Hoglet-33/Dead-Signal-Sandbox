// GitHub Pages serves .gz as a static file; decompress only the engine response.
(() => {
  const nativeFetch = window.fetch.bind(window);
  const wasm = new URL('index.wasm', document.baseURI);
  window.fetch = async (input, options) => {
    const requested = new URL(input instanceof Request ? input.url : input, document.baseURI);
    if (requested.origin !== wasm.origin || requested.pathname !== wasm.pathname) {
      return nativeFetch(input, options);
    }
    if (!('DecompressionStream' in window)) {
      throw new Error('Please use a current Firefox, Chrome, Edge, or Safari browser.');
    }
    const compressed = new URL('index.wasm.gz', document.baseURI);
    compressed.search = requested.search;
    const response = await nativeFetch(compressed, options);
    if (!response.ok) throw new Error('Engine download failed: HTTP ' + response.status);
    const body = response.body.pipeThrough(new DecompressionStream('gzip'));
    return new Response(body, {
      status: 200,
      headers: { 'Content-Type': 'application/wasm', 'Content-Length': '35376909' }
    });
  };
})();
