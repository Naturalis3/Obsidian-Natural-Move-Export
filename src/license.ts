/**
 * License verification service for Natural Move/Export
 */

import { requestUrl } from 'obsidian';

export interface LicenseStatus {
    isValid: boolean;
    message?: string;
    errorType?: 'invalid' | 'connection' | 'none';
}

/**
 * Verifies a license key.
 * In a real-world scenario, this would call an external API (e.g., Gumroad, Lemon Squeezy).
 * For now, we implement a basic validation logic.
 */
export async function verifyLicense(licenseKey: string): Promise<LicenseStatus> {
    if (!licenseKey || licenseKey.trim().length < 5) {
        return { isValid: false };
    }

    const key = licenseKey.trim();
    
    // 1. Lemon Squeezy API Activation
    try {
        // Wir nutzen den offiziellen Lemon Squeezy Activation Endpoint.
        // Dieser benötigt KEINEN geheimen API-Key, da er für Client-Apps gedacht ist.
        const response = await requestUrl({
            url: 'https://api.lemonsqueezy.com/v1/licenses/activate',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                license_key: key,
                instance_name: 'Obsidian Plugin' // Optional: Name des Geräts
            })
        });

        const data = response.json;

        // Lemon Squeezy gibt 'activated: true' zurück, wenn der Key gültig ist.
        if (data.activated === true) {
            return { 
                isValid: true, 
                message: "License activated successfully.",
                errorType: 'none'
            };
        } else if (data.error) {
            return { 
                isValid: false, 
                message: data.error,
                errorType: 'invalid'
            };
        }

        return { isValid: false, errorType: 'invalid' };
    } catch (e) {
        console.error("Lemon Squeezy Verification Error:", e);
        return { 
            isValid: false, 
            message: "Connection error to license server.",
            errorType: 'connection'
        };
    }
}
