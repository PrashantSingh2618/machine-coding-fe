/* eslint-disable */
import { useEffect, useState } from 'react';
import translations from '../../translations';
import Grid from './Grid';
import { useNavigate } from 'react-router-dom';

function MatrixColoring() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="py-4 bg-gray-200 h-screen">
      <section className="p-8">
        <div className="flex flex-row  w-full">
          <div
            onClick={handleBack}
            className="flex cursor-pointer hover:text-blue-500"
          >
            <span>&larr;</span> <div className="ml-2">Back</div>{' '}
          </div>
          <div className="text-center w-full text-[30px] ">
            {translations.matrixColoring}
          </div>
        </div>
      </section>

      <section className="p-8">
        <div></div>
        <div className="font-bold">{translations.problemStatement} </div>
        <div className="font-bold">{translations.matrixProblemStatement} </div>

        {translations.matrixProblemStatement2.map((el) => (
          <div className="ml-4">
            {' '}
            {`>`} {el}{' '}
          </div>
        ))}
      </section>
      <section className="mx-auto w-full p-4 grid place-items-center">
        <Grid />
      </section>

      <section className="p-8 w-1/6">
        <a
          href="https://github.com/PrashantSingh2618/machine-coding-fe/blob/master/src/pages/MatrixColoring/Grid.tsx"
          target="_blank"
          className="underline cursor-pointer hover:text-blue-400"
        >
          {translations.referCode}
        </a>
      </section>
    </main>
  );
}

export default MatrixColoring;
