---
title: 'Beyond the Hype: Start Building Intelligent Systems from First Principles'
layout: post
comments: true
category: programming
tags:
- programming
- AI
- AI-agent
description: "\"Building an AI agent? It's not just about picking the flashiest toolbox
  like LangChain or CrewAI and praying for magic. It’s more like assembling IKEA furniture
  with the mind of Sherlock Holmes, the patience of a monk, and the logic of Mr. Spock.\"
  — ChatGPT \U0001F923\n<br/>\nBefore you glue parts together, **teach your system
  how to think** — define its brain loops, give it memory, a plan, eyes and hands...
  then finally decide if it needs to be a one-man-band  or a full-on Avengers team
  of sub-agents.\n<br/>\n*Start with brains, add tools later, frameworks don’t fix
  chaos* \U0001F618"
---

The world of AI is overflowing with powerful tools: LangChain, AutoGen, LangGraph, CrewAI, and many others. But with so many options, it's easy to feel overwhelmed. Where should you begin?

The answer: **start with first principles.** Before choosing tools or frameworks, focus on understanding **how your intelligent system should think and act**.

![Building intelligent System](/assets/img/posts/ai-agent-first-principles.png)

---
## Define the Execution Pattern

This isn't about choosing a language model—it's about defining your system's **thinking process**. These are called **execution patterns**, and they guide how your system reasons and takes actions.

### ReAct (Reason + Act)
  
The system alternates between thinking and acting. It is inspired by the way humans can intuitively use natural language—often through our own inner monologue—in the step-by-step planning and execution of complex tasks.
	
![ReAct Diagram](/assets/img/posts/ReAct.webp)

* *Loop*: **Think → Act → Observe → Repeat**
* *Example*: You're packing for a brief trip.
	1. **Think:** "What will the weather be like while I'm there?"
	2. **Act:** "I'll check the local weather forecast."
	3. **Observe:** "It's going to be cold."
	4. **Think:** "What warm clothes do I have?"
	5. **Act:** "I'll check my closet."
	6. **Observe:** "All of my warm clothes are in storage."
	7. **Think:** "What clothes can I layer together?"


### Plan then Act
First, create a detailed plan; then execute. Plan-and-Act consists of a **Planner** model which generates structured, high-level plans to achieve user goals, and an **Executor** model that translates these plans into environment-specific actions. This works best when the task is predictable.

![Plan then Act Diagram](/assets/img/posts/plan-and-execute.png)

* *Loop*: **Plan → Execute → Repeat**
* *Example*: You're packing for a brief trip.
	1. **Plan:**

		 * First, I'll check the weather at the destination.
		 * If it's cold, I'll pack warm clothes.
		 * Then I'll check my closet to find suitable outfits.
		 * If needed, I'll retrieve additional clothes from storage.
		 * Finally, I'll pack everything into a suitcase.

	2. **Act (execute plan step by step):**

		 * Check the weather: It's going to be cold.
		 * Check closet: Most warm clothes are in storage.
		 * Retrieve warm clothes from storage.
		 * Pack layered outfits into suitcase.

### Reflection Loop
After acting, the system reviews its own output and can retry. Reflection adds compute time but can greatly improve output quality—ideal for knowledge-intensive tasks, though less suited for low-latency use cases.

![Reflection Loop Diagram](/assets/img/posts/reflection.png)

* *Loop*: **Generate → Reflect → Revise → Repeat**
* *Example*: What does the `map()` function do in JS?
	1. **Generate:** The `map()` function filters an array.
	2. **Reflect:**
		* Incorrect: `map()` transforms, not filters.
		* Missing: It returns a new array.
		* Needs an example to clarify usage.
		* Check MDN documentation.
	3. **Revise:** The `map()` function in JS creates a new array by applying a function to each element of an existing array. It does not modify the original array. Example: `[1, 2, 3].map(x => x * 2)` returns `[2, 4, 6]`.

### Tree of Thoughts
Try different ideas(branches), keeps the best ones, and repeats until it finds a good solution. This approach simulates human cognitive strategies for problem-solving, enabling LLMs to explore multiple potential solutions in a structured manner, akin to a tree's branching paths.
	
![Reflection Loop Diagram](/assets/img/posts/tree-of-thoughts.jpg)
	
* *Loop*: **Expand → Score → Prune → Choose Best Path**
* *Example*: Find the smallest number that is divisible by 3, 4, and 5.
	* Expand: Generate several candidate numbers → 30, 60, 90, 120, 150
	* Score: Check if each number is divisible by 3, 4, and 5:
		* 30 → not divisible by 4
		* 60 → OK
		* 90 → not divisible by 4
		* 120 → OK
		* 150 → not divisible by 4
	* Prune: Keep only the valid candidates → 60, 120
	* Choose Best Path: Pick the smallest valid number → Answer: 60

---

## Identify the Four Core Subsystems
Execution patterns only work when supported by these **four essential subsystems**:
### Perception – How the Agent Sees the World

Perception is the agent's input layer. It's responsible for gathering information from the outside world and converting it into a usable internal format. *Like the eyes and ears of the agent.*

Examples:
* Reading a webpage or HTML structure.
* Parsing an API response or JSON payload.
* Ingesting a PDF document or scanned image using OCR.
* Receiving real-time user input or sensor data.

### Memory – What the Agent Remembers
Memory stores past interactions, observations, and intermediate results. It allows the agent to maintain context across steps, sessions, or even tasks. *Like the brain's hippocampus—critical for continuity and learning.*

Types of Memory:
* **Short-term memory:** Context of the current task or conversation (e.g., past few messages in a chat).
* **Long-term memory:** Persistent storage like vector databases for retrieval (e.g., Pinecone, FAISS).
* **Scratchpad memory:** Temporary notes during planning and execution.

Examples:
* A chatbot remembering the user's name.
* An agent caching prior API results to avoid repeated calls.
* A summarization agent referencing earlier content to ensure consistency.

### Planning – How the Agent Breaks Down the Goal
Planning is the agent's ability to translate goals into structured sequences of actions. It considers the current state, desired outcome, and available tools to generate a logical plan. *Like a chess player thinking several moves ahead.*

Types of Planning:
* **Static plans:** Generated once, then executed as-is.
* **Dynamic plans:** Adapt as new information comes in.

Examples:
* Turning a user request ("Book me a flight") into API calls to search, filter, and book.
* Decomposing a programming task into code generation + test creation + validation.
* Designing a multi-step research strategy using search, summarization, and cross-checking.

### Execution – How the Agent Takes Action
Execution is the interface between the agent's internal decisions and the external world. It's where abstract plans become real-world operations. *Like a person using their hands and voice to interact with the environment.*

Examples:
* Calling APIs, such as sending a message or placing an order.
* Clicking buttons or filling forms in a headless browser.
* Generating documents, updating databases, or sending notifications.

---

## Choose the Right Agent Architecture
Once you've defined **how your system thinks (execution pattern)** and **what it needs to operate (subsystems)**, the next step is to decide **how to wire everything together**—this is your **agent architecture**.

Agent architecture determines the internal structure of your system:

* How subsystems interact
* How decisions are made
* How responsibilities are delegated
* How complexity is managed

### Single-Loop
A minimal, linear architecture where the agent processes inputs, plans, acts, and repeats in a single loop. *Like a human working without feedback—just doing and moving on.*

Structure: **Perception → Planning → Execution → (optional Memory) → repeat**

Use Cases:
* Simple agents with limited scope (e.g., weather assistant, currency converter)
* One-off task executors like form fillers or summarizers

Pros:
* Easy to implement and debug
* Low overhead, good for latency-sensitive applications

Cons:
* Poor modularity
* No verification or error correction
* Hard to scale beyond basic use cases

### Planner–Executor–Verifier (PEV)
A modular agent architecture where responsibilities are separated into **planning**, **execution**, and **verification** components. *Like a writer (planner), an assistant (executor), and an editor (verifier) working together.*

Structure: **Planner → Executor → Verifier → Feedback (loop)**

Use Cases:
* Knowledge retrieval with citation validation
* Code generation with test execution and verification
* Research assistants that require output quality control

Pros:
* High assurance and correctness
* Easier to extend or fine-tune components independently
* Can apply reflection or retry logic

Cons:
* Slower due to extra verification steps
* More complex to design and maintain

### Hierarchical Supervisor
A **multi-agent** setup where a **top-level supervisor agent** delegates tasks to **sub-agents**, each responsible for a specialized domain or workflow segment. *Like a project manager assigning tasks to a team of experts.*

Structure:
```
Supervisor Agent
 ├── Sub-Agent A (e.g., Search)
 ├── Sub-Agent B (e.g., Write)
 ├── Sub-Agent C (e.g., Verify)
```

Use Cases:
* Complex workflows (e.g., customer support, software troubleshooting)
* Multi-modal tasks (e.g., combining visual, textual, and code outputs)
* DevOps or business process orchestration

Pros:
* High scalability and reusability
* Enables specialization (sub-agents can be domain-specific)
* Parallelization and modular retry

Cons:
* Harder to coordinate and monitor
* Requires robust communication between agents
* Latency and resource overhead increase

### Reflexive / Meta-Agent
An advanced form where an agent observes and improves its own behavior over time, potentially adjusting its planning or reasoning logic dynamically. *Like a person reflecting on their work habits and improving over time.*

Use Cases:
* Agents that evolve with usage (self-learning)
* Systems that tune their own prompts or tool strategies
* Research assistants that adapt based on result quality

Pros:
* Strong adaptability
* Ideal for experimentation and iterative learning

Cons:
* Complex, harder to debug
* Risk of unintended behavior if not constrained

---

### Choose Your Framework
After you've done the architectural thinking—defining **how your agent thinks**, **how it functions**, and **how it's structured**—it's time to choose a **framework** to support your implementation.

Friendly advice:
* Start with your **design** → then pick a **tool**.
* Don't force your architecture to fit a framework's mold.
* For simple agents, consider starting **without a framework**, then add one only when needed.

Example
* **Design:** ReAct-style agent with long-term memory and verification
* **Architecture:** Planner → Executor → Verifier
* **Tools Needed:** Search tool, calculator, knowledge base
* **Framework fit:** Use **LangChain** with ReAct + custom tool integrations + a Verifier step.
