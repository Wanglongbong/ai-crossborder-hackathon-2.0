import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const getConfig = () => {
  const endpoint = process.env.R2_ENDPOINT_URL;
  const bucket = process.env.R2_BUCKET;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey || !publicBaseUrl) {
    throw new Error("R2 storage is not configured");
  }

  return { endpoint, bucket, accessKeyId, secretAccessKey, publicBaseUrl };
};

const getClient = () => {
  const config = getConfig();
  return new S3Client({
    region: process.env.R2_REGION || "auto",
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
};

export const createR2UploadUrl = async (objectKey: string, contentType: string) => {
  const config = getConfig();
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: objectKey,
    ContentType: contentType,
  });

  return {
    uploadUrl: await getSignedUrl(getClient(), command, { expiresIn: 10 * 60 }),
    publicUrl: `${config.publicBaseUrl.replace(/\/$/, "")}/${objectKey}`,
  };
};

export const deleteR2Object = async (objectKey: string) => {
  const config = getConfig();
  await getClient().send(new DeleteObjectCommand({ Bucket: config.bucket, Key: objectKey }));
};

export const safeObjectName = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(-120) || "asset";
