const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex-col flex items-center justify-center p-6">
      <main className="border font-secondary text-sm border-accent-green flex items-center gap-7 flex-col p-7 md:min-w-[26rem] lg:min-w-[26rem]">
        {children}
      </main>
    </div>
  );
};

export default layout;
