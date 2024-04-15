import { useParam } from "@/components/contexts/param-context";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export const MachineFilter = () => {
  const { param, setParam } = useParam();

  const { cpu_core, cpu_ram, cpu_ghz } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };
  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 items-stretch">
          <span className="text-lg font-semibold capitalize text-white">
            Machine Resources
          </span>
          <Separator className="bg-[#3c4152]" />
        </div>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="flex justify-between text-white">
            <span className="text-base font-semibold">CPU Cores</span>
            <span className="text-base font-bold">{`${cpu_core} %`}</span>
          </div>
          <Slider
            defaultValue={[cpu_core]}
            max={100}
            min={11.31}
            step={0.01}
            className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
            onValueChange={(value) => updateParam("cpu_core", value[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">CPU RAM</span>
          <span className="text-base font-bold">{`${cpu_ram} days`}</span>
        </div>
        <Slider
          defaultValue={[cpu_ram]}
          max={100}
          step={1}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("cpu_ram", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">CPU GHZ</span>
          <span className="text-base font-bold">{`${cpu_ghz} days`}</span>
        </div>
        <Slider
          defaultValue={[cpu_ghz]}
          max={100}
          step={1}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("cpu_ghz", value[0])}
        />
      </div>
    </div>
  );
};
