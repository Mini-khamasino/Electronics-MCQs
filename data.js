// ============================================================
// Question Data — Auto-catalogued from image files
// ============================================================

const SUBJECTS = [
  {
    id: "electronic-circuits",
    name: "Electronic Circuits",
    icon: "⚡",
    description: "Transistor biasing, amplifier analysis, op-amps & filters",
    hasQuestions: true,
    categories: [
      {
        id: "ch1",
        name: "Chapter 1 — BJT Biasing & AC Analysis",
        icon: "📖",
        type: "chapter",
        questions: [
          {
            id: "ec-1.1",
            label: "Example 1.1",
            questionImg: "Electronic circuits/Written Questions/1.1.png",
            answerImg: ["Electronic circuits/Written Questions/1.1A.png"],
            summary: "Determine β, α, and Iₑ for a DC transistor (Iᵦ=50μA, Iᶜ=3.65mA)"
          },
          {
            id: "ec-1.2",
            label: "Example 1.2",
            questionImg: "Electronic circuits/Written Questions/1.2.png",
            answerImg: ["Electronic circuits/Written Questions/1.2A.png"],
            summary: "Fixed-bias BJT: Find Iᵦ, Iᶜ, Iₑ, Vᵦₑ, Vᶜₑ, Vᶜᵦ (β=150)"
          },
          {
            id: "ec-1.3",
            label: "Example 1.3",
            questionImg: "Electronic circuits/Written Questions/1.3.png",
            answerImg: ["Electronic circuits/Written Questions/1.3A.png"],
            summary: "Determine β, VCC and Rᵦ for emitter-stabilized circuit"
          },
          {
            id: "ec-1.4",
            label: "Example 1.4",
            questionImg: "Electronic circuits/Written Questions/1.4.png",
            answerImg: ["Electronic circuits/Written Questions/1.4A.png"],
            summary: "Collector-feedback bias: Find Iᶜ, Vᵦ, Vᶜ (β=90)"
          },
          {
            id: "ec-1.5",
            label: "Example 1.5",
            questionImg: "Electronic circuits/Written Questions/1.5.png",
            answerImg: ["Electronic circuits/Written Questions/1.5A.png"],
            summary: "Fixed-bias AC analysis: Determine Zᵢ, Zₒ, Aᵥ, Aᵢ (β=100)"
          },
          {
            id: "ec-1.6",
            label: "Example 1.6",
            questionImg: "Electronic circuits/Written Questions/1.6.png",
            answerImg: ["Electronic circuits/Written Questions/1.6A.png"],
            summary: "Voltage-divider bias AC: Determine Zᵢ, Zₒ, Aᵥ, Aᵢ (β=90)"
          },
          {
            id: "ec-1.7",
            label: "Example 1.7",
            questionImg: "Electronic circuits/Written Questions/1.7.png",
            answerImg: ["Electronic circuits/Written Questions/1.7A.png"],
            summary: "Emitter-follower: Find rₑ, Zᵢ, Zₒ, Aᵥ, Aᵢ (β=100)"
          },
          {
            id: "ec-1.8",
            label: "Example 1.8",
            questionImg: "Electronic circuits/Written Questions/1.8.png",
            answerImg: ["Electronic circuits/Written Questions/1.8A.png"],
            summary: "Common-base config: Find rₑ, Zᵢ, Zₒ, Aᵥ, Aᵢ (α=0.98)"
          },
          {
            id: "ec-1.9",
            label: "Example 1.9",
            questionImg: "Electronic circuits/Written Questions/1.9.png",
            answerImg: ["Electronic circuits/Written Questions/1.9A.png"],
            summary: "Unbypassed CE with RE: Find rₑ, Zᵢ, Zₒ, Aᵥ, Aᵢ (β=120)"
          }
        ]
      },
      {
        id: "ch2",
        name: "Chapter 2 — FET Analysis",
        icon: "📖",
        type: "chapter",
        questions: [
          {
            id: "ec-2.6",
            label: "Example 2.6",
            questionImg: "Electronic circuits/Written Questions/2.6.png",
            answerImg: ["Electronic circuits/Written Questions/2.6A.png"],
            summary: "E-MOSFET: Find gₘ, rₐ, Zᵢ, Zₒ, Aᵥ"
          },
          {
            id: "ec-2.9",
            label: "Example 2.9",
            questionImg: "Electronic circuits/Written Questions/2.9.png",
            answerImg: ["Electronic circuits/Written Questions/2.9A.png"],
            summary: "E-MOSFET voltage-divider: Determine Vₒ (Vᵢ=4mV)"
          }
        ]
      },
      {
        id: "ch3",
        name: "Chapter 3 — Op-Amp Circuits",
        icon: "📖",
        type: "chapter",
        questions: [
          {
            id: "ec-3.1",
            label: "Example 3.1",
            questionImg: "Electronic circuits/Written Questions/3.1.png",
            answerImg: ["Electronic circuits/Written Questions/3.1A.png"],
            summary: "Non-inverting op-amp: Zᵢₙ, Zₒᵤₜ, closed-loop gain"
          },
          {
            id: "ec-3.2",
            label: "Example 3.2",
            questionImg: "Electronic circuits/Written Questions/3.2.png",
            answerImg: ["Electronic circuits/Written Questions/3.2A.png"],
            summary: "Inverting op-amp: v₁, i₁, i₂, vₒ, iₗ, iₒ, gains"
          },
          {
            id: "ec-3.3",
            label: "Example 3.3",
            questionImg: "Electronic circuits/Written Questions/3.3.png",
            answerImg: ["Electronic circuits/Written Questions/3.3A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.4",
            label: "Example 3.4",
            questionImg: "Electronic circuits/Written Questions/3.4.png",
            answerImg: ["Electronic circuits/Written Questions/3.4A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.5",
            label: "Example 3.5",
            questionImg: "Electronic circuits/Written Questions/3.5.png",
            answerImg: ["Electronic circuits/Written Questions/3.5A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.6",
            label: "Example 3.6",
            questionImg: "Electronic circuits/Written Questions/3.6.png",
            answerImg: ["Electronic circuits/Written Questions/3.6A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.7",
            label: "Example 3.7",
            questionImg: "Electronic circuits/Written Questions/3.7.png",
            answerImg: ["Electronic circuits/Written Questions/3.7A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.8",
            label: "Example 3.8",
            questionImg: "Electronic circuits/Written Questions/3.8.png",
            answerImg: ["Electronic circuits/Written Questions/3.8A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.9",
            label: "Example 3.9",
            questionImg: "Electronic circuits/Written Questions/3.9.png",
            answerImg: ["Electronic circuits/Written Questions/3.9A.png"],
            summary: "Op-amp circuit analysis"
          },
          {
            id: "ec-3.10",
            label: "Example 3.10",
            questionImg: "Electronic circuits/Written Questions/3.10.png",
            answerImg: ["Electronic circuits/Written Questions/3.10A.png"],
            summary: "Op-amp circuit analysis"
          }
        ]
      },
      {
        id: "ch4",
        name: "Chapter 4 — Active Filters",
        icon: "📖",
        type: "chapter",
        questions: [
          {
            id: "ec-4.1",
            label: "Example 4.1",
            questionImg: "Electronic circuits/Written Questions/4.1.png",
            answerImg: ["Electronic circuits/Written Questions/4.1A.png"],
            summary: "First-order low-pass filter cutoff frequency"
          },
          {
            id: "ec-4.2",
            label: "Example 4.2",
            questionImg: "Electronic circuits/Written Questions/4.2.png",
            answerImg: ["Electronic circuits/Written Questions/4.2A.png"],
            summary: "Second-order high-pass filter cutoff frequency"
          },
          {
            id: "ec-4.3",
            label: "Example 4.3",
            questionImg: "Electronic circuits/Written Questions/4.3.png",
            answerImg: ["Electronic circuits/Written Questions/4.3A.png"],
            summary: "Band-pass filter cutoff frequencies"
          }
        ]
      },
      {
        id: "sh1",
        name: "Sheet 1 — BJT Problems",
        icon: "📋",
        type: "sheet",
        questions: [
          {
            id: "ec-sh1.1",
            label: "Sheet 1 – Q1",
            questionImg: "Electronic circuits/Written Questions/sh1.1.png",
            answerImg: ["Electronic circuits/Written Questions/sh1.1A.png"],
            summary: "Voltage-divider bias: Calculate Vᵦ, Vₑ, Vᶜ"
          },
          {
            id: "ec-sh1.2",
            label: "Sheet 1 – Q2",
            questionImg: "Electronic circuits/Written Questions/sh1.2.png",
            answerImg: ["Electronic circuits/Written Questions/sh1.2A.png"],
            summary: "BJT circuit analysis problem"
          },
          {
            id: "ec-sh1.3",
            label: "Sheet 1 – Q3",
            questionImg: "Electronic circuits/Written Questions/sh1.3.png",
            answerImg: ["Electronic circuits/Written Questions/sh1.3A.png"],
            summary: "BJT circuit analysis problem"
          }
        ]
      },
      {
        id: "sh2",
        name: "Sheet 2 — FET Problems",
        icon: "📋",
        type: "sheet",
        questions: [
          {
            id: "ec-sh2.6",
            label: "Sheet 2 – Q6",
            questionImg: "Electronic circuits/Written Questions/sh2.6.png",
            answerImg: ["Electronic circuits/Written Questions/sh2.6A.png"],
            summary: "FET circuit analysis problem"
          }
        ]
      },
      {
        id: "sh3",
        name: "Sheet 3 — Op-Amp Problems",
        icon: "📋",
        type: "sheet",
        questions: [
          {
            id: "ec-sh3.1",
            label: "Sheet 3 – Q1",
            questionImg: "Electronic circuits/Written Questions/sh3.1.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.1A.png"],
            summary: "Op-amp: Find i₁, v₁, i₁, i₂, vₒ, iₗ, iₒ, voltage gain"
          },
          {
            id: "ec-sh3.2",
            label: "Sheet 3 – Q2",
            questionImg: "Electronic circuits/Written Questions/sh3.2.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.2A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.3",
            label: "Sheet 3 – Q3",
            questionImg: "Electronic circuits/Written Questions/sh3.3.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.3A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.4",
            label: "Sheet 3 – Q4",
            questionImg: "Electronic circuits/Written Questions/sh3.4.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.4A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.5",
            label: "Sheet 3 – Q5",
            questionImg: "Electronic circuits/Written Questions/sh3.5.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.5A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.6",
            label: "Sheet 3 – Q6",
            questionImg: "Electronic circuits/Written Questions/sh3.6.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.6A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.7",
            label: "Sheet 3 – Q7",
            questionImg: "Electronic circuits/Written Questions/sh3.7.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.7A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.8",
            label: "Sheet 3 – Q8",
            questionImg: "Electronic circuits/Written Questions/sh3.8.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.8A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.9",
            label: "Sheet 3 – Q9",
            questionImg: "Electronic circuits/Written Questions/sh3.9.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.9A.png"],
            summary: "Op-amp circuit problem"
          },
          {
            id: "ec-sh3.10",
            label: "Sheet 3 – Q10",
            questionImg: "Electronic circuits/Written Questions/sh3.10.png",
            answerImg: ["Electronic circuits/Written Questions/sh3.10A.png"],
            summary: "Op-amp circuit problem"
          }
        ]
      }
    ]
  },
  {
    id: "ai",
    name: "AI",
    icon: "🤖",
    description: "Artificial Intelligence",
    hasQuestions: false,
    categories: []
  },
  {
    id: "control-1",
    name: "Control 1",
    icon: "🎛️",
    description: "Control Systems",
    hasQuestions: false,
    categories: []
  },
  {
    id: "law",
    name: "Law & Human Rights",
    icon: "⚖️",
    description: "Law and Human Rights",
    hasQuestions: false,
    categories: []
  },
  {
    id: "logic-2",
    name: "Logic 2",
    icon: "🔢",
    description: "Digital Logic Design",
    hasQuestions: false,
    categories: []
  },
  {
    id: "network-2",
    name: "Network 2",
    icon: "🌐",
    description: "Computer Networks",
    hasQuestions: false,
    categories: []
  }
];
