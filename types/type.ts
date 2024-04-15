import { Icons } from "@/components/icons";

export type sideItem = {
  name: string;
  icon: keyof typeof Icons;
  href: string;
};

export type navItem = {
  name: string;
  icon: string;
  href: string;
};

export type GPUType = "ask" | "reserved" | "bid";

export type StyleType = "multi" | "single" | "tripple";

export type NumImagesTypes = "1" | "2" | "3" | "4";

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

export type ModelInfoType = {
  cover_image_url: string;
  created_at: string;
  default_example: any;
  description: string;
  github_url: string;
  latest_version: any;
  license_url?: string;
  name: string;
  owner: string;
  paper_url?: string;
  run_count: number;
  url: string;
  visibility: string;
};

export type FilterOptions = {
  diskSpace: number;
  duration: number;
  reliability: number;
  per_hour: number;
  tflops_hour: number;
  tb_upload: number;
  tb_download: number;
  gpu_count: number;
  tflops: number;
  per_gpu_ram: number;
  cpu_core: number;
  cpu_ram: number;
  cpu_ghz: number;
  prompt_str: number;
  control_dep_str: number;
  inference_steps: number;
  guidance_scale: number;
  num_output: number;
  type: GPUType;
  gpuNumber: string;
  gpuName: string;
  geolocation: string;
  order: string;
  visibleUnverified: boolean;
  showIncompatible: boolean;
  unavailable: boolean;
  staticIpAddress: boolean;
  secureCloud: boolean;
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

export type InputType = {
  prompt?: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
  num_outputs?: number;
  scheduler?: string;
};
