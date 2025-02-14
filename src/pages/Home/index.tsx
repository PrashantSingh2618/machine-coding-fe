import Cards from './Cards';

export default function Home() {
  const links = [
    { label: 'File Explorer', link: '/file-explorer' },
    { label: 'Matrix Coloring', link: '/matrix-coloring' },
  ];

  return (
    <main className="bg-gray-200 h-screen">
      <section className="m-48">
        <div className="grid grid-cols-4 gap-x-8 ">
          {links.map((link) => (
            <div key={link.link} className="">
              <Cards label={link.label} link={link.link} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
