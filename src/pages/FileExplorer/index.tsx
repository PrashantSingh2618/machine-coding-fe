/* eslint-disable */

import { useState } from 'react';
import mockData from './mockData.json';
import { FileSystemNode } from './types';
import { useNavigate } from 'react-router-dom';
import translations from '../../translations';

interface Props {
  node: FileSystemNode;
}
const FolderComponent = ({ node }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="pl-4">
      <div
        className="flex items-center cursor-pointer hover:text-blue-500"
        onClick={toggleOpen}
      >
        {node.type === 'folder' ? (
          <span className="mr-2">{isOpen ? '📂' : '📁'}</span>
        ) : (
          <span className="mr-2">📄</span>
        )}
        {node.name}
      </div>
      {isOpen && node.children && (
        <div className="pl-4">
          {node.children.map((child) => (
            <FolderComponent key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FileExplorer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <main className="px-24 bg-gray-200 h-screen">
      <section>
        <div className="flex flex-row py-16 w-full">
          <div
            onClick={handleClick}
            className="flex cursor-pointer hover:text-blue-500"
          >
            <span>&larr;</span> <div className="ml-2">Back</div>{' '}
          </div>
          <div className="text-center w-full text-[30px]">
            File Explorer Implementation
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="font-bold text-xl mb-4">{translations.problemStatement}</div>
        <div className="font-semibold">{translations.fileExplorer}</div>
        {translations.fileExplorer2.map((el) => (
          <div className="ml-4">
            {`>`} {el}{' '}
          </div>
        ))}
      </section>

      <section className="bg-blue-200 rounded-2xl p-4 mb-8">
        <div className=" mb-8 font-semibold">Implementation Demo</div>
        <FolderComponent node={mockData} />
      </section>


      <section className="">
        <a
          href="https://github.com/PrashantSingh2618/"
          target="_blank"
          className="underline cursor-pointer hover:text-blue-400"
        >
          {translations.referCode}
        </a>
      </section>
    </main>
  );
}
