// ============================================================
// Electronics II — Calculation Questions Bank
// Each question has a circuit image, required answer fields,
// correct values with tolerance, and a solution image.
// ============================================================

var CALC_QUESTIONS = {
  // ─────────────────────────────────────────────
  // LECTURE 1: DC Transistor Analysis
  // ─────────────────────────────────────────────
  lec1: [
    {
      id: "calc_1_1",
      title: "Example 1.1 — DC Transistor Basics",
      description: "For a DC transistor, determine β, α, and IE given IB = 50 μA and IC = 3.65 mA.",
      questionImg: "Electronics-2/calc-images/calc_1_1_q.png",
      solutionImgs: ["Electronics-2/calc-images/calc_1_1_s.png"],
      fields: [
        { label: "β", unit: "", answer: 73, tolerance: 2 },
        { label: "α", unit: "", answer: 0.986, tolerance: 0.01 },
        { label: "IE", unit: "mA", answer: 3.7, tolerance: 0.05 }
      ]
    },
    {
      id: "calc_1_2",
      title: "Example 1.2 — Fixed Bias DC Analysis",
      description: "Determine IB, IC, IE, VBE, VCE, and VCB for the shown circuit. β = 150.",
      questionImg: "Electronics-2/calc-images/calc_1_2_q.png",
      solutionImgs: ["Electronics-2/calc-images/calc_1_2_s.png"],
      fields: [
        { label: "IB", unit: "μA", answer: 430, tolerance: 10 },
        { label: "IC", unit: "mA", answer: 64.5, tolerance: 1 },
        { label: "IE", unit: "mA", answer: 64.9, tolerance: 1 },
        { label: "VBE", unit: "V", answer: 0.7, tolerance: 0.05 },
        { label: "VCE", unit: "V", answer: 3.55, tolerance: 0.1 },
        { label: "VCB", unit: "V", answer: 2.85, tolerance: 0.1 }
      ]
    },
    {
      id: "calc_1_3",
      title: "Example 1.3 — Emitter-Bias Circuit",
      description: "Determine β, VCC and RB for the shown circuit. Given: VCE=7.3V, RE=0.68kΩ, IB=20μA, RC=2.7kΩ, VE=2.1V.",
      questionImg: "Electronics-2/calc-images/calc_1_3_q.png",
      solutionImgs: ["Electronics-2/calc-images/calc_1_3_s.png"],
      fields: [
        { label: "β", unit: "", answer: 154, tolerance: 3 },
        { label: "VCC", unit: "V", answer: 17.68, tolerance: 0.5 },
        { label: "RB", unit: "kΩ", answer: 744, tolerance: 10 }
      ]
    },
    {
      id: "calc_1_4",
      title: "Example 1.4 — Collector-Feedback Bias",
      description: "Determine IC, VB and VC for the shown circuit. β = 90, VCC = 3V, RC = 1.8kΩ, RB = 33kΩ.",
      questionImg: "Electronics-2/calc-images/calc_1_4_q.png",
      solutionImgs: ["Electronics-2/calc-images/calc_1_4_s.png"],
      fields: [
        { label: "IB", unit: "μA", answer: 11.8, tolerance: 1 },
        { label: "IC", unit: "mA", answer: 1.06, tolerance: 0.05 }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // LECTURE 2: Small-Signal BJT Amplifiers
  // ─────────────────────────────────────────────
  lec2: [
    {
      id: "calc_2_5",
      title: "Example 1.5 — CE Fixed-Bias Amplifier",
      description: "Determine Zi, Zo, Av, Ai for the fixed bias CE amplifier. VCC=12V, RB=470kΩ, RC=3kΩ, β=100, ro=50kΩ.",
      questionImg: "Electronics-2/calc-images/calc_2_5_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_2_5_s.png",
        "Electronics-2/calc-images/calc_2_5_s2.png"
      ],
      fields: [
        { label: "re", unit: "Ω", answer: 10.7, tolerance: 0.5 },
        { label: "Zi", unit: "kΩ", answer: 1.069, tolerance: 0.05 },
        { label: "Zo", unit: "kΩ", answer: 3, tolerance: 0.1 },
        { label: "Av", unit: "", answer: -280.11, tolerance: 5 },
        { label: "Ai", unit: "", answer: 99.77, tolerance: 2 }
      ]
    },
    {
      id: "calc_2_6",
      title: "Example 1.6 — Voltage-Divider Bias Amplifier",
      description: "Determine Zi, Zo, Av, Ai for the voltage-divider bias configuration.",
      questionImg: "Electronics-2/calc-images/calc_2_6_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_2_6_s.png",
        "Electronics-2/calc-images/calc_2_6_s2.png",
        "Electronics-2/calc-images/calc_2_6_s3.png"
      ],
      fields: [
        { label: "Zi", unit: "kΩ", answer: 1.18, tolerance: 0.1 },
        { label: "Zo", unit: "kΩ", answer: 4.7, tolerance: 0.2 },
        { label: "Av", unit: "", answer: -374, tolerance: 10 }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // LECTURE 3: FET Small-Signal Analysis
  // ─────────────────────────────────────────────
  lec3: [
    {
      id: "calc_3_1",
      title: "Example 2.1 — FET Fixed-Bias",
      description: "FET fixed-bias: VGSQ=-2V, IDQ=5.625mA, IDSS=10mA, VP=-8V. Determine gm, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_3_1_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_3_1_s.png",
        "Electronics-2/calc-images/calc_3_1_s2.png",
        "Electronics-2/calc-images/calc_3_1_s3.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 1.875, tolerance: 0.1 },
        { label: "Zi", unit: "MΩ", answer: 1, tolerance: 0.1 },
        { label: "Zo", unit: "kΩ", answer: 2, tolerance: 0.1 },
        { label: "Av", unit: "", answer: -3.75, tolerance: 0.2 }
      ]
    },
    {
      id: "calc_3_2",
      title: "Example 2.2 — FET Self-Bias",
      description: "Self-bias FET: VGSQ=-2.6V, IDQ=2.6mA, IDSS=10mA, VP=-6V. Determine gm, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_3_2_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_3_2_s.png",
        "Electronics-2/calc-images/calc_3_2_s2.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 1.89, tolerance: 0.1 },
        { label: "Zi", unit: "MΩ", answer: 1, tolerance: 0.1 },
        { label: "Av", unit: "", answer: -2.78, tolerance: 0.2 }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // LECTURE 4: FET Configurations (cont.)
  // ─────────────────────────────────────────────
  lec4: [
    {
      id: "calc_4_3",
      title: "Example 2.3 — Source-Follower (CD)",
      description: "Source-follower network: VGSQ=-2.86V, IDQ=4.56mA. Determine gm, rd, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_4_3_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_4_3_s.png",
        "Electronics-2/calc-images/calc_4_3_s2.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 2.14, tolerance: 0.15 },
        { label: "Zi", unit: "MΩ", answer: 10, tolerance: 1 },
        { label: "Av", unit: "", answer: 0.83, tolerance: 0.05 }
      ]
    },
    {
      id: "calc_4_4",
      title: "Example 2.4 — Voltage-Divider FET",
      description: "VGSQ=2.2V, IDQ=2.03mA. Determine gm, rd, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_4_4_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_4_4_s.png",
        "Electronics-2/calc-images/calc_4_4_s2.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 1.52, tolerance: 0.1 },
        { label: "Av", unit: "", answer: -5.47, tolerance: 0.3 }
      ]
    },
    {
      id: "calc_4_5",
      title: "Example 2.5 — Common-Gate Configuration",
      description: "Common-gate FET. Determine gm, rd, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_4_5_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_4_5_s.png",
        "Electronics-2/calc-images/calc_4_5_s2.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 2.0, tolerance: 0.2 },
        { label: "Av", unit: "", answer: 7.27, tolerance: 0.4 }
      ]
    },
    {
      id: "calc_4_6",
      title: "Example 2.6 — E-MOSFET Analysis",
      description: "E-MOSFET: VGSQ=6.4V, IDQ=2.75mA, Yos=20μS, k=0.24×10⁻³. Determine gm, rd, Zi, Zo, Av.",
      questionImg: "Electronics-2/calc-images/calc_4_6_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_4_6_s.png",
        "Electronics-2/calc-images/calc_4_6_s2.png"
      ],
      fields: [
        { label: "gm", unit: "mS", answer: 1.32, tolerance: 0.1 },
        { label: "rd", unit: "kΩ", answer: 50, tolerance: 5 },
        { label: "Av", unit: "", answer: -3.41, tolerance: 0.3 }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // LECTURE 6: Op-Amp Analysis
  // ─────────────────────────────────────────────
  lec6: [
    {
      id: "calc_6_1",
      title: "Example 3.1 — Non-Inverting Op-Amp",
      description: "Determine Zin, Zout, and Acl. Given: Zin=2MΩ, Zout=75Ω, Aol=200,000.",
      questionImg: "Electronics-2/calc-images/calc_6_1_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_6_1_s.png",
        "Electronics-2/calc-images/calc_6_1_s2.png"
      ],
      fields: [
        { label: "Acl", unit: "", answer: 11, tolerance: 0.5 },
        { label: "Zin(CL)", unit: "MΩ", answer: 36.4, tolerance: 2 }
      ]
    },
    {
      id: "calc_6_2",
      title: "Example 3.2 — Inverting Op-Amp",
      description: "Determine v1, i1, i2, vO, iL, iO, voltage gain, current gain, and power gain.",
      questionImg: "Electronics-2/calc-images/calc_6_2_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_6_2_s.png",
        "Electronics-2/calc-images/calc_6_2_s2.png",
        "Electronics-2/calc-images/calc_6_2_s3.png"
      ],
      fields: [
        { label: "Av (Vo/Vi)", unit: "", answer: -10, tolerance: 0.5 },
        { label: "Vo", unit: "V", answer: -20, tolerance: 1 }
      ]
    },
    {
      id: "calc_6_3",
      title: "Example 3.3 — Op-Amp Impedance",
      description: "Find Zin(CL), Zout(CL), and closed-loop voltage gain. Zin=4MΩ, Zout=50Ω, Aol=50,000.",
      questionImg: "Electronics-2/calc-images/calc_6_3_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_6_3_s.png",
        "Electronics-2/calc-images/calc_6_3_s2.png"
      ],
      fields: [
        { label: "Acl", unit: "", answer: -10, tolerance: 0.5 }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // LECTURE 7: Op-Amp Applications
  // ─────────────────────────────────────────────
  lec7: [
    {
      id: "calc_7_6",
      title: "Example 3.6 — Summing Amplifier Output",
      description: "Determine the output voltage for the shown summing amplifier circuit.",
      questionImg: "Electronics-2/calc-images/calc_7_6_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_7_6_s.png",
        "Electronics-2/calc-images/calc_7_6_s2.png"
      ],
      fields: [
        { label: "Vo", unit: "V", answer: -8.5, tolerance: 0.5 }
      ]
    },
    {
      id: "calc_7_8",
      title: "Example 3.8 — Scaling Adder",
      description: "Determine the weight of each input voltage and find the output voltage.",
      questionImg: "Electronics-2/calc-images/calc_7_8_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_7_8_s.png",
        "Electronics-2/calc-images/calc_7_8_s2.png"
      ],
      fields: [
        { label: "Vo", unit: "V", answer: -6.2, tolerance: 0.5 }
      ]
    },
    {
      id: "calc_7_9",
      title: "Example 3.9 — Integrator Circuit",
      description: "Determine the rate of change of the output voltage. Pulse width = 100μs.",
      questionImg: "Electronics-2/calc-images/calc_7_9_q.png",
      solutionImgs: [
        "Electronics-2/calc-images/calc_7_9_s.png",
        "Electronics-2/calc-images/calc_7_9_s2.png"
      ],
      fields: [
        { label: "dVo/dt", unit: "V/s", answer: -50000, tolerance: 5000 }
      ]
    }
  ]
};

var CALC_TOPIC_META = {
  lec1: { name: "DC Transistor Analysis", icon: "🔋", sheet: "Lecture 1" },
  lec2: { name: "Small-Signal BJT Amplifiers", icon: "📐", sheet: "Lecture 2" },
  lec3: { name: "FET Small-Signal Analysis", icon: "⚡", sheet: "Lecture 3" },
  lec4: { name: "FET Configurations", icon: "🔧", sheet: "Lecture 4" },
  lec6: { name: "Op-Amp Analysis", icon: "🎛️", sheet: "Lecture 6" },
  lec7: { name: "Op-Amp Applications", icon: "📊", sheet: "Lecture 7" }
};
