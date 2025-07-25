import { useNavigate } from 'react-router-dom';
import translations from '../../translations';
import TodoProvider from './todoContext';
import TodoListMain from './components/TodoList';

export default function TodoList() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <main className="py-4 bg-gray-200">
      <section className="p-8">
        <div className="flex flex-row  w-full">
          <div
            onClick={handleBack}
            className="flex cursor-pointer hover:text-blue-500"
          >
            <span>&larr;</span>
          </div>
          <div className="text-center w-full text-[30px] ">Todo List</div>
        </div>
      </section>

      <section className="p-4">
        <div className="font-bold underline">
          {translations.problemStatement}{' '}
        </div>
        <div className="font-bold underline">
          {' '}
          Implement a todoList with following features{' '}
        </div>

        {translations.todoListProblemStatement2.map((el, index) => (
          <div key={index} className="">
            {' '}
            {`>`} {el}{' '}
          </div>
        ))}
      </section>

      <section className="p-8">Demo</section>

      <section className="bg-gray-200">
        <TodoProvider>
          <TodoListMain />
        </TodoProvider>
      </section>

      <section className="px-8">
        <a
          href="https://github.com/PrashantSingh2618/machine-coding-fe/tree/master/src/pages/TodoList"
          target="_blank"
          className="underline cursor-pointer hover:text-blue-400"
          rel="noreferrer"
        >
          {translations.referCode}
        </a>
      </section>
    </main>
  );
}
