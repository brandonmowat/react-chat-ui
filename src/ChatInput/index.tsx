import React, { PureComponent } from 'react';

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

interface ChatInputProps {
  inputStyles: object;
  inputPlaceholder: string;
}

const ChatInput = (props: ChatInputProps) => {
  const { inputStyles, inputPlaceholder } = props;
  return (
    <div className="chat-input" style={styles.chatInput}>
      <input type="text" style={inputStyles || styles.inputStyle} placeholder={inputPlaceholder} />
    </div>
  );
};

export default ChatInput;
