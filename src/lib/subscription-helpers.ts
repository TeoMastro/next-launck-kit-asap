import { SubscriptionStatus } from '@/lib/constants';

interface UserProfile {
  subscription_status: string | null;
  subscription_end_date: string | Date | null;
  role: string;
}

export function hasActiveSubscription(user: UserProfile): boolean {
  return user.subscription_status === SubscriptionStatus.active;
}

export function hasValidSubscription(user: UserProfile): boolean {
  if (!user.subscription_status) return false;

  const validStatuses: string[] = [
    SubscriptionStatus.active,
    SubscriptionStatus.trialing,
  ];

  return validStatuses.includes(user.subscription_status);
}

export function isPremiumUser(user: UserProfile): boolean {
  return hasValidSubscription(user);
}

export function isFreeUser(user: UserProfile): boolean {
  return !hasValidSubscription(user);
}

export function getSubscriptionStatusLabel(
  status: string | null
): string {
  if (!status) return 'Free';

  switch (status) {
    case SubscriptionStatus.active:
      return 'Active';
    case SubscriptionStatus.canceled:
      return 'Canceled';
    case SubscriptionStatus.incomplete:
      return 'Incomplete';
    case SubscriptionStatus.incomplete_expired:
      return 'Expired';
    case SubscriptionStatus.past_due:
      return 'Past Due';
    case SubscriptionStatus.trialing:
      return 'Trial';
    case SubscriptionStatus.unpaid:
      return 'Unpaid';
    default:
      return 'Unknown';
  }
}
