import React from 'react';
import ReactDOM from 'react-dom';

const modal = typeof document !== 'undefined' && document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = typeof document !== 'undefined' && document.createElement('div');
  }
  componentDidMount() {
    modal.appendChild(this.el);
  }
  componentWillUnmount() {
    modal.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
