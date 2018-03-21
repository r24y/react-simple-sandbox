import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'emotion';
import DemoContext, {Group, Demo} from './DemoContext';

injectGlobal({
  'html, body, #root': {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    margin: 0,
  },
},
  `@import url('https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/simplex/bootstrap.min.css');`
)

const App = () => (
  <DemoContext>
    <Group name="Unstyled">
      <Demo name="Button">
        {() => (<button>Click me</button>)}
      </Demo>
    </Group>
    {
      [{
        name: 'Regular Bootstrap',
        style: 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/simplex/bootstrap.min.css',
      }, {
        name: 'Sketchy Bootstrap',
        style: 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/sketchy/bootstrap.min.css',
      }].map(({name, style}) => (
        <Group name={name} wrapper={({ children }) => (
          <div className="container" style={{padding: '1rem'}}>
            <style>
              {`@import url('${style}');`}
            </style>
            {children}
          </div>
        )}>
          <Group name="Buttons">
            <Demo name="Individual">
              {() => (<div>
                <button type="button" className="btn btn-primary">Primary</button>
                <button type="button" className="btn btn-secondary">Secondary</button>
                <button type="button" className="btn btn-success">Success</button>
                <button type="button" className="btn btn-danger">Danger</button>
                <button type="button" className="btn btn-warning">Warning</button>
                <button type="button" className="btn btn-info">Info</button>
                <button type="button" className="btn btn-light">Light</button>
                <button type="button" className="btn btn-dark">Dark</button>

                <button type="button" className="btn btn-link">Link</button>
              </div>)}
            </Demo>
            <Demo name="Grouped">
              {() => (
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary">Left</button>
                  <button type="button" className="btn btn-secondary">Middle</button>
                  <button type="button" className="btn btn-secondary">Right</button>
                </div>
              )}
            </Demo>
          </Group>
          <Demo name="Alerts">
            {() => (
              <div>
                <div className="alert alert-primary" role="alert">
                  This is a primary alert—check it out!
                </div>
                <div className="alert alert-secondary" role="alert">
                  This is a secondary alert—check it out!
                </div>
                <div className="alert alert-success" role="alert">
                  This is a success alert—check it out!
                </div>
                <div className="alert alert-danger" role="alert">
                  This is a danger alert—check it out!
                </div>
                <div className="alert alert-warning" role="alert">
                  This is a warning alert—check it out!
                </div>
                <div className="alert alert-info" role="alert">
                  This is a info alert—check it out!
                </div>
                <div className="alert alert-light" role="alert">
                  This is a light alert—check it out!
                </div>
                <div className="alert alert-dark" role="alert">
                  This is a dark alert—check it out!
                </div>
              </div>
            )}
          </Demo>
        </Group>
      ))
    }
  </DemoContext>
);

render(<App />, document.getElementById('root'));
