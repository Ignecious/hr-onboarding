# Gauteng Province Government HR Onboarding Portal
## Enhanced Architecture Documentation v2.0

**Version:** 2.0 (Enhanced with Salesforce-Inspired Features)
**Date:** 2026-03-06
**Project Timeline:** 6 Weeks POC + 12 Weeks Full MVP
**Target Audience:** Technical & HR Leadership

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What's New in v2.0](#whats-new-in-v20)
3. [Project Overview](#project-overview)
4. [Enhanced System Architecture](#enhanced-system-architecture)
5. [Technology Stack](#technology-stack)
6. [Enhanced Core Features](#enhanced-core-features)
7. [Role-Based Onboarding Journeys](#role-based-onboarding-journeys)
8. [360° Visibility Dashboard](#360-visibility-dashboard)
9. [Automated Exception Routing](#automated-exception-routing)
10. [Employee Self-Service Portal](#employee-self-service-portal)
11. [Enhanced AI Capabilities](#enhanced-ai-capabilities)
12. [API Specifications](#api-specifications)
13. [Security & Compliance](#security--compliance)
14. [Infrastructure & DevOps](#infrastructure--devops)
15. [Frontend Architecture](#frontend-architecture)
16. [Updated Implementation Roadmap](#updated-implementation-roadmap)
17. [Success Metrics](#success-metrics)

---

## 1. Executive Summary

### Purpose
Build an **AI-first, API-enabled HR Onboarding Portal** for Gauteng Province Government that streamlines employee onboarding through intelligent automation, role-based workflows, real-time visibility, and employee self-service capabilities.

### Key Enhancements (v2.0)
- ✅ **Role-Based Onboarding Journeys** - Dynamic checklists per department/role/location
- ✅ **360° Real-Time Visibility** - Executive dashboard showing bottlenecks and blockers
- ✅ **Automated Exception Routing** - AI detects issues and escalates appropriately
- ✅ **Employee Self-Service Portal** - Empowering new hires to manage their own onboarding
- ✅ **Enhanced AI Document Processing** - Extract data from ALL document types, not just IDs
- ✅ **Training Integration** - Mandatory courses embedded in onboarding flow
- ✅ **Mobile-First Option** - Progressive web app for on-the-go completion
- ✅ **Context-Aware Compliance** - Auto-updates when regulations change

### Inspiration Sources
This enhanced version incorporates best practices from leading HR tech platforms:
- **Melonleaf AI-Powered Onboarding** - AI chatbot with PII masking, audit trails
- **Onboarded.com** - AI-first orchestration, context-aware compliance, real-time visibility
- **BiznusSoft HR** - Employee self-service, training checklists, automated workflows
- **WildnetEdge** - Metrics-driven approach (50% faster onboarding, 82% retention)

### POC vs. Full MVP Scope

#### POC (6 weeks) - Demonstrate Core Value
- Basic role-based journeys (3 departments)
- Essential visibility dashboard
- Simple exception alerts
- Basic employee portal
- AI ID + one other document type extraction
- Foundational chatbot

#### Full MVP (Additional 12 weeks) - Production-Ready
- Complete role-based engine (all departments)
- Advanced analytics dashboard
- Full exception routing workflows
- Mobile PWA
- Multi-document AI extraction
- Training LMS integration
- Context-aware compliance engine

---

## 2. What's New in v2.0

### Feature Comparison: v1.0 vs v2.0

| Feature Area | v1.0 (Original) | v2.0 (Enhanced) |
|--------------|-----------------|-----------------|
| **Onboarding Workflows** | Single generic checklist | Dynamic, role-based journeys |
| **Dashboard** | Basic stats (total, in progress) | 360° visibility (blockers, stalled, ready) |
| **Document Processing** | SA ID extraction only | All document types (degrees, bank, tax) |
| **Error Handling** | Manual intervention | Automated exception routing + escalation |
| **Employee Experience** | HR-driven only | Self-service portal + mobile option |
| **Compliance** | Static checklist | Context-aware, auto-updating |
| **Training** | Not included | Integrated mandatory courses |
| **AI Chatbot** | Basic Q&A | PII masking, policy indexing, escalation |
| **Analytics** | Basic metrics | Bottleneck analysis, time-to-complete tracking |
| **Notifications** | Email only | Email + SMS + in-app + proactive nudges |

---

## 3. Project Overview

### Business Context
**Target:** Gauteng Provincial Government (9+ departments, 100,000+ employees)
**Initial Departments:** Health, Education, Finance
**Current Pain Points:**
- Manual, paper-based onboarding (7-14 days average)
- No visibility into onboarding status
- Compliance gaps due to manual tracking
- High administrative burden on HR (70% time on admin tasks)
- Inconsistent onboarding experiences across departments
- No employee self-service capabilities

### Solution Vision
A **dual-purpose, AI-powered system**:
1. **Full HR Portal** - Complete web + mobile application for HR staff and employees
2. **RESTful API** - Pluggable integration for existing provincial systems and future department portals

### Key Differentiators
- **Government-First Design** - Built for SA public sector (POPIA, provincial compliance)
- **Data Sovereignty** - 100% South African data residency (AWS Cape Town)
- **API-First** - Reusable across all 9 provincial departments
- **AI-Powered** - Automation reduces manual work by 60%+
- **Employee-Centric** - Self-service reduces HR dependency

---

## 4. Enhanced System Architecture

### 4.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Gauteng Province Government                                   │
│              HR Onboarding System v2.0 - Enhanced Architecture                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│   HR Admin Portal    │   │  Employee Portal     │   │  Mobile PWA          │
│   (Angular 17)       │   │  (Self-Service)      │   │  (Future Phase)      │
│  - Visibility Dash   │   │  - My Onboarding     │   │  - Camera Upload     │
│  - Exception Queue   │   │  - Update Profile    │   │  - Push Notifications│
│  - Document Verify   │   │  - Training Courses  │   │  - Offline Mode      │
└──────────┬───────────┘   └──────────┬───────────┘   └──────────┬───────────┘
           │                          │                           │
           └──────────────────────────┼───────────────────────────┘
                                      │
                              ┌───────▼────────┐
                              │   CloudFront   │
                              │   (CDN + WAF)  │
                              └───────┬────────┘
                                      │
           ┌──────────────────────────┴─────────────────────────────┐
           │                                                          │
    ┌──────▼──────────┐                                   ┌──────────▼──────────┐
    │  API Gateway    │                                   │   Cognito           │
    │  (REST + Auth)  │                                   │   (Authentication)  │
    │  + Rate Limiting│                                   │   + User Pools      │
    └──────┬──────────┘                                   └─────────────────────┘
           │
┌──────────┴──────────────────────────────────────────────────────────────────────┐
│              AWS Lambda Functions (Node.js 18 + Python 3.11)                     │
├──────────────────────────────────────────────────────────────────────────────────┤
│  Enhanced Modular Monolith - Service Boundaries with Future Microservices Path  │
│                                                                                   │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   │
│  │ Employee Module     │  │ Document Module      │  │ Workflow Engine     │   │
│  │ - CRUD + Profile    │  │ - Multi-doc Upload   │  │ - Role-based Rules  │   │
│  │ - Self-service API  │  │ - AI Extraction      │  │ - State Machine     │   │
│  └─────────────────────┘  └──────────────────────┘  └─────────────────────┘   │
│                                                                                   │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   │
│  │ AI/Automation       │  │ Exception Routing    │  │ Visibility Engine   │   │
│  │ - Textract OCR      │  │ - Anomaly Detection  │  │ - Real-time Metrics │   │
│  │ - Bedrock Chatbot   │  │ - Auto-escalation    │  │ - Bottleneck Alerts │   │
│  │ - Smart Tagging     │  │ - Smart Reminders    │  │ - Exec Dashboard    │   │
│  └─────────────────────┘  └──────────────────────┘  └─────────────────────┘   │
│                                                                                   │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   │
│  │ Training Module     │  │ Notification Hub     │  │ Integration Layer   │   │
│  │ - Course Assignment │  │ - Email (Postmark)   │  │ - Home Affairs API  │   │
│  │ - Progress Tracking │  │ - SMS (AWS SNS)      │  │ - Payroll System    │   │
│  │ - Quiz Engine       │  │ - In-app Alerts      │  │ - LMS (Future)      │   │
│  └─────────────────────┘  └──────────────────────┘  └─────────────────────┘   │
└───────────────────────────────────────────────────────────────────────────────────┘
           │                          │                            │
    ┌──────▼──────────┐      ┌────────▼─────────────┐   ┌────────▼────────────┐
    │  Aurora         │      │   S3 (af-south-1)    │   │  DynamoDB           │
    │  PostgreSQL     │      │   - Documents        │   │  - Session Cache    │
    │  (af-south-1)   │      │   - Training Videos  │   │  - Exception Queue  │
    │  - Employee Data│      │   - Encrypted AES256 │   │  - Audit Events     │
    │  - Checklists   │      │   - Versioned        │   │                     │
    └─────────────────┘      └──────────────────────┘   └─────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────┐
│               External Integrations (Staged Implementation)                      │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────────┐   │
│  │ Home Affairs DHA API │  │ Provincial Payroll   │  │ Training LMS        │   │
│  │ (ID Verification)    │  │ System               │  │ (Moodle/Custom)     │   │
│  │ - Mock in POC        │  │ - Mock in POC        │  │ - POC: Embedded     │   │
│  │ - Real in Production │  │ - Real in Production │  │ - MVP: API          │   │
│  └──────────────────────┘  └──────────────────────┘  └─────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────┐
│              Monitoring, Observability & AI Ops                                  │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────┐  ┌────────────────┐     │
│  │ CloudWatch   │  │ X-Ray Tracing │  │ CloudTrail  │  │ Bedrock Logs   │     │
│  │ (Logs/Alerts)│  │ (Performance) │  │ (Audit)     │  │ (AI Monitoring)│     │
│  └──────────────┘  └───────────────┘  └─────────────┘  └────────────────┘     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 New Module: Role-Based Journey Engine

**Purpose:** Dynamically generate onboarding checklists based on employee attributes

**Architecture:**
```typescript
// Journey Rule Engine
interface JourneyRule {
  id: string;
  condition: {
    department?: string[];
    role?: string[];
    location?: string[];
    employmentType?: 'permanent' | 'contract' | 'intern';
  };
  steps: ChecklistStep[];
  priority: number; // Higher priority rules override lower
}

// Example Rules Database
const journeyRules: JourneyRule[] = [
  {
    id: 'base-all-employees',
    condition: {}, // Applies to everyone
    steps: [
      { name: 'Upload SA ID', required: true },
      { name: 'Upload Proof of Address', required: true },
      { name: 'Complete POPIA Consent', required: true }
    ],
    priority: 1
  },
  {
    id: 'health-nurses',
    condition: { department: ['Health'], role: ['Nurse', 'Registered Nurse'] },
    steps: [
      { name: 'Upload SANC Registration Certificate', required: true },
      { name: 'Complete Infection Control Training', required: true },
      { name: 'Occupational Health Screening', required: true }
    ],
    priority: 10
  },
  {
    id: 'finance-managers',
    condition: { department: ['Finance'], role: ['Manager', 'Senior Manager'] },
    steps: [
      { name: 'Financial Disclosure Declaration', required: true },
      { name: 'Complete Ethics Training', required: true },
      { name: 'System Access Request (SAP)', required: true }
    ],
    priority: 10
  }
];

// Journey Generation Logic
function generateJourney(employee: Employee): Checklist {
  const applicableRules = journeyRules
    .filter(rule => matchesCondition(rule.condition, employee))
    .sort((a, b) => b.priority - a.priority);
  
  const allSteps = applicableRules.flatMap(rule => rule.steps);
  const uniqueSteps = deduplicateSteps(allSteps);
  
  return {
    employeeId: employee.employeeId,
    steps: uniqueSteps,
    completionPercentage: 0
  };
}
```

### 4.3 New Module: Exception Routing Engine

**Purpose:** Automatically detect and route onboarding issues

**Detection Rules:**
```typescript
interface ExceptionRule {
  id: string;
  trigger: {
    type: 'document_rejected' | 'verification_failed' | 'stalled' | 'missing_docs';
    threshold?: number; // e.g., rejected 3 times
    days?: number; // e.g., stalled for 7 days
  };
  action: {
    notify: string[]; // Email addresses or roles
    escalateTo?: 'hr_manager' | 'senior_hr' | 'department_head';
    automation?: 'send_reminder' | 'schedule_call' | 'chatbot_intervention';
  };
}

const exceptionRules: ExceptionRule[] = [
  {
    id: 'document-multiple-rejections',
    trigger: { type: 'document_rejected', threshold: 2 },
    action: {
      notify: ['hr.supervisor@gauteng.gov.za'],
      escalateTo: 'hr_manager',
      automation: 'schedule_call'
    }
  },
  {
    id: 'onboarding-stalled',
    trigger: { type: 'stalled', days: 5 },
    action: {
      notify: ['employee.email'],
      automation: 'chatbot_intervention'
    }
  },
  {
    id: 'verification-failed',
    trigger: { type: 'verification_failed' },
    action: {
      notify: ['compliance@gauteng.gov.za'],
      escalateTo: 'senior_hr'
    }
  }
];
```

---

## 5. Technology Stack

(Same as v1.0 - no changes to core tech, enhancements are additive)

---

## 6. Enhanced Core Features

### 6.1 Feature Matrix (Updated)

| Feature | Priority | User Story | Acceptance Criteria | POC | MVP |
|---------|----------|-----------|---------------------|-----|-----|
| **Role-Based Journeys** | P0 | As HR, I want different onboarding paths per role | - 3 dept templates<br>- Auto-checklist gen<br>- Override capability | ✅ | ✅ |
| **360° Visibility Dashboard** | P0 | As HR Manager, I want to see who's stuck | - Blockers visible<br>- Stalled alert<br>- Ready count | ✅ | ✅ |
| **Employee Self-Service** | P0 | As new hire, I want to track my progress | - Progress bar<br>- Upload docs<br>- View checklist | ✅ Basic | ✅ Full |
| **Automated Exceptions** | P1 | As system, I want to detect and route issues | - 3 exception types<br>- Auto-email<br>- Escalation | ✅ Basic | ✅ Full |
| **Multi-Doc AI Extraction** | P1 | As HR, I want data from all docs, not just ID | - ID + 2 doc types<br>>90% accuracy | ✅ ID only | ✅ 5 types |
| **Training Integration** | P1 | As HR, I want mandatory courses in onboarding | - Video embed<br>- Completion tracking | ✅ Basic | ✅ LMS |
| **Mobile PWA** | P2 | As employee, I want mobile onboarding | - Camera upload<br>- Push notif | ❌ | ✅ |
| **Context-Aware Compliance** | P2 | As system, I want auto-updates for reg changes | - Admin rule editor<br>- Retroactive flag | ❌ | ✅ |

---

## 7. Role-Based Onboarding Journeys

(Include detailed spec content here - I'll continue in next message due to length)