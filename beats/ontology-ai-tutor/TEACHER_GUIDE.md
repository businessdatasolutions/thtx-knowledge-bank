# Teacher Discussion Guide: Ontology AI Tutor

## Overview

This guide supports classroom facilitation for the Ontology AI Tutor, an interactive learning application based on Palantir's Data-Logic-Action framework. Students complete **one case each** individually, then participate in peer learning discussions to discover framework patterns across different business domains.

**Target audience**: HBO Bedrijfskunde (Business Administration), Year 2
**Duration**: 45-60 minutes (15 min simulation + 30-45 min discussion)
**Learning objectives**:
- Understand the Data-Logic-Action framework for decision-making
- Distinguish between instance-level vs. aggregate data
- Recognize the importance of real-time operational data vs. "Data Graves"
- Understand write-back as critical for closing the decision loop

---

## Classroom Setup

### Pre-Class Preparation

1. **Assign cases to students** - Ensure diverse distribution:
   - Case 1: Financial Strategy (Capital Allocation)
   - Case 2: Marketing (Customer Retention)
   - Case 3: Supply Chain (Crisis Response) - based on Palantir's Titan Industries example
   - Case 4: HR (Talent Retention)
   - Case 5: Finance (Kinetic DuPont Analysis)

2. **Access instructions**:
   - Students access the app at: [URL - vervang met je deployed GitHub Pages URL]
   - Language toggle: Students can switch between Dutch (NL) and English (EN)
   - Mobile-friendly: Works on phones, tablets, and laptops

3. **Estimated timing**:
   - Theory section (optional): 5-10 min
   - Case simulation: 10-15 min
   - Reflection prompts: 2-3 min
   - Class discussion: 30-45 min

### In-Class Instructions

**Before students start** (5 min):
1. Explain the Data-Logic-Action framework briefly:
   - **Data** = The "Nouns" (information about business objects)
   - **Logic** = The "Reasoning" (models, AI, rules)
   - **Action** = The "Verbs" (execution, write-back to systems)

2. Set expectations:
   - Each student gets a different case - this is intentional for peer learning
   - There are no "trick questions" - focus on understanding the framework
   - Immediate feedback explains WHY answers are correct or incorrect
   - Reflection prompts at the end - think about these before discussion

3. Ask students to note:
   - Their Data choice and why
   - Their Logic choice and why
   - Their Action choice and why

**During simulation** (15 min):
- Circulate to answer technical questions
- Observe common mistakes (e.g., students selecting aggregate data instead of instance-level)
- Note which cases students struggle with most

---

## Post-Simulation Class Discussion

### Round 1: Share Your Case (10 min)

**Format**: Pair students who did different cases

**Prompts for pairs**:
1. "Wat was jouw Data-keuze en waarom?" / "What was your Data choice and why?"
2. "Welk type Logic gebruikte jouw case (deterministisch zoals DCF, of probabilistisch zoals ML)?" / "What type of Logic did your case use (deterministic like DCF, or probabilistic like ML)?"
3. "Naar welke systemen schreef jouw Action terug?" / "Which systems did your Action write back to?"

**Teacher facilitation**:
- Listen for students correctly identifying:
  - ✅ Instance-level data (specific customers, assets, orders)
  - ✅ Real-time/operational data sources
  - ✅ Write-back to transactional systems (not just dashboards)

- Common misunderstandings to address:
  - ❌ Confusing reporting/dashboards with action
  - ❌ Thinking aggregate data is sufficient
  - ❌ Not understanding why "Data Graves" (static PDFs, spreadsheets) fail

### Round 2: Find the Pattern (15-20 min)

**Full class discussion** - Facilitate discovery of cross-case principles

#### Question 1: Data Principle

**Prompt**: "Case 1 (Finance) gebruikte real-time marktkoersen. Case 2 (Marketing) gebruikte live transactie-feeds. Case 3 (Supply Chain) gebruikte live ERP & supplier feeds. Wat is het gemeenschappelijke principe?"

**Expected answer**: Data moet **instantie-niveau** (instance-level) en **operationeel** (operational, changes frequently) zijn.

**Teaching moment**:
- Draw table on board:

| Case | Data Used | Why It Works |
|------|-----------|--------------|
| Finance | Market rates + specific asset cashflows | Individual asset level, real-time |
| Marketing | Transaction feeds + support tickets | Individual customer level, real-time |
| Supply Chain | Inventory + supplier status | Specific materials/suppliers, real-time |
| HR | Performance reviews + sentiment | Individual employee level, recent |
| Kinetic DuPont | Asset telemetry (IoT) + usage | Specific machines/inventory, live status |

**Key insight**: Ontology focuses on **semantic objects** (Customer, Asset, Material, Employee) with real-time operational properties, NOT aggregate reports.

#### Question 2: Logic Types

**Prompt**: "Vergelijk Case 1 (DCF model) en Case 2 (Churn prediction). Wat is het belangrijkste verschil in hun Logic?"

**Expected answer**: Case 1 gebruikt **deterministische** financiële formules (DCF is wiskundig exact). Case 2 gebruikt **probabilistische** ML (churn score is een waarschijnlijkheid, niet een zekerheid).

**Teaching moment**:
- Explain that Ontology "Logic Assets" can be:
  - **Deterministic**: Calculations, simulations, business rules (Case 1, Case 5)
  - **Probabilistic**: Machine learning models, risk scoring (Case 2, Case 4)
  - **Hybrid**: Combining both (Case 3 uses simulation with constraints)

- Emphasize: Both types are "tools" that AI agents or humans can call via the Ontology. The framework is technology-agnostic.

#### Question 3: Action Complexity

**Prompt**: "Welke case had de MEEST complexe Action (write-back naar meerdere systemen)?"

**Expected answer**: Case 3 (Supply Chain) - write-back naar WMS (Warehouse Management), ERP (productieschema's), en mogelijk leveranciersportals.

**Teaching moment**:
- Explain "Action" complexity scales with:
  - Number of systems affected
  - Number of stakeholders involved
  - Risk/reversibility of the decision

- Introduce **Scenarios framework**: Before critical actions execute, they can be "staged" in a safe sandbox to analyze consequences. This combines speed with governance.

**Real-world example**: In Case 3 (Titan Industries), before reallocating materials from the syringe line to masks, you'd simulate: "Which customer orders get delayed? What's the revenue impact? What penalties occur?"

### Round 3: Apply to Your Context (10-15 min)

**Individual reflection + sharing** (optional: written assignment)

**Prompt**: "Beschrijf één beslissing in jouw stage-bedrijf volgens Data-Logic-Action. Welke data is nodig? Welke logic zou helpen? Wat is de actie?"

**Example student answer** (retail internship):
- **Data**: Live voorraadniveaus per winkel + verkoopsnelheid per SKU (instantie-niveau, operationeel)
- **Logic**: Voorspellingsmodel voor "out-of-stock" risico binnen 3 dagen
- **Action**: Automatisch een transfer-order triggeren van DC naar de winkel met hoog risico

**Teacher facilitation**:
- Validate that examples have:
  - ✅ Instance-level, operational data
  - ✅ Relevant logic/reasoning
  - ✅ Write-back to operational systems (not just alerts)

- Common mistakes to correct:
  - ❌ Using aggregated data (e.g., "monthly sales reports")
  - ❌ Vague logic (e.g., "analyze trends")
  - ❌ Passive action (e.g., "send email to manager")

---

## Learning Objectives Assessment Rubric

Use this rubric to assess student understanding during discussion or via written assignment.

### 1. Data Understanding (25%)

| Level | Criteria |
|-------|----------|
| **Excellent (9-10)** | Clearly distinguishes instance-level vs. aggregate data. Explains why real-time operational data is needed. Identifies "Data Graves" (static PDFs, spreadsheets). |
| **Good (7-8)** | Correctly identifies instance-level data for their case. Understands real-time requirement but struggles to explain why. |
| **Adequate (6)** | Selects correct data in simulation but cannot articulate the principle behind it. |
| **Needs Improvement (<6)** | Confuses aggregate data with instance-level. Thinks historical reports are sufficient. |

### 2. Logic Understanding (25%)

| Level | Criteria |
|-------|----------|
| **Excellent (9-10)** | Distinguishes deterministic vs. probabilistic logic. Explains how logic acts as a "tool" for AI or humans. Understands logic binding across environments (cloud, on-prem, SaaS). |
| **Good (7-8)** | Correctly identifies the logic type for their case. Understands it evaluates data to inform decisions. |
| **Adequate (6)** | Selects correct logic in simulation but cannot explain when to use deterministic vs. probabilistic. |
| **Needs Improvement (<6)** | Confuses logic with data or action. Thinks any AI model will work regardless of context. |

### 3. Action Understanding (25%)

| Level | Criteria |
|-------|----------|
| **Excellent (9-10)** | Explains write-back to operational systems. Distinguishes action from reporting/dashboards. Understands scenarios framework for staging critical decisions. |
| **Good (7-8)** | Correctly identifies write-back in their case. Understands action must change system state, not just notify humans. |
| **Adequate (6)** | Selects correct action in simulation but confuses write-back with dashboard updates. |
| **Needs Improvement (<6)** | Thinks email alerts or reports are sufficient action. Doesn't understand the concept of closing the loop. |

### 4. Framework Integration (25%)

| Level | Criteria |
|-------|----------|
| **Excellent (9-10)** | Explains why all three elements (Data-Logic-Action) must be connected. Applies framework to own internship context with clear, specific example. Identifies cross-case patterns. |
| **Good (7-8)** | Understands the three elements must connect but struggles to explain why. Can apply framework to own context with guidance. |
| **Adequate (6)** | Understands their specific case but cannot generalize the framework to other domains. |
| **Needs Improvement (<6)** | Sees the three elements as independent, not connected. Cannot apply framework beyond the simulation. |

---

## Common Misconceptions & How to Address

### Misconception 1: "Any data is good data"

**Student thinking**: "We have lots of data in our ERP, so we're fine."

**Correction**: It's not about volume, it's about **relevance** and **granularity**. The Ontology needs:
- **Instance-level** (this customer, this machine) not aggregates
- **Operational** (changes frequently) not historical snapshots
- **Integrated** (connected across silos) not fragmented

**Example**: Having 5 years of monthly sales reports doesn't help you prevent a specific high-value customer from churning today.

### Misconception 2: "Dashboards are actions"

**Student thinking**: "We update a dashboard showing the problem, so management can act."

**Correction**: Dashboards are **reporting**, not **action**. Action requires write-back to the systems that execute decisions:
- ✅ Action: Write to CRM to trigger retention offer in customer's app
- ❌ Not action: Show churn risk on a dashboard and hope someone emails the customer

**Teaching moment**: Ask "If the manager is on vacation and doesn't see the dashboard, does the decision still execute?" If no → it's not an action.

### Misconception 3: "AI = Logic"

**Student thinking**: "We need to use ChatGPT for everything."

**Correction**: Logic Assets include:
- Deterministic models (DCF, DuPont, simulation engines)
- Business rules ("If inventory > 90 days old, flag as Lazy Asset")
- Machine learning (churn prediction, attrition risk)
- Hybrid approaches

**Not all logic is AI, and not all decisions need AI.** Case 1 (DCF) uses deterministic finance formulas. Case 5 (DuPont) uses a simple rule engine.

**Teaching moment**: "Would you use an LLM to calculate 2 + 2? No. Use the right tool for the job."

### Misconception 4: "This only works for tech companies"

**Student thinking**: "My internship company is old-school, they can't do this."

**Correction**: The Ontology framework is **industry-agnostic**:
- Case 1: Finance (any industry with investments)
- Case 2: Marketing (any B2C business with customers)
- Case 3: Supply Chain (manufacturing, retail, logistics)
- Case 4: HR (any company with employees)
- Case 5: Finance (any company with physical assets)

**Teaching moment**: "The principle is universal: connect data about business objects → reason about them → act on the systems. The technology can be as simple as integrating your ERP with Excel, or as advanced as a full Ontology platform."

---

## Extension Activities (Optional)

### Activity 1: "Find the Failure Point"

Present a broken workflow and ask students to identify which element (Data, Logic, or Action) is missing or incorrect.

**Example broken workflow** (E-commerce returns):
- **Data**: Monthly aggregate return rates by product category
- **Logic**: Email customer service manager with high-return categories
- **Action**: Manager manually reviews and decides which suppliers to contact

**Questions for students**:
1. What's wrong with the Data? (Too aggregated - need instance-level: which specific products, which customers)
2. What's wrong with the Logic? (Email is not reasoning - need a model to identify *why* returns are high: defects? sizing issues?)
3. What's wrong with the Action? (Manual review is latency - should auto-trigger quality alert to supplier + update product description)

### Activity 2: "Build Your Own Case"

Students work in groups to design a 6th case study for the app.

**Requirements**:
- Choose a business domain (e.g., Education, Healthcare, Government)
- Define the decision problem
- Specify:
  - Correct Data choice (instance-level, operational)
  - 3 incorrect Data choices (with plausible distractors)
  - Correct Logic choice (deterministic or probabilistic)
  - 3 incorrect Logic choices
  - Correct Action choice (write-back to operational systems)
  - 3 incorrect Action choices (e.g., reporting, emails, manual review)

**Assessment**: Peer review - do the distractors teach framework concepts? Are they plausibly wrong?

### Activity 3: "Critique a Real Dashboard"

Bring in a dashboard from a company (anonymize if needed). Ask students:
1. What decisions is this dashboard trying to support?
2. Is the data instance-level or aggregate?
3. What Logic would be needed to turn this into action?
4. How would you close the loop with write-back?

**Example**: Sales dashboard showing regional performance
- **Current state**: Aggregate sales by region (last month)
- **Ontology version**:
  - Data: Individual deals at risk (instance-level, real-time CRM data)
  - Logic: Deal risk scoring model (low engagement + long sales cycle = high risk)
  - Action: Auto-assign senior sales rep + approve discount budget

---

## Frequently Asked Questions (from students)

### Q: "Isn't this just what our ERP system already does?"

**A**: Partially. Your ERP **stores** data (e.g., inventory levels, transactions). The Ontology:
1. **Integrates** data from multiple systems (ERP + CRM + IoT + external feeds)
2. **Semantically models** it as objects (Customer, Product, Order) not just tables
3. **Binds logic** to those objects (run ML models, simulations, rules)
4. **Writes back** to close the loop

Most ERPs are great at record-keeping but weak at decision-making and cross-system orchestration.

### Q: "What if we don't have real-time data?"

**A**: Start where you are. The principle is:
- **Get data as close to real-time as possible** for your context
  - If you can't get live IoT, use hourly batch updates
  - If you can't integrate systems, start with daily exports and automate the integration later

- **Focus on instance-level** even if not real-time
  - Better to have yesterday's data about specific customers than last month's regional averages

The Ontology is a **target architecture**, not all-or-nothing.

### Q: "Is this the same as a Data Warehouse?"

**A**: No. Key differences:

| Data Warehouse | Ontology |
|----------------|----------|
| Historical, aggregate data | Operational, instance-level data |
| Optimized for reporting | Optimized for decision-making |
| Retrospective ("what happened?") | Prospective ("what should we do?") |
| One-way data flow (sources → warehouse → BI tools) | Two-way data flow (sources → Ontology → logic → write-back to sources) |

A Data Warehouse is **descriptive**. An Ontology is **prescriptive and actionable**.

### Q: "How do we avoid 'garbage in, garbage out' with AI?"

**A**: Excellent question. The Ontology addresses this via:
1. **Data quality at the source**: Semantic validation (e.g., "Customer email must be valid format")
2. **Logic guardrails**: Deterministic rules that check AI outputs (e.g., "Discount cannot exceed 30%")
3. **Scenarios**: Simulate decisions before executing them
4. **Human-in-the-loop**: For high-stakes decisions, require human approval after AI recommendation

The framework doesn't eliminate bad data, but it makes quality issues **visible** and **addressable**.

---

## Additional Resources

### For Teachers

- **Original article**: Palantir. (2024). *Connecting AI to Decisions with the Palantir Ontology*. [Link to article]
- **CRISP-DM mapping**: The app connects Ontology to the CRISP-DM model students already know from data mining courses
- **Related frameworks**:
  - Decision Intelligence (Google, Cassie Kozyrkov)
  - Operational AI (MIT, Andrew Ng)
  - Systems of Intelligence (Gartner)

### For Students

- **Reflection assignment** (optional): Write a 500-word essay applying Data-Logic-Action to a decision in your internship company. Include:
  - Problem description
  - Data sources (with explanation of instance-level + operational)
  - Logic approach (deterministic, probabilistic, or hybrid)
  - Action mechanism (which systems get write-back)
  - Obstacles you'd face implementing this in practice

- **Further exploration**:
  - Research "decision-centric architecture" vs. "database-centric architecture"
  - Read about "write-back" in business intelligence tools (limited compared to Ontology approach)
  - Explore case studies of companies that transformed from dashboards to operational AI

---

## Contact & Feedback

**For technical issues with the app**: [GitHub Issues link]
**For pedagogical questions**: [Your contact email]
**To share student work or success stories**: We'd love to see how students apply this framework!

---

**Version**: 1.0
**Last Updated**: December 2024
**Author**: Business Data Solutions, based on Palantir Ontology framework (Krishnaswamy, 2024)
