import QRCode from 'qrcode';

import { DevoteeMember } from '../types';

export const APP_BASE_URL = 'https://sanatanibandhan.web.app';

export const generateSecureQRToken = (member: DevoteeMember): string => {
  const vaultToken = member.qrSecretVaultToken || btoa(member.id + '-vault-' + Date.now());
  const payload = JSON.stringify({
    id: member.id,
    pin: member.pin,
    token: vaultToken
  });
  return payload; 
};

export const generateStandardA_AutoLoginQR = async (
  memberId: string,
  pin: string,
  workspaceName: string
): Promise<string> => {
  const url = `${APP_BASE_URL}/?action=autologin&id=${encodeURIComponent(memberId)}&pin=${encodeURIComponent(pin)}&workspace=${encodeURIComponent(workspaceName)}`;
  try {
    return await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a', // slate-900
        light: '#ffffff',
      }
    });
  } catch (err) {
    console.error('Error generating QR', err);
    return '';
  }
};

export const generateStandardB_GatePassQR = async (
  memberId: string
): Promise<string> => {
  const url = `${APP_BASE_URL}/?action=verify&id=${encodeURIComponent(memberId)}`;
  try {
    return await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#ea580c', // orange-600
        light: '#ffffff',
      }
    });
  } catch (err) {
    console.error('Error generating QR', err);
    return '';
  }
};

export const generateUPIQRCode = async (
  payeeName: string,
  payeeVPA: string,
  amount: number,
  transactionNote: string = 'Mandir Seva'
): Promise<string> => {
  const url = `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  try {
    return await QRCode.toDataURL(url, {
      width: 250,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      }
    });
  } catch (err) {
    console.error('Error generating UPI QR', err);
    return '';
  }
};
