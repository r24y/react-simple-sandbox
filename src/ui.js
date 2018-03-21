import React from 'react';
import {css, cx} from 'emotion';

export const container = css({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr',
});

export const display = css({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  border: 'none',
});

export const actionableStyle = css({cursor: 'pointer'});

const scrollableStyle = css({overflowY: 'auto'});

export function List({as = 'div', flush, className, scrollable, ...props}) {
  return React.createElement(as, {
    className: cx(
      className,
      'list-group',
      flush ? 'list-group-flush' : '',
      scrollable ? scrollableStyle : null
    ),
    ...props,
  });
}

export function ListItem({
  as = 'div',
  className,
  indent,
  active,
  actionable,
  ...props
}) {
  return React.createElement(as, {
    className: cx(
      className,
      'list-group-item',
      active ? 'active' : '',
      actionable ? `list-group-item-action ${actionableStyle}` : ''
    ),
    style: indent ? {paddingLeft: `${(indent + 1) * 2}ch`} : null,
    ...props,
  });
}
