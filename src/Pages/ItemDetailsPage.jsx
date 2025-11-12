import React, { useState } from "react";
import {
  Heart,
  Share2,
  MapPin,
  Mail,
  Calendar,
  ShoppingCart,
  Star,
  Check,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { useRef } from "react";
import OrderForm from "../components/OrderModal";
import Swal from "sweetalert2";
import OptimizedImage from "../components/OptimizedImage";
import useDynamicTitle from "../Hooks/useDynamicTitle";

export default function ProductDetailsPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const dialogRef = useRef();
  const instanceSecure = useAxiosSecure();
  const { id } = useParams();
  useDynamicTitle("Item Details");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instanceSecure.get(`/listing/${id}`);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instanceSecure, id]);

  const handleModalOpen = () => {
    dialogRef.current.showModal();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this awesome pet/product: ${product.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to={"/"} className="hover:text-rose-500 cursor-pointer">
            Home
          </Link>
          <span>/</span>
          <span className="hover:text-rose-500 cursor-pointer">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative group">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"
                  }`}
                />
              </button>
              <div className="absolute top-4 left-4 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {product.category}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-rose-500 text-rose-500"
                  />
                ))}
                <span className="text-gray-600 text-sm">(128 reviews)</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-bold text-rose-500">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Quantity */}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  disabled={product.category == "Pets"}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  disabled={product.category == "Pets"}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleModalOpen}
                className="flex-1 bg-linear-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {product.category == "Pets" ? "Adopt Now" : "Add to Cart"}
              </button>
              <button
                onClick={handleShare}
                className="w-14 h-14 border-2 border-rose-500 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Shield className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Quality</p>
                <p className="text-xs text-gray-600">Guaranteed</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Truck className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Ship</p>
                <p className="text-xs text-gray-600">On ৳1000+</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <RotateCcw className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">7 Days</p>
                <p className="text-xs text-gray-600">Return</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>
                  <span className="font-semibold text-gray-900">Location:</span>{" "}
                  {product.location}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rose-500" />
                <span>
                  <span className="font-semibold text-gray-900">Contact:</span>{" "}
                  {product.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-rose-500" />
                <span>
                  <span className="font-semibold text-gray-900">Listed:</span>{" "}
                  {new Date(product.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Modal  */}
            <dialog
              className="modal modal-bottom sm:modal-middle"
              ref={dialogRef}
            >
              <div className="modal-box ">
                <OrderForm
                  dialogRef={dialogRef}
                  product={product}
                  quantity={quantity}
                />
              </div>
            </dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
