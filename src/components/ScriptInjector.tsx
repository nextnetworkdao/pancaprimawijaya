import React, { useEffect } from 'react';

export function ScriptInjector() {
  useEffect(() => {
    let mounted = true;
    const injectedIds: string[] = [];

    const fetchAndInject = async () => {
      try {
        const res = await fetch('/api/scripts?active=true');
        if (!res.ok) {
          console.warn('Script fetch returned non-ok status:', res.status);
          return;
        }
        
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          console.warn('Script fetch returned non-JSON content-type:', contentType);
          return;
        }

        const text = await res.text();
        let scripts = [];
        try {
          scripts = text ? JSON.parse(text) : [];
        } catch (jsonErr) {
          console.error('Failed to parse injected scripts JSON:', jsonErr);
          return;
        }
        
        if (!mounted || !Array.isArray(scripts)) return;
        
        scripts.forEach((script: any) => {
          try {
            const wrapper = document.createElement('div');
            wrapper.id = `external-script-${script.id}`;
            injectedIds.push(wrapper.id);
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = script.code;
            
            Array.from(tempDiv.childNodes).forEach(node => {
              try {
                if (node.nodeName.toLowerCase() === 'script') {
                  const scriptEl = document.createElement('script');
                  Array.from((node as HTMLScriptElement).attributes).forEach(attr => {
                    scriptEl.setAttribute(attr.name, attr.value);
                  });
                  // Listen for script loading errors
                  scriptEl.onerror = (err) => {
                    console.error('Injected script resource error:', err);
                  };
                  scriptEl.text = node.textContent || '';
                  wrapper.appendChild(scriptEl);
                } else {
                  wrapper.appendChild(node.cloneNode(true));
                }
              } catch (nodeErr) {
                console.error('Error applying node to wrapper:', nodeErr);
              }
            });

            if (script.location === 'head') {
              document.head.appendChild(wrapper);
            } else if (script.location === 'body') {
              document.body.insertBefore(wrapper, document.body.firstChild);
            } else {
              document.body.appendChild(wrapper);
            }
          } catch (scriptLoopErr) {
            console.error('Error injecting script object:', scriptLoopErr);
          }
        });
      } catch (e) {
        console.error('Failed to load external scripts:', e);
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
