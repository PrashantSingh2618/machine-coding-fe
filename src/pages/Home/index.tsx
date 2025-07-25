import Cards from './Cards';

export default function Home() {
  const links = [
    { label: 'File Explorer', link: '/file-explorer' },
    { label: 'Matrix Coloring', link: '/matrix-coloring' },
    { label: 'Todo List', link: '/todoList' },
  ];

  return (
    <main className="bg-gray-200 h-screen">
      <h1 className=" mt-16 text-3xl font-bold text-gray-800 text-center mb-8">
        FrontEnd Practise Problems
      </h1>
      <section className="md:m-48 m-8">
        <div className="md:grid md:grid-cols-4 gap-x-8 ">
          {links.map((link) => (
            <div key={link.link} className="mb-8">
              <Cards label={link.label} link={link.link} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
