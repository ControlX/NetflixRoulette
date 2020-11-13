import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from './App';
import configureStore from './modules/configureStore';
import routes from './routes';

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          ${process.env.NODE_ENV === 'development' ? '' : '<link href="/css/main.css" rel="stylesheet" type="text/css">'}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configureStore();
    const promises = routes.reduce((acc, route) => {
      if (matchPath(req.url, route) && route.component && route.component.initialAction) {
        acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
      }
      return acc;
    }, []);
    Promise.all(promises).then(() => {
      // This context object contains the results of the render
      const context = {};

      const renderRoot = () => (
        <App
          context={context}
          location={req.url}
          Router={StaticRouter}
          store={store}
        />
      );

      renderToString(renderRoot());

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
        return;
      }

      const htmlString = renderToString(renderRoot());
      const preloadedState = store.getState();

      res.send(renderHTML(htmlString, preloadedState));
    }).catch(e => console.error(e));
  };
}
