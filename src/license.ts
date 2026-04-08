/**
 * License verification service for Natural Move/Export
 */

import { requestUrl } from 'obsidian';

export interface LicenseStatus {
    isValid: boolean;
    message?: string;
    errorType?: 'invalid' | 'connection' | 'none';
    instanceId?: string;
}

/**
 * Verifies a license key.
 * If an instanceId is provided, it uses the 'validate' endpoint.
 * Otherwise, it uses 'activate'.
 */
export async function verifyLicense(licenseKey: string, instanceId?: string): Promise<LicenseStatus> {
    if (!licenseKey || licenseKey.trim().length < 5) {
        return { isValid: false };
    }

    const key = licenseKey.trim();
    
    // 1. Lemon Squeezy API Activation/Validation
    try {
        const isValidation = !!instanceId;
        const endpoint = isValidation ? 'validate' : 'activate';
        
        const body: any = {
            license_key: key,
            instance_name: 'Obsidian Plugin'
        };
        
        if (isValidation) {
            body.instance_id = instanceId;
        }

        const response = await requestUrl({
            url: `https://api.lemonsqueezy.com/v1/licenses/${endpoint}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = response.json;

        // Lemon Squeezy gibt 'activated: true' oder 'valid: true' zurück.
        const success = isValidation ? data.valid : data.activated;

        if (success === true) {
            return { 
                isValid: true, 
                message: isValidation ? "License is valid." : "License activated successfully.",
                errorType: 'none',
                instanceId: data.instance?.id || instanceId
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
