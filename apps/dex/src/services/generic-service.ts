export class GenericService {
  static async getImage(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
  } else return process.env.NEXT_PUBLIC_VERCEL_URL
}
