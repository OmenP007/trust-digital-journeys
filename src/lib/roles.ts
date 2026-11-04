import { UserProfile } from '@/types/escrow';

/**
 * A client (buyer) is the only role allowed to initiate a direct escrow payment.
 * Prefers the authoritative `capabilities.can_buy` from the backend when available.
 */
export function canCreateEscrow(user: UserProfile | null): boolean {
  if (!user) return false;
  if (user.capabilities != null) return user.capabilities.can_buy;
  return user.role === 'client';
}

/**
 * Sellers / members / admins can create Paylink offers.
 * Prefers the authoritative `capabilities.can_sell` from the backend when available.
 */
export function canCreateOffer(user: UserProfile | null): boolean {
  if (!user) return false;
  if (user.capabilities != null) return user.capabilities.can_sell;
  return ['seller', 'member', 'deaph'].includes(user.role);
}

/**
 * API keys are limited to developer accounts and staff.
 * Prefers the authoritative `capabilities.can_develop` from the backend when available.
 */
export function canManageApiKeys(user: UserProfile | null): boolean {
  if (!user) return false;
  if (user.capabilities != null) return user.capabilities.can_develop;
  return ['developer', 'deaph'].includes(user.role) || Boolean(user.is_staff);
}

/**
 * Whether the user can receive payouts via their seller account.
 * Prefers the authoritative `capabilities.can_receive_payouts` from the backend.
 */
export function canReceivePayouts(user: UserProfile | null): boolean {
  if (!user) return false;
  if (user.capabilities != null) return user.capabilities.can_receive_payouts;
  return ['seller', 'member', 'deaph'].includes(user.role);
}

export function isAdmin(user: UserProfile | null): boolean {
  return user?.role === 'deaph';
}

export function roleLabel(role?: string): string {
  switch (role) {
    case 'client':
      return 'Client / Acheteur';
    case 'seller':
      return 'Vendeur';
    case 'member':
      return 'Membre';
    case 'developer':
      return 'Développeur';
    case 'deaph':
      return 'Administrateur';
    default:
      return 'Membre';
  }
}

