Here’s a **Product Requirements Document (PRD)** without a timeline based on your requirements, structured clearly for modular, synthetic-data-based app building with rich visualizations:

---

# **PRD: Inspect Point - Firecat AI Sales and Support Automation Platform**

## 1. **Project Overview**
Develop a **modular, AI-powered multi-agent platform** to enhance sales automation, onboarding, and customer support for **Firecat**, the fire alarm design software acquired by Inspect Point. The platform must be easily extensible, visually rich, and integrate with Inspect Point’s current CRM and support systems.

---

## 2. **Goals**
- **Automate Lead Generation**: Identify and enrich potential Firecat customers (fire alarm companies across North America).
- **Outbound Sales Automation**: Personalized, high-conversion campaign creation and management.
- **AI-Powered Demo and Support**: Virtual agents that simulate onboarding, demo guidance, and technical support.
- **Reduce Bandwidth**: Free up key team members from repetitive demo, onboarding, and support tasks.
- **Scalability**: Prepare Firecat for scaling sales and customer onboarding without growing headcount.

---

## 3. **Core Features and Modules**

| **Module** | **Feature Set** | **Synthetic Data Requirements** | **Visualization Elements** |
|:------------|:----------------|:---------------------------------|:----------------------------|
| **1. Lead Generation Agent** | - Scrape fire protection company databases<br>- Enrich leads with LinkedIn, email, company size, etc.<br>- Prioritize leads based on ICP (Ideal Customer Profile) score | - 10,000 synthetic fire protection companies<br>- Attributes: Company Name, Location, Employees, Tech Stack, Contact Info | - Lead funnel dashboard<br>- Lead heatmap by geography<br>- ICP fit score distribution graph |
| **2. Lead Expansion & Refinement Agent** | - Expand existing lead list<br>- Find related companies (subsidiaries, similar profiles) | - Simulated relationships between companies | - Interactive network graph of expanded leads |
| **3. Outbound Campaign Agent** | - Generate personalized emails<br>- Sequence management (reminders, follow-ups)<br>- Track opens, clicks, replies | - 5,000 synthetic email conversations<br>- Email open, click, reply rates | - Campaign performance dashboard<br>- Email engagement timeline |
| **4. Demo and Onboarding Assistant ("Ask August")** | - Conversational agent trained on Firecat KB<br>- Handles FAQs, product demos, onboarding guidance<br>- Suggests next best action | - 1,500 FAQs, synthetic product guides, onboarding scripts<br>- Simulated chat logs | - Conversation flow diagrams<br>- Sentiment analysis of chats |
| **5. Technical Support Agent** | - Handles technical support queries<br>- Routes complex tickets to human agents<br>- Knowledge retrieval across SKUs | - 15,000 synthetic SKUs with attributes (Part Number, Description, Compatibility Notes) | - Knowledge graph of SKU relationships<br>- Ticket resolution time heatmap |
| **6. Admin Analytics Dashboard** | - Monitor agent performance<br>- Lead conversion trends<br>- Support resolution efficiency | - Aggregated synthetic metrics from above modules | - Modular, real-time interactive dashboards<br>- KPI Cards for Conversion, CSAT, Resolution Rate |

---

## 4. **User Roles**

| **Role** | **Permissions** |
|:---------|:----------------|
| Sales Manager | Configure lead generation settings, approve outbound campaigns, view campaign analytics |
| Customer Success Manager | Manage onboarding scripts, oversee "Ask August" and support interactions |
| Admin | Full platform control (user management, settings, reporting) |
| End Customer (Firecat user) | Interact with demo assistant, onboarding agent, and support agent |

---

## 5. **Integration Points**
- **CRM Integration**: Salesforce (initial), with modularity to expand to HubSpot, Zoho, etc.
- **Support Systems**: Zendesk initially, moving toward Intercom (futureproof architecture).
- **Email Systems**: SMTP gateway for email campaign dispatch and tracking.

---

## 6. **Technical Requirements**
- **Language Models**: OpenAI GPT-4, with the ability to switch to Anthropic or AWS Bedrock models.
- **Database**: Supabase/PostgreSQL for agent metadata and logs.
- **Storage**: Amazon S3 for storing knowledge base and onboarding materials.
- **Orchestration**: Prefect for multi-agent task management and retries.
- **Front-End**: Bolt for rapid modular React-based UI building.
- **Hosting**: AWS Lambda and Amplify.

---

## 7. **Synthetic Data Simulation Plan**
- **Lead Profiles**: Generate a dataset of 10,000 fire protection companies with realistic variations.
- **Email Logs**: Create 5,000 simulated multi-stage campaign interactions.
- **Product Knowledge**: 1,500 FAQs and training prompts based on fire alarm design standards.
- **SKU Dataset**: Simulate 15,000 SKUs with interrelationships for retrieval testing.

---

## 8. **Key Benefits to Inspect Point**
- **Accelerated Sales Velocity** without expanding sales teams
- **Automated Onboarding** experience improving customer satisfaction
- **Reduced Dependency** on live demos and manual support
- **Scalable Infrastructure** to support growth post-Firecat acquisition
- **Rich Visual Reporting** for fast decision-making

---

## 9. **Next Steps to Build**
- Finalize synthetic data generation
- Set up modular agent architecture
- Connect basic CRM/Salesforce integration first
- Launch lead generation and onboarding modules for pilot
- Gather feedback and iterate modules independently
