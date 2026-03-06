# 360° Visibility Dashboard - Feature Specification

## Overview
Executive dashboard providing real-time insights into onboarding health, bottlenecks, and employee readiness status.

## Business Requirements
- HR managers need instant visibility into who's ready to start work
- Identify blocked employees before they become critical
- Proactively address stalled onboardings
- Executive-level metrics for reporting to department heads

## Key Metrics Tracked

### Primary KPIs
1. **Ready to Start** - Employees at 100% completion, cleared to work
2. **Blocked** - Critical blocker preventing progress (failed verification, rejected docs)
3. **Stalled** - No activity in 5+ days
4. **In Progress** - Actively completing onboarding (activity in last 5 days)
5. **At Risk** - Approaching start date with <80% completion

### Secondary Metrics
- Average time to complete onboarding (days)
- Completion rate by department
- Most common blockers (top 5)
- Document rejection rate
- Time spent per onboarding step (bottleneck analysis)

## Dashboard Layout

### Section 1: Health Overview (Top Cards)
Four KPI cards showing: Ready to Start (8), Blocked (3), Stalled (2), In Progress (12)

### Section 2: Detailed Status Table
Columns: Employee Name, Department, Role, Start Date, Completion %, Status, Last Activity, Primary Blocker, Actions

Filters: Department dropdown, Status filter, Date range, Search by name/employee ID

### Section 3: Bottleneck Analysis
Bar chart showing average time per step with bottleneck indicators

### Section 4: Department Comparison
Table showing: Department, Average Time, Completion Rate, Employees Onboarding

### Section 5: Recent Activity Feed
Real-time feed of onboarding events

## Technical Specification

### API Endpoints

GET /api/dashboard/visibility - Returns complete dashboard data with KPIs, employees, bottlenecks, blocker breakdown, and department metrics

GET /api/dashboard/activity-feed - Returns recent activity from last 24 hours

### Real-Time Updates
- Dashboard refreshes every 30 seconds (polling)
- WebSocket for instant updates when employee status changes
- Notification badge when new blockers appear

## UI Components (Angular + PrimeNG)

### KPI Cards
Use p-card component with dynamic styling based on status

### Status Table
Use p-table with sorting, filtering, pagination, and action buttons

### Charts
Use PrimeNG charts for bottleneck analysis and department comparison

## Color Coding & Visual Indicators

### Status Colors
- Ready to Start - Green (#22C55E)
- Blocked - Red (#EF4444)
- Stalled - Orange (#F97316)
- In Progress - Blue (#3B82F6)
- At Risk - Yellow (#EAB308)

### Icons (PrimeIcons)
- Ready: pi-check-circle
- Blocked: pi-times-circle
- Stalled: pi-clock
- In Progress: pi-spin pi-spinner
- At Risk: pi-exclamation-triangle

## Mock Data (POC)

Mock service returns 15-20 employees with varied statuses including ready (8), blocked (3), stalled (2), in progress (12), at risk (5)

## Success Metrics
- HR managers check dashboard 3+ times per day
- 80% of blockers resolved within 24 hours of identification
- 90% reduction in surprise delays
- Average onboarding time reduced by 30%

## Implementation Timeline

### POC (Week 3)
- Basic KPI cards
- Employee status table with filters
- Mock data service
- Manual refresh button

### MVP (Week 8-10)
- Real-time WebSocket updates
- Bottleneck analysis charts
- Department comparison
- Export to Excel functionality
- Mobile-responsive design

## Future Enhancements
- Predictive analytics (ML model predicts completion date)
- Automated alerts (Slack/Teams notifications)
- Custom dashboard layouts (drag-drop widgets)
- Historical trending (compare month-over-month)