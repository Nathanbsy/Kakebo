/**
 * Validation utilities
 */

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validateAmount(amount: number): boolean {
  return amount > 0;
}

export function validateDate(date: string): boolean {
  const d = new Date(date);
  return !isNaN(d.getTime());
}
