import type { Metadata } from "next";
import WishlistContent from "./wishlist-content";

export const metadata: Metadata = {
  title: "Wishlist",
};

const WishlistPage = () => <WishlistContent />;

export default WishlistPage;
