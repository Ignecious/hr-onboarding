# Role-Based Onboarding Journeys - Feature Specification

## Overview
Dynamic checklist generation based on employee department, role, location, and employment type.

## Business Requirements
- Different onboarding requirements for different departments (Health needs SANC cert, Finance needs ethics training)
- Role-specific steps (Managers need additional compliance training)
- Location-specific requirements (Metro areas vs rural)
- Employment type variations (permanent vs contract vs intern)

## Technical Specification

### Journey Rule Engine
Database table: journey_rules
- rule_id (UUID, PK)
- rule_name (varchar)
- conditions (JSONB) - department, role, location, employment_type filters
- steps (JSONB array) - checklist steps to add
- priority (int) - rule precedence
- active (boolean)
- created_at, updated_at

### Rule Matching Logic
1. Fetch all active rules
2. Filter rules where employee matches ALL conditions
3. Sort by priority (descending)
4. Merge steps from all matching rules
5. Deduplicate steps by step_name
6. Return final checklist

### API Endpoints
POST /api/employees/{id}/journey/generate - Generate journey for employee
GET /api/admin/journey-rules - List all rules
POST /api/admin/journey-rules - Create new rule
PATCH /api/admin/journey-rules/{id} - Update rule
DELETE /api/admin/journey-rules/{id} - Deactivate rule

### Department-Specific Templates (POC)

#### Health Department
Base steps (all health employees):
- Upload SANC/HPCSA Registration (if applicable)
- Occupational Health Screening
- Infection Control Training

Role-specific additions:
- Nurse: Advanced Life Support Training
- Doctor: Medical indemnity insurance proof
- Admin: Patient privacy training

#### Education Department  
Base steps:
- SACE Registration Certificate
- Criminal background check (working with minors)
- Safeguarding training

Role-specific:
- Teacher: Subject-specific accreditation
- Principal: School management training
- Support staff: First aid certification

#### Finance Department
Base steps:
- Financial disclosure declaration
- Ethics training
- System access (SAP/financial systems)

Role-specific:
- Manager: Signing authority setup
- Accountant: Professional body membership (SAICA/SAIPA)

### UI Components

#### Admin: Journey Rule Builder
- Condition builder (dropdown filters for dept, role, location)
- Step selector (drag-drop checklist items)
- Priority slider
- Preview: "This rule will apply to X current employees"

#### HR: Generated Checklist View
- Show which rules applied
- Ability to manually add/remove steps
- Audit trail: "Step added via rule: health-nurses"

#### Employee: Personalized Checklist
- Just sees final checklist
- No indication of rule-based generation
- Clear progress tracking

## Mock Data Examples

### Example Rule 1: Base Government Employee
```json
{
  "rule_id": "base-001",
  "rule_name": "All Gauteng Government Employees",
  "conditions": {},
  "steps": [
    {"name": "Upload SA ID", "required": true, "order": 1},
    {"name": "POPIA Consent", "required": true, "order": 2},
    {"name": "Code of Conduct Acceptance", "required": true, "order": 3}
  ],
  "priority": 1
}
```

### Example Rule 2: Health Nurses
```json
{
  "rule_id": "health-nurse-001",
  "rule_name": "Health Department - Nurses",
  "conditions": {
    "department": ["Health"],
    "role": ["Nurse", "Registered Nurse", "Enrolled Nurse"]
  },
  "steps": [
    {"name": "SANC Registration Certificate", "required": true, "order": 10},
    {"name": "Infection Control Training", "required": true, "order": 11},
    {"name": "Occupational Health Screening", "required": true, "order": 12}
  ],
  "priority": 10
}
```

## Success Metrics
- 95% of employees get correct checklist on first generation
- <2% manual overrides needed
- HR reports 70% time savings vs manual checklist creation

## Implementation Phases

### POC (Week 2)
- 3 department templates (Health, Education, Finance)
- 5 role-specific rules
- Basic admin UI (form-based rule creation)
- Auto-generation on employee creation

### MVP (Week 10-12)
- All 9 provincial departments
- 30+ role-specific rules
- Visual rule builder UI
- Retroactive application (update existing employees)
- Rule analytics (which rules apply most often)

## Edge Cases
- Employee changes department mid-onboarding → Re-generate checklist, mark completed steps
- Multiple roles (e.g., Nurse + Trainer) → Merge both rule sets
- Conflicting rules (same priority) → Admin alert, manual resolution

## Dependencies
- Employee master data (department, role must be set)
- Checklist step library (standardized step names)
- Admin user permissions (only HR managers can edit rules)