import { useParam } from "@/components/contexts/param-context";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export const PriceFilter = () => {
  const { param, setParam } = useParam();

  const { per_hour, tflops_hour, tb_upload, tb_download } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };

  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 items-stretch">
          <span className="text-lg font-semibold capitalize text-white">
            Price
          </span>
          <Separator className="bg-[#3c4152]" />
        </div>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="flex justify-between text-white">
            <span className="text-base font-semibold">$/Hour</span>
            <span className="text-base font-bold">{`${per_hour}`}</span>
          </div>
          <Slider
            defaultValue={[per_hour]}
            max={128}
            min={0}
            step={0.01}
            className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
            onValueChange={(value) => updateParam("per_hour", value[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">$TFLOPS/Hour</span>
          <span className="text-base font-bold">{`${tflops_hour}`}</span>
        </div>
        <Slider
          defaultValue={[tflops_hour]}
          max={100}
          step={0.01}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("tflops_hour", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">$TB(Upload)</span>
          <span className="text-base font-bold">{`${tb_upload}`}</span>
        </div>
        <Slider
          defaultValue={[tb_upload]}
          max={100}
          step={0.01}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("tb_upload", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">Max Instance Duration</span>
          <span className="text-base font-bold">{`${tb_download}`}</span>
        </div>
        <Slider
          defaultValue={[tb_download]}
          max={100}
          step={0.01}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("tb_download", value[0])}
        />
      </div>
    </div>
  );
};
