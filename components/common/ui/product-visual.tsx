import { FaShoppingBag } from "react-icons/fa";

type ProductVisualProps = {
  accent: string;
  name: string;
  className?: string;
};

const ProductVisual = ({
  accent,
  name,
  className = "aspect-[4/3]",
}: ProductVisualProps) => {
  return (
    <div
      className={`grid place-items-center overflow-hidden bg-gradient-to-br ${accent} ${className}`}
      role="img"
      aria-label={`${name} product image`}
    >
      <div className="grid size-24 place-items-center rounded-full bg-white/20 text-white shadow-2xl backdrop-blur-sm">
        <FaShoppingBag className="size-10" />
      </div>
    </div>
  );
};

export default ProductVisual;
