'use client';

import { usePurchase } from '@/context/PurchaseContext';
import { useRouter } from 'next/navigation';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from '../icons/Icons';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = usePurchase();

  const closeCart = () => setIsCartOpen(false);
  const proceedToCheckout = () => alert('Proceeding to checkout (mock)');
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isCartOpen) return null;

  return (
    <div
      onClick={closeCart}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-neutral-700 bg-gray-900 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-700 p-4">
          <h2 className="text-lg font-semibold tracking-wide text-white">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeCart();
            }}
            className="rounded p-1 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
              <p>Your cart is empty.</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeCart();
                }}
                className="mt-4 rounded bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex cursor-pointer gap-4 rounded-lg bg-gray-800 p-3 transition hover:bg-gray-700"
                onClick={() => {
                  closeCart();
                  router.push(`/product-detail/${item.id}`);
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover ring-1 ring-gray-700"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-400">
                      {item.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full border border-gray-600"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                      <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                        {item.selectedSize}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          );
                        }}
                        className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <MinusIcon size={16} />
                      </button>
                      <span className="w-6 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          );
                        }}
                        className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <PlusIcon size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        ${item.price * item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(
                            item.id,
                            item.selectedSize,
                            item.selectedColor
                          );
                        }}
                        className="rounded p-1 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="space-y-3 border-t border-neutral-700 p-4">
            <div className="flex justify-between text-white">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                proceedToCheckout();
              }}
              className="w-full rounded bg-white px-4 py-2 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearCart();
              }}
              className="w-full rounded border border-gray-600 px-4 py-2 text-gray-300 transition hover:border-white hover:text-white"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
