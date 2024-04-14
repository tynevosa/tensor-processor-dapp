import { useModel } from "@/components/contexts/model-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  title: string;
  description: string;
  defaultValue: string;
  options: string[];
  property: string;
};

export const SelectComponent: React.FC<Props> = ({
  title,
  description,
  defaultValue,
  options,
  property,
}) => {
  const { input, setInput } = useModel();
  const changeHandler = (value: string) => {
    setInput({ ...input, [property]: value });
  };

  return (
    <div className="flex flex-col w-full items-stretch gap-3">
      <span className="text-lg text-white">
        {title}
        <span className="italic text-[#51586C]">&nbsp;string</span>
      </span>
      <Select defaultValue={defaultValue} onValueChange={changeHandler}>
        <SelectTrigger className="bg-[#121218] border border-[#242835] h-[54px] py-3 px-4 rounded-sm text-white font-semibold text-base flex justify-between items-center focus:!ring-0 focus-visible:!ring-0 outline-none !ring-offset-0">
          <SelectValue className="w-full">
            <span className="w-full flex">{input[property] ?? options[0]}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#121218] border border-[#242835] focus:!ring-0 focus-visible:!ring-0 outline-none">
          <SelectGroup className="w-full">
            {options.map((option, index) => (
              <SelectItem
                value={option}
                key={index}
                className="py-2 px-3 rounded-sm text-white font-semibold text-base"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-gray-400 text-lg">{description}</span>
    </div>
  );
};
