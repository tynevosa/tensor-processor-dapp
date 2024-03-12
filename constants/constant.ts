import type {
  GPUNumberRange,
  GPUType,
  ModelType,
  sideItem,
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

export const GPUNums: { [key: string]: GPUNumberRange } = {
  any: {},
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
