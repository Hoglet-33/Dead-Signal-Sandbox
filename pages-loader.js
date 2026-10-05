// Static hosting: reconstruct and decompress the engine/content without special server headers.
(() => {
 const nativeFetch=window.fetch.bind(window);
 const files={"index.wasm": {"parts": ["index.wasm.226253b149c3.00.gzpart"], "size": 35376909, "type": "application/wasm"}, "index.pck": {"parts": ["index.pck.4527e2fb80a5.00.gzpart", "index.pck.4527e2fb80a5.01.gzpart"], "size": 31673792, "type": "application/octet-stream"}};
 window.fetch=async(input,options)=>{
  const url=new URL(input instanceof Request?input.url:input,document.baseURI);
  const key=Object.keys(files).find(k=>url.href.split('?')[0]===new URL(k,document.baseURI).href);
  if(!key)return nativeFetch(input,options);
  if(!('DecompressionStream' in window))throw new Error('Please update your browser to play Dead Signal.');
  const spec=files[key];
  let index=0;
  const stream=new ReadableStream({
   async pull(controller){
    try{
     if(index>=spec.parts.length){controller.close();return;}
     const part=new URL(spec.parts[index++],document.baseURI);
     const response=await nativeFetch(part,{...options,cache:'no-cache'});
     if(!response.ok)throw new Error('Game download failed: '+response.status+' '+part.pathname);
     controller.enqueue(new Uint8Array(await response.arrayBuffer()));
    }catch(error){controller.error(error);}
   }
  });
  return new Response(stream.pipeThrough(new DecompressionStream('gzip')),{
   headers:{'Content-Type':spec.type,'Content-Length':String(spec.size)}
  });
 };
})();
