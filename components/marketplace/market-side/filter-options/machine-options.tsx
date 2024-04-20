import { useParam } from "@/components/contexts/param-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const MachineOptions = () => {
  const { param, setParam } = useParam();

  const {
    visibleUnverified,
    showIncompatible,
    secureCloud,
    unavailable,
    staticIpAddress,
  } = param;

  const machineOptions = [
    {
      label: "Unverified Machines",
      id: "visibleUnverified",
      checked: visibleUnverified,
    },
    {
      label: "Secure Cloud (Only Trusted Datacenters)",
      id: "secureCloud",
      checked: secureCloud,
    },
    {
      label: "Incompatible Machines",
      id: "showIncompatible",
      checked: showIncompatible,
    },
    {
      label: "Unavailable Offers",
      id: "unavailable",
      checked: unavailable,
    },
    {
      label: "Static IP Address",
      id: "staticIpAddress",
      checked: staticIpAddress,
    },
  ];

  const updateParam = (key: string, value: any) => {
    setParam({ ...param, [key]: value });
  };
  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="flex flex-col gap-3 items-stretch">
        <span className="text-lg font-semibold capitalize text-white">
          Machine Options
        </span>
        <Separator className="bg-[#3c4152]" />
      </div>
      <div className="flex flex-col gap-4 items-stretch">
        {machineOptions.map((item, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked: boolean) =>
                updateParam(item.id, checked)
              }
            />
            <label
              htmlFor="unverified"
              className="text-base font-semibold text-white"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
