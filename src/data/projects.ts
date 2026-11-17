// Projects listed on /projects. Add entries to either list; empty lists show "More coming soon".
export type Project = {
  name: string;
  description: string; // one line
  href?: string; // optional; omit to show no link
};

export const featured: Project[] = [
  {
    name: 'STL Crime Timer',
    description:
      'A live timer tracking time since the last shooting, burglary or killing in St. Louis, built from local news and official police reports.',
    href: 'https://stlcrimetimer.com',
  },
  {
    name: 'NYC Taxi Data Migration',
    description:
      'An on-prem to Azure migration of ~121M NYC taxi trips. A SQL Server database mimics production, receiving ~100K new rows at a set time every day. A full load, then daily watermark-based incremental loads, move the data through Azure Data Factory into a Databricks bronze/silver/gold lakehouse, validated against source control totals.',
    href: 'https://github.com/manisharanthota/nyc-taxi-data-migration',
  },
];

export const others: Project[] = [
  {
    name: 'Funny Chatbot',
    description:
      'A witty, sarcastic command-line chatbot built with the Claude API, with streaming replies, conversation memory and a token budget to keep costs in check.',
    href: 'https://github.com/manisharanthota/funny-chatbot',
  },
  {
    name: 'Job Application Email Classifier',
    description:
      'Automatically sorts my job application emails and logs them to Google Sheets, using the Gemini API.',
  },
  {
    name: 'Rejection Pick-Me-Up Agent',
    description:
      'An AI agent built on Meta’s Muse and connected to my Gmail. A watchdog checks my inbox every hour, and when a job rejection email lands, the agent sends me a positive quote to keep me going.',
  },
];
