import { useModel } from "@/components/contexts/model-context";
import { Switch } from "@/components/ui/switch";

type Props = {
  title: string;
  description: string;
  defaultValue: boolean;
  property: string;
};

export const SwitchComponent: React.FC<Props> = ({
  title,
  description,
  defaultValue,
  property,
}) => {
  const { input, setInput } = useModel();
  const changeHandler = (checked: boolean) => {
    setInput({ ...input, [property]: checked });
  };
  return (
    <div className="flex flex-col w-full items-stretch gap-3">
      <div className="flex flex-row justify-between">
        <span className="text-lg text-white font-semibold dark:text-gray-300">
          {title}
        </span>
        <Switch
          name={title}
          checked={input[property]}
          onCheckedChange={changeHandler}
        />
      </div>
      <span className="text-gray-400 text-lg">{description}</span>
    </div>
  );
};
