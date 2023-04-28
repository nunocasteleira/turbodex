/* eslint-disable turbo/no-undeclared-env-vars */
export class GenericService {
  static async getImage(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
  }
  if (process.env.NEXT_PUBLIC_AWS_BRANCH && process.env.NEXT_PUBLIC_AWS_APP_ID) {
    return "https://" + process.env.NEXT_PUBLIC_AWS_BRANCH + '.' + process.env.NEXT_PUBLIC_AWS_APP_ID + '.amplifyapp.com';
  }
  return process.env.NEXT_PUBLIC_BASE_URL
}
