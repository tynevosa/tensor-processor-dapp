import { useModel } from "@/components/contexts/model-context";
import { Input } from "@/components/ui/input";

type Props = {
  title: string;
  description: string;
  defaultValue: number;
  type: string;
  property: string;
};
export const InputNumber: React.FC<Props> = ({
  title,
  description,
  defaultValue,
  type,
  property,
}) => {
  const { input, setInput } = useModel();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [property]: e.target.value });
  };
  return (
    <div className="flex flex-col w-full items-stretch gap-3" key={"key"}>
      <span className="text-lg text-white">
        {title}
        <span className="italic text-[#51586C]">&nbsp;{type}</span>
      </span>
      <Input
        type="number"
        className="!ring-0 !ring-offset-0 !outline-none"
        value={input[property]}
        placeholder={defaultValue.toString()}
        onChange={changeHandler}
      />
      <span className="text-gray-400 text-lg">{description}</span>
    </div>
  );
};
