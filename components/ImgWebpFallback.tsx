import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
}

export const ImgWebpFallback = (props: Props) => {
  const { src, fallback, alt, ...rest } = props;
  // eslint-disable-next-line @next/next/no-img-element
  const fallbackImg = <img src={fallback} alt={alt} {...rest} />;
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      {fallbackImg}
    </picture>
  );
};
