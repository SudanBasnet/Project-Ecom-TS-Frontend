import Image from "next/image";
import ProductVisual from "./product-visual";

type ProductMediaProps = {
  name: string;
  imageUrl?: string;
  className?: string;
};

const ProductMedia = ({ name, imageUrl, className }: ProductMediaProps) => {
  if (imageUrl) {
    return (
      <span className={`relative block overflow-hidden ${className ?? ""}`}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
      </span>
    );
  }

  return (
    <ProductVisual
      name={name}
      accent="from-indigo-600 via-sky-500 to-emerald-400"
      className={className}
    />
  );
};

export default ProductMedia;
