import { LatLngTuple } from "leaflet"

type FIR = {
  mapCentre: LatLngTuple
  neighbourPrefixes: string[]
  neighbourFirs: string[]
  pages: { [name: string]: Page }
}
type Page = {
  staffingSectors: string[]
  statusSectors: string[][]
  majorAerodromes: string[]
  aerodromes: string[]
  relevantAerodromes: string[]
  areas: { [name: string]: string[] }
}

export const SPLIT_PRESETS: {
  [fir: string]: { [name: string]: { level?: number; positions: string[] } }
} = {
  EDMM: {
    "ZUG-HOF": { positions: ["ed/ZUG", "ed/HOF", "ed/DMNH"] },
    "RDG-GER": { positions: ["ed/RDG", "ed/GER", "ed/DMNH"] },
    "HOF-GER": { positions: ["ed/HOF", "ed/GER"] },
    "ZUG-ALB": { positions: ["ed/ZUG", "ed/ALB", "ed/DMNH"] },
    "TRU-ALB": { positions: ["ed/TRU", "ed/ALB", "ed/DMNH"] },
    "ZUG-WLD": { positions: ["ed/ZUG", "ed/WLD", "ed/DMNH"] },
    "TRU-WLD": { positions: ["ed/TRU", "ed/WLD", "ed/DMNH"] },
    "ALB-EGG": { positions: ["ed/ALB", "ed/EGG"] },
    "WLD-EGG": { positions: ["ed/WLD", "ed/EGG"] },
    "ZUG-NDG-ALB": {
      positions: ["ed/ZUG", "ed/NDG", "ed/ALB", "ed/DMNH"],
    },
    "TRU-NDG-ALB": {
      positions: ["ed/TRU", "ed/NDG", "ed/ALB", "ed/DMNH"],
    },
    "ZUG-WLD-EGG": {
      positions: ["ed/ZUG", "ed/WLD", "ed/EGG", "ed/DMNH"],
    },
    "TRU-WLD-EGG": {
      positions: ["ed/TRU", "ed/WLD", "ed/EGG", "ed/DMNH"],
    },
  },
  EDGG: {
    "KTG-PADH": { positions: ["ed/KTG", "ed/PADH"] },
    "DKB-GIN-PADH": { positions: ["ed/DKB", "ed/GIN", "ed/PADH"] },
    "BAD-DKB-GIN": { positions: ["ed/BAD", "ed/DKB", "ed/GIN"] },
    "DKB-GIN-RUD": { positions: ["ed/DKB", "ed/GIN", "ed/RUD"] },
  },
  EDWW: {
    "ALR-DST": { positions: ["ed/ALR", "ed/DST"] },
    "ALR-EIDE": { positions: ["ed/ALR", "ed/EIDE"] },
    "ALR-HEI": { positions: ["ed/ALR", "ed/HEI"] },
    "DST-HRZ": { positions: ["ed/DST", "ed/HRZ"] },
    "DST-EMS": { positions: ["ed/DST", "ed/EMS"] },
    "ALR-HEI-EIDE": { positions: ["ed/ALR", "ed/HEI", "ed/EIDE"] },
    "MRZ-FLG": { positions: ["ed/MRZ", "ed/FLG"] },
    "MRZ-BOR": { positions: ["ed/MRZ", "ed/BOR"] },
    "MRZ-MAR": { positions: ["ed/MRZ", "ed/MAR"] },
    "MAR-FLG": { positions: ["ed/MAR", "ed/FLG"] },
    "MRZ-MAR-FLG": { positions: ["ed/MRZ", "ed/MAR", "ed/FLG"] },
    "MRZ-MAR-BOR": { positions: ["ed/MRZ", "ed/MAR", "ed/BOR"] },
    "MRZ-BOR-FLG": { positions: ["ed/MRZ", "ed/BOR", "ed/FLG"] },
  },
  EDUU: {
    "ERL-HVL-WUR": { level: 320, positions: ["ed/SAL", "ed/HVL", "ed/WUR"] },
    "OSE-HVL-SAL": { level: 320, positions: ["ed/OSE", "ed/HVL", "ed/SAL"] },
    "OSE-HVL": { level: 320, positions: ["ed/OSE", "ed/HVL"] },
    "ERL-DON": { level: 320, positions: ["ed/ERL", "ed/DON"] },
    "ALP-DON": { level: 320, positions: ["ed/ALP", "ed/DON"] },
    "ALP-DON-SAL": { level: 320, positions: ["ed/ALP", "ed/DON", "ed/SAL"] },
    "NTM-SLN": { level: 320, positions: ["ed/NTM", "ed/SLN"] },
  },
  EDYY: {
    "JEV-CEL": { level: 320, positions: ["ed/JEV", "ed/CEL"] },
    "JEV-SOL": { level: 320, positions: ["ed/JEV", "ed/SOL"] },
    "JEV-HOL": { level: 320, positions: ["ed/JEV", "ed/HOL"] },
    "CEL-SOL": { level: 320, positions: ["ed/CEL", "ed/SOL"] },
    "RHR-MNS": { level: 320, positions: ["ed/RHR", "ed/MNS"] },
  },
}

// TODO move to UI?
export const FIR_SETTINGS: { [name: string]: FIR } = {
  EDMM: {
    mapCentre: [49.2646, 11.4134],
    neighbourPrefixes: ["ED", "ET", "EP", "LI", "LK", "LO", "LS"],
    neighbourFirs: [
      "EDGG",
      "EDWW",
      "EPWW",
      "LIMM",
      "LIPP",
      "LKAA",
      "LOVV",
      "LSAS",
    ],
    pages: {
      "ATIS APP": {
        staffingSectors: [
          "ed/SWA",
          "ed/ILR",
          "ed/ALB",
          "ed/RDG",
          "ed/EGG",
          "ed/NDG",
          "ed/WLD",
          "ed/ZUG",
          "ed/TEG",
          "ed/TRU",
          "ed/STA",
          "ed/FUE",
        ],
        statusSectors: [
          ["ed/NDG", "ed/WLD", "ed/SWA", "ed/ALB", "ed/RDG", "ed/EGG"],
          ["ed/DMNH", "ed/DMNL", "ed/DMND", "ed/DMSD", "ed/DMSL", "ed/DMSH"],
          ["ed/ILR", "ed/FUE", "ed/ZUG", "ed/STA", "ed/TEG", "ed/TRU"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["ETSN", "ETSI", "ETHL", "ETSL", "EDMO", "EDMA", "EDJA"],
        relevantAerodromes: [],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          "ED-R137 Hohenfels": ["ED-R137A", "ED-R137B"],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R136 Grafenwöhr": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R138 Siegenburg": ["ED-R138A", "ED-R138B"],
          "ED-R141 Altenstadt": ["ED-R141"],
          "ED-R147 Manching": ["ED-R147"],
        },
      },
      "ATIS NORD": {
        staffingSectors: [
          "ed/WLD",
          "ed/ALB",
          "ed/RDG",
          "ed/EGG",
          "ed/NDG",
          "ed/TEG",
          "ed/TRU",
          "ed/FUE",
          "ed/STA",
          "ed/SWA",
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
        ],
        statusSectors: [
          ["ed/ISA", "ed/DON", "ed/ALP", "ed/CHI"],
          ["ed/ALB", "ed/RDG", "ed/EGG", "ed/NDG", "ed/WLD", "ed/SWA"],
          ["ed/DMNH", "ed/DMNL", "ed/FUE", "ed/STA", "ed/TEG", "ed/TRU"],
          ["ed/HOF", "ed/BBG", "ed/FRK"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["ETSN", "ETSI", "ETSL", "EDJA", "EDMA"],
        relevantAerodromes: ["EDDS", "EDDF"],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R136 Grafenwöhr": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R138 Siegenburg": ["ED-R138A", "ED-R138B"],
          "ED-R137 Hohenfels": ["ED-R137A", "ED-R137B"],
          // "LK-TRA75": [
          //   "LK-TRA75"
          // ],
          "ED-R147 Manching": ["ED-R147"],
        },
      },
      "ATIS SUED": {
        staffingSectors: [
          "ed/SWA",
          "ed/ILR",
          "ed/WLD",
          "ed/NDG",
          "ed/EGG",
          "ed/ALB",
          "ed/ZUG",
          "ed/FUE",
          "ed/STA",
          "ed/TEG",
          "ed/TRU",
        ],
        statusSectors: [
          ["ed/ALP", "ed/CHI", "ed/ISA", "ed/DON"],
          ["ed/FUE", "ed/STA", "ed/TRU", "ed/NDG", "ed/ALB", "ed/EGG"],
          ["ed/ZUG", "ed/TEG", "ed/ILR", "ed/SWA", "ed/DMSH", "ed/DMSL"],
        ],
        majorAerodromes: ["EDDM"],
        aerodromes: ["EDMA", "ETSL", "ETHL", "EDJA", "EDMO"],
        relevantAerodromes: ["EDDS", "EDDF"],
        areas: {
          "ED-R107-407 Allgäu": [
            "ED-R107C",
            "ED-R107W",
            "ED-R207C",
            "ED-R207S",
            "ED-R207W",
            "ED-R307C",
            "ED-R307S",
            "ED-R407C",
            "ED-R407N",
            "ED-R407S",
          ],
          // M03: [],
          // Lizum: [],
          "ED-R141 Altenstadt": ["ED-R141"],
        },
      },
      "ATIS OST": {
        staffingSectors: [
          "ed/BBG",
          "ed/HOF",
          "ed/HAL",
          "ed/GER",
          "ed/MEI",
          "ed/FRK",
          "ed/TRN",
          "ed/TRS",
          "ed/SAS",
          "ed/ALB",
          "ed/RDG",
        ],
        statusSectors: [
          ["ed/SOL", "ed/DON", "ed/ERL", "ed/SAL", "ed/SPE", "ed/HVL"],
          ["ed/WUR", "ed/HRZ", "ed/HOF", "ed/HAL", "ed/MEI", "ed/BOR"],
          ["ed/FUL", "ed/RDG", "ed/BBG", "ed/GER", "ed/SAS", "ed/FLG"],
          ["ed/GED", "ed/ALB", "ed/FRK", "ed/TRN", "ed/TRS", "ed/DBAS"],
          // LKAA, EPWW
        ],
        majorAerodromes: ["EDDN", "EDDP"],
        aerodromes: ["EDDC", "EDDE", "EDQM"],
        relevantAerodromes: [],
        areas: {
          "ED-R136": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R137": ["ED-R137A", "ED-R137B"],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R208": ["ED-R208A", "ED-R208B"],
          "ED-R308": ["ED-R308"],
          "ED-R95": ["ED-R95A", "ED-R95B"],
          "ED-R45": ["ED-R45"],
        },
      },
      "ATIS EDDN": {
        staffingSectors: [
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
          "ed/GER",
          "ed/MEI",
          "ed/TRS",
          "ed/ALB",
          "ed/RDG",
        ],
        statusSectors: [
          ["ed/DON", "ed/ERL", "ed/SAL", "ed/SPE", "ed/HVL"],
          ["ed/WUR", "ed/ALB", "ed/HOF", "ed/HAL", "ed/MEI", "ed/BOR"],
          ["ed/FUL", "ed/RDG", "ed/BBG", "ed/GER", "ed/SAS", "ed/FLG"],
          ["ed/GED", "ed/SWA", "ed/FRK", "ed/TRN", "ed/TRS", "ed/DBAS"],
          // LKAA, EPWW
        ],
        majorAerodromes: ["EDDN"],
        aerodromes: ["EDQC", "EDQA", "EDQM", "EDQD", "ETEB", "ETIC", "ETHN"],
        relevantAerodromes: [],
        areas: {
          "ED-R136": ["ED-R136A", "ED-R136B", "ED-R136C"],
          "ED-R137": ["ED-R137A", "ED-R137B"],
          "ED-R144/170/171": ["ED-R144", "ED-R170A", "ED-R170B", "ED-R171"],
          "ED-R208": ["ED-R208A", "ED-R208B"],
          "ED-R308": ["ED-R308"],
          "ED-R95A": ["ED-R95A"],
        },
      },
      "ATIS EDDP": {
        staffingSectors: [
          "ed/HAL",
          "ed/GER",
          "ed/MEI",
          "ed/TRN",
          "ed/TRS",
          "ed/SAS",
          "ed/BBG",
          "ed/HOF",
          "ed/FRK",
        ],
        statusSectors: [
          ["ed/SOL", "ed/ERL", "ed/SAL", "ed/SPE", "ed/HVL"],
          ["ed/HRZ", "ed/HOF", "ed/HAL", "ed/MEI", "ed/BOR"],
          ["ed/FUL", "ed/BBG", "ed/GER", "ed/SAS", "ed/FLG"],
          ["ed/GED", "ed/FRK", "ed/TRN", "ed/TRS", "ed/DBAS"],
          // LKAA, EPWW
        ],
        majorAerodromes: ["EDDP", "EDDC"],
        aerodromes: ["EDDE", "EDAB", "EDAC"],
        relevantAerodromes: [],
        areas: {
          "ED-R95A": ["ED-R95A"],
          "ED-R95B": ["ED-R95B"],
          "ED-R45": ["ED-R45"],
          "ED-R208": ["ED-R208A", "ED-R208B"],
          "ED-R308": ["ED-R308"],
        },
      },
      // TODO AFW, EBG-Ost
    },
  },
  EDGG: {
    neighbourPrefixes: ["ED", "ET", "EB", "EH", "EL", "LF", "LS"],
    neighbourFirs: ["EDMM", "EDWW", "EHAA", "EBBU", "LFEE", "LSAS"],
    mapCentre: [50.03330525, 8.570456],
    pages: {
      // TODO: IRL different layout
      "ATIS EBG02/04": {
        staffingSectors: [
          "ed/BAD",
          "ed/MAN",
          "ed/LBU",
          "ed/NKRH",
          "ed/NKRL",
          "ed/KIR",
          "ed/SIG",
          "ed/KNG",
          "ed/TAU",
          "ed/GIN",
          "ed/PFA",
          "ed/DKB",
          "ed/REU",
          "ed/STG",
        ],
        statusSectors: [
          ["ed/BAD", "ed/MAN", "ed/LBU", "ed/NKRH", "ed/NKRL"],
          ["ed/DKB", "ed/KTG", "ed/HAB", "ed/KNG"],
          ["ed/GED", "ed/SIG", "ed/TAU", "ed/GIN", "ed/HEF"],
          ["ed/EIF", "ed/PFA", "ed/KIR", "ed/RUD"],
          ["ed/STG", "ed/REU"],
          ["ed/DFDN", "ed/DFDS", "ed/DFAN", "ed/DFAS"],
        ],
        majorAerodromes: ["EDDF", "EDDS"],
        aerodromes: ["ETAR", "EDFM", "EDSB", "EDTL"],
        relevantAerodromes: ["EDDM"],
        areas: {
          // Murgtal: [],
          "TRA 205": ["ED-R205A", "ED-R205B", "ED-R205C", "ED-R205D"],
          "TRA 207": ["ED-R207"],
          "ED-R 132 Heuberg": ["ED-R132A", "ED-R132B"],
        },
      },
      "ATIS EBG03/05": {
        staffingSectors: [
          "ed/GED",
          "ed/SIG",
          "ed/TAU",
          "ed/GIN",
          "ed/HEF",
          "ed/PADH",
          "ed/PADL",
          "ed/EIF",
          "ed/DUS",
          "ed/NOR",
          "ed/DKA",
          "ed/RUD",
          "ed/KIR",
          "ed/HAB",
        ],
        statusSectors: [
          ["ed/GED", "ed/SIG", "ed/TAU", "ed/GIN", "ed/HEF"],
          ["ed/DKB", "ed/KTG", "ed/HAB", "ed/KNG"],
          ["ed/BAD", "ed/MAN", "ed/LBU", "ed/NKRH", "ed/NKRL"],
          ["ed/EIF", "ed/PFA", "ed/KIR", "ed/RUD"],
          ["ed/STG", "ed/REU"],
          ["ed/DFDN", "ed/DFDS", "ed/DFAN", "ed/DFAS"],
        ],
        majorAerodromes: ["EDDF"],
        aerodromes: [
          "EDDR",
          "EDFH",
          "ETAR",
          "EDDL",
          "EDDK",
          "EDDG",
          "EDLW",
          "EDLP",
        ],
        relevantAerodromes: [],
        areas: {
          "ED-R 134 Wildflecken": ["ED-R134"],
          "ED-R 135 Hammelburg": ["ED-R135A", "ED-R135B", "ED-R135C"],
          "ED-R 97 Schwarzenborn": ["ED-R97A", "ED-R97B"],
        },
      },
      "ATIS EBG06": {
        staffingSectors: [
          "ed/PADH",
          "ed/PADL",
          "ed/HMM",
          "ed/DUS",
          "ed/BOT",
          "ed/DKA",
          "ed/NOR",
          "ed/TAU",
          "ed/SIG",
          "ed/GIN",
        ],
        statusSectors: [
          ["ed/PADH", "ed/PADL", "ed/HMM"],
          ["ed/DUS", "ed/BOT", "ed/DLD"],
          ["ed/DKA", "ed/NOR", "ed/TAU", "ed/SIG", "ed/GIN"],
          ["ed/RHR", "ed/MNS"],
        ],
        majorAerodromes: ["EDDK", "EDDL"],
        aerodromes: ["EDDG", "EDLW", "EDLP", "EDLN", "ETNN", "ETNG"],
        relevantAerodromes: [],
        areas: {},
      },
      "ATIS DUS": {
        staffingSectors: [
          "ed/DUS",
          "ed/BOT",
          "ed/DKA",
          "ed/NOR",
          "ed/PADH",
          "ed/PADL",
          "ed/HMM",
          "ed/TAU",
          "ed/SIG",
        ],
        statusSectors: [
          ["ed/DUS", "ed/BOT", "ed/DLD"],
          ["ed/DKA", "ed/NOR", "ed/TAU", "ed/SIG"],
          ["ed/PADH", "ed/PADL", "ed/HMM"],
          ["ed/RHR", "ed/MNS"],
        ],
        majorAerodromes: ["EDDL", "EDLV"],
        aerodromes: ["EDDK", "EDDG", "EDLW", "EDLP", "EDLN", "ETNN", "ETNG"],
        relevantAerodromes: [],
        areas: { "Elsenborn Areas": ["ED-R117"] },
      },
      // TODO: IRL different layout
      "ATIS DKA": {
        staffingSectors: [
          "ed/DKA",
          "ed/NOR",
          "ed/PADL",
          "ed/PADH",
          "ed/BOT",
          "ed/DUS",
          "ed/EIF",
          "ed/TAU",
          "ed/SIG",
          "ed/RUD",
        ],
        statusSectors: [
          ["ed/DKA", "ed/NOR"],
          ["ed/PADL", "ed/PADH", "ed/BOT", "ed/DUS"],
          ["ed/EIF", "ed/RUD", "ed/TAU", "ed/SIG"],
        ],
        majorAerodromes: ["EDDK", "EDDL"],
        aerodromes: ["EDDG", "EDLV", "EDLW", "EDLP", "EDLN", "ETNN", "ETNG"],
        relevantAerodromes: [],
        areas: { "Elsenborn Areas": ["ED-R117"] },
      },
      // TODO: IRL different layout
      "ATIS STG": {
        staffingSectors: [
          "ed/STG",
          "ed/REU",
          "ed/BAD",
          "ed/LBU",
          "ed/NKRH",
          "ed/NKRL",
          "ed/KNG",
          "ed/DKB",
          "ed/PFA",
        ],
        statusSectors: [
          ["ed/STG", "ed/REU", "ed/BAD", "ed/LBU"],
          ["ed/NKRH", "ed/NKRL", "ed/KNG", "ed/DKB", "ed/PFA"],
        ],
        majorAerodromes: ["EDDS"],
        aerodromes: ["EDSB", "EDTL", "EDTY"],
        relevantAerodromes: [],
        areas: {
          "ED-R132": ["ED-R132A", "ED-R132B"],
          "ED-R205": ["ED-R205A", "ED-R205B", "ED-R205C", "ED-R205D"],
          "ED-R207": ["ED-R207C", "ED-R207S", "ED-R207W"],
        },
      },
      "ATIS FRA": {
        staffingSectors: [
          "ed/GED",
          "ed/TAU",
          "ed/GIN",
          "ed/KTG",
          "ed/HAB",
          "ed/KNG",
          "ed/NKRH",
          "ed/NKRL",
          "ed/KIR",
          "ed/RUD",
        ],
        statusSectors: [
          ["ed/DFDN", "ed/DFDS", "ed/DFAN", "ed/DFAS"],
          ["ed/GED", "ed/TAU", "ed/GIN"],
          ["ed/KTG", "ed/HAB", "ed/KNG"],
          ["ed/MAN", "ed/NKRH", "ed/NKRL"],
          ["ed/EIF", "ed/PFA", "ed/KIR", "ed/RUD"],
        ],
        majorAerodromes: ["EDDF", "ETOU"],
        aerodromes: ["EDFE"],
        relevantAerodromes: [],
        areas: {},
      },
    },
  },
  EDWW: {
    neighbourPrefixes: ["ED", "ET", "EH", "EK", "EP", "ES"],
    neighbourFirs: ["EDGG", "EDMM", "EHAA", "EKDK", "ESMM", "EPWW"],
    mapCentre: [53.047399804, 9.988227138],
    pages: {
      "ATIS NORD": {
        staffingSectors: [
          "ed/EIDE",
          "ed/EIDW",
          "ed/FRI",
          "ed/HRZ",
          "ed/EMS",
          "ed/HAN",
          "ed/MRZ",
          "ed/MAR",
          "ed/OSE1",
          "ed/HVL1",
          "ed/CEL",
          "ed/MNS",
          "ed/JEV",
          "ed/HOL",
        ],
        statusSectors: [
          ["ed/HAME", "ed/HAMW", "ed/HEI", "ed/ALR", "ed/EIDW", "ed/EIDE"],
          ["ed/FRI", "ed/EMS", "ed/HRZ", "ed/HAN", "ed/MAR", "ed/MRZ"],
          ["ed/JEV", "ed/HOL", "ed/MNS", "ed/CEL", "ed/OSE", "ed/HVL"],
        ],
        majorAerodromes: ["EDDH", "EDDW"],
        aerodromes: ["EDHI", "EDHL", "EDXW", "ETMN", "ETNH", "ETNS", "ETNT"],
        relevantAerodromes: [],
        areas: {
          "ED-R10 Todendorf-Putlos": [
            "ED-R10A",
            "ED-R10B",
            "ED-R10C",
            "ED-R10D",
            "ED-R10E",
          ],
          "ED-R11 Ostsee": ["ED-R11A", "ED-R11B"],
          "ED-R12 Schoenhagen": ["ED-R12A", "ED-R12B"],
          "ED-R12 Meldorfer Bucht": ["ED-R13A", "ED-R13B"],
          "ED-R31 Bergen": ["ED-R31"],
          "ED-R32 Munster": ["ED-R32A", "ED-R32B"],
          "ED-R33 Unterluess": ["ED-R33A", "ED-R33B"],
          "ED-R34 Meppen": ["ED-R34A", "ED-R34B"],
        },
      },
      "ATIS OST": {
        staffingSectors: [
          "ed/DBAN",
          "ed/DBAS",
          "ed/DBDN",
          "ed/DBDS",
          "ed/CEL",
          "ed/SOL",
          "ed/JEV",
          "ed/TRN",
          "ed/SAS",
          "ed/HAL",
          "ed/GER",
          "ed/MEI",
          "ed/HEI",
          "ed/HAME",
          "ed/HRZ",
          "ed/HAN",
        ],
        statusSectors: [
          ["ed/BOR", "ed/FLG", "ed/MAR", "ed/MRZ", "ed/HVL", "ed/OSE"],
          ["ed/DBAN", "ed/DBAS", "ed/DBDN", "ed/DBDS", "ed/HEI", "ed/HRZ"],
          ["ed/GER", "ed/HAL", "ed/MEI", "ed/SPE", "ed/SAL", "ed/TRN"],
          ["ed/SAS", "ed/HAME", "ed/HAN", "ed/HOL", "ed/SOL", "ed/CEL"],
        ],
        majorAerodromes: ["EDDB"],
        aerodromes: ["EDAH", "ETNL"],
        relevantAerodromes: ["ETSH", "EDDV", "EDDC", "EDDP"],
        areas: {
          "ED-R17 Jaegerbrueck": ["ED-R17"],
          "ED-R71 Klietz": ["ED-R71"],
          "ED-R73 Altengrabow": ["ED-R73A", "ED-R73B", "ED-R73C"],
          "ED-R74 Altmark": ["ED-R74A", "ED-R74B", "ED-R74C"],
        },
      },
      "ATIS BER": {
        staffingSectors: [
          "ed/BOR",
          "ed/FLG",
          "ed/MAR",
          "ed/MRZ",
          "ed/DBAN",
          "ed/DBAS",
          "ed/DBDN",
          "ed/DBDS",
          "ed/TRN",
          "ed/SAS",
        ],
        statusSectors: [
          ["ed/BOR", "ed/FLG", "ed/MAR", "ed/MRZ"],
          ["ed/DBAN", "ed/DBAS", "ed/DBDN", "ed/DBDS"],
          ["ed/SAS", "ed/TRN"],
        ],
        majorAerodromes: ["EDDB"],
        aerodromes: ["ETSH"],
        relevantAerodromes: ["EDDC", "EDDP"],
        areas: {
          "ED-R54 Lehnin": ["ED-R54"],
          "ED-R70 Holzdorf": ["ED-R70"],
          "ED-R71 Klietz": ["ED-R71"],
          "ED-R73 Altengrabow": ["ED-R73A", "ED-R73B", "ED-R73C"],
          "ED-R74 Altmark": ["ED-R74A", "ED-R74B", "ED-R74C"],
        },
      },
      "ATIS SÜD": {
        staffingSectors: [
          "ed/ALR",
          "ed/HEI",
          "ed/FRI",
          "ed/MAR",
          "ed/BOR",
          "ed/HAL",
          "ed/GED",
          "ed/HEF",
          "ed/GIN",
          "ed/PADH",
          "ed/HMM",
          "ed/PADL",
          "ed/HAME",
          "ed/TRN",
          "ed/SAL",
          "ed/RHR",
        ],
        statusSectors: [
          ["ed/EMS", "ed/HRZ", "ed/DST", "ed/HAN"],
          ["ed/HAME", "ed/FRI", "ed/HEI", "ed/ALR", "ed/MAR", "ed/BOR"],
          ["ed/SOL", "ed/CEL", "ed/MNS", "ed/JEV", "ed/HOL", "ed/RHR"],
          ["ed/HAL", "ed/TRN", "ed/SAL", "ed/FFM", "ed/FUL", "ed/HVL"],
          ["ed/PADL", "ed/PADH", "ed/HMM", "ed/GIN", "ed/GED", "ed/HEF"],
        ],
        majorAerodromes: ["EDDV"],
        aerodromes: ["EDVE", "EDVK"],
        relevantAerodromes: ["EDDW", "EDDB", "EDDP", "EDLP", "EDDG"],
        areas: {
          "ED-R30 Ehra-Lessien": ["ED-R30"],
          "ED-R31 Bergen": ["ED-R31"],
          "ED-R32 Munster": ["ED-R32A", "ED-R32B"],
          "ED-R33 Unterluess": ["ED-R33A", "ED-R33B"],
          "ED-R34 Meppen": ["ED-R34A", "ED-R34B"],
          "ED-R37 Nordhorn": ["ED-R37A", "ED-R37B"],
        },
      },
    },
  },
}
export const FIR_TO_VATGLASSES: { [fir: string]: string } = {
  EDMM: "ed",
  EDUU: "ed",
  EDGG: "ed",
  EDWW: "ed",
  EDYY: "ed",
  EBBU: "eb-el",
  EHAA: "eh",
  EKDK: "ek",
  ESMM: "es",
  LIPP: "li",
  LKAA: "lk",
  LOVV: "lo",
  EPWW: "ep",
  LSAS: "ls",
}
