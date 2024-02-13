import { Card } from "@/components/ui/card";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden flex-col flex items-center justify-center p-2">
      <Card className="w-full flex items-center flex-col py-3 md:w-[28rem]">
        {children}
      </Card>
    </div>
  );
};

export default layout;
