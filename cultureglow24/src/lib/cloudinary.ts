/**
 * Cloudinary Integration Layer
 *
 * TODO: Configure Cloudinary credentials in .env.local:
 *   CLOUDINARY_CLOUD_NAME=your-cloud-name
 *   CLOUDINARY_API_KEY=your-api-key
 *   CLOUDINARY_API_SECRET=your-api-secret
 *   CLOUDINARY_UPLOAD_PRESET=your-upload-preset
 *
 * Once configured, replace the stub implementations below with real Cloudinary SDK calls.
 */

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset: string;
}

function getConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !apiKey || !apiSecret || !uploadPreset) {
    return null;
  }

  return { cloudName, apiKey, apiSecret, uploadPreset };
}

export function isCloudinaryConfigured(): boolean {
  return getConfig() !== null;
}

export async function uploadImage(
  _buffer: Buffer,
  _filename: string,
  _folder?: string
): Promise<CloudinaryUploadResult> {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, and CLOUDINARY_UPLOAD_PRESET in your environment."
    );
  }

  throw new Error("Cloudinary upload not yet implemented. Configure credentials and replace this stub.");
}

export async function deleteImage(_publicId: string): Promise<void> {
  const config = getConfig();
  if (!config) {
    throw new Error("Cloudinary is not configured.");
  }

  throw new Error("Cloudinary delete not yet implemented.");
}

export function getTransformedUrl(
  _publicId: string,
  _options?: { width?: number; height?: number; crop?: string; quality?: number }
): string {
  const config = getConfig();
  if (!config) {
    return "";
  }

  return "";
}

export const cloudinaryStorageAdapter = {
  // TODO: Implement Payload storage adapter interface
};
