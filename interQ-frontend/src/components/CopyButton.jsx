import React, { useState, useEffect } from 'react';
import { RxClipboardCopy } from "react-icons/rx";

const CopyButton = ({ lastMessage }) => {
  const [buttonLabel, setButtonLabel] = useState('Copy');

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(lastMessage.text);
      setButtonLabel('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    let timeout;
    if (buttonLabel === 'Copied!') {
      timeout = setTimeout(() => setButtonLabel('Copy'), 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [buttonLabel]);

  return (
    <button className='toolbox-btn' onClick={copyText}>
      <RxClipboardCopy /><span className='copy-btn-text'>{buttonLabel}</span>
    </button>
  );
};

export default CopyButton;