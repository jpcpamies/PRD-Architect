
import React from 'react';

// Assuming ReactMarkdown and remarkGfm are loaded from a CDN in index.html
// The UMD module places the component on the .default property of the window object.
const ReactMarkdown = (window as any).ReactMarkdown?.default;
const remarkGfm = (window as any).remarkGfm;

interface PrdPreviewProps {
  content: string;
}

const PrdPreview: React.FC<PrdPreviewProps> = ({ content }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">PRD Preview</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
          <article className="prose prose-invert prose-sm md:prose-base max-w-none p-6">
             {ReactMarkdown && remarkGfm ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
             ) : (
                <pre className="whitespace-pre-wrap">{content}</pre>
             )}
          </article>
      </div>
    </div>
  );
};

export default PrdPreview;