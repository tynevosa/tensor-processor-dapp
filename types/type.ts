import { Icons } from "@/components/icons";

export type sideItem = {
  name: string;
  icon: keyof typeof Icons;
  href: string;
};

export type GPUType = "ask" | "reserved" | "bid";

export type GPUNumberRange = {
  gte?: number;
  lte?: number;
};

export type ModelType = {
  model_name: string;
  description: string;
  model_number: number;
  imgSrc?: string;
};

export type FilterOptions = {
  diskSpace: number;
  duration: number;
  reliability: number;
  type: GPUType;
  gpuNumber: string;
  gpuName: string;
  geolocation: string;
  order: string;
  visibleUnverified: boolean;
  showIncompatible: boolean;
};

export type GPUInfoType = {
  host_id: number;
  duration: number;
  reliability: number;
  verification: string;
  geolocation: string;
  num_gpus: number;
  gpu_name: string;
  total_flops: number;
  cuda_max_good: number;
  gpu_ram: number;
  gpu_mem_bw: number;

  mobo_name: string;
  pci_gen: number;
  gpu_lanes: number;
  pcie_bw: number;
  inet_up: number;
  inet_down: number;
  direct_port_count: number;

  cpu_name: string;
  cpu_cores: number;
  cpu_cores_effective: number;
  cpu_ram: number;
  ratio: number;

  disk_name: string;
  disk_bw: number;
  disk_space: number;

  dlperf: number;
  dlperf_per_dphtotal: number;

  storage_total_cost: number;
};
