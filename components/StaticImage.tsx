// next/image ignorerer basePath når unoptimized+static export brukes.
// Denne wrapperen legger til basePath manuelt via env-variabel.
import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { alt: string };

export default function StaticImage({ src, alt, ...rest }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return <img src={`${base}${src}`} alt={alt} {...rest} />;
}
