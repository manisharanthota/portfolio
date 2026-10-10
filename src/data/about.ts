// Content for /about. Edit freely; the page renders whatever is here.

export const work = [
  {
    company: 'Commerce Bank',
    role: 'Contract Data Engineer',
    location: 'St. Louis, MO',
    dates: 'Aug 2024 – Jul 2026',
    highlights: [
      'Led the move of a 50TB on-premises data platform to the cloud, cutting infrastructure overhead by 20% and saving $60K a year in compute.',
      'Brought the financial close process down from 30 minutes to 60 seconds.',
      'Turned two days of manual checks on 100+ weekly reconciliation files into near real-time validation, saving $54K+ a year.',
      'Put access controls, validation rules and audit logging in place to keep 10+ downstream reporting teams SOX-compliant.',
    ],
  },
  {
    company: 'Kaiser',
    role: 'Data Engineer',
    location: 'Hyderabad, India',
    dates: 'Nov 2020 – Jul 2023',
    highlights: [
      'Built the pipelines that ingest, clean and join healthcare data from multiple source systems, making 300M+ records a year available sooner.',
      'Automated reporting, cutting turnaround from 5 hours to 45 minutes.',
      'Raised data accuracy from 80% to 99% across 30+ healthcare tables with schema and integrity testing.',
      'Remodeled 30+ tables into a star schema, saving $10K a year in warehouse costs.',
    ],
  },
  {
    company: 'Amazon',
    role: 'Data Analyst',
    location: 'Hyderabad, India',
    dates: 'Aug 2019 – Oct 2020',
    highlights: [
      'Analyzed 50M+ customer call records to find workflow bottlenecks, cutting average wait time by 67% (3 minutes to 60 seconds).',
      'Lifted agent CSAT from 65% to over 75% through data-backed performance improvements.',
      'Replaced manual spreadsheet reporting with automated pipelines, saving $30K a year and 20+ hours a week.',
      'Built 5 near real-time dashboards that replaced manual reporting and sped up decisions.',
    ],
  },
];

export const skills = [
  { category: 'Languages', items: ['Python', 'SQL', 'T-SQL', 'Java'] },
  { category: 'Processing', items: ['Apache Spark (PySpark, Spark SQL)', 'Delta Lake'] },
  {
    category: 'Cloud',
    items: [
      'AWS (S3, Glue, Athena, Lambda, EC2, RDS, IAM)',
      'Azure (Data Lake Storage, Key Vault, Logic Apps, Monitor)',
      'Databricks (Unity Catalog, Lakeflow, Asset Bundles)',
    ],
  },
  { category: 'Data Warehousing', items: ['Snowflake', 'Amazon Redshift', 'Medallion lakehouse', 'Star schema modeling'] },
  { category: 'Orchestration', items: ['Apache Airflow', 'dbt', 'Azure Data Factory', 'Databricks Workflows'] },
  { category: 'Databases', items: ['SQL Server', 'Oracle', 'PostgreSQL', 'MySQL'] },
  { category: 'BI', items: ['Tableau', 'Power BI'] },
  { category: 'DevOps & Testing', items: ['Git', 'Azure DevOps (CI/CD)', 'Terraform', 'Docker', 'PyTest', 'Jira'] },
];

export const solidarity = [
  'Women and Child Empowerment',
  "Minorities' Rights",
  'Ending Racism',
  'Corruption-Free India',
  'Trans Rights',
];
