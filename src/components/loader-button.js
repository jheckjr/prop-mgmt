import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './loader-button.css';

export default function LoaderButton({
  className = '',
  disabled = false,
  isLoading,
  loadingText,
  text,
  ...props
}) {
  return (
    <Button
      className={`loader-button ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {!isLoading ? text : loadingText}
    </Button>
  );
}
