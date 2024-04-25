import { useModel } from "@/components/contexts/model-context";
import { Slider } from "@/components/ui/slider";

type Props = {
  title: string;
  description: string;
  maximum: number;
  minimum: number;
  defaultValue: number;
  property: string;
};
export const SliderComponent: React.FC<Props> = ({
  title,
  description,
  maximum,
  minimum,
  defaultValue,
  property,
}) => {
  const { input, setInput } = useModel();
  const changeHandler = (value: number[]) => {
    setInput({ ...input, [property]: value[0] });
  };
  return (
    <div className="flex flex-col w-full items-stretch gap-3">
      <div className="flex flex-col justify-between lg:flex-row">
        <span className="text-lg text-white">
          {title}
          <span className="italic text-[#51586C]">&nbsp;integer</span>
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="w-10/12">
          <Slider
            defaultValue={[defaultValue]}
            max={maximum}
            min={minimum}
            step={1}
            className="h-3 bg-[#97AEF3] rounded-lg slider-track:h-full"
            onValueChange={changeHandler}
          />
        </div>
        <span className="text-white w-2/12 py-2 px-2 border border-[#242835] bg-[#121218] text-center rounded">
          {description}
        </span>
      </div>
    </div>
  );
};
