import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';

if (!BUCKET_NAME) {
  throw new Error('Missing S3 bucket name');
}

export class StorageService {
  async uploadFile(key: string, file: Buffer, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await s3Client.send(command);
    return key;
  }

  async getFileUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  }

  // Helper methods for specific file types
  async uploadCompanyLogo(companyId: string, file: Buffer, contentType: string): Promise<string> {
    const key = `company-logos/${companyId}`;
    return this.uploadFile(key, file, contentType);
  }

  async uploadCampaignAsset(campaignId: string, assetId: string, file: Buffer, contentType: string): Promise<string> {
    const key = `campaign-assets/${campaignId}/${assetId}`;
    return this.uploadFile(key, file, contentType);
  }

  async uploadFAQAttachment(faqId: string, file: Buffer, contentType: string): Promise<string> {
    const key = `faq-attachments/${faqId}`;
    return this.uploadFile(key, file, contentType);
  }

  async uploadSKUImage(skuId: string, file: Buffer, contentType: string): Promise<string> {
    const key = `sku-images/${skuId}`;
    return this.uploadFile(key, file, contentType);
  }
}

export const storageService = new StorageService(); 