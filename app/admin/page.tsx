"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  Search,
  ShieldCheck,
  CheckCircle2,
  X,
  Package,
  Star,
  Layers,
  Heart,
  Grid,
  List,
  RefreshCw,
  FolderEdit,
  Sparkles,
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

interface Product {
  id: string;
  _id?: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string;
  isBestSeller: boolean;
  customizable: boolean;
  occasion: string[];
  likesCount?: number;
}

interface CategoryCount {
  name: string;
  slug: string;
  count: number;
}

interface FeaturedCat {
  id: string;
  _id?: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
  order?: number;
}

export default function AdminPage() {
  const { user, loading, openAuthModal } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryCount[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal State for Add / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category Manager Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);
  const [newCatNameInput, setNewCatNameInput] = useState("");

  // Featured Categories Modal State
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [featuredCats, setFeaturedCats] = useState<FeaturedCat[]>([]);
  const [savingFeatured, setSavingFeatured] = useState(false);
  const [uploadingCatImgIndex, setUploadingCatImgIndex] = useState<number | null>(null);
  const [featuredStatusMsg, setFeaturedStatusMsg] = useState({ type: "", text: "" });

  // Hero Section Manager Modal State
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroImage, setHeroImage] = useState("/images/products/keychain.webp");
  const [floatingTagBadge, setFloatingTagBadge] = useState("Best Seller");
  const [floatingTagTitle, setFloatingTagTitle] = useState("Elarose Keychains");
  const [floatingTagPrice, setFloatingTagPrice] = useState("₹99");
  const [heroHeadline, setHeroHeadline] = useState("Handmade Luxury Gifts Crafted");
  const [heroHeadlineAccent, setHeroHeadlineAccent] = useState("With Love");
  const [heroSubheadline, setHeroSubheadline] = useState("Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.");
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [heroStatusMsg, setHeroStatusMsg] = useState({ type: "", text: "" });

  // Product Form Fields
  const [title, setTitle] = useState("");
  const [categorySelect, setCategorySelect] = useState("Flower Pots");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState<number | "">(249);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [customizable, setCustomizable] = useState(true);
  const [occasionInput, setOccasionInput] = useState("Birthday, Home Decor");

  // Uploading & Saving State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const fetchFeaturedCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/featured-categories", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setFeaturedCats(data.categories || []);
      }
    } catch (err) {
      console.error("Failed to fetch featured categories:", err);
    }
  }, []);

  const fetchHeroSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/hero", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.hero) {
          setHeroImage(data.hero.heroImage || "/images/products/keychain.webp");
          setFloatingTagBadge(data.hero.floatingTagBadge || "Best Seller");
          setFloatingTagTitle(data.hero.floatingTagTitle || "Elarose Keychains");
          setFloatingTagPrice(data.hero.floatingTagPrice || "₹99");
          setHeroHeadline(data.hero.headline || "Handmade Luxury Gifts Crafted");
          setHeroHeadlineAccent(data.hero.headlineAccent || "With Love");
          setHeroSubheadline(data.hero.subheadline || "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.");
        }
      }
    } catch (err) {
      console.error("Failed to fetch hero settings:", err);
    }
  }, []);

  const fetchProductsAndCategories = useCallback(async () => {
    setFetching(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch("/api/products", { cache: "no-store" }),
        fetch("/api/categories", { cache: "no-store" }),
      ]);

      if (resProd.ok) {
        const dataProd = await resProd.json();
        setProducts(dataProd.products || []);
      }

      if (resCat.ok) {
        const dataCat = await resCat.json();
        setCategoriesList(dataCat.categories || []);
      }
      await Promise.all([fetchHeroSettings(), fetchFeaturedCategories()]);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setFetching(false);
    }
  }, [fetchHeroSettings, fetchFeaturedCategories]);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  const resetForm = () => {
    setEditingProduct(null);
    setTitle("");
    setCategorySelect("Flower Pots");
    setCustomCategory("");
    setPrice(249);
    setShortDescription("");
    setDescription("");
    setImage("");
    setIsBestSeller(false);
    setCustomizable(true);
    setOccasionInput("Birthday, Home Decor");
    setStatusMessage({ type: "", text: "" });
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    
    // Check if category is standard or custom
    const isStandard = ["Flower Pots", "Keychains", "Custom Arrangements"].includes(product.category);
    if (isStandard) {
      setCategorySelect(product.category);
      setCustomCategory("");
    } else {
      setCategorySelect("OTHER");
      setCustomCategory(product.category);
    }

    setPrice(product.price);
    setShortDescription(product.shortDescription || "");
    setDescription(product.description || product.shortDescription || "");
    setImage(product.image || "");
    setIsBestSeller(product.isBestSeller || false);
    setCustomizable(product.customizable !== undefined ? product.customizable : true);
    setOccasionInput(Array.isArray(product.occasion) ? product.occasion.join(", ") : "");
    setStatusMessage({ type: "", text: "" });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploadingImage(true);
    setStatusMessage({ type: "info", text: "Uploading image to Cloudinary..." });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
        setStatusMessage({ type: "success", text: "Image uploaded to Cloudinary successfully!" });
      } else {
        setStatusMessage({ type: "error", text: data.message || "Failed to upload image" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Upload error" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = categorySelect === "OTHER" ? customCategory.trim() : categorySelect;

    if (!title || !finalCategory || !price || !shortDescription || !image) {
      setStatusMessage({ type: "error", text: "Please fill in all required fields including category" });
      return;
    }

    setSavingProduct(true);
    setStatusMessage({ type: "info", text: "Saving product..." });

    const occasions = occasionInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      category: finalCategory,
      categorySlug: finalCategory.toLowerCase().replace(/\s+/g, "-"),
      price: Number(price),
      shortDescription,
      description: description || shortDescription,
      image,
      isBestSeller,
      customizable,
      occasion: occasions,
    };

    try {
      const productId = editingProduct ? editingProduct.id || editingProduct._id : null;
      const url = productId ? `/api/products/${productId}` : "/api/products";
      const method = productId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: editingProduct ? "Product updated successfully!" : "Product created successfully!",
        });
        await fetchProductsAndCategories();
        setTimeout(() => {
          setIsModalOpen(false);
          resetForm();
        }, 600);
      } else {
        setStatusMessage({ type: "error", text: data.message || "Failed to save product" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Save error" });
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const productId = product.id || product._id;
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProductsAndCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting product");
    }
  };

  // Category Rename Handler
  const handleRenameCategory = async (oldName: string) => {
    if (!newCatNameInput.trim() || newCatNameInput.trim() === oldName) {
      setEditingCategoryName(null);
      return;
    }

    try {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldCategory: oldName, newCategory: newCatNameInput.trim() }),
      });

      if (res.ok) {
        setEditingCategoryName(null);
        setNewCatNameInput("");
        fetchProductsAndCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to rename category");
      }
    } catch (err) {
      console.error("Category rename error:", err);
    }
  };

  // Category Delete Handler
  const handleDeleteCategory = async (catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}" and ALL its products?`)) return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: catName }),
      });

      if (res.ok) {
        fetchProductsAndCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete category");
      }
    } catch (err) {
      console.error("Category delete error:", err);
    }
  };

  // Hero Section Handlers
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploadingHeroImage(true);
    setHeroStatusMsg({ type: "info", text: "Uploading hero image to Cloudinary..." });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setHeroImage(data.url);
        setHeroStatusMsg({ type: "success", text: "Hero image uploaded to Cloudinary successfully!" });
      } else {
        setHeroStatusMsg({ type: "error", text: data.message || "Failed to upload image" });
      }
    } catch (err: any) {
      setHeroStatusMsg({ type: "error", text: err.message || "Upload error" });
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroImage.trim()) {
      setHeroStatusMsg({ type: "error", text: "Hero image is required" });
      return;
    }

    setSavingHero(true);
    setHeroStatusMsg({ type: "info", text: "Saving Hero Section settings..." });

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroImage: heroImage.trim(),
          floatingTagBadge: floatingTagBadge.trim(),
          floatingTagTitle: floatingTagTitle.trim(),
          floatingTagPrice: floatingTagPrice.trim(),
          headline: heroHeadline.trim(),
          headlineAccent: heroHeadlineAccent.trim(),
          subheadline: heroSubheadline.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setHeroStatusMsg({ type: "success", text: "Hero section updated successfully!" });
        fetchHeroSettings();
        setTimeout(() => {
          setIsHeroModalOpen(false);
          setHeroStatusMsg({ type: "", text: "" });
        }, 800);
      } else {
        setHeroStatusMsg({ type: "error", text: data.message || "Failed to update Hero section" });
      }
    } catch (err: any) {
      setHeroStatusMsg({ type: "error", text: err.message || "Save error" });
    } finally {
      setSavingHero(false);
    }
  };

  // Featured Categories Handlers
  const handleCatImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploadingCatImgIndex(index);
    setFeaturedStatusMsg({ type: "info", text: `Uploading image for category ${index + 1}...` });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFeaturedCats((prev) =>
          prev.map((c, i) => (i === index ? { ...c, image: data.url } : c))
        );
        setFeaturedStatusMsg({ type: "success", text: "Category image uploaded to Cloudinary successfully!" });
      } else {
        setFeaturedStatusMsg({ type: "error", text: data.message || "Failed to upload image" });
      }
    } catch (err: any) {
      setFeaturedStatusMsg({ type: "error", text: err.message || "Upload error" });
    } finally {
      setUploadingCatImgIndex(null);
    }
  };

  const handleSaveFeaturedCategories = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingFeatured(true);
    setFeaturedStatusMsg({ type: "info", text: "Saving Featured Categories..." });

    try {
      const res = await fetch("/api/featured-categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: featuredCats }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeaturedStatusMsg({ type: "success", text: "Featured categories saved successfully!" });
        if (data.categories) setFeaturedCats(data.categories);
        setTimeout(() => {
          setIsFeaturedModalOpen(false);
          setFeaturedStatusMsg({ type: "", text: "" });
        }, 800);
      } else {
        setFeaturedStatusMsg({ type: "error", text: data.message || "Failed to save featured categories" });
      }
    } catch (err: any) {
      setFeaturedStatusMsg({ type: "error", text: err.message || "Save error" });
    } finally {
      setSavingFeatured(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-ivory">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-maroon"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-ivory">
        <SectionWrapper>
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-xl border border-blush-200">
            <ShieldCheck size={48} className="mx-auto text-maroon mb-4" />
            <h1 className="text-2xl font-semibold text-maroon mb-2" style={{fontFamily:"'Playfair Display',serif"}}>
              Admin Access Required
            </h1>
            <p className="text-xs text-text-muted mb-6">
              Please sign in with your admin account credentials to access the management portal.
            </p>
            <button
              onClick={() => openAuthModal("login")}
              className="bg-maroon text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-maroon-950 transition-colors shadow-md"
            >
              Sign In as Admin
            </button>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.categorySlug === selectedCategory ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalBestSellers = products.filter((p) => p.isBestSeller).length;
  const categoriesCount = categoriesList.length;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-ivory text-text">
      <SectionWrapper>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-maroon font-semibold text-xs uppercase tracking-widest mb-1">
              <ShieldCheck size={16} />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-text" style={{fontFamily:"'Playfair Display',serif"}}>
              Products & Inventory Control
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchProductsAndCategories}
              className="p-3 text-maroon bg-white border border-blush-200 hover:bg-blush-50 rounded-full transition-colors shadow-sm"
              title="Refresh Products"
            >
              <RefreshCw size={18} className={fetching ? "animate-spin" : ""} />
            </button>

            <button
              onClick={() => setIsHeroModalOpen(true)}
              className="flex items-center gap-2 bg-blush-100 text-maroon border border-maroon/30 font-medium text-xs px-4 py-3 rounded-full hover:bg-blush-200 transition-all shadow-sm"
            >
              <Sparkles size={16} />
              <span>Update Hero Section</span>
            </button>

            <button
              onClick={() => setIsFeaturedModalOpen(true)}
              className="flex items-center gap-2 bg-white text-maroon border border-maroon/30 font-medium text-xs px-4 py-3 rounded-full hover:bg-blush-50 transition-all shadow-sm"
            >
              <Grid size={16} />
              <span>Featured Cards ({featuredCats.length})</span>
            </button>

            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-2 bg-white text-maroon border border-maroon/30 font-medium text-xs px-4 py-3 rounded-full hover:bg-blush-50 transition-all shadow-sm"
            >
              <FolderEdit size={16} />
              <span>Manage Categories ({categoriesCount})</span>
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-maroon text-white font-medium text-xs px-5 py-3 rounded-full hover:bg-maroon-950 transition-all shadow-md active:scale-95"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-blush-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blush-100 text-maroon rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Total Products</p>
              <p className="text-2xl font-semibold text-maroon font-playfair">{products.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blush-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Star size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Best Sellers</p>
              <p className="text-2xl font-semibold text-maroon font-playfair">{totalBestSellers}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blush-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Active Categories</p>
              <p className="text-2xl font-semibold text-maroon font-playfair">{categoriesCount}</p>
            </div>
          </div>

          <div
            onClick={() => setIsHeroModalOpen(true)}
            className="bg-white p-5 rounded-2xl border border-blush-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-maroon/50 transition-all group"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-105 transition-transform">
              <Sparkles size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-text-muted flex items-center justify-between">
                <span>Hero Highlight</span>
                <span className="text-[10px] text-maroon underline font-medium">Edit</span>
              </p>
              <p className="text-sm font-semibold text-maroon truncate">{floatingTagTitle || "Elarose Keychains"}</p>
              <p className="text-xs text-text-muted font-medium">{floatingTagBadge} · {floatingTagPrice}</p>
            </div>
          </div>
        </div>

        {/* Filter Controls & View Toggle */}
        <div className="bg-white p-4 rounded-2xl border border-blush-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1 bg-blush-50 p-1 rounded-xl border border-blush-200">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                  selectedCategory === "all"
                    ? "bg-maroon text-white shadow-sm"
                    : "text-text-muted hover:text-maroon"
                }`}
              >
                All
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all whitespace-nowrap ${
                    selectedCategory === cat.slug
                      ? "bg-maroon text-white shadow-sm"
                      : "text-text-muted hover:text-maroon"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-blush-50 p-1 rounded-xl border border-blush-200 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-maroon shadow-sm" : "text-text-muted"
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table" ? "bg-white text-maroon shadow-sm" : "text-text-muted"
                }`}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid / Table */}
        {fetching ? (
          <div className="py-20 text-center text-text-muted">Loading inventory data...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-blush-200 p-12 text-center text-text-muted">
            No products found matching your search.
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View - Matches ProductCard layout 100% */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const productId = product.id || product._id || "";
              return (
                <article
                  key={productId}
                  className="group bg-white rounded-2xl overflow-hidden border border-blush-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image - Exact aspect 4/3 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-blush-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-maroon text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}

                    {/* Admin Actions Overlay on Top-Right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 bg-white/90 backdrop-blur-sm text-maroon hover:bg-maroon hover:text-white rounded-full transition-all shadow-sm border border-blush-200"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="p-1.5 bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all shadow-sm border border-blush-200"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Content - Matches User ProductCard layout */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500 font-semibold" style={{fontFamily:"'Cormorant Garamond',serif"}}>
                        {product.category}
                      </p>
                      {product.likesCount !== undefined && product.likesCount > 0 && (
                        <span className="text-[11px] text-text-muted flex items-center gap-1">
                          <Heart size={12} className="text-red-400 fill-red-400" />
                          {product.likesCount}
                        </span>
                      )}
                    </div>

                    <h3 className="text-text font-semibold text-base mb-1.5 leading-snug" style={{fontFamily:"'Playfair Display',serif"}}>
                      {product.title}
                    </h3>

                    <p className="text-text-muted text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-blush-100">
                      <span className="text-maroon font-semibold text-base" style={{fontFamily:"'Playfair Display',serif"}}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-3 py-1 text-xs font-medium text-maroon hover:bg-blush-100 rounded-full border border-maroon/30 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-full border border-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-2xl border border-blush-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-blush-50 border-b border-blush-200 text-maroon font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Badges</th>
                    <th className="py-3 px-4 text-center">Likes</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush-100">
                  {filteredProducts.map((product) => {
                    const productId = product.id || product._id || "";
                    return (
                      <tr key={productId} className="hover:bg-blush-50/50 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-blush-50 rounded-xl overflow-hidden flex-shrink-0 border border-blush-200">
                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-text text-sm">{product.title}</p>
                            <p className="text-[11px] text-text-muted line-clamp-1">{product.shortDescription}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-text-muted">{product.category}</td>
                        <td className="py-3 px-4 font-semibold text-maroon">
                          ₹{product.price.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {product.isBestSeller && (
                              <span className="bg-maroon text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                                Best Seller
                              </span>
                            )}
                            {product.customizable && (
                              <span className="bg-blush-100 text-maroon text-[9px] px-2 py-0.5 rounded-full font-medium">
                                Custom
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-text-muted">
                          {product.likesCount || 0}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-1.5 text-maroon hover:bg-blush-100 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* Category Manager Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-blush-200">
            <div className="flex items-center justify-between p-6 bg-ivory border-b border-blush-200">
              <h2 className="text-xl font-semibold text-maroon font-playfair" style={{fontFamily:"'Playfair Display',serif"}}>
                Manage Categories
              </h2>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-text-muted hover:text-maroon rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-text-muted mb-2">
                Edit or delete existing categories. Editing a category renames it across all associated products.
              </p>

              {categoriesList.map((cat) => (
                <div key={cat.slug} className="flex items-center justify-between p-3 bg-blush-50 rounded-xl border border-blush-200">
                  {editingCategoryName === cat.name ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={newCatNameInput}
                        onChange={(e) => setNewCatNameInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-maroon rounded-lg focus:outline-none"
                      />
                      <button
                        onClick={() => handleRenameCategory(cat.name)}
                        className="px-3 py-1 bg-maroon text-white text-xs font-medium rounded-lg hover:bg-maroon-950"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCategoryName(null)}
                        className="px-2 py-1 text-xs text-text-muted hover:text-text"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-text">{cat.name}</p>
                        <p className="text-[10px] text-text-muted">{cat.count} product{cat.count !== 1 ? "s" : ""}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategoryName(cat.name);
                            setNewCatNameInput(cat.name);
                          }}
                          className="p-1.5 text-maroon hover:bg-white rounded-lg border border-blush-200 transition-colors"
                          title="Rename Category"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                          title="Delete Category & Products"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-ivory border-t border-blush-200 text-right">
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-5 py-2 text-xs font-medium text-maroon border border-maroon rounded-full hover:bg-maroon hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blush-200 my-8">
            <div className="flex items-center justify-between p-6 bg-ivory border-b border-blush-200">
              <h2 className="text-xl font-semibold text-maroon font-playfair" style={{fontFamily:"'Playfair Display',serif"}}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-text-muted hover:text-maroon rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {statusMessage.text && (
                <div
                  className={`p-3 text-xs rounded-xl border flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : statusMessage.type === "error"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-text mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Daisy Bloom Pot"
                  className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text mb-1">Category *</label>
                  <select
                    value={categorySelect}
                    onChange={(e) => setCategorySelect(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  >
                    <option value="Flower Pots">Flower Pots</option>
                    <option value="Keychains">Keychains</option>
                    <option value="Custom Arrangements">Custom Arrangements</option>
                    {categoriesList
                      .filter((c) => !["Flower Pots", "Keychains", "Custom Arrangements"].includes(c.name))
                      .map((c) => (
                        <option key={c.slug} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    <option value="OTHER">+ Other (Create New Category)</option>
                  </select>

                  {categorySelect === "OTHER" && (
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter new category name..."
                        className="w-full px-3.5 py-2 text-xs bg-white border border-maroon rounded-xl focus:outline-none focus:ring-1 focus:ring-maroon text-text"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="249"
                    className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-text mb-1">Product Image (Cloudinary) *</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blush-100 hover:bg-blush-200 border border-dashed border-maroon/40 rounded-xl cursor-pointer text-xs text-maroon font-medium transition-colors">
                      <Upload size={16} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose File to Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="text-[11px] text-text-muted text-center">or enter image URL directly:</div>

                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://res.cloudinary.com/... or /images/products/1.webp"
                    className="w-full px-3.5 py-2.5 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  />
                </div>

                {image && (
                  <div className="mt-3 relative aspect-[4/3] w-32 bg-blush-50 rounded-xl overflow-hidden border border-blush-200">
                    <Image src={image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Catchy short summary..."
                  className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Full handcrafted product description..."
                  className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text mb-1">Occasions (comma-separated)</label>
                <input
                  type="text"
                  value={occasionInput}
                  onChange={(e) => setOccasionInput(e.target.value)}
                  placeholder="Birthday, Anniversary, Home Decor"
                  className="w-full px-3.5 py-2.5 text-sm bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-text">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-4 h-4 accent-maroon rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-text">
                  <input
                    type="checkbox"
                    checked={customizable}
                    onChange={(e) => setCustomizable(e.target.checked)}
                    className="w-4 h-4 accent-maroon rounded"
                  />
                  <span>Customizable</span>
                </label>
              </div>

              <div className="pt-4 border-t border-blush-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-medium text-text-muted hover:text-text rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct || uploadingImage}
                  className="px-6 py-2.5 bg-maroon text-white font-medium text-xs rounded-full hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
                >
                  {savingProduct ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section Manager Modal */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blush-200 my-8">
            <div className="flex items-center justify-between p-6 bg-ivory border-b border-blush-200">
              <div className="flex items-center gap-2 text-maroon">
                <Sparkles size={20} />
                <h2 className="text-xl font-semibold font-playfair" style={{fontFamily:"'Playfair Display',serif"}}>
                  Update Hero Section
                </h2>
              </div>
              <button
                onClick={() => setIsHeroModalOpen(false)}
                className="p-1.5 text-text-muted hover:text-maroon rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveHero} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {heroStatusMsg.text && (
                <div
                  className={`p-3.5 text-xs rounded-xl border flex items-center gap-2 ${
                    heroStatusMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : heroStatusMsg.type === "error"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>{heroStatusMsg.text}</span>
                </div>
              )}

              {/* Live Preview Card */}
              <div className="p-4 bg-ivory/80 rounded-2xl border border-blush-200">
                <p className="text-[11px] font-semibold text-maroon uppercase tracking-wider mb-2">Live Preview Overlay</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-36 aspect-[4/5] rounded-xl overflow-hidden shadow-md bg-blush-50 border border-blush-200 flex-shrink-0">
                    <Image
                      src={heroImage || "/images/products/keychain.webp"}
                      alt="Hero Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs rounded-lg p-2 shadow-lg border border-blush-200">
                      <p className="text-[9px] uppercase tracking-wider text-gold-500 font-semibold">{floatingTagBadge || "Best Seller"}</p>
                      <p className="text-xs font-semibold text-text truncate">{floatingTagTitle || "Elarose Keychains"}</p>
                      <p className="text-[11px] font-medium text-maroon">{floatingTagPrice || "₹99"}</p>
                    </div>
                  </div>
                  <div className="text-xs text-text-muted space-y-1">
                    <p className="font-medium text-text text-sm">{heroHeadline} <span className="text-maroon italic">{heroHeadlineAccent}</span></p>
                    <p className="line-clamp-2">{heroSubheadline}</p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] text-maroon">
                      <span className="px-2 py-0.5 bg-blush-100 rounded-full font-medium">Image + Floating Card Configured</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tag Settings */}
              <div className="bg-blush-50/50 p-4 rounded-xl border border-blush-200 space-y-3">
                <h3 className="text-xs font-semibold text-maroon uppercase tracking-wider">Floating Tag Details (Best Seller Badge)</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text mb-1">Badge Text *</label>
                    <input
                      type="text"
                      required
                      value={floatingTagBadge}
                      onChange={(e) => setFloatingTagBadge(e.target.value)}
                      placeholder="Best Seller"
                      className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={floatingTagTitle}
                      onChange={(e) => setFloatingTagTitle(e.target.value)}
                      placeholder="Elarose Keychains"
                      className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text mb-1">Price *</label>
                    <input
                      type="text"
                      required
                      value={floatingTagPrice}
                      onChange={(e) => setFloatingTagPrice(e.target.value)}
                      placeholder="₹99"
                      className="w-full px-3 py-2 text-xs bg-white border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image Upload & URL */}
              <div>
                <label className="block text-xs font-semibold text-text mb-1">Hero Section Main Image *</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blush-100 hover:bg-blush-200 border border-dashed border-maroon/40 rounded-xl cursor-pointer text-xs text-maroon font-medium transition-colors">
                      <Upload size={16} />
                      <span>{uploadingHeroImage ? "Uploading to Cloudinary..." : "Upload New Hero Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        disabled={uploadingHeroImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="text-[11px] text-text-muted text-center">or enter image URL directly:</div>

                  <input
                    type="text"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://res.cloudinary.com/... or /images/products/keychain.webp"
                    className="w-full px-3.5 py-2.5 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              {/* Headline & Subheadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text mb-1">Headline Main Text</label>
                  <input
                    type="text"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    placeholder="Handmade Luxury Gifts Crafted"
                    className="w-full px-3.5 py-2 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text mb-1">Headline Accent (Italic)</label>
                  <input
                    type="text"
                    value={heroHeadlineAccent}
                    onChange={(e) => setHeroHeadlineAccent(e.target.value)}
                    placeholder="With Love"
                    className="w-full px-3.5 py-2 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text mb-1">Subheadline</label>
                <textarea
                  rows={2}
                  value={heroSubheadline}
                  onChange={(e) => setHeroSubheadline(e.target.value)}
                  placeholder="Personalized bouquets, handmade keychains, premium hampers..."
                  className="w-full px-3.5 py-2 text-xs bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon resize-none"
                />
              </div>

              <div className="pt-4 border-t border-blush-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsHeroModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-medium text-text-muted hover:text-text rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingHero || uploadingHeroImage}
                  className="px-6 py-2.5 bg-maroon text-white font-medium text-xs rounded-full hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
                >
                  {savingHero ? "Saving Settings..." : "Save Hero Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Featured Categories Manager Modal */}
      {isFeaturedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blush-200 my-8">
            <div className="flex items-center justify-between p-6 bg-ivory border-b border-blush-200">
              <div className="flex items-center gap-2 text-maroon">
                <Grid size={20} />
                <h2 className="text-xl font-semibold font-playfair" style={{fontFamily:"'Playfair Display',serif"}}>
                  Featured Categories Management
                </h2>
              </div>
              <button
                onClick={() => setIsFeaturedModalOpen(false)}
                className="p-1.5 text-text-muted hover:text-maroon rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFeaturedCategories} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {featuredStatusMsg.text && (
                <div
                  className={`p-3.5 text-xs rounded-xl border flex items-center gap-2 ${
                    featuredStatusMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : featuredStatusMsg.type === "error"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>{featuredStatusMsg.text}</span>
                </div>
              )}

              <p className="text-xs text-text-muted">
                Update the cards displayed in the <strong>Featured Categories</strong> section on your homepage. Change images, titles, descriptions, or category links below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredCats.map((cat, idx) => (
                  <div key={cat.id || idx} className="p-4 bg-ivory/60 rounded-2xl border border-blush-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-blush-100 pb-2">
                      <span className="text-xs font-semibold text-maroon uppercase tracking-wider">Card #{idx + 1}: {cat.shortTitle || cat.title}</span>
                      {featuredCats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFeaturedCats((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-[11px] text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Image Preview */}
                      <div className="relative w-24 aspect-[3/4] bg-blush-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-blush-200">
                        <Image src={cat.image || "/images/products/2.webp"} alt={cat.shortTitle} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent" />
                        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] text-white font-semibold truncate">
                          {cat.shortTitle}
                        </p>
                      </div>

                      {/* Fields */}
                      <div className="flex-1 space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-text mb-0.5">Card Image (Cloudinary)</label>
                          <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blush-100 hover:bg-blush-200 border border-dashed border-maroon/40 rounded-xl cursor-pointer text-xs text-maroon font-medium transition-colors mb-1">
                            <Upload size={14} />
                            <span>{uploadingCatImgIndex === idx ? "Uploading..." : "Upload Image"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleCatImageUpload(e, idx)}
                              disabled={uploadingCatImgIndex === idx}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            required
                            value={cat.image}
                            onChange={(e) =>
                              setFeaturedCats((prev) =>
                                prev.map((c, i) => (i === idx ? { ...c, image: e.target.value } : c))
                              )
                            }
                            placeholder="Image URL..."
                            className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-blush-200 rounded-lg focus:outline-none focus:border-maroon"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-text mb-0.5">Short Title *</label>
                            <input
                              type="text"
                              required
                              value={cat.shortTitle}
                              onChange={(e) =>
                                setFeaturedCats((prev) =>
                                  prev.map((c, i) => (i === idx ? { ...c, shortTitle: e.target.value } : c))
                                )
                              }
                              placeholder="Keychains"
                              className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-blush-200 rounded-lg focus:outline-none focus:border-maroon"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-text mb-0.5">Full Title</label>
                            <input
                              type="text"
                              value={cat.title}
                              onChange={(e) =>
                                setFeaturedCats((prev) =>
                                  prev.map((c, i) => (i === idx ? { ...c, title: e.target.value } : c))
                                )
                              }
                              placeholder="Flower Keychains"
                              className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-blush-200 rounded-lg focus:outline-none focus:border-maroon"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text mb-0.5">Description *</label>
                          <textarea
                            rows={2}
                            required
                            value={cat.description}
                            onChange={(e) =>
                              setFeaturedCats((prev) =>
                                prev.map((c, i) => (i === idx ? { ...c, description: e.target.value } : c))
                              )
                            }
                            placeholder="Cute handmade keychains..."
                            className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-blush-200 rounded-lg focus:outline-none focus:border-maroon resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text mb-0.5">Link Href</label>
                          <input
                            type="text"
                            value={cat.href}
                            onChange={(e) =>
                              setFeaturedCats((prev) =>
                                prev.map((c, i) => (i === idx ? { ...c, href: e.target.value } : c))
                              )
                            }
                            placeholder="/products?category=keychains"
                            className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-blush-200 rounded-lg focus:outline-none focus:border-maroon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setFeaturedCats((prev) => [
                      ...prev,
                      {
                        id: `cat-${Date.now()}`,
                        title: "New Category",
                        shortTitle: "New Category",
                        description: "Handcrafted personalized item",
                        image: "/images/products/1.webp",
                        href: "/products",
                        order: prev.length,
                      },
                    ])
                  }
                  className="px-4 py-2 bg-blush-100 text-maroon text-xs font-semibold rounded-full hover:bg-blush-200 border border-maroon/20 transition-colors"
                >
                  + Add Category Card
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFeaturedModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-medium text-text-muted hover:text-text rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingFeatured || uploadingCatImgIndex !== null}
                    className="px-6 py-2.5 bg-maroon text-white font-medium text-xs rounded-full hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
                  >
                    {savingFeatured ? "Saving..." : "Save Featured Categories"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
