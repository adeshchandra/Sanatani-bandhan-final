export type PlanId = 'DEMO' | 'SEVA' | 'MANDIR' | 'SMART_PRO' | 'SAMPRADAYA';

export interface PlanPrice {
  monthly: number;
  annual: number;
  currency: string;
  currencySymbol: string;
}

export interface PlanLimits {
  devotees: number; // -1 means unlimited
  transactions: number; // -1 means unlimited
  events: number; // -1 means unlimited
  storageMB: number; // -1 means unlimited
  adminSeats: number; // -1 means unlimited
  pdfsPerMonth: number; // -1 means unlimited
}

export interface PlanFeatures {
  devotee_directory: boolean;
  treasury_ledger: boolean;
  pooja_calendar: boolean;
  dharamshala: boolean;
  asset_inventory: boolean;
  panchayat_polling: boolean;
  sanatani_vivah: boolean;
  purohit_market: boolean;
  vanshavali: boolean;
  data_export: boolean;
  // Killer Enterprise Features
  qr_biometric: boolean;
  whatsapp_broadcast: boolean;
  offline_emergency: boolean;
  yatra_net: boolean;
  god_mode_audit: boolean;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  badge?: string;
  description: string;
  price: PlanPrice;
  limits: PlanLimits;
  features: PlanFeatures;
  highlightedFeatures: string[];
}

export const SUBSCRIPTION_PLANS: Record<PlanId, PlanDefinition> = {
  DEMO: {
    id: 'DEMO',
    name: 'Public Demo',
    description: 'Temporary sandbox for exploration',
    price: { monthly: 0, annual: 0, currency: 'INR', currencySymbol: '₹' },
    limits: { devotees: 6, transactions: 6, events: 2, storageMB: 10, adminSeats: 1, pdfsPerMonth: 0 },
    features: { devotee_directory: true, treasury_ledger: true, pooja_calendar: true, dharamshala: true, asset_inventory: true, panchayat_polling: true, sanatani_vivah: true, purohit_market: true, vanshavali: true, data_export: false, qr_biometric: true, whatsapp_broadcast: false, offline_emergency: true, yatra_net: true, god_mode_audit: false },
    highlightedFeatures: ['Sandbox access']
  },
  SEVA: {
    id: 'SEVA',
    name: 'Seva Plan',
    badge: 'CORE',
    description: 'Perfect for small temples and local trusts getting started.',
    price: { monthly: 0, annual: 0, currency: 'INR', currencySymbol: '₹' },
    limits: { devotees: 50, transactions: 100, events: 5, storageMB: 100, adminSeats: 1, pdfsPerMonth: 3 },
    features: { devotee_directory: true, treasury_ledger: true, pooja_calendar: false, dharamshala: false, asset_inventory: false, panchayat_polling: false, sanatani_vivah: false, purohit_market: false, vanshavali: false, data_export: false, qr_biometric: false, whatsapp_broadcast: false, offline_emergency: false, yatra_net: false, god_mode_audit: false },
    highlightedFeatures: [
      'Up to 50 Devotees',
      'Basic Double-Entry Ledger',
      'Local Language Support',
      '3 Cryptographic PDFs/mo'
    ]
  },
  MANDIR: {
    id: 'MANDIR',
    name: 'Mandir Essentials',
    badge: 'POPULAR',
    description: 'The standard suite for growing local temples and mid-sized trusts.',
    price: { monthly: 1499, annual: 14990, currency: 'INR', currencySymbol: '₹' },
    limits: { devotees: 1000, transactions: 5000, events: 50, storageMB: 1000, adminSeats: 3, pdfsPerMonth: 50 },
    features: { devotee_directory: true, treasury_ledger: true, pooja_calendar: true, dharamshala: true, asset_inventory: true, panchayat_polling: false, sanatani_vivah: false, purohit_market: false, vanshavali: false, data_export: true, qr_biometric: true, whatsapp_broadcast: true, offline_emergency: true, yatra_net: false, god_mode_audit: false },
    highlightedFeatures: [
      'Biometric & QR Scanning',
      'Offline Emergency Ready',
      'WhatsApp Broadcasting',
      'Pooja & Asset Management',
      'Up to 1,000 Devotees'
    ]
  },
  SMART_PRO: {
    id: 'SMART_PRO',
    name: 'Smart Pro',
    badge: 'RECOMMENDED',
    description: 'Complete enterprise ecosystem for large organizations and global trusts.',
    price: { monthly: 4999, annual: 49990, currency: 'INR', currencySymbol: '₹' },
    limits: { devotees: -1, transactions: -1, events: -1, storageMB: 5000, adminSeats: 10, pdfsPerMonth: -1 },
    features: { devotee_directory: true, treasury_ledger: true, pooja_calendar: true, dharamshala: true, asset_inventory: true, panchayat_polling: true, sanatani_vivah: true, purohit_market: true, vanshavali: true, data_export: true, qr_biometric: true, whatsapp_broadcast: true, offline_emergency: true, yatra_net: true, god_mode_audit: true },
    highlightedFeatures: [
      'Crisis Command Center (Advanced)',
      'God Mode Audit & Security',
      'Yatra Net (Pilgrimage Tracking)',
      'Sanatani Vivah & Polling',
      'Unlimited Scale & PDFs'
    ]
  },
  SAMPRADAYA: {
    id: 'SAMPRADAYA',
    name: 'Sampradaya',
    description: 'Custom solutions for massive trusts (Tirupati-scale) requiring dedicated servers.',
    price: { monthly: 0, annual: 0, currency: 'INR', currencySymbol: '₹' },
    limits: { devotees: -1, transactions: -1, events: -1, storageMB: -1, adminSeats: -1, pdfsPerMonth: -1 },
    features: { devotee_directory: true, treasury_ledger: true, pooja_calendar: true, dharamshala: true, asset_inventory: true, panchayat_polling: true, sanatani_vivah: true, purohit_market: true, vanshavali: true, data_export: true, qr_biometric: true, whatsapp_broadcast: true, offline_emergency: true, yatra_net: true, god_mode_audit: true },
    highlightedFeatures: ['Custom Deployments', 'Dedicated Infrastructure', 'SLA Guarantees']
  }
};
