"use client";

import { addToCart } from "@/api/cart.api";
import { useAuth } from "@/hooks/auth.hook";
import { Role } from "@/types/enum.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }
  return "Unable to add this product to your cart";
};

const AddToCartButton = ({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) => {
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
      toast.success("Product added to cart");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleAdd = () => {
    if (!user) {
      toast.error("Login required to add products to your cart");
      router.push("/auth/login");
      return;
    }

    if (user.role !== Role.USER) {
      toast.error("Only customer accounts can add products to a cart");
      return;
    }

    mutation.mutate({ productId });
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading || mutation.isPending}
      onClick={handleAdd}
      className="btn flex-1 border-0 bg-[#4f46e5] text-white hover:bg-[#4338ca] disabled:bg-slate-300"
    >
      {mutation.isPending ? (
        <FiLoader className="animate-spin" />
      ) : (
        <FaShoppingCart />
      )}
      {disabled
        ? "Out of stock"
        : mutation.isPending
          ? "Adding..."
          : "Add to cart"}
    </button>
  );
};

export default AddToCartButton;
