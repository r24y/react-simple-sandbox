import PropTypes from 'prop-types';

export const DemoPropTypes = {
  demo: PropTypes.object.isRequired,
};

const emptyPathNode = (title = 'Demos') => ({title, groups: {}, demos: {}});

export function reindexDemos(state) {
  const nextState = {...state};
  const paths = emptyPathNode();
  state.registeredDemos.forEach(demoProps => {
    let parent = paths;
    demoProps.path.forEach((pathEl, i, list) => {
      if (i === list.length - 1) {
        parent.demos[pathEl] = demoProps;
        return;
      }

      if (!parent.groups[pathEl]) {
        parent.groups[pathEl] = emptyPathNode(pathEl);
      }

      parent = parent.groups[pathEl];
    });
  });
  nextState.nodes = paths;
  return nextState;
}

export function qs(search) {
  if (!search) return {};
  try {
    return JSON.parse(
      '{"' +
        decodeURI(search.slice(1))
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (err) {
    return {};
  }
}
