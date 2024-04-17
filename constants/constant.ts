import type {
  FilterOptions,
  GPUNumberRange,
  GPUType,
  ModelType,
  sideItem,
  navItem,
} from "@/types/type";

export const sideItems: sideItem[] = [
  {
    href: "/dashboard/models",
    icon: "boxes",
    name: "Models",
  },
  {
    href: "/dashboard/marketplace",
    icon: "trendingUp",
    name: "Marketplace",
  },
  {
    href: "/dashboard/editor",
    icon: "layoutDashboard",
    name: "editor",
  },
  {
    href: "/dashboard/instance",
    icon: "layoutDashboard",
    name: "Instance",
  },
];

export const marketplaceBtn = [
  {
    name: "Instance Config",
    key: "instance",
    url: "/images/marketplace/instance.svg",
  },
  {
    name: "Filter Options",
    key: "filter",
    url: "/images/marketplace/option.svg",
  },
];

export const navItems: navItem[] = [
  {
    href: "/dashboard/models",
    icon: "/images/navbar/model.svg",
    name: "Playground",
  },
  {
    href: "/dashboard/marketplace",
    icon: "/images/navbar/marketplace.svg",
    name: "Marketplace",
  },
  {
    href: "/dashboard/instance",
    icon: "/images/navbar/instance.svg",
    name: "Instance",
  },
  {
    href: "/dashboard/editor",
    icon: "/images/navbar/editor.svg",
    name: "Editors",
  },
];

export const GPUNums: { [key: string]: GPUNumberRange } = {
  any: { gte: 0, lte: 16 },
  "0x": { gte: 0, lte: 0 },
  "1x": { gte: 1, lte: 1 },
  "2x": { gte: 2, lte: 2 },
  "4x": { gte: 4, lte: 4 },
  "8x": { gte: 8, lte: 8 },
  "8x+": { gte: 8, lte: 16 },
};

export const GPUTypes: { [key: string]: string } = {
  bid: "Interruptible",
  ask: "On-Demand",
  reserved: "Reserved",
};

export const StyleTypes: { [key: string]: string } = {
  DDIM: "DDIM",
  DPMSolverMultistep: "DPMSolverMultistep",
  HeunDscrete: "HeunDscrete",
  KarrasDPM: "KarrasDPM",
  K_EULER_ANCESTRAL: "K_EULER_ANCESTRAL",
  K_EULER: "K_EULER",
  PNDM: "PNDM",
  DPMMSDE: "DPM++2MSDE",
};

export const NumImages: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

export const GPUNames = [
  "Any GPU",
  "H100 PCIE",
  "H100 SXM",
  "L40",
  "RTX 6000Ada",
  "RTX 4090",
  "RTX 4080",
  "RTX 4080 S",
  "RTX 4070",
  "A100 PCIE",
  "A100 SXM4",
  "A100x",
  "A40",
  "A10",
  "RTX A6000",
  "RTX A5000",
  "RTX A4000",
  "RTX 3090",
  "RTX 5000Ada",
  "RTX 3090 Ti",
  "RTX 3080 Ti",
  "RTX 3080",
  "RTX 3070",
  "RTX 3060",
  "Q RTX 8000",
  "Tesla V100",
];

export const Geolocations: { [key: string]: string[] } = {
  "Planet Earth": [],
  "North America": ["US", "CA"],
  "South America": ["BR", "AR", "CL"],
  Europe: [
    "SE",
    "UA",
    "GB",
    "PL",
    "PT",
    "SI",
    "DE",
    "IT",
    "CH",
    "LT",
    "GR",
    "FI",
    "IS",
    "AT",
    "FR",
    "RO",
    "MD",
    "HU",
    "NO",
    "MK",
    "BG",
    "ES",
    "HR",
    "NL",
    "CZ",
    "EE",
  ],
  Asia: [
    "CN",
    "JP",
    "KR",
    "ID",
    "IN",
    "HK",
    "MY",
    "IL",
    "TH",
    "QA",
    "TR",
    "RU",
    "VN",
    "TW",
    "OM",
    "SG",
    "AE",
    "KZ",
  ],
  Africa: ["EG", "ZA"],
  Oceania: ["AU", "NZ"],
};

export const SortOptions: { [key: string]: { [key: string]: string[] } } = {
  "Auto Sort": { "0": ["score", "desc"] },
  "DLPerf/$/Hr": { "0": ["dlperf_per_dphtotal", "desc"] },
  DLPerf: { "0": ["dlperf", "desc"] },
  "TFlops/$/Hr": { "0": ["flops_per_dphtotal", "desc"] },
  Flops: { "0": ["total_flops", "desc"] },
  "Price(inc.)": { "0": ["dph_total", "asc"], "1": ["total_flops", "asc"] },
  "Price(dec.)": { "0": ["dph_total", "desc"], "1": ["total_flops", "desc"] },
  "Video RAM": { "0": ["gpu_totalram", "desc"] },
  "Video RAM/$/HR": { "0": ["vram_costperhour", "asc"] },
};

export const Models: ModelType[] = [
  {
    model_name: "sylvanix-ai/sentinel-pro-v2",
    description:
      "Cutting-edge language model for superior accuracy and efficiency.",
    model_number: 35300,
    imgSrc: "/images/model01.png",
  },
  {
    model_name: "turboNLP/accelerant-10x",
    description:
      "High-speed NLP model optimized for scalability and real-time processing.",
    model_number: 50000,
    imgSrc: "/images/model02.png",
  },
  {
    model_name: "neuronet/neuroscribe-elite",
    description:
      "Elite-grade language model with advanced text generation capabilities.",
    model_number: 42000,
    imgSrc: "/images/model03.png",
  },
  {
    model_name: "cypherAI/quantum-lingua",
    description:
      "Innovative language model powered by breakthrough quantum computing.",
    model_number: 23000,
    imgSrc: "/images/model04.png",
  },
  {
    model_name: "lexarizon/omnilingua-prodigy",
    description:
      "Versatile model for fluent text understanding and generation across languages.",
    model_number: 20301,
    imgSrc: "/images/model05.png",
  },
  {
    model_name: "deepsense/delta-coreX",
    description:
      "Next-gen model for deep semantic understanding and context-aware generation.",
    model_number: 32500,
    imgSrc: "/images/model06.png",
  },
  {
    model_name: "mindforge/epochal-9x",
    description:
      "Groundbreaking model revolutionizing text processing with advanced algorithms.",
    model_number: 50000,
    imgSrc: "/images/model07.png",
  },
  {
    model_name: "polyglotAI/synerglot-max",
    description:
      "Multilingual model facilitating seamless communication across linguistic domains.",
    model_number: 40200,
    imgSrc: "/images/model08.png",
  },
  {
    model_name: "sentientAI/novaevo-quantum",
    description:
      "Quantum-inspired model unlocking new frontiers in text analysis and generation.",
    model_number: 32100,
    imgSrc: "/images/model09.png",
  },
  {
    model_name: "linguaXplore/phenom-nova",
    description:
      "Extraordinary model renowned for exceptional performance in linguistic tasks.",
    model_number: 25000,
    imgSrc: "/images/model10.png",
  },
];

export const initialParam: FilterOptions = {
  prompt_str: 0.2,
  control_dep_str: 0.8,
  inference_steps: 5,
  guidance_scale: 10,
  num_output: 4,
  diskSpace: 8,
  duration: 3,
  reliability: 90,
  per_hour: 5.65,
  tflops_hour: 20,
  tb_upload: 90,
  tb_download: 90,
  gpu_count: 1,
  tflops: 2841.6,
  per_gpu_ram: 222.208,
  cpu_core: 512,
  cpu_ram_space: 3614.72,
  cpu_ghz: 500,
  type: "ask",
  gpuNumber: "any",
  gpuName: "Any GPU",
  geolocation: "Planet Earth",
  order: "Auto Sort",
  visibleUnverified: false,
  showIncompatible: true,
  unavailable: false,
  staticIpAddress: false,
  secureCloud: false,
};

export const HOURS_A_DAY = 24 * 60 * 60;

export const buttonTab = [
  { name: "Playground", url: "/images/model/play.svg" },
  { name: "API", url: "/images/model/api.svg" },
  { name: "Info", url: "/images/model/file-w.svg" },
];

export const templateTab = [
  { name: "All" },
  { name: "Recommended" },
  { name: "Popular" },
  { name: "Recent" },
];

export const outputBtn = [
  { name: "Tweeks it", url: "/images/model/settings.svg" },
  { name: "Share", url: "/images/model/share.svg" },
  { name: "Download", url: "/images/model/download.svg" },
  { name: "Report", url: "/images/model/report.svg" },
];

export const viewModels = [
  { name: "model01", url: "/images/model01.png" },
  { name: "model02", url: "/images/model02.png" },
  { name: "model03", url: "/images/model03.png" },
  { name: "model04", url: "/images/model04.png" },
  { name: "model05", url: "/images/model05.png" },
  { name: "model06", url: "/images/model06.png" },
];

export const inputTab = [
  { name: "Form", value: "form" },
  { name: "Node.js", value: "node.js" },
  { name: "Python", value: "python" },
  { name: "Elixir", value: "elixir" },
  { name: "HTTP", value: "http" },
  { name: "Cog", value: "cog" },
  { name: "Docker", value: "docker" },
];

export const ouputTab = [
  { name: "Preview", value: "preview" },
  { name: "Json", value: "json" },
];

export const InitialGPUInfo = {
  host_id: 0,
  duration: 0,
  reliability: 0,
  verification: "",
  geolocation: "",
  num_gpus: 0,
  gpu_name: "",
  total_flops: 0,
  cuda_max_good: 0,
  gpu_ram: 0,
  gpu_mem_bw: 0,

  mobo_name: "",
  pci_gen: 0,
  gpu_lanes: 0,
  pcie_bw: 0,
  inet_up: 0,
  inet_down: 0,
  direct_port_count: 0,

  cpu_name: "",
  cpu_cores: 0,
  cpu_cores_effective: 0,
  cpu_ram_space: 0,
  ratio: 0,

  disk_name: "",
  disk_bw: 0,
  disk_space: 0,

  dlperf: 0,
  dlperf_per_dphtotal: 0,

  storage_total_cost: 0,
};

export const templateModel = [
  {
    name: "pytorch",
    description: "2.2.0 Cuda 12.1 Devrel",
    hash: "e4c5e88bc289f4eecb0c955c4e7430d",
    url: "/images/marketplace/pytorch.svg",
  },
  {
    name: "oobabooga",
    description: "text-generation-webui:defaultsnapshot-2023-12-31",
    hash: "e4c5e88bc289f4eecb0c955c4e7430d",
    url: "/images/marketplace/pytorch.svg",
  },
  {
    name: "pytorch",
    description: " 2.2.0 Cuda 12.1 Devrel",
    hash: "e4c5e88bc289f4eecb0c955c4e7430d",
    url: "/images/marketplace/pytorch.svg",
  },
  {
    name: "pytorch",
    description: " 2.2.0 Cuda 12.1 Devrel",
    hash: "e4c5e88bc289f4eecb0c955c4e7430d",
    url: "/images/marketplace/pytorch.svg",
  },
];
