import { ModelCard } from "@/components/marketplace/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
  return (
    <ScrollArea className="w-full h-full pr-5">
      <div className="flex flex-col gap-6 items-stretch py-8">
        <span className="text-3xl text-white font-bold">
          List of Tensor Processors
        </span>
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
        <ModelCard />
      </div>
    </ScrollArea>
  );
}
