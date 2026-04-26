// ============================================================
// Electronics II — MCQ Question Bank
// Extracted from course PDFs (Sheet 1 Parts 1 & 2, Sheet 2 Part 1)
// ============================================================

var QUESTIONS = {

  // ─────────────────────────────────────────────
  // SHEET 1 — PART 1: BJT Fundamentals (42 Qs)
  // ─────────────────────────────────────────────
  sheet1p1: [
    {
      id: "s1p1_1",
      q: "A BJT consists of how many semiconductor layers?",
      options: ["1", "2", "3", "4"],
      answer: 2, // c) 3
      explanation: "A BJT has three semiconductor layers: Emitter, Base, and Collector."
    },
    {
      id: "s1p1_2",
      q: "The emitter region of a BJT is:",
      options: ["Lightly doped and thin", "Heavily doped and thin", "Heavily doped and thick", "Lightly doped and thick"],
      answer: 1, // b) Heavily doped and thin
      explanation: "The emitter is heavily doped to inject maximum carriers into the base."
    },
    {
      id: "s1p1_3",
      q: "The base region of a BJT is:",
      options: ["Thin and heavily doped", "Thick and lightly doped", "Thin and lightly doped", "Thick and heavily doped"],
      answer: 2, // c) Thin and lightly doped
      explanation: "The base is thin and lightly doped so most carriers pass through to the collector."
    },
    {
      id: "s1p1_4",
      q: "The collector region of a BJT is:",
      options: ["Moderately doped and thick", "Heavily doped and thin", "Lightly doped and thin", "Heavily doped and thick"],
      answer: 0, // a) Moderately doped and thick
      explanation: "The collector is moderately doped and larger to collect carriers and dissipate heat."
    },
    {
      id: "s1p1_5",
      q: "In an NPN transistor, the majority carriers in the emitter are:",
      options: ["Holes", "Electrons", "Both holes and electrons equally", "None"],
      answer: 1, // b) Electrons
      explanation: "In NPN, the emitter is n-type, so the majority carriers are electrons."
    },
    {
      id: "s1p1_6",
      q: "Why is the collector region made larger than the emitter?",
      options: ["To reduce cost", "To improve frequency response", "To dissipate more heat", "To reduce recombination"],
      answer: 2, // c) To dissipate more heat
      explanation: "The larger collector area allows better heat dissipation during operation."
    },
    {
      id: "s1p1_7",
      q: "Which BJT configuration provides the highest current gain (β)?",
      options: ["Common Base", "Common Emitter", "Common Collector", "None"],
      answer: 1, // b) Common Emitter
      explanation: "Common Emitter provides the highest current gain β = IC/IB."
    },
    {
      id: "s1p1_8",
      q: "Which configuration provides the highest input resistance?",
      options: ["Common Base", "Common Emitter", "Common Collector", "All equal"],
      answer: 2, // c) Common Collector
      explanation: "Common Collector (emitter follower) has the highest input impedance ≈ β·RE."
    },
    {
      id: "s1p1_9",
      q: "Which configuration provides the highest voltage gain?",
      options: ["Common Base", "Common Emitter", "Common Collector", "None"],
      answer: 0, // a) Common Base
      explanation: "Common Base provides the highest voltage gain (Av = RC/re) with no phase inversion."
    },
    {
      id: "s1p1_10",
      q: "Which configuration has a phase shift of 180° between input and output?",
      options: ["Common Base", "Common Emitter", "Common Collector", "None"],
      answer: 1, // b) Common Emitter
      explanation: "Only Common Emitter introduces a 180° phase shift between input and output."
    },
    {
      id: "s1p1_11",
      q: "Which configuration is also called an emitter follower?",
      options: ["Common Base", "Common Emitter", "Common Collector", "None"],
      answer: 2, // c) Common Collector
      explanation: "Common Collector is called emitter follower because the output follows the input (Av ≈ 1)."
    },
    {
      id: "s1p1_12",
      q: "In a common-base transistor, the current gain (α) is typically:",
      options: ["Less than 0.5", "Between 0.9 and 0.99", "Equal to β", "Greater than 100"],
      answer: 1, // b) Between 0.9 and 0.99
      explanation: "α = IC/IE is always less than 1, typically between 0.9 and 0.99."
    },
    {
      id: "s1p1_13",
      q: "The configuration most suitable for impedance matching is:",
      options: ["CB", "CE", "CC", "None"],
      answer: 2, // c) CC
      explanation: "CC (emitter follower) has high Zin and low Zout, ideal for impedance matching/buffering."
    },
    {
      id: "s1p1_14",
      q: "The total current flowing into a transistor is:",
      options: ["IE = IB + IC", "IC = IE + IB", "IB = IE + IC", "None"],
      answer: 0, // a) IE = IB + IC
      explanation: "By KCL, the emitter current equals the sum of base and collector currents: IE = IB + IC."
    },
    {
      id: "s1p1_15",
      q: "In a transistor, the largest current is usually:",
      options: ["Base current IB", "Collector current IC", "Emitter current IE", "All are equal"],
      answer: 2, // c) Emitter current IE
      explanation: "IE = IB + IC, so emitter current is the largest."
    },
    {
      id: "s1p1_16",
      q: "If the emitter current is 10 mA and base current is 0.2 mA, the collector current is:",
      options: ["9.8 mA", "10.2 mA", "9.6 mA", "0.2 mA"],
      answer: 0, // a) 9.8 mA
      explanation: "IC = IE − IB = 10 − 0.2 = 9.8 mA."
    },
    {
      id: "s1p1_17",
      q: "The relation between current gain in common base (α) and common emitter (β) is:",
      options: ["β = α/(1−α)", "α = β/(1+β)", "Both a & b", "None"],
      answer: 2, // c) Both a & b
      explanation: "Both relations are equivalent: β = α/(1−α) and α = β/(1+β)."
    },
    {
      id: "s1p1_18",
      q: "If α = 0.98, then β is approximately:",
      options: ["25", "49", "98", "100"],
      answer: 1, // b) 49
      explanation: "β = α/(1−α) = 0.98/0.02 = 49."
    },
    {
      id: "s1p1_19",
      q: "If β = 100 and base current IB = 40μA, then collector current IC is:",
      options: ["4 mA", "40 mA", "0.4 mA", "400 mA"],
      answer: 0, // a) 4 mA
      explanation: "IC = β × IB = 100 × 40μA = 4000μA = 4 mA."
    },
    {
      id: "s1p1_20",
      q: "In a transistor, the smallest current is generally:",
      options: ["Emitter current IE", "Collector current IC", "Base current IB", "None"],
      answer: 2, // c) Base current IB
      explanation: "Base current IB is the smallest since IE = IB + IC and IC ≈ β·IB."
    },
    {
      id: "s1p1_21",
      q: "The purpose of transistor biasing is:",
      options: ["To increase gain", "To keep the transistor in active region", "To reduce noise", "To increase frequency response"],
      answer: 1, // b) To keep the transistor in active region
      explanation: "Biasing establishes the DC operating point (Q-point) in the active region for proper amplification."
    },
    {
      id: "s1p1_22",
      q: "Which biasing method provides the best stability?",
      options: ["Fixed bias", "Collector-to-base bias", "Voltage-divider bias", "None"],
      answer: 2, // c) Voltage-divider bias
      explanation: "Voltage-divider bias provides the best Q-point stability against β variations."
    },
    {
      id: "s1p1_23",
      q: "In fixed bias, the base resistor is connected between:",
      options: ["Base and ground", "Base and collector", "Base and supply VCC", "Collector and ground"],
      answer: 2, // c) Base and supply VCC
      explanation: "In fixed bias, RB connects from the base directly to VCC."
    },
    {
      id: "s1p1_24",
      q: "The DC operating point of a transistor is called:",
      options: ["Load line", "Q-point", "Bias point", "Both b & c"],
      answer: 3, // d) Both b & c
      explanation: "The DC operating point is called both Q-point (quiescent point) and bias point."
    },
    {
      id: "s1p1_25",
      q: "Which biasing method is most commonly used in amplifiers?",
      options: ["Fixed bias", "Voltage-divider bias", "Emitter bias", "Collector feedback bias"],
      answer: 1, // b) Voltage-divider bias
      explanation: "Voltage-divider bias is most common due to its excellent stability."
    },
    {
      id: "s1p1_26",
      q: "The small-signal model of a BJT is valid for:",
      options: ["Large input signals", "Small input signals (mV range)", "Both small and large input signals", "DC signals only"],
      answer: 1, // b) Small input signals (mV range)
      explanation: "The small-signal model linearizes around the Q-point and is valid only for small AC signals."
    },
    {
      id: "s1p1_27",
      q: "In the AC equivalent circuit of a BJT, coupling capacitors are considered as:",
      options: ["Open circuit", "Short circuit", "Resistors", "Current sources"],
      answer: 1, // b) Short circuit
      explanation: "Coupling capacitors have very low reactance at signal frequencies, so they are treated as short circuits in AC analysis."
    },
    {
      id: "s1p1_28",
      q: "In AC equivalent analysis, the DC supply voltage VCC is considered as:",
      options: ["Open circuit", "Short circuit (AC ground)", "Voltage source", "Current source"],
      answer: 1, // b) Short circuit (AC ground)
      explanation: "DC supply has zero AC impedance, so VCC is treated as AC ground."
    },
    {
      id: "s1p1_29",
      q: "The small-signal voltage gain of a common-collector amplifier is approximately:",
      options: ["Av ≈ 0", "Av ≈ 1", "Av ≈ −gm·RC", "Av ≈ β"],
      answer: 1, // b) Av ≈ 1
      explanation: "CC amplifier is an emitter follower with voltage gain close to 1."
    },
    {
      id: "s1p1_30",
      q: "In the fixed-bias CE circuit the base bias resistor RB is connected between:",
      options: ["Base and collector", "Base and ground", "Base and VCC", "Base and emitter"],
      answer: 2, // c) Base and VCC
      explanation: "In a fixed-bias CE circuit, RB connects the base to VCC to set the base current."
    },
    {
      id: "s1p1_31",
      q: "In fixed bias, the DC collector current IC is primarily determined by:",
      options: ["RC only", "RB only", "VCC only", "RB, VCC and transistor β"],
      answer: 3, // d) RB, VCC and transistor β
      explanation: "IC = β·IB where IB = (VCC − VBE)/RB, so IC depends on RB, VCC, and β."
    },
    {
      id: "s1p1_32",
      q: "For a fixed-bias CE, if base-emitter voltage is assumed 0.7 V and RB increases, the collector current IC will:",
      options: ["Increase", "Decrease", "Remain same", "Become zero"],
      answer: 1, // b) Decrease
      explanation: "IB = (VCC − 0.7)/RB. Increasing RB decreases IB, hence IC = β·IB decreases."
    },
    {
      id: "s1p1_33",
      q: "Given: VCC=12V, RB=240kΩ, RC=2kΩ, VBE=0.7V, β=100. Approximately find IC.",
      options: ["0.47 mA", "4.71 mA", "47.1 mA", "0.047 mA"],
      answer: 1, // b) 4.71 mA
      explanation: "IB = (12−0.7)/240k = 47.1μA, IC = β·IB = 100 × 47.1μA = 4.71 mA."
    },
    {
      id: "s1p1_34",
      q: "Given: VCC=12V, RB=240kΩ, RC=2kΩ, VBE=0.7V, β=100. Approximately find VCE.",
      options: ["9.42 V", "2.58 V", "12 V", "0.7 V"],
      answer: 1, // b) 2.58 V
      explanation: "VCE = VCC − IC·RC = 12 − 4.71×2 = 12 − 9.42 = 2.58V."
    },
    {
      id: "s1p1_35",
      q: "If the transistor in fixed bias goes into saturation, which statement is true?",
      options: ["IC = β·IB still holds exactly", "VCE falls close to VCE(sat) and IC no longer equals β·IB", "Base current becomes zero", "Collector resistor is bypassed"],
      answer: 1, // b)
      explanation: "In saturation, VCE drops to VCE(sat) ≈ 0.2V and the relation IC = β·IB no longer holds."
    },
    {
      id: "s1p1_36",
      q: "Which practical modification improves stability compared with fixed bias?",
      options: ["Increasing RB only", "Voltage-divider bias or emitter-feedback (emitter resistor)", "Removing RC", "Reducing VCC to zero"],
      answer: 1, // b)
      explanation: "Adding an emitter resistor or using voltage-divider bias provides negative feedback that stabilizes the Q-point."
    },
    {
      id: "s1p1_37",
      q: "For small-signal AC analysis of a fixed-bias CE amplifier (with coupling capacitors large enough):",
      options: ["The DC bias network appears as AC open circuit", "The DC supply VCC is AC ground", "RB is always removed for AC", "RC is bypassed by the coupling capacitor"],
      answer: 1, // b)
      explanation: "In AC analysis, VCC is treated as AC ground (zero impedance for AC)."
    },
    {
      id: "s1p1_38",
      q: "In voltage-divider bias, the base voltage VB is approximately:",
      options: ["VB = (R2/(R1+R2))·VCC", "VB = (R1/(R1+R2))·VCC", "VB = VCC", "VB = 0.7 V"],
      answer: 0, // a)
      explanation: "The voltage divider formed by R1 and R2 gives VB = R2·VCC/(R1+R2)."
    },
    {
      id: "s1p1_39",
      q: "The emitter voltage in voltage-divider bias is given by:",
      options: ["VE = VB − VBE", "VE = VB + VBE", "VE = VCC − VBE", "VE = IB·RB"],
      answer: 0, // a)
      explanation: "VE = VB − VBE (the base-emitter junction drops about 0.7V)."
    },
    {
      id: "s1p1_40",
      q: "The collector voltage is approximately:",
      options: ["VC = VCC − IC·RC", "VC = VB − VBE", "VC = IC·RE", "VC = VCC"],
      answer: 0, // a)
      explanation: "VC = VCC − IC·RC from KVL around the collector loop."
    },
    {
      id: "s1p1_41",
      q: "The emitter resistor RE in voltage-divider bias helps to:",
      options: ["Reduce β dependence", "Increase input resistance", "Improve stability by negative feedback", "All of the above"],
      answer: 3, // d) All of the above
      explanation: "RE provides negative feedback, reduces β dependence, and improves both stability and input impedance."
    },
    {
      id: "s1p1_42",
      q: "If VCC=12V, R1=40kΩ, R2=10kΩ, find the base voltage VB.",
      options: ["3 V", "2.4 V", "9 V", "12 V"],
      answer: 1, // b) 2.4 V
      explanation: "VB = R2·VCC/(R1+R2) = 10k×12/(40k+10k) = 120/50 = 2.4V."
    }
  ],

  // ─────────────────────────────────────────────
  // SHEET 1 — PART 2: CC & CB Amplifiers (42 Qs)
  // ─────────────────────────────────────────────
  sheet1p2: [
    {
      id: "s1p2_1",
      q: "For a CC amplifier, the voltage gain is approximately:",
      options: [">> 1", "<< 1", "≈ 1", "Negative"],
      answer: 2,
      explanation: "CC amplifier (emitter follower) has a voltage gain approximately equal to 1."
    },
    {
      id: "s1p2_2",
      q: "For a CC amplifier, if IE = 2mA, then re = ?",
      options: ["5 Ω", "12.5 Ω", "25 Ω", "50 Ω"],
      answer: 1,
      explanation: "re = 25mV / IE = 25mV / 2mA = 12.5 Ω."
    },
    {
      id: "s1p2_3",
      q: "For a CC amplifier: β=100, RE=1kΩ, RB=100kΩ. Input impedance ≈ ?",
      options: ["5 kΩ", "12 kΩ", "100 Ω", "50 kΩ"],
      answer: 3,
      explanation: "Zin = RB ∥ β·RE = 100k ∥ (100×1k) = 100k ∥ 100k = 50 kΩ."
    },
    {
      id: "s1p2_4",
      q: "For a CC amplifier, if RE >> re, Av is:",
      options: ["0", "≈ 1", "β", "−β"],
      answer: 1,
      explanation: "Av = RE/(RE + re). If RE >> re, then Av ≈ 1."
    },
    {
      id: "s1p2_5",
      q: "For a CC amplifier, if RE = 1kΩ and re = 10Ω, Av ≈ ?",
      options: ["0", "≈ 1", "β", "−β"],
      answer: 1,
      explanation: "Av = 1000/1010 = 0.99 ≈ 1."
    },
    {
      id: "s1p2_6",
      q: "Output impedance of CC approximately:",
      options: ["RC", "β·re", "re ∥ RE", "RB"],
      answer: 2,
      explanation: "The output impedance of a CC amplifier is approximately re ∥ RE."
    },
    {
      id: "s1p2_7",
      q: "For a CC amplifier, if re = 10Ω and RE = 1kΩ, Zout ≈ ?",
      options: ["10 Ω", "10 kΩ", "100 Ω", "100 kΩ"],
      answer: 0,
      explanation: "Zout ≈ re ∥ RE ≈ 10 Ω (since re << RE)."
    },
    {
      id: "s1p2_8",
      q: "CC amplifier provides:",
      options: ["High voltage gain", "High current gain", "Phase inversion", "Low input impedance"],
      answer: 1,
      explanation: "CC amplifier has Av ≈ 1 but provides high current gain (Ai ≈ β + 1)."
    },
    {
      id: "s1p2_9",
      q: "Phase difference between input & output in CC:",
      options: ["180°", "90°", "0°", "45°"],
      answer: 2,
      explanation: "CC amplifier has no phase inversion — the phase difference is 0°."
    },
    {
      id: "s1p2_10",
      q: "For CC amplifier: β=50, RE=2kΩ, RB=200kΩ. Find Zin:",
      options: ["66.7 kΩ", "200 kΩ", "2 kΩ", "120 kΩ"],
      answer: 0,
      explanation: "β·RE = 50×2k = 100kΩ. Zin = 200k ∥ 100k = 66.7 kΩ."
    },
    {
      id: "s1p2_11",
      q: "If IE = 1mA → re = ?",
      options: ["1 kΩ", "10 Ω", "25 Ω", "250 Ω"],
      answer: 2,
      explanation: "re = 25mV / 1mA = 25 Ω."
    },
    {
      id: "s1p2_12",
      q: "If RE = 500Ω, re = 25Ω → Av ≈ ?",
      options: ["0.95", "100", "1", "0.85"],
      answer: 0,
      explanation: "Av = RE/(RE + re) = 500/525 ≈ 0.95."
    },
    {
      id: "s1p2_13",
      q: "CC is mainly used as:",
      options: ["Voltage amplifier", "RF amplifier", "Buffer", "None of these"],
      answer: 2,
      explanation: "CC amplifier is mainly used as a buffer (impedance matching) due to high Zin and low Zout."
    },
    {
      id: "s1p2_14",
      q: "Current gain of CC ≈",
      options: ["β + 1", "β", "1/β", "α"],
      answer: 0,
      explanation: "The current gain of a common collector amplifier is approximately β + 1."
    },
    {
      id: "s1p2_15",
      q: "For CC amplifier, if β = 100 → Ai ≈",
      options: ["100", "101", "90", "0.01"],
      answer: 1,
      explanation: "Ai ≈ β + 1 = 100 + 1 = 101."
    },
    {
      id: "s1p2_16",
      q: "For CC amplifier, increasing RE makes Av:",
      options: ["Closer to 0", "100", "Closer to 1", "Closer to 2"],
      answer: 2,
      explanation: "Av = RE/(RE + re). As RE increases, the ratio approaches 1."
    },
    {
      id: "s1p2_17",
      q: "In CC, if RB is very small → Zin becomes:",
      options: ["High", "Small", "Zero", "Equal β"],
      answer: 1,
      explanation: "Zin = RB ∥ β·RE. If RB is very small, Zin ≈ RB, which is small."
    },
    {
      id: "s1p2_18",
      q: "CC has ______ output impedance.",
      options: ["High", "Low", "Moderate", "Zero"],
      answer: 1,
      explanation: "CC amplifier has low output impedance (≈ re), which is one of its key features."
    },
    {
      id: "s1p2_19",
      q: "If RE = 5kΩ and re = 20Ω → Av ≈ ?",
      options: ["10", "0", "100", "0.996"],
      answer: 3,
      explanation: "Av = 5000/5020 = 0.996 ≈ 1."
    },
    {
      id: "s1p2_20",
      q: "For CC, if IE increases → re:",
      options: ["Decreases", "Increases", "Not affected", "Zero"],
      answer: 0,
      explanation: "re = 25mV/IE. As IE increases, re decreases."
    },
    {
      id: "s1p2_21",
      q: "For CC, if β doubles, Zin:",
      options: ["Decreases", "Increases", "Not affected", "Zero"],
      answer: 1,
      explanation: "Zin = RB ∥ β·RE. If β doubles, β·RE doubles, so Zin increases."
    },
    {
      id: "s1p2_22",
      q: "Best configuration for impedance matching:",
      options: ["CB", "CE", "CC", "None of them"],
      answer: 2,
      explanation: "CC has high Zin and low Zout, making it ideal for impedance matching."
    },
    {
      id: "s1p2_23",
      q: "For CC, if re = 5Ω, RE = 100Ω → Zout ≈",
      options: ["100 Ω", "10 Ω", "5 Ω", "Zero"],
      answer: 2,
      explanation: "Zout ≈ re ∥ RE ≈ 5 Ω (since re << RE)."
    },
    {
      id: "s1p2_24",
      q: "CB voltage gain formula:",
      options: ["RC / re", "α", "−α", "re"],
      answer: 0,
      explanation: "The voltage gain of the Common Base amplifier is Av = RC / re."
    },
    {
      id: "s1p2_25",
      q: "For CB, if IE = 1mA → re =",
      options: ["Zero", "25 kΩ", "1 kΩ", "25 Ω"],
      answer: 3,
      explanation: "re = 25mV / IE = 25mV / 1mA = 25 Ω."
    },
    {
      id: "s1p2_26",
      q: "If RC = 2kΩ, re = 20Ω → Av = ?",
      options: ["Zero", "100", "20", "1"],
      answer: 1,
      explanation: "Av = RC/re = 2000/20 = 100."
    },
    {
      id: "s1p2_27",
      q: "CB input impedance ≈",
      options: ["β·re", "RC", "re", "RB"],
      answer: 2,
      explanation: "The input impedance of a CB amplifier is approximately re (very low)."
    },
    {
      id: "s1p2_28",
      q: "For CB, if RC = 5kΩ and re = 25Ω → Av = ?",
      options: ["100", "200", "1", "0.2"],
      answer: 1,
      explanation: "Av = RC/re = 5000/25 = 200."
    },
    {
      id: "s1p2_29",
      q: "CB with β = 100, current gain ≈",
      options: ["100", "10", "0.1", "0.99"],
      answer: 3,
      explanation: "α = β/(β+1) = 100/101 = 0.99. CB current gain ≈ α ≈ 0.99."
    },
    {
      id: "s1p2_30",
      q: "CB output impedance ≈",
      options: ["re ∥ RE", "RC", "RB ∥ β·RE", "Zb"],
      answer: 1,
      explanation: "The output impedance of a CB amplifier is approximately RC."
    },
    {
      id: "s1p2_31",
      q: "Phase shift in CB:",
      options: ["0°", "180°"],
      answer: 0,
      explanation: "Common Base has no phase inversion — the phase shift is 0°."
    },
    {
      id: "s1p2_32",
      q: "If RC increases → Av (for CB, Av = RC/re):",
      options: ["Does not change", "Decreases", "Increases", "Av = 1"],
      answer: 2,
      explanation: "Since Av = RC/re, increasing RC directly increases Av."
    },
    {
      id: "s1p2_33",
      q: "If IE increases → re decreases → Av (for CB):",
      options: ["Does not change", "Decreases", "Increases", "Av = 1"],
      answer: 2,
      explanation: "If re decreases, then Av = RC/re increases."
    },
    {
      id: "s1p2_34",
      q: "If IE = 5mA → re = ?",
      options: ["5 Ω", "50 Ω", "0.5 Ω", "1 kΩ"],
      answer: 0,
      explanation: "re = 25mV / 5mA = 5 Ω."
    },
    {
      id: "s1p2_35",
      q: "For CB, if RC = 3kΩ, IE = 5mA, then Av = ?",
      options: ["600", "1", "1500", "100"],
      answer: 0,
      explanation: "re = 25mV/5mA = 5Ω. Av = RC/re = 3000/5 = 600."
    },
    {
      id: "s1p2_36",
      q: "CB is suitable for:",
      options: ["High-frequency applications", "Buffer Amplifier", "Voltage Amplifier", "All of the above"],
      answer: 0,
      explanation: "CB is best suited for high-frequency applications due to its low Miller effect."
    },
    {
      id: "s1p2_37",
      q: "CB has ______ input impedance.",
      options: ["High", "Very low", "Moderate", "Zero"],
      answer: 1,
      explanation: "CB input impedance ≈ re, which is very low (typically 5–25 Ω)."
    },
    {
      id: "s1p2_38",
      q: "If β = 50 → α = ?",
      options: ["100", "1", "0.98", "1.02"],
      answer: 2,
      explanation: "α = β/(β+1) = 50/51 ≈ 0.98."
    },
    {
      id: "s1p2_39",
      q: "CB amplifier is:",
      options: ["Inverting", "Non-inverting"],
      answer: 1,
      explanation: "CB amplifier is non-inverting — no phase shift between input and output."
    },
    {
      id: "s1p2_40",
      q: "Lowest Zin configuration:",
      options: ["CC", "CE", "CC and CE", "CB"],
      answer: 3,
      explanation: "CB has the lowest input impedance (≈ re) among BJT configurations."
    },
    {
      id: "s1p2_41",
      q: "Highest voltage gain among single BJT:",
      options: ["CC", "CE", "CC and CE", "CB"],
      answer: 3,
      explanation: "CB provides the highest voltage gain (Av = RC/re) among single BJT configurations."
    },
    {
      id: "s1p2_42",
      q: "CB current gain is:",
      options: ["≈ 1 but < 1", "≈ 1 but > 1", "≈ 100", "≈ 200"],
      answer: 0,
      explanation: "CB current gain = α = β/(β+1), which is slightly less than 1."
    }
  ],

  // ─────────────────────────────────────────────
  // SHEET 2 — PART 1: FET & MOSFET (44 Qs)
  // ─────────────────────────────────────────────
  sheet2p1: [
    {
      id: "s2p1_1",
      q: "A FET is a:",
      options: ["Current controlled device", "Voltage controlled device", "Power controlled device", "Temperature controlled device"],
      answer: 1,
      explanation: "FET is a voltage controlled device — drain current is controlled by gate-source voltage VGS."
    },
    {
      id: "s2p1_2",
      q: "A BJT is controlled by:",
      options: ["VGS", "ID", "IB", "VDS"],
      answer: 2,
      explanation: "BJT is a current controlled device — collector current is controlled by base current IB."
    },
    {
      id: "s2p1_3",
      q: "FET terminals are:",
      options: ["Base, Collector, Emitter", "Gate, Source, Drain", "Gate, Collector, Source", "Base, Drain, Source"],
      answer: 1,
      explanation: "The three terminals of a FET are Gate, Source, and Drain."
    },
    {
      id: "s2p1_4",
      q: "In BJT, collector current depends mainly on:",
      options: ["VGS", "IB", "VP", "IDSS"],
      answer: 1,
      explanation: "In a BJT, IC = β·IB, so the collector current depends mainly on base current IB."
    },
    {
      id: "s2p1_5",
      q: "In FET, drain current depends on:",
      options: ["IB", "VBE", "VGS", "VCE"],
      answer: 2,
      explanation: "In a FET, drain current ID depends on the gate-source voltage VGS."
    },
    {
      id: "s2p1_6",
      q: "Majority carriers in n-channel FET are:",
      options: ["Holes", "Electrons", "Ions", "Protons"],
      answer: 1,
      explanation: "In n-channel FET, current flows through electrons (majority carriers in n-type)."
    },
    {
      id: "s2p1_7",
      q: "Mobility in n-channel device compared to p-channel is:",
      options: ["Lower", "Equal", "Higher", "Zero"],
      answer: 2,
      explanation: "Electrons have higher mobility than holes, making n-channel devices faster."
    },
    {
      id: "s2p1_8",
      q: "FET input impedance is generally:",
      options: ["Low", "Medium", "Very high", "Zero"],
      answer: 2,
      explanation: "FET has a very high input impedance because the gate is insulated (or reverse-biased)."
    },
    {
      id: "s2p1_9",
      q: "In n-channel enhancement MOSFET, substrate is:",
      options: ["n-type", "p-type", "Intrinsic", "Metal"],
      answer: 1,
      explanation: "In n-channel E-MOSFET, the substrate is p-type, and the channel is induced by positive VGS."
    },
    {
      id: "s2p1_10",
      q: "In p-channel enhancement MOSFET, source and drain are:",
      options: ["n-type", "p-type", "Intrinsic", "Metal"],
      answer: 1,
      explanation: "In p-channel E-MOSFET, source and drain regions are p-type."
    },
    {
      id: "s2p1_11",
      q: "Enhancement MOSFET requires:",
      options: ["No gate voltage", "Negative VGS only", "Positive or negative VGS to create channel", "Zero VDS"],
      answer: 2,
      explanation: "Enhancement MOSFET needs a gate voltage (positive for n-channel, negative for p-channel) to create the conducting channel."
    },
    {
      id: "s2p1_12",
      q: "n-channel MOSFET turns ON when:",
      options: ["VGS negative", "VGS positive", "VDS = 0", "ID = 0"],
      answer: 1,
      explanation: "n-channel MOSFET requires positive VGS > VT (threshold) to turn ON."
    },
    {
      id: "s2p1_13",
      q: "Majority carriers in p-channel MOSFET are:",
      options: ["Electrons", "Holes", "Neutrons", "Ions"],
      answer: 1,
      explanation: "In p-channel MOSFET, current flows through holes (majority carriers in p-type)."
    },
    {
      id: "s2p1_14",
      q: "Current direction in n-channel MOSFET is:",
      options: ["Source → Drain", "Drain → Source", "Gate → Drain", "Gate → Source"],
      answer: 1,
      explanation: "Conventional current flows from Drain to Source in n-channel MOSFET."
    },
    {
      id: "s2p1_15",
      q: "Speed of n-channel device compared to p-channel is:",
      options: ["Slower", "Same", "Faster", "Zero"],
      answer: 2,
      explanation: "n-channel is faster because electrons have higher mobility than holes."
    },
    {
      id: "s2p1_16",
      q: "In depletion MOSFET, applying opposite gate voltage:",
      options: ["Enhances channel", "Depletes channel", "Removes substrate", "Increases breakdown"],
      answer: 1,
      explanation: "Applying opposite polarity gate voltage depletes the existing channel of carriers."
    },
    {
      id: "s2p1_17",
      q: "Enhancement MOSFET source and drain are:",
      options: ["Physically connected", "Physically separated", "Shorted", "Floating"],
      answer: 1,
      explanation: "Source and drain are physically separated; the channel must be induced by gate voltage."
    },
    {
      id: "s2p1_18",
      q: "n-channel JFET gate is made of:",
      options: ["n-type", "p-type", "Metal", "Intrinsic"],
      answer: 1,
      explanation: "In n-channel JFET, the gate is p-type to form a reverse-biased pn junction."
    },
    {
      id: "s2p1_19",
      q: "At VGS = 0, JFET is normally:",
      options: ["OFF", "ON", "Saturated", "Breakdown"],
      answer: 1,
      explanation: "JFET is a normally-ON (depletion-mode) device — channel conducts at VGS = 0."
    },
    {
      id: "s2p1_20",
      q: "Pinch-off occurs when:",
      options: ["Channel widens", "ID maximum", "Channel is blocked", "VGS = 0"],
      answer: 2,
      explanation: "Pinch-off occurs when the depletion regions meet and the channel is blocked."
    },
    {
      id: "s2p1_21",
      q: "At pinch-off:",
      options: ["ID = IDSS", "ID = 0", "VDS = 0", "gm = 0"],
      answer: 1,
      explanation: "At the pinch-off voltage (VGS = VP), the channel is fully depleted and ID = 0."
    },
    {
      id: "s2p1_22",
      q: "Ohmic region behaves like:",
      options: ["Amplifier", "Switch", "Resistor", "Oscillator"],
      answer: 2,
      explanation: "In the ohmic (linear) region, the FET behaves like a voltage-controlled resistor."
    },
    {
      id: "s2p1_23",
      q: "Saturation region used for:",
      options: ["Switching", "Amplification", "Breakdown", "Rectification"],
      answer: 1,
      explanation: "The saturation (active) region is used for amplification in FET circuits."
    },
    {
      id: "s2p1_24",
      q: "In cutoff region:",
      options: ["ID ≈ 0", "ID maximum", "gm maximum", "RD shorted"],
      answer: 0,
      explanation: "In cutoff, VGS ≤ VP and the drain current is approximately zero."
    },
    {
      id: "s2p1_25",
      q: "In breakdown region:",
      options: ["Safe operation", "Not used", "Amplification", "Biasing"],
      answer: 1,
      explanation: "The breakdown region can damage the device and is not used in normal operation."
    },
    {
      id: "s2p1_26",
      q: "For n-channel JFET, control voltage is:",
      options: ["Positive VGS", "Negative VGS", "Zero always", "High VDS"],
      answer: 1,
      explanation: "n-channel JFET is controlled by negative VGS (reverse-biasing the gate junction)."
    },
    {
      id: "s2p1_27",
      q: "Drain voltage polarity for n-channel JFET:",
      options: ["VD < VS", "VD > VS", "Equal", "Zero"],
      answer: 1,
      explanation: "For n-channel JFET, the drain is positive with respect to the source (VD > VS)."
    },
    {
      id: "s2p1_28",
      q: "Q-point means:",
      options: ["Cutoff point", "Breakdown point", "Operating bias point", "Zero voltage point"],
      answer: 2,
      explanation: "Q-point (quiescent point) is the DC operating bias point of the transistor."
    },
    {
      id: "s2p1_29",
      q: "IDSS is:",
      options: ["Zero current", "Max drain current at VGS = 0", "Breakdown current", "Gate current"],
      answer: 1,
      explanation: "IDSS is the maximum drain current when VGS = 0 (drain-source saturation current)."
    },
    {
      id: "s2p1_30",
      q: "Transconductance gm is defined as:",
      options: ["ID / VDS", "ΔID / ΔVGS", "VGS / ID", "VDS / ID"],
      answer: 1,
      explanation: "gm = ΔID/ΔVGS — it measures how effectively VGS controls drain current."
    },
    {
      id: "s2p1_31",
      q: "Unit of gm:",
      options: ["Ohm", "Volt", "Siemens", "Ampere"],
      answer: 2,
      explanation: "Transconductance gm is measured in Siemens (S) or mS."
    },
    {
      id: "s2p1_32",
      q: "gm0 =",
      options: ["IDSS / VP", "2·IDSS / |VP|", "VP / IDSS", "IDSS·VP"],
      answer: 1,
      explanation: "gm0 = 2·IDSS/|VP| is the maximum transconductance at VGS = 0."
    },
    {
      id: "s2p1_33",
      q: "Fixed bias input impedance equals:",
      options: ["RD", "RG", "RS", "1/gm"],
      answer: 1,
      explanation: "In fixed-bias FET, the input impedance Zi = RG (gate resistor, typically very high)."
    },
    {
      id: "s2p1_34",
      q: "Fixed bias output impedance equals:",
      options: ["RG", "RS", "RD", "Zero"],
      answer: 2,
      explanation: "In fixed-bias FET, the output impedance Zo = RD."
    },
    {
      id: "s2p1_35",
      q: "Voltage gain (fixed bias) equals:",
      options: ["gm·RD", "−gm·RD", "1 + gm·RS", "RG / RD"],
      answer: 1,
      explanation: "The voltage gain of a fixed-bias FET amplifier is Av = −gm·RD."
    },
    {
      id: "s2p1_36",
      q: "Negative sign in gain indicates:",
      options: ["Zero gain", "Phase inversion", "Saturation", "Cutoff"],
      answer: 1,
      explanation: "The negative sign in Av = −gm·RD indicates a 180° phase inversion."
    },
    {
      id: "s2p1_37",
      q: "In self-bias (unbypassed RS), gain equals:",
      options: ["−gm·RD", "−gm·RD / (1 + gm·RS)", "RD / RS", "gm·RS"],
      answer: 1,
      explanation: "With unbypassed RS, Av = −gm·RD / (1 + gm·RS) due to negative feedback."
    },
    {
      id: "s2p1_38",
      q: "Increasing RS (unbypassed) will:",
      options: ["Increase gain", "Decrease gain", "Not affect gain", "Increase IDSS"],
      answer: 1,
      explanation: "Increasing RS increases the denominator in Av = −gm·RD/(1+gm·RS), decreasing |Av|."
    },
    {
      id: "s2p1_39",
      q: "Amplifier must operate in:",
      options: ["Ohmic region", "Cutoff", "Saturation", "Breakdown"],
      answer: 2,
      explanation: "FET amplifiers must operate in the saturation (active) region for proper amplification."
    },
    {
      id: "s2p1_40",
      q: "BJT amplifier operates in:",
      options: ["Cutoff", "Saturation", "Forward active", "Breakdown"],
      answer: 2,
      explanation: "BJT amplifiers operate in the forward active region for linear amplification."
    },
    {
      id: "s2p1_41",
      q: "AC equivalent model removes:",
      options: ["Resistances", "Capacitors", "DC sources", "gm"],
      answer: 2,
      explanation: "The AC equivalent model replaces DC sources with short circuits (AC ground)."
    },
    {
      id: "s2p1_42",
      q: "Increasing gm increases:",
      options: ["Input impedance", "Output impedance", "Voltage gain magnitude", "Breakdown voltage"],
      answer: 2,
      explanation: "Since |Av| = gm·RD, increasing gm increases the voltage gain magnitude."
    },
    {
      id: "s2p1_43",
      q: "If gm = 2mS and RD = 2kΩ, gain ≈",
      options: ["-4", "4", "-0.004", "0.004"],
      answer: 0,
      explanation: "Av = −gm·RD = −(0.002)(2000) = −4."
    },
    {
      id: "s2p1_44",
      q: "Larger electron mobility results in:",
      options: ["Lower speed", "Higher speed", "Lower gain", "Cutoff"],
      answer: 1,
      explanation: "Higher electron mobility means carriers move faster, resulting in higher device speed."
    }
  ]
};

// Topic metadata
var TOPIC_META = {
  sheet1p1: { name: "BJT Fundamentals", icon: "🔌", sheet: "Sheet 1 — Part 1" },
  sheet1p2: { name: "CC & CB Amplifiers", icon: "📡", sheet: "Sheet 1 — Part 2" },
  sheet2p1: { name: "FET & MOSFET", icon: "🧪", sheet: "Sheet 2 — Part 1" }
};
