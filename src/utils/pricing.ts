import { format, addDays, differenceInDays } from "date-fns";

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  maxUsers: number;
  maxProjects: number;
}

export const PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceAnnual: 190,
    features: ["25 AI fixes/month", "1 repo", "Email support"],
    maxUsers: 1,
    maxProjects: 1,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    priceAnnual: 490,
    features: ["100 AI fixes/month", "10 repos", "Priority support", "Slack alerts"],
    maxUsers: 5,
    maxProjects: 10,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 199,
    priceAnnual: 1990,
    features: ["Unlimited fixes", "Unlimited repos", "24/7 support", "Custom integrations"],
    maxUsers: -1,
    maxProjects: -1,
  },
];

export function calculateAnnualSavings(plan: PricingPlan): number {
  return plan.priceMonthly * 12 - plan.priceAnnual;
}

export function getTrialEndDate(startDate: Date, trialDays = 14): string {
  return format(addDays(startDate, trialDays), "yyyy-MM-dd");
}

export function daysUntilRenewal(renewalDate: Date): number {
  return differenceInDays(renewalDate, new Date());
}
