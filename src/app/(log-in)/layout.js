import Toggle from "@/components/Toggle";

const layout = ({ children }) => {
  return (
    <>
      <div className=" flex flex-col min-h-screen !gap-4 justify-center items-center p-24">
        {children}
      </div>
      <Toggle className="absolute top-1/2 -translate-y-1/2 right-2" />
    </>
  );
};

export default layout;
