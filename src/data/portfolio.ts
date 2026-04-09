export const terminalLines = [
  'Initializing profile...',
  'Cyber Security Engineer',
  'Specializing in adversary simulation and secure-by-design systems',
  'Building detection pipelines, hardened cloud baselines, and response playbooks',
  'Status: Available for high-trust engineering and security engagements',
]

export const skills = [
  {
    title: 'Offensive Tooling',
    items: ['Burp Suite', 'Nmap', 'Metasploit', 'Wireshark'],
  },
  {
    title: 'Languages',
    items: ['Python', 'Bash', 'TypeScript', 'SQL'],
  },
  {
    title: 'Cloud Defense',
    items: ['AWS IAM', 'Azure Security', 'SIEM Pipelines', 'Container Hardening'],
  },
  {
    title: 'Domains',
    items: ['Threat Detection', 'Incident Response', 'Zero Trust', 'Vulnerability Management'],
  },
  {
    title: 'Automation',
    items: ['SOAR Workflows', 'Security Scripting', 'CI Security Gates', 'Log Enrichment'],
  },
  {
    title: 'Standards',
    items: ['MITRE ATT&CK', 'OWASP ASVS', 'NIST CSF', 'CIS Benchmarks'],
  },
]

export const projects = [
  {
    name: 'Sentinel Mesh',
    tag: 'Detection Engineering',
    blurb: 'A streaming detection mesh that correlates network, identity, and endpoint telemetry for rapid triage.',
    description:
      'Designed a telemetry pipeline that normalized events from cloud workloads, VPN gateways, and EDR alerts, then mapped them to detection rules aligned to adversary techniques. Reduced analyst triage time by prioritizing signal quality and automated context enrichment.',
    stack: ['Python', 'Sigma', 'Elastic', 'Kafka'],
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Repository', href: '#' },
    ],
  },
  {
    name: 'Phantom Surface Audit',
    tag: 'Attack Surface Management',
    blurb: 'An external exposure audit workflow for mapping shadow assets, weak points, and exploit paths.',
    description:
      'Built a repeatable reconnaissance pipeline for discovering internet-facing assets, validating misconfigurations, and producing executive-ready exposure reports. The workflow emphasized controlled verification, reproducible evidence, and remediation sequencing.',
    stack: ['Bash', 'Nmap', 'Shodan', 'Burp Suite'],
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Repository', href: '#' },
    ],
  },
  {
    name: 'Vaultline Access Control',
    tag: 'Cloud Security Architecture',
    blurb: 'A zero-trust identity and secrets access design for engineering environments with privileged workflows.',
    description:
      'Implemented least-privilege access boundaries across deployment pipelines, workload identities, and secrets distribution. The system reduced standing privilege, improved auditability, and aligned infrastructure workflows with policy-driven access controls.',
    stack: ['Terraform', 'Azure', 'OPA', 'GitHub Actions'],
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Repository', href: '#' },
    ],
  },
] as const

export const teamMembers = [
  {
    initials: 'IR',
    name: 'Incident Response Lead',
    role: 'Containment and forensic coordination',
    summary: 'Aligns evidence collection, escalation paths, and recovery decisions under high-pressure timelines.',
  },
  {
    initials: 'CL',
    name: 'Cloud Platform Engineer',
    role: 'Identity and infrastructure hardening',
    summary: 'Partners on guardrails, secure deployment patterns, and repeatable enforcement across environments.',
  },
  {
    initials: 'RC',
    name: 'Risk and Compliance Partner',
    role: 'Control mapping and assurance',
    summary: 'Translates technical remediation into policy evidence, audit readiness, and operational accountability.',
  },
]