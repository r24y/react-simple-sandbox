import React from 'react';
import {createPortal} from 'react-dom';

export default class Isolated extends React.Component {
  state = {ref: null};

  handleRef = ref => {
    if (ref) {
      this.setState({
        ref: ref.contentDocument.body,
      });
    } else {
      this.setState({ref: null});
    }
  };

  render() {
    const {children, ref: ignore, ...rest} = this.props;
    const {ref} = this.state;
    return (
      <React.Fragment>
        <iframe {...rest} ref={this.handleRef} />
        {ref ? createPortal(this.props.children, this.state.ref) : null}
      </React.Fragment>
    );
  }
}
