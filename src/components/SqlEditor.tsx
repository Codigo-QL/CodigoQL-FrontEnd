import React from 'react';
import Editor from 'react-simple-code-editor';
import hljs, { ensureSqlLanguageIsRegistered } from '../services/highlight';
import 'highlight.js/styles/github-dark.css';

interface SqlEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
}

const SqlEditorComponent = ({ code, onCodeChange }: SqlEditorProps) => {
  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => {
        ensureSqlLanguageIsRegistered();
        return hljs.highlight(code, { language: 'sql' }).value;
      }}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
        minHeight: '100%',
        width: '100%'
      }}
      className="hljs"
    />
  );
};

export const SqlEditor = React.memo(SqlEditorComponent);
