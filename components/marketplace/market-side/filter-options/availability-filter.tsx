import { useParam } from "@/components/contexts/param-context";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export const AvailabilityFilter = () => {
  const { param, setParam } = useParam();

  const { duration, reliability } = param;

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };
  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 items-stretch">
          <span className="text-lg font-semibold capitalize text-white">
            Availability
          </span>
          <Separator className="bg-[#3c4152]" />
        </div>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="flex justify-between text-white">
            <span className="text-base font-semibold">Host Reliability</span>
            <span className="text-base font-bold">{`${reliability} %`}</span>
          </div>
          <Slider
            defaultValue={[reliability]}
            max={100}
            min={11.31}
            step={0.01}
            className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
            onValueChange={(value) => updateParam("reliability", value[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        <div className="flex justify-between text-white">
          <span className="text-base font-semibold">Max Instance Duration</span>
          <span className="text-base font-bold">{`${duration} days`}</span>
        </div>
        <Slider
          defaultValue={[duration]}
          max={100}
          step={1}
          className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
          onValueChange={(value) => updateParam("duration", value[0])}
        />
      </div>
    </div>
  );
};
