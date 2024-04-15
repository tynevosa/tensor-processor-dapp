import { useParam } from "@/components/contexts/param-context";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export const GpuFilter = () => {
  const { param, setParam } = useParam();

  const { gpu_count, tflops, per_gpu_ram } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };
  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 items-stretch">
          <span className="text-lg font-semibold capitalize text-white">
            GPU Resources
          </span>
          <Separator className="bg-[#3c4152]" />
        </div>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="flex justify-between text-white">
            <span className="text-base font-semibold">Gpu Count</span>
            <span className="text-base font-bold">{`${gpu_count} %`}</span>
          </div>
          <Slider
            defaultValue={[gpu_count]}
            max={100}
            min={11.31}
            step={0.01}
            className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
            onValueChange={(value) => updateParam("gpu_count", value[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">TFLOPs</span>
          <span className="text-base font-bold">{`${tflops} days`}</span>
        </div>
        <Slider
          defaultValue={[tflops]}
          max={100}
          step={1}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("tflops", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">Per GPU RAM</span>
          <span className="text-base font-bold">{`${per_gpu_ram} days`}</span>
        </div>
        <Slider
          defaultValue={[per_gpu_ram]}
          max={100}
          step={1}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("per_gpu_ram", value[0])}
        />
      </div>
    </div>
  );
};
