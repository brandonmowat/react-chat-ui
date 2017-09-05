import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const styles = {
  chatInput: {
    flex: 1,
  },
  inputStyle: {
    border: 'none',
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    borderTopColor: '#ddd',
    fontSize: '16',
    outline: 'none',
    padding: '30',
    width: '100%',
  },
};

export default class ChatInput extends PureComponent {
  render() {
    const { inputStyles, inputPlaceholder } = this.props;
    return (
      <div className="chat-input" style={styles.chatInput}>
        <input
          type="text"
          style={inputStyles || styles.inputStyle}
          placeholder={inputPlaceholder}
        />
      </div>
    );
  }
}

ChatInput.propTypes = {
  inputStyles: PropTypes.object,
  inputPlaceholder: PropTypes.string,
};

ChatInput.defaultProps = {
  inputStyles: {},
  inputPlaceholder: 'Start typing...',
};
