export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
}

export const initialFormData: CheckoutFormData = {
  email: '', phone: '', firstName: '', lastName: '',
  address: '', city: '', postalCode: '', country: 'Morocco',
  cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
};

export function validateField(field: keyof CheckoutFormData, value: string): string | null {
  const v = value.trim();
  switch (field) {
    case 'email':
      return !v ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Invalid email' : null;
    case 'phone':
      return !v ? 'Phone is required' : v.replace(/\D/g, '').length < 8 ? 'Invalid phone number' : null;
    case 'firstName':
    case 'lastName':
      return !v ? 'This field is required' : null;
    case 'address':
      return !v ? 'Address is required' : null;
    case 'city':
      return !v ? 'City is required' : null;
    case 'postalCode':
      return !v ? 'Postal code is required' : null;
    case 'cardNumber':
      return v.replace(/\s/g, '').length !== 16 ? 'Enter a 16-digit card number' : null;
    case 'expiry': {
      if (!/^\d{2}\/\d{2}$/.test(v)) return 'Use MM/YY format';
      const [mm, yy] = v.split('/').map(Number);
      if (mm < 1 || mm > 12) return 'Invalid month';
      const now = new Date();
      const expDate = new Date(2000 + yy, mm);
      return expDate <= now ? 'Card has expired' : null;
    }
    case 'cvv':
      return !/^\d{3,4}$/.test(v) ? 'Enter 3 or 4 digit CVV' : null;
    case 'nameOnCard':
      return !v ? 'Name is required' : null;
    default:
      return null;
  }
}

export function validateAll(data: CheckoutFormData): Partial<Record<keyof CheckoutFormData, string>> {
  const errors: Partial<Record<keyof CheckoutFormData, string>> = {};
  for (const key of Object.keys(data) as (keyof CheckoutFormData)[]) {
    const err = validateField(key, data[key]);
    if (err) errors[key] = err;
  }
  return errors;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function generateOrderNumber(): string {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TAN-2026-${rand}`;
}

export function mockProcessOrder(): Promise<{ orderId: string }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ orderId: generateOrderNumber() }), 2000);
  });
}
