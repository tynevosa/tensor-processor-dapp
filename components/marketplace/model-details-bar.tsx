import Image from "next/image";
import { Button } from "../ui/button";
import { GPUInfoType } from "@/types/type";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ModelDetailsProps {
  modelDetail: GPUInfoType;
}

export const ModelDetialsBar: React.FC<ModelDetailsProps> = ({
  modelDetail,
}) => {
  const normalizeCapacity = (
    capacity: number,
    fixed: number = 2,
    visibleUnit: boolean = true
  ) => {
    if (capacity > 1024)
      return `${(capacity / 1024).toFixed(fixed)}${visibleUnit ? "GB" : ""}`;
    else return `${capacity}${visibleUnit ? "GB" : ""}`;
  };

  const ratio = modelDetail.cpu_cores_effective / modelDetail.cpu_cores;
  return (
    <>
      <div className="flex flex-col px-8">
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <Image
              src="/images/marketplace/machine.png"
              alt="machine"
              width={343}
              height={201}
            />
            <div
              className="absolute top-0 h-[201px] w-[343px] z-10"
              style={{
                backgroundImage: "url(/images/marketplace/bg.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="z-20 absolute bottom-0">
              <span className="font-bold text-3xl text-white">{`${modelDetail.num_gpus}x ${modelDetail.gpu_name}`}</span>
              <div className="flex flex-row justify-between mt-4">
                <span className="font-bold text-[#97AEF3] text-sm mr-5">{`host: ${modelDetail.host_id}`}</span>
                <span className="font-bold text-[#97AEF3] text-sm">
                  {modelDetail.geolocation}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10 gap-8 font-semibold">
          <div className="flex flex-row justify-between">
            <span className="text-white flex flex-row items-center gap-2">
              <Image
                src="/images/marketplace/socket.svg"
                alt="socket"
                width={24}
                height={24}
              />
              {`${modelDetail.direct_port_count} ports`}
            </span>
            <span className="text-white flex flex-row items-center gap-2">
              <Image
                src="/images/marketplace/verified.svg"
                alt="socket"
                width={24}
                height={24}
              />
              {modelDetail.verification}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <span className="text-white text-lg">
                {modelDetail.mobo_name}
              </span>
              <span className="text-[#97AEF3] text-sm flex flex-row">
                <ArrowUp size={20} />
                <span>{`${modelDetail.inet_up.toFixed(0)} Mbps`}</span>
              </span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <span className="text-white flex flex-row gap-3">
                <span className="text-base">{`PCIE ${modelDetail.pci_gen.toFixed(
                  1
                )}, ${modelDetail.gpu_lanes}x`}</span>
                <span className="text-base">{`${modelDetail.pcie_bw?.toFixed(
                  1
                )} GB/s`}</span>
              </span>
              <span className="text-[#97AEF3] text-sm flex flex-row">
                <ArrowDown size={20} />
                <span>{`${modelDetail.inet_down.toFixed(0)} Mbps`}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-lg truncate max-w-44">
              {modelDetail.cpu_name || "No CPU Available"}
            </span>
            <div className="flex flex-row justify-between">
              <span className="text-white text-base">{`${modelDetail.cpu_cores_effective.toFixed(
                1
              )}/${modelDetail.cpu_cores} cpu`}</span>
              <span className="text-white text-sm">
                {`${normalizeCapacity(
                  modelDetail.cpu_ram,
                  0,
                  false
                )}/${normalizeCapacity(modelDetail.cpu_ram * ratio, 0)}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-lg truncate min-w-44">
              {modelDetail.disk_name || "No Disk Available"}
            </span>
            <div className="flex flex-row justify-between">
              <span className="text-white text-base">
                {`${modelDetail.disk_bw.toFixed(0)} MB/s`}
              </span>
              <span className="text-white text-sm">
                {`${modelDetail.disk_space.toFixed(1)} GB`}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="flex flex-row gap-3 items-center">
              <span className="text-white text-lg">
                {modelDetail.dlperf.toFixed(1)}
              </span>
              <span className="text-[#97AEF3] text-sm">DLPerf</span>
            </span>
            <div className="flex flex-row items-center">
              <span className="text-white text-base">
                {modelDetail.dlperf_per_dphtotal.toFixed(1)} DLP/$/hr
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3 items-center">
                <span className="text-white text-2xl">
                  {modelDetail.total_flops.toFixed(2)}
                </span>
                <span className="text-white text-sm">TFLOPS</span>
              </div>
              <span className="text-white text-2xl">
                {normalizeCapacity(modelDetail.gpu_ram)}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-[#97AEF3] text-sm">
                {`Max CUDA: ${modelDetail.cuda_max_good.toFixed(1)} `}
              </span>
              <span className="text-[#97AEF3] text-sm">
                {modelDetail.gpu_mem_bw} GB/s
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#242835] mt-10 px-8 py-4">
        <div className="flex flex-row justify-between">
          <span className="text-lg text-[#676E81] font-semibold">Cost:</span>
          <span className="text-white font-bold text-2xl">{`$${(
            modelDetail.storage_total_cost * 100
          ).toFixed(2)}/hr`}</span>
        </div>
        <Button className="bg-[#97AEF3] text-black py-7 w-full font-semibold text-base">
          Rent
        </Button>
      </div>
    </>
  );
};
