import React from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";

interface MyCoolCodeBlockProps {
  code: string;
  language: string;
}

const CodeBlockComponent: React.FC<MyCoolCodeBlockProps> = ({
  code,
  language,
}) => {
  return (
    <CodeBlock
      text={code}
      language={language}
      showLineNumbers={false}
      theme={atomOneDark}
    />
  );
};

export default CodeBlockComponent;
