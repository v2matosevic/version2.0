# Form Specifications

> Per-form field definitions, submission flows, and UX patterns for all Version2.hr forms.
> Related: [form-architecture.md](form-architecture.md), [integrations.md](integrations.md)

---

## Contact Form

### Fields
- Name (required)
- Email (required)
- Message (required)
- Honeypot field (hidden, for spam prevention)

### Submission
POST to the custom backend API endpoint. The backend:
- Validates inputs server-side
- Stores the submission
- Sends email notification to the Version2 team
- Returns success/error response to the frontend

### UX
- Inline validation (show errors as user types, not after submit)
- Success state (clear confirmation message, not just a toast)
- Error state (clear message, don't lose the user's input)
- Loading state on submit button

---

## Pricing Tool Form

The final step of the interactive pricing configurator submits to the custom backend:
- All selected options (project type, scope, features, design, timeline)
- Calculated price range
- User's name and email
- Optional message

The backend validates the price calculation server-side (prevents manipulation), stores the lead with full configuration details, and sends a notification to the team. See `interactive-pricing-tool.md` for the full configurator spec.

---

## Booking / Scheduling System

Custom-built from scratch. Not Calendly, not Cal.com -- fully custom.

### Availability
- **Days:** Wednesday, Thursday, Friday
- **Hours:** 14:00 – 17:00 CET (2:00 PM – 5:00 PM)
- **Slot duration:** 30 minutes
- **Buffer between slots:** 15 minutes (prevents back-to-back meetings)
- **Advance booking window:** 2–14 days ahead (no same-day bookings, no bookings more than 2 weeks out)

### Features
- **Date/time picker:** Visitor selects from available slots (Wed-Fri 14:00-17:00 CET)
- **Contact method choice:** Email, WhatsApp, or phone call
- **Visitor info:** Name, email, brief project description
- **Calendar integration:** Google Calendar API via OAuth2 service account. The service account accesses the Version2 team calendar directly — no user-facing OAuth flow. Reads existing events to determine availability, writes new bookings as calendar events.
- **ICS file generation:** Booking confirmation emails include an `.ics` attachment so visitors can add the meeting to any calendar app (Google, Apple, Outlook).
- **Automated reminders:** Email reminder 24 hours before the booking
- **Confirmation notifications:** Both parties receive confirmation (email + optional WhatsApp)

### Timezone Handling

All slots are displayed in Europe/Zagreb timezone (CET in winter, CEST in summer). The frontend sends the selected slot in this timezone. The backend converts to UTC for storage and calendar event creation.

### Cancellation

No self-service cancellation in v1. Visitors contact `info@version2.hr` to cancel or reschedule. This instruction is included in the booking confirmation email copy.

### Backend Responsibilities
- Manages available time slots based on team calendar
- Prevents double-booking
- Sends confirmation emails/WhatsApp messages
- Triggers reminder emails before scheduled meetings
- Stores all booking data for the dashboard

---

## AI Chat Agent

Chat interface accessible from the floating action button (FAB) on every page.

### Purpose
- **Potential clients:** Answers questions about services, pricing, projects, tech stack. Guides visitors to relevant pages.
- **Existing clients:** Troubleshooting, support questions.
- **Contact channel:** Visitors can reach Version2 through the chat. Conversations feed into the backend.

### Technical Architecture
- **LLM API integration:** Claude or GPT via API key (standard HTTPS calls from backend)
- **RAG (Retrieval-Augmented Generation):** Trained on all website content — services, portfolio, pricing, blog posts. Knows everything on the site.
- **Conversation storage:** All conversations persisted in the backend database
- **Notification system:** Alerts the team when a conversation needs human follow-up

### RAG Implementation Approach
The RAG pipeline ingests all site content at build time (or on CMS save):
1. **Content sources:** 103 blog posts, service page copy, portfolio case studies, pricing tool options, FAQ-style content, company info from site-config.json
2. **Chunking:** Split content into ~500-token chunks with overlap. Each chunk tagged with source page and language.
3. **Embeddings:** Generate embeddings via the same LLM provider's embedding API (e.g., Claude's embedding model or OpenAI `text-embedding-3-small`)
4. **Storage:** Embeddings stored in a lightweight vector store on the backend (e.g., SQLite with vector extension, or a JSON file for small corpus). No external vector DB needed for ~200 documents.
5. **Retrieval:** On each user message, embed the query, find top-5 relevant chunks, include as context in the LLM prompt
6. **Language awareness:** RAG retrieves chunks in the language the user is writing in. System prompt instructs the LLM to respond in the same language.

Exact LLM provider, embedding model, and vector storage are Phase 4 decisions. The architecture is provider-agnostic.

### System Prompt

```
You are Version2's AI assistant. You help visitors learn about Version2's web development services, pricing, process, and portfolio. You are friendly, direct, and knowledgeable.

Rules:
- Answer from provided context (RAG). If unsure, say so.
- For pricing questions, give ranges from the pricing tool and suggest using it for details.
- For complex project inquiries, suggest booking a consultation.
- Never make up project examples or client names.
- Respond in the visitor's language (detect from their message or the language parameter).
- Keep responses concise (2-3 paragraphs max).
- If the visitor explicitly requests human help, flag for team follow-up.
```

### Conversation Limits

- **Max message length:** 1000 characters
- **Max messages per conversation:** 50
- **Context window:** Last 10 messages + RAG context (top-5 chunks)

### Data Retention & Privacy

- **Conversation retention:** Auto-deleted after 90 days (GDPR compliance). A scheduled job runs daily to purge expired conversations and their messages. Retention period is configurable via environment variable.
- **Access controls:** Only authenticated CMS users can view conversation logs in the backend dashboard. Public visitors cannot access other visitors' conversations.
- **Anonymization in RAG:** No PII is stored in RAG embeddings — only page content (blog posts, service descriptions, company info). Visitor messages are used for real-time retrieval but are never added to the embedding corpus.
- **Consent:** The chat UI displays a brief notice before the first message: conversations are stored to improve service quality and auto-deleted after 90 days. This aligns with the cookie consent and privacy policy (see `content/pages/kolacici/en.md`).

### Frontend
- Chat UI opens from the FAB (floating action button, fixed in corner)
- Message input, conversation history, typing indicator
- Smooth open/close animation consistent with site design
- Messages sent to backend API, which handles LLM calls and returns responses

This is a significant differentiator -- most web dev studios don't have an AI agent on their site. It demonstrates the AI integration capability that Version2 offers as a service.

---

## Career Applications

### Fields
- Name (required)
- Email (required)
- Portfolio or GitHub link (optional)
- Short message (required, min 10 chars)

### Submission
POST to the custom backend API. Stored for review in the backend dashboard. Email notification to the team.

---

## Analysis Page

The analysis page is a lead-generation tool. Visitors submit their website URL and contact info. Version2 manually reviews the site and emails a personalized audit report.

### Form Fields

- Name (required)
- Email (required)
- Website URL (required)
- Optional message
- Honeypot (`_honey`)

### What Version2 Checks

The page describes the audit scope to set expectations:

- **Performance:** Load speed, Core Web Vitals
- **SEO:** Meta tags, structured data, mobile-friendliness
- **Design:** Visual quality, UX patterns, accessibility
- **Security:** HTTPS, headers, vulnerabilities
- **Content:** Readability, engagement, calls to action

### Implementation

No automated analysis in v1. The form submits to `POST /api/contact` with a `type: "analysis"` field to distinguish from regular contact submissions. The backend stores it alongside contact submissions, and the team follows up manually with the audit.

---

## Related Files

- [form-architecture.md](form-architecture.md) — Shared validation strategy, error display, honeypot pattern
- [integrations.md](integrations.md) — Analytics conversion tracking on form submissions
- [../backend/api-contracts.md](../backend/api-contracts.md) — API endpoint contracts and request/response formats
- [../backend/operations.md](../backend/operations.md) — Email templates triggered by form submissions
- [../interactive-pricing-tool.md](../interactive-pricing-tool.md) — Full pricing configurator spec
