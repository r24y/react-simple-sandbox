import React from 'react';
import compose from 'recompose/compose';
import Demo from './Demo';
import NodeList from './NodeList';
import Isolated from './Isolated';
import {List, container, display} from './ui';
import Group from './Group';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {qs, reindexDemos} from './util';

export class PlainDemoContext extends React.Component {
  state = {
    registeredDemos: [],
    activeDemo: null,
  };

  componentWillMount() {
    this.ingest()(this.props.children, 0);
  }

  ingest = (ctx = {path: [], groups: []}) => (element, i) => {
    if (!element) return;
    if (Array.isArray(element)) {
      element.forEach(this.ingest(ctx));
      return;
    }

    switch (element.type) {
      case Group: {
        const nextCtx = {
          ...ctx,
          path: [...ctx.path, element.props.name],
          groups: [...ctx.groups, element.props],
        };
        React.Children.forEach(element.props.children, this.ingest(nextCtx));
        break;
      }
      case Demo:
        this.registerDemo({
          ...element.props,
          path: [...ctx.path, element.props.name],
          groups: ctx.groups,
        });
        break;
      default:
        break;
    }
  };

  registerDemo = demoProps => {
    const query = qs(this.props.location.search || '');
    const demoName = query.demoName ? query.demoName.split('/') : [];

    const isMatch =
      demoName && demoProps.path.every((pathEl, i) => pathEl === demoName[i]);

    this.setState(state => {
      let activeDemo = state.activeDemo;
      if (!state.activeDemo && isMatch) {
        activeDemo = demoProps;
      }

      return reindexDemos({
        activeDemo,
        registeredDemos: [...state.registeredDemos, demoProps],
      });
    });
  };

  unregisterDemo = demoProps => {
    this.setState(state =>
      reindexDemos({
        registeredDemos: state.registeredDemos.filter(regDemo => {
          if (regDemo.path.length !== demoProps.path.length) return true;
          for (let i = 0; i < regDemo.path.length; i++) {
            if (regDemo.path[i] !== demoProps.path[i]) return true;
          }
          return false;
        }),
      })
    );
  };

  handleDemoSelect = demo => {
    this.setState(state => {
      return {
        activeDemo: demo,
      };
    });
    this.props.history.push({search: `?demoName=${demo.path.join('/')}`});
  };

  getDemoProp() {
    const {registerDemo, unregisterDemo} = this;
    return {
      ...this.state,
      registerDemo,
      unregisterDemo,
    };
  }

  wrap() {
    if (!this.state.activeDemo) return x => x;
    const {groups} = this.state.activeDemo;
    return compose(
      ...groups
        .map(group => group.wrapper)
        .filter(fn => typeof fn === 'function')
        .map((origFn) => (el) => origFn({children: el}))
    );
  }

  render() {
    let demoContent = null;

    if (
      this.state.activeDemo &&
      typeof this.state.activeDemo.children === 'function'
    ) {
      demoContent = this.wrap()(this.state.activeDemo.children());
    }

    return (
      <div className={container}>
        <List flush scrollable>
          <NodeList
            nodes={this.state.nodes}
            selected={this.state.activeDemo}
            onSelect={this.handleDemoSelect}
          />
        </List>
        <Isolated className={display}>{demoContent}</Isolated>
      </div>
    );
  }
}

export {Demo, Group};

export default function DemoContext(props) {
  return (
    <Router>
      <Route render={(routerProps) => <PlainDemoContext {...routerProps} {...props} />} />
    </Router>
  );
}
