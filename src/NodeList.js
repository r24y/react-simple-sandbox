import React from 'react';
import withStateHandlers from 'recompose/withStateHandlers';
import Icon from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretDown,
} from '@fortawesome/fontawesome-free-solid';
import {css} from 'emotion';
import {ListItem} from './ui';

const spacer = css({ display: 'inline-block', width: '1.25em' });
const bold = css({ fontWeight: 'bold' });

const NodeList = withStateHandlers(
  ({ path, selected }) => ({
    isOpen: path && selected ? path.every((el, i) => el === selected.path[i]) : false,
  }),
  {
    onToggle: state => () => ({ isOpen: !state.isOpen }),
  }
)(function StatelessNodeList(props) {
  const { nodes, depth = 0, isOpen, onToggle, selected, onSelect } = props;
  const path = props.path || [];
  if (!nodes) return null;
  return (
    <React.Fragment>
      {depth === 0 ? null : (
        <ListItem indent={depth - 1} actionable onClick={onToggle}>
          <Icon icon={isOpen ? faCaretDown : faCaretRight} fixedWidth />{' '}
          <strong>{nodes.title}</strong>
        </ListItem>
      )}
      {depth === 0 || isOpen
        ? Object.keys(nodes.demos)
          .map(key => (
            <ListItem
              key={key}
              active={selected === nodes.demos[key]}
              actionable
              className={selected === nodes.demos[key] ? bold : null}
              indent={depth}
              onClick={() => onSelect(nodes.demos[key])}
            >
              <span className={spacer} /> {key}
            </ListItem>
          ))
          .concat(
          Object.keys(nodes.groups).map(key => (
            <NodeList
              key={key}
              nodes={nodes.groups[key]}
              depth={depth + 1}
              path={[...path, key]}
              {...{ selected, onSelect }}
            />
          ))
          )
        : null}
    </React.Fragment>
  );
});

export default NodeList;