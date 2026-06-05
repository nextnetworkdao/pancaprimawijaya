import React, { useEffect } from 'react';

export function ScriptInjector() {
  useEffect(() => {
    let mounted = true;
    const injectedIds: string[] = [];

    const fetchAndInject = async () => {
      try {
        const res = await fetch('/api/scripts?active=true');
        const scripts = await res.json();
        
        if (!mounted || !Array.isArray(scripts)) return;
        
        scripts.forEach((script: any) => {
          const wrapper = document.createElement('div');
          wrapper.id = `external-script-${script.id}`;
          injectedIds.push(wrapper.id);
          
          // We use DocumentFragment or append directly. 
          // Since it might contain actual <script> tags which innerHTML doesn't execute, 
          // we need to parse and recreate script tags.
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = script.code;
          
          Array.from(tempDiv.childNodes).forEach(node => {
            if (node.nodeName.toLowerCase() === 'script') {
              const scriptEl = document.createElement('script');
              Array.from((node as HTMLScriptElement).attributes).forEach(attr => {
                scriptEl.setAttribute(attr.name, attr.value);
              });
              scriptEl.text = node.textContent || '';
              wrapper.appendChild(scriptEl);
            } else {
              wrapper.appendChild(node.cloneNode(true));
            }
          });

          if (script.location === 'head') {
            document.head.appendChild(wrapper);
          } else if (script.location === 'body') {
            document.body.insertBefore(wrapper, document.body.firstChild);
          } else {
            document.body.appendChild(wrapper);
          }
        });
      } catch (e) {
        console.error('Failed to load external scripts', e);
      }
    };

    fetchAndInject();

    return () => {
      mounted = false;
      // Cleanup injected scripts on unmount to prevent duplicates
      injectedIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return null;
}
