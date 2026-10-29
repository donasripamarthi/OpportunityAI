/**
 * Curated beginner-friendly personalized learning roadmaps
 * Organized by engineering discipline and career trajectories.
 */

export const CAREER_ROADMAPS = {
  swe: {
    id: 'swe',
    title: 'Software Development Engineer (SDE) Pathway',
    branchTarget: 'CSE / IT / AIML / ECE',
    description: 'A structured step-by-step roadmap from coding fundamentals to full-stack architecture, algorithms, and production deployments.',
    milestones: [
      {
        id: 'swe-m1',
        phase: 'Phase 1: Programming Fundamentals & Data Structures',
        title: 'Master Core Language & Problem Solving',
        duration: '3-4 Weeks',
        skillsTaught: ['Python', 'C++', 'Data Structures', 'Problem Solving'],
        description: 'Deepen understanding of time complexity (Big-O), arrays, hash maps, linked lists, and recursion.',
        freeResources: [
          { title: 'NeetCode Roadmap (Algorithms & Patterns)', type: 'Practice', url: 'https://neetcode.io/roadmap' },
          { title: 'CS50: Introduction to Computer Science (Harvard OpenCourseWare)', type: 'Course', url: 'https://cs50.harvard.edu/x/' }
        ],
        projectIdea: 'Build a CLI Task Manager with persistent JSON storage and search filtering.'
      },
      {
        id: 'swe-m2',
        phase: 'Phase 2: Modern Frontend & Version Control',
        title: 'Component-Driven UI & Git Workflow',
        duration: '3-4 Weeks',
        skillsTaught: ['JavaScript', 'React', 'Git', 'REST APIs'],
        description: 'Understand React hooks, component hierarchy, responsive UI design, and collaborative Git branching.',
        freeResources: [
          { title: 'Official React 19 Interactive Documentation', type: 'Docs', url: 'https://react.dev' },
          { title: 'Git & GitHub Crash Course (freeCodeCamp)', type: 'Video', url: 'https://www.youtube.com' }
        ],
        projectIdea: 'Create an Opportunity Tracker or Campus Resource Explorer in React.'
      },
      {
        id: 'swe-m3',
        phase: 'Phase 3: Scalable Backend & Databases',
        title: 'REST APIs, SQL Databases & Containerization',
        duration: '4-5 Weeks',
        skillsTaught: ['Node.js', 'SQL', 'Docker', 'REST APIs'],
        description: 'Design relational database schemas, write secure authentication middlewares, and package services into Docker containers.',
        freeResources: [
          { title: 'PostgreSQL Tutorial & Interactive Queries', type: 'Docs', url: 'https://www.postgresqltutorial.com/' },
          { title: 'Docker for Beginners Tutorial (freeCodeCamp)', type: 'Video', url: 'https://www.youtube.com' }
        ],
        projectIdea: 'Develop a Multi-Tenant Student Discussion Forum with JWT auth and Postgres.'
      },
      {
        id: 'swe-m4',
        phase: 'Phase 4: Cloud Deployment & Open Source',
        title: 'Production CI/CD & Portfolio Delivery',
        duration: '2-3 Weeks',
        skillsTaught: ['AWS Cloud', 'Linux', 'DevOps'],
        description: 'Deploy web applications to free cloud hosting (Vercel, Render), configure automated GitHub Actions, and contribute to open-source repos.',
        freeResources: [
          { title: 'GitHub Actions Documentation & Guides', type: 'Docs', url: 'https://docs.github.com/en/actions' },
          { title: 'The Linux Command Line (Free E-book)', type: 'Book', url: 'https://linuxcommand.org/' }
        ],
        projectIdea: 'Deploy your full-stack portfolio with automated test badges and live demo links.'
      }
    ]
  },

  aiml_eng: {
    id: 'aiml_eng',
    title: 'AI/ML & Data Science Pathway',
    branchTarget: 'AIML / Data Science / CSE',
    description: 'From exploratory data analysis and mathematical modeling to deep neural networks and real-time computer vision inference.',
    milestones: [
      {
        id: 'aiml-m1',
        phase: 'Phase 1: Math & Python Data Stack',
        title: 'Linear Algebra, Calculus & Pandas/NumPy',
        duration: '3-4 Weeks',
        skillsTaught: ['Python', 'Data Analysis', 'Pandas', 'Exploratory Data Analysis'],
        description: 'Vectorized operations, data wrangling, handling missing values, and exploratory statistics.',
        freeResources: [
          { title: 'Kaggle Python & Pandas Micro-Courses (Free)', type: 'Interactive', url: 'https://www.kaggle.com/learn' },
          { title: '3Blue1Brown: Essence of Linear Algebra', type: 'Video', url: 'https://www.youtube.com' }
        ],
        projectIdea: 'Analyze university placement trends or national weather datasets with charts.'
      },
      {
        id: 'aiml-m2',
        phase: 'Phase 2: Classical Machine Learning',
        title: 'Regression, Classification & Model Evaluation',
        duration: '4-5 Weeks',
        skillsTaught: ['Machine Learning', 'Scikit-Learn', 'Statistical Modeling'],
        description: 'Train Random Forests, Gradient Boosted Trees, evaluate ROC-AUC, cross-validation, and feature importance.',
        freeResources: [
          { title: 'Scikit-Learn Official User Guide & Tutorials', type: 'Docs', url: 'https://scikit-learn.org/' },
          { title: 'Machine Learning Specialization by Andrew Ng (Coursera Audit)', type: 'Course', url: 'https://www.coursera.org' }
        ],
        projectIdea: 'Build a student opportunity matching predictor based on candidate profile attributes.'
      },
      {
        id: 'aiml-m3',
        phase: 'Phase 3: Deep Learning & Neural Networks',
        title: 'PyTorch, CNNs & Transformers',
        duration: '4-6 Weeks',
        skillsTaught: ['PyTorch', 'Deep Learning', 'Computer Vision', 'NLP'],
        description: 'Build neural layers, loss functions, optimizers, and fine-tune pre-trained HuggingFace transformers or YOLO models.',
        freeResources: [
          { title: 'PyTorch 60-Minute Blitz & Official Tutorials', type: 'Docs', url: 'https://pytorch.org/tutorials/' },
          { title: 'Fast.ai: Practical Deep Learning for Coders', type: 'Course', url: 'https://course.fast.ai/' }
        ],
        projectIdea: 'Train an Edge Computer Vision Model to detect safety gear in lab environments.'
      }
    ]
  },

  embedded: {
    id: 'embedded',
    title: 'Embedded Systems & IoT Pathway',
    branchTarget: 'ECE / EEE / CSE',
    description: 'Hardware-software co-design: Low-level C programming, microcontroller peripherals, RTOS, and wireless telemetry.',
    milestones: [
      {
        id: 'emb-m1',
        phase: 'Phase 1: Bare Metal & Microcontroller Basics',
        title: 'Embedded C, GPIOs, Timers & Interrupts',
        duration: '3-4 Weeks',
        skillsTaught: ['C / C++', 'Embedded C', 'Microcontrollers (ESP32/Arduino)'],
        description: 'Master bitwise operations, register manipulation, hardware timers, PWM signals, and external interrupts on ESP32 or STM32.',
        freeResources: [
          { title: 'Embedded Systems Bare-Metal Programming (NPTEL / YouTube)', type: 'Course', url: 'https://nptel.ac.in' },
          { title: 'ESP32 Technical Reference Manual & ESP-IDF Docs', type: 'Docs', url: 'https://docs.espressif.com' }
        ],
        projectIdea: 'Build an environmental monitor with OLED screen, DHT22 sensor, and interrupt-driven sleep mode.'
      },
      {
        id: 'emb-m2',
        phase: 'Phase 2: Hardware Communication Protocols',
        title: 'UART, I2C, SPI & Wireless IoT Telemetry',
        duration: '3-4 Weeks',
        skillsTaught: ['IoT Protocols', 'Microcontrollers', 'C / C++'],
        description: 'Interface digital sensors, decode oscilloscope waveforms, and send telemetry over MQTT and Bluetooth Low Energy (BLE).',
        freeResources: [
          { title: 'SparkFun / Adafruit Protocol Comparison Guides', type: 'Docs', url: 'https://learn.sparkfun.com' }
        ],
        projectIdea: 'Design a Wi-Fi-connected industrial machine health logger reporting to a cloud dashboard.'
      },
      {
        id: 'emb-m3',
        phase: 'Phase 3: PCB Design & Schematic Capture',
        title: 'KiCad PCB Layout & Circuit Prototyping',
        duration: '3-4 Weeks',
        skillsTaught: ['PCB Design', 'Circuit Simulation'],
        description: 'Design custom 2-layer schematic diagrams, route differential signal pairs, and generate Gerber manufacturing packages in KiCad.',
        freeResources: [
          { title: 'KiCad Official Tutorials & PCB Design Workflow', type: 'Docs', url: 'https://www.kicad.org' }
        ],
        projectIdea: 'Produce a custom credit-card sized ESP32 development shield with integrated LiPo charger.'
      }
    ]
  },

  vlsi: {
    id: 'vlsi',
    title: 'VLSI & Digital Semiconductor Pathway',
    branchTarget: 'ECE / EEE',
    description: 'Digital logic design, Verilog HDL synthesis, static timing analysis (STA), and open-source ASIC flows.',
    milestones: [
      {
        id: 'vlsi-m1',
        phase: 'Phase 1: Digital Electronics & Verilog HDL',
        title: 'Combinational & Sequential Logic in Verilog',
        duration: '4 Weeks',
        skillsTaught: ['Verilog', 'C / C++', 'Digital Signal Processing'],
        description: 'Finite State Machines (FSMs), ALUs, shift registers, and writing comprehensive testbenches with Icarus Verilog and GTKWave.',
        freeResources: [
          { title: 'HDLBits Interactive Verilog Practice Problems', type: 'Practice', url: 'https://hdlbits.01xz.net' },
          { title: 'Digital System Design with PLDs (NPTEL Course)', type: 'Course', url: 'https://nptel.ac.in' }
        ],
        projectIdea: 'Design and simulate an 8-bit pipelined ALU with overflow detection and condition flags.'
      },
      {
        id: 'vlsi-m2',
        phase: 'Phase 2: Computer Architecture & RISC-V',
        title: 'Processor Microarchitecture & Bus Protocols',
        duration: '4-5 Weeks',
        skillsTaught: ['VLSI Design', 'Verilog', 'Problem Solving'],
        description: 'Build a single-cycle and 5-stage pipelined RISC-V CPU core supporting RV32I integer instructions.',
        freeResources: [
          { title: 'Patterson & Hennessy: Computer Organization and Design (Open Resources)', type: 'Book', url: 'https://riscv.org' }
        ],
        projectIdea: 'Implement a 5-stage RISC-V core with hazard detection and data forwarding in Verilog.'
      }
    ]
  },

  ev_powertrain: {
    id: 'ev_powertrain',
    title: 'Electric Vehicles & Powertrain Pathway',
    branchTarget: 'EEE / MECH',
    description: 'Electric motors, lithium-ion battery management, power electronic inverters, and Simulink powertrain modeling.',
    milestones: [
      {
        id: 'ev-m1',
        phase: 'Phase 1: Power Electronics & Motor Drives',
        title: 'DC-DC Converters & BLDC Motor Control',
        duration: '4 Weeks',
        skillsTaught: ['Power Electronics', 'Circuit Simulation', 'MATLAB / Simulink'],
        description: 'Buck-boost converter topologies, sinusoidal PWM inverter generation, and field-oriented control (FOC) basics.',
        freeResources: [
          { title: 'Fundamentals of Electric Vehicles (NPTEL Online Course)', type: 'Course', url: 'https://nptel.ac.in' }
        ],
        projectIdea: 'Simulate a closed-loop speed controller for a 3-phase BLDC motor in MATLAB/Simulink.'
      },
      {
        id: 'ev-m2',
        phase: 'Phase 2: Battery Management Systems (BMS)',
        title: 'Battery Chemistries, SoC/SoH & Thermal Management',
        duration: '4 Weeks',
        skillsTaught: ['Electric Vehicles (EV)', 'MATLAB / Simulink', 'Thermodynamics'],
        description: 'Cell modeling equivalent circuits, passive/active balancing, over-voltage protection, and thermal heat sink modeling.',
        freeResources: [
          { title: 'NREL Energy Storage & Battery Research Publications', type: 'Docs', url: 'https://www.nrel.gov' }
        ],
        projectIdea: 'Model a 48V battery pack thermal dissipation model under sudden acceleration cycles.'
      }
    ]
  },

  cad_design: {
    id: 'cad_design',
    title: 'Mechanical CAD, FEA & Prototyping Pathway',
    branchTarget: 'MECH',
    description: 'Parametric 3D solid modeling, finite element stress analysis (FEA), GD&T, and 3D printing fabrication.',
    milestones: [
      {
        id: 'cad-m1',
        phase: 'Phase 1: Parametric 3D CAD Modeling',
        title: 'Master SolidWorks / AutoCAD Part & Assembly Design',
        duration: '3-4 Weeks',
        skillsTaught: ['SolidWorks', 'AutoCAD', 'GD&T'],
        description: 'Advanced feature modeling (sweeps, lofts, surface patches), geometric dimensioning & tolerancing (GD&T) according to ASME Y14.5.',
        freeResources: [
          { title: 'SolidWorks Official Tutorials & Certification Guides', type: 'Docs', url: 'https://my.solidworks.com' }
        ],
        projectIdea: 'Design a planetary gearbox assembly with complete exploded views and Bill of Materials.'
      },
      {
        id: 'cad-m2',
        phase: 'Phase 2: Finite Element Analysis (FEA) & Simulation',
        title: 'Structural Stress, Modal & Thermal Simulation in ANSYS',
        duration: '4 Weeks',
        skillsTaught: ['ANSYS FEA', 'Thermodynamics', 'Mechatronics'],
        description: 'Mesh convergence studies, boundary conditions, von Mises stress evaluation, and factor of safety optimization.',
        freeResources: [
          { title: 'Cornell University / edX: A Hands-on Introduction to Engineering Simulations', type: 'Course', url: 'https://www.edx.org' }
        ],
        projectIdea: 'Optimize the weight of an automotive suspension control arm while preserving rigidity.'
      }
    ]
  },

  bim_structural: {
    id: 'bim_structural',
    title: 'Civil BIM & Structural Design Pathway',
    branchTarget: 'CIVIL',
    description: 'Building Information Modeling (BIM), structural frame calculations, seismic design, and GIS geospatial mapping.',
    milestones: [
      {
        id: 'bim-m1',
        phase: 'Phase 1: 2D Drafting & 3D BIM Modeling',
        title: 'AutoCAD Drafting & Autodesk Revit BIM Integration',
        duration: '3-4 Weeks',
        skillsTaught: ['AutoCAD', 'Revit BIM', 'Structural Analysis'],
        description: 'Produce architectural floor plans, create 3D BIM digital models with parametric families, and extract structural schedules.',
        freeResources: [
          { title: 'Autodesk Design Academy - Architectural BIM Courses', type: 'Course', url: 'https://www.autodesk.com/design-academy' }
        ],
        projectIdea: 'Design a G+3 residential building model with complete section drawings and quantity take-offs.'
      },
      {
        id: 'bim-m2',
        phase: 'Phase 2: Structural Frame Analysis & Seismic Design',
        title: 'STAAD.Pro Frame Simulation & Concrete Reinforcement',
        duration: '4 Weeks',
        skillsTaught: ['STAAD.Pro', 'Structural Analysis', 'Project Management'],
        description: 'Analyze multi-story concrete structures under dead, live, wind, and earthquake loads in accordance with IS 456 & IS 1893.',
        freeResources: [
          { title: 'NPTEL Advanced Structural Analysis by IIT Kharagpur', type: 'Course', url: 'https://nptel.ac.in' }
        ],
        projectIdea: 'Perform 3D frame seismic analysis for a college auditorium and check beam-column deflection limits.'
      }
    ]
  }
};
