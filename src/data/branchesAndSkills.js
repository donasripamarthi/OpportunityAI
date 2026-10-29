/**
 * Academic branches, standard skills, and career pathways
 * Designed for B.Tech engineering disciplines
 */

export const ACADEMIC_BRANCHES = [
  { id: 'CSE', name: 'Computer Science & Engineering', code: 'CSE', color: 'indigo' },
  { id: 'AIML', name: 'Artificial Intelligence & Machine Learning', code: 'AI/ML', color: 'purple' },
  { id: 'ECE', name: 'Electronics & Communication Engineering', code: 'ECE', color: 'cyan' },
  { id: 'EEE', name: 'Electrical & Electronics Engineering', code: 'EEE', color: 'amber' },
  { id: 'MECH', name: 'Mechanical Engineering', code: 'MECH', color: 'orange' },
  { id: 'CIVIL', name: 'Civil Engineering', code: 'CIVIL', color: 'emerald' },
  { id: 'IT', name: 'Information Technology', code: 'IT', color: 'blue' },
  { id: 'DS', name: 'Data Science & Analytics', code: 'DS', color: 'rose' },
  { id: 'OTHER', name: 'Other Allied Engineering Branches', code: 'Allied', color: 'slate' }
];

export const ACADEMIC_YEARS = [
  { id: 1, label: '1st Year (Freshman)', short: 'Year 1' },
  { id: 2, label: '2nd Year (Sophomore)', short: 'Year 2' },
  { id: 3, label: '3rd Year (Junior)', short: 'Year 3' },
  { id: 4, label: '4th Year (Senior / Final)', short: 'Year 4' }
];

export const BRANCH_SKILL_SUGGESTIONS = {
  CSE: ['Python', 'Java', 'C++', 'Data Structures', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'Linux', 'AWS Cloud', 'REST APIs'],
  AIML: ['Python', 'Machine Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Data Analysis', 'Pandas', 'Deep Learning', 'Computer Vision', 'NLP', 'Git'],
  ECE: ['Verilog', 'C / C++', 'Embedded C', 'MATLAB', 'Microcontrollers (ESP32/Arduino)', 'VLSI Design', 'Digital Signal Processing', 'PCB Design', 'IoT Protocols', 'Git'],
  EEE: ['MATLAB / Simulink', 'Power Electronics', 'Electric Vehicles (EV)', 'Microcontrollers', 'PLC & SCADA', 'Circuit Simulation', 'Power Systems', 'Renewable Energy', 'C Programming'],
  MECH: ['SolidWorks', 'AutoCAD', 'ANSYS FEA', 'MATLAB', 'Thermodynamics', 'GD&T', 'Robotics', 'Additive Manufacturing (3D Printing)', 'Python for Engineers', 'Mechatronics'],
  CIVIL: ['AutoCAD', 'Revit BIM', 'STAAD.Pro', 'GIS / ArcGIS', 'Structural Analysis', 'Surveying (Total Station)', 'Estimation & Costing', 'Project Management', 'Geotechnical Engineering'],
  IT: ['JavaScript', 'Python', 'Web Development', 'Cloud Computing', 'Cybersecurity Basics', 'Database Administration', 'DevOps', 'Networking & TCP/IP', 'Linux'],
  DS: ['Python', 'R', 'SQL', 'Tableau / PowerBI', 'Exploratory Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Big Data (Spark)', 'Excel Advanced'],
  OTHER: ['Python', 'Problem Solving', 'Data Analysis', 'Project Management', 'Communication', 'Technical Writing']
};

export const COMMON_INTERESTS = [
  'Artificial Intelligence',
  'Full Stack Web Development',
  'Robotics & Automation',
  'Electric Vehicles & Battery Tech',
  'VLSI & Semiconductor Chips',
  'Cybersecurity & Privacy',
  'Smart Cities & Green Infrastructure',
  'Cloud & DevOps Engineering',
  'Open Source Software',
  'Mobile App Development',
  'Renewable Energy Systems',
  'Product Design & Prototyping'
];

export const CAREER_GOALS = [
  { id: 'swe', title: 'Software Development Engineer (SDE)', branchPreference: ['CSE', 'IT', 'AIML', 'DS'] },
  { id: 'aiml_eng', title: 'AI/ML & Data Science Specialist', branchPreference: ['AIML', 'DS', 'CSE'] },
  { id: 'embedded', title: 'Embedded Systems & IoT Engineer', branchPreference: ['ECE', 'EEE', 'CSE'] },
  { id: 'vlsi', title: 'VLSI & Chip Design Engineer', branchPreference: ['ECE', 'EEE'] },
  { id: 'ev_powertrain', title: 'EV & Powertrain Systems Engineer', branchPreference: ['MECH', 'EEE'] },
  { id: 'cad_design', title: 'Mechanical CAD & Simulation Engineer', branchPreference: ['MECH'] },
  { id: 'bim_structural', title: 'BIM & Structural Design Engineer', branchPreference: ['CIVIL'] },
  { id: 'research', title: 'Higher Studies & Research (GATE / MS)', branchPreference: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML'] }
];
