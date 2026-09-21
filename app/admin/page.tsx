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
  Grid,
  List,
  RefreshCw,
  FolderEdit,
  Sparkles,
  Gift,
  Box,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Check,
  Layout,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import SectionWrapper from "@/components/SectionWrapper";
import { useTheme } from "@/components/ThemeProvider";

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
  const { theme: currentTheme, setTheme } = useTheme();

  // Active Main Tab: "products" | "homepage"
  const [activeAdminTab, setActiveAdminTab] = useState<"products" | "homepage">("products");

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

  // Featured Categories State
  const [featuredCats, setFeaturedCats] = useState<FeaturedCat[]>([]);

  // Hero Section Manager Modal State
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  // Full Home Settings State
  const [homeSettings, setHomeSettings] = useState<any>(null);
  const [fetchingHomeSettings, setFetchingHomeSettings] = useState(false);
  const [activeHomeSectionModal, setActiveHomeSectionModal] = useState<
    "hero" | "categories" | "occasions" | "packaging" | "whyUs" | "howItWorks" | "bestSellers" | "instagram" | "finalCta" | null
  >(null);

  // Section Editing Form States
  const [sectionFormState, setSectionFormState] = useState<any>({});
  const [savingSection, setSavingSection] = useState(false);
  const [uploadingSectionImgKey, setUploadingSectionImgKey] = useState<string | null>(null);
  const [sectionStatusMsg, setSectionStatusMsg] = useState({ type: "", text: "" });

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

  const fetchHomeSettings = useCallback(async () => {
    setFetchingHomeSettings(true);
    try {
      const res = await fetch("/api/home-settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setHomeSettings(data.settings);
          if (data.settings.theme) {
            setTheme(data.settings.theme);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch home settings:", err);
    } finally {
      setFetchingHomeSettings(false);
    }
  }, [setTheme]);

  const handleSelectTheme = async (themeKey: string) => {
    setTheme(themeKey);
    const updated = { ...homeSettings, theme: themeKey };
    setHomeSettings(updated);

    try {
      await fetch("/api/home-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to save theme:", err);
    }
  };

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
      await Promise.all([fetchHomeSettings(), fetchFeaturedCategories()]);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setFetching(false);
    }
  }, [fetchHomeSettings, fetchFeaturedCategories]);

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
    setStatusMessage({ type: "info", text: "Uploading image..." });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
        setStatusMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        setStatusMessage({ type: "error", text: data.message || "Failed to upload image" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Upload error" });
    } finally {
      setUploadingImage(false);
    }
  };

  const uploadSectionImage = async (file: File, key: string, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploadingSectionImgKey(key);
    setSectionStatusMsg({ type: "info", text: "Uploading image..." });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        callback(data.url);
        setSectionStatusMsg({ type: "success", text: "Image uploaded successfully!" });
      } else {
        setSectionStatusMsg({ type: "error", text: data.message || "Failed to upload image" });
      }
    } catch (err: any) {
      setSectionStatusMsg({ type: "error", text: err.message || "Upload error" });
    } finally {
      setUploadingSectionImgKey(null);
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
        alert(data.message || "Failed to update category name");
      }
    } catch (err) {
      console.error("Category update error:", err);
      alert("An error occurred while updating category");
    }
  };

  // Open Section Editor
  const openSectionModal = (
    section: "hero" | "categories" | "occasions" | "packaging" | "whyUs" | "howItWorks" | "bestSellers" | "instagram" | "finalCta"
  ) => {
    setSectionStatusMsg({ type: "", text: "" });
    if (!homeSettings) {
      setSectionFormState({});
    } else {
      setSectionFormState(JSON.parse(JSON.stringify(homeSettings)));
    }
    setActiveHomeSectionModal(section);
  };

  // Save Home Page Section
  const handleSaveHomeSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSection(true);
    setSectionStatusMsg({ type: "info", text: "Saving section settings to database..." });

    try {
      const res = await fetch("/api/home-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionFormState),
      });

      const data = await res.json();
      if (res.ok) {
        setHomeSettings(data.settings || sectionFormState);
        setSectionStatusMsg({ type: "success", text: "Section updated & saved successfully!" });
        await fetchProductsAndCategories();
        setTimeout(() => {
          setActiveHomeSectionModal(null);
          setSectionStatusMsg({ type: "", text: "" });
        }, 800);
      } else {
        setSectionStatusMsg({ type: "error", text: data.message || "Failed to save section" });
      }
    } catch (err: any) {
      setSectionStatusMsg({ type: "error", text: err.message || "Save error" });
    } finally {
      setSavingSection(false);
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
            <h1 className="text-2xl font-semibold text-maroon mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
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
        {/* Top Header & Main Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-maroon font-semibold text-xs uppercase tracking-widest mb-1">
              <ShieldCheck size={16} />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-text" style={{ fontFamily: "'Playfair Display',serif" }}>
              {activeAdminTab === "products" ? "Products & Inventory Control" : "Home Page Content Manager"}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Tab Selector */}
            <div className="bg-blush-100/60 p-1 rounded-full border border-blush-200 flex items-center gap-1">
              <button
                onClick={() => setActiveAdminTab("products")}
                className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all ${
                  activeAdminTab === "products"
                    ? "bg-maroon text-white shadow-md"
                    : "text-text-muted hover:text-maroon"
                }`}
              >
                <Package size={16} />
                <span>Products & Inventory</span>
              </button>

              <button
                onClick={() => setActiveAdminTab("homepage")}
                className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all ${
                  activeAdminTab === "homepage"
                    ? "bg-maroon text-white shadow-md"
                    : "text-text-muted hover:text-maroon"
                }`}
              >
                <Layout size={16} />
                <span>Home Page Manager</span>
              </button>
            </div>

            <button
              onClick={fetchProductsAndCategories}
              className="p-3 text-maroon bg-white border border-blush-200 hover:bg-blush-50 rounded-full transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={fetching ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: HOME PAGE CONTENT MANAGER                     */}
        {/* ---------------------------------------------------- */}
        {activeAdminTab === "homepage" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Banner intro */}
            <div className="bg-white p-6 rounded-2xl border border-blush-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-maroon mb-1 font-playfair">
                  Fully Editable Home Page Sections
                </h2>
                <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
                  Click the <strong className="text-maroon">Edit Section</strong> button on any home page section card below to update headlines, descriptions, subheadings, badges, and upload new images in real time!
                </p>
              </div>
              <button
                onClick={fetchHomeSettings}
                className="flex items-center gap-2 text-xs font-medium text-maroon bg-blush-100 hover:bg-blush-200 border border-maroon/20 px-4 py-2 rounded-full transition-colors"
              >
                <RefreshCw size={14} className={fetchingHomeSettings ? "animate-spin" : ""} />
                <span>Reload Settings</span>
              </button>
            </div>

            {/* Website Theme & Color Palette Selector */}
            <div className="bg-white p-6 rounded-2xl border border-blush-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-maroon font-semibold text-xs uppercase tracking-wider mb-0.5">
                    <Sparkles size={16} />
                    <span>Website Theme & Color Palette</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text font-playfair">Selectable Girlish & Luxury Aesthetics</h3>
                  <p className="text-xs text-text-muted">
                    Choose a professional color theme tailored for ELAROSE. Instant 1-click live preview across the entire website!
                  </p>
                </div>
                <span className="text-xs font-semibold bg-blush-100 text-maroon px-3 py-1 rounded-full border border-maroon/20 self-start sm:self-auto capitalize">
                  Active: {(currentTheme || "rose-atelier").replace("-", " ")}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                {[
                  {
                    key: "rose-atelier",
                    name: "Rose Atelier",
                    desc: "Classic Deep Maroon & Blush",
                    primary: "#5c0a29",
                    blush: "#EBC7D2",
                    ivory: "#FFF8F8",
                    gold: "#C8A96B",
                  },
                  {
                    key: "dusty-rose",
                    name: "Dusty Rose & Mauve",
                    desc: "Soft Mauve & Vintage Rose",
                    primary: "#7e4a5b",
                    blush: "#e6c2cf",
                    ivory: "#FAF5F7",
                    gold: "#b88e6e",
                  },
                  {
                    key: "pastel-lavender",
                    name: "Pastel Lavender",
                    desc: "Serene Lilac & Soft Plum",
                    primary: "#5e436c",
                    blush: "#d8c8e6",
                    ivory: "#F8F5FA",
                    gold: "#bfa265",
                  },
                  {
                    key: "peach-blossom",
                    name: "Peach Blossom",
                    desc: "Terracotta Rose & Soft Peach",
                    primary: "#84433b",
                    blush: "#f4caa5",
                    ivory: "#FAF4F0",
                    gold: "#c49058",
                  },
                  {
                    key: "champagne-silk",
                    name: "Champagne Silk",
                    desc: "Silk Cocoa & Cashmere Cream",
                    primary: "#6d4534",
                    blush: "#e8cca8",
                    ivory: "#FAF7F2",
                    gold: "#bc9552",
                  },
                ].map((t) => {
                  const isActive = (currentTheme || "rose-atelier") === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => handleSelectTheme(t.key)}
                      className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isActive
                          ? "border-maroon bg-blush-50/80 shadow-md ring-2 ring-maroon/30"
                          : "border-blush-200 bg-white hover:border-maroon/40 hover:bg-blush-50/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-xs text-text">{t.name}</span>
                          {isActive && <Check size={14} className="text-maroon font-bold" />}
                        </div>
                        <p className="text-[10px] text-text-muted mb-3 leading-tight">{t.desc}</p>
                      </div>

                      {/* Color Palette Swatches */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.primary }} title="Primary" />
                        <div className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.blush }} title="Blush Accent" />
                        <div className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.ivory }} title="Ivory Background" />
                        <div className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: t.gold }} title="Luxury Gold" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid of All 9 Home Page Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. HERO BANNER */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 01
                    </span>
                    <Sparkles size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Hero Banner</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    {homeSettings?.hero?.headline || "Handmade Luxury Gifts Crafted"} {homeSettings?.hero?.headlineAccent || "With Love"}
                  </p>
                  {homeSettings?.hero?.heroImage && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-blush-50 border border-blush-200">
                      <Image
                        src={homeSettings.hero.heroImage}
                        alt="Hero Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => openSectionModal("hero")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Hero Section</span>
                </button>
              </div>

              {/* 2. FEATURED CATEGORIES */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 02
                    </span>
                    <Grid size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Featured Categories</h3>
                  <p className="text-xs text-text-muted mb-4">
                    {homeSettings?.featuredCategoriesHeading || "Featured Categories"} · ({featuredCats.length} active collection cards)
                  </p>
                  <div className="grid grid-cols-4 gap-1.5 mb-4">
                    {featuredCats.slice(0, 4).map((c, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-blush-50 border border-blush-200">
                        <Image src={c.image} alt={c.title} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => openSectionModal("categories")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Featured Categories</span>
                </button>
              </div>

              {/* 3. GIFTS FOR EVERY OCCASION */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 03
                    </span>
                    <Gift size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Gifts For Every Occasion</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    {homeSettings?.occasionsHeading || "Gifts For Every Occasion"} · {homeSettings?.occasions?.length || 4} occasion cards
                  </p>
                  <div className="grid grid-cols-4 gap-1.5 mb-4">
                    {(homeSettings?.occasions || []).slice(0, 4).map((occ: any, i: number) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-blush-50 border border-blush-200">
                        <Image src={occ.image} alt={occ.title} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => openSectionModal("occasions")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Gifts For Every Occasion</span>
                </button>
              </div>

              {/* 4. SIGNATURE PACKAGING */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 04
                    </span>
                    <Box size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Signature Packaging</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    {homeSettings?.packagingHeading || "Signature Packaging"} · {homeSettings?.packagingImages?.length || 4} showcase images
                  </p>
                  <div className="grid grid-cols-4 gap-1.5 mb-4">
                    {(homeSettings?.packagingImages || []).slice(0, 4).map((img: any, i: number) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-blush-50 border border-blush-200">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => openSectionModal("packaging")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Signature Packaging</span>
                </button>
              </div>

              {/* 5. WHY CHOOSE US */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 05
                    </span>
                    <CheckCircle2 size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Why Choose Us</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    {homeSettings?.whyHeading || "Why Choose ELAROSE"} · {homeSettings?.trustPoints?.length || 4} trust features
                  </p>
                </div>
                <button
                  onClick={() => openSectionModal("whyUs")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Why Choose Us</span>
                </button>
              </div>

              {/* 6. HOW IT WORKS */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 06
                    </span>
                    <HelpCircle size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">How It Works</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    {homeSettings?.howItWorksHeading || "How It Works"} · {homeSettings?.steps?.length || 4} ordering steps
                  </p>
                </div>
                <button
                  onClick={() => openSectionModal("howItWorks")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit How It Works</span>
                </button>
              </div>

              {/* 7. BEST SELLERS TEXT */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 07
                    </span>
                    <Star size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Best Sellers Heading</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    Heading: "{homeSettings?.bestSellersHeading || "Best Sellers"}"
                  </p>
                </div>
                <button
                  onClick={() => openSectionModal("bestSellers")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Best Sellers Headings</span>
                </button>
              </div>

              {/* 8. INSTAGRAM FEED */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 08
                    </span>
                    <InstagramIcon size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Instagram Feed Grid</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    Handle: {homeSettings?.instagramHandle || "@elarose_atelier"} · {homeSettings?.instagramPosts?.length || 9} gallery posts
                  </p>
                </div>
                <button
                  onClick={() => openSectionModal("instagram")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Instagram Grid & Handle</span>
                </button>
              </div>

              {/* 9. FINAL CTA BANNER */}
              <div className="bg-white rounded-2xl border border-blush-200 p-6 shadow-sm flex flex-col justify-between hover:border-maroon/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-maroon tracking-wider uppercase bg-blush-100 px-3 py-1 rounded-full">
                      Section 09
                    </span>
                    <FileText size={18} className="text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2 font-playfair">Final Call To Action</h3>
                  <p className="text-xs text-text-muted mb-4 line-clamp-2">
                    "{homeSettings?.finalCtaHeading || "Make Every Gift Memorable."}"
                  </p>
                </div>
                <button
                  onClick={() => openSectionModal("finalCta")}
                  className="w-full flex items-center justify-center gap-2 bg-maroon text-white text-xs font-semibold py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Final CTA Banner</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: PRODUCTS & INVENTORY CONTROL                  */}
        {/* ---------------------------------------------------- */}
        {activeAdminTab === "products" && (
          <div>
            {/* Quick Home Section Edit Buttons */}
            <div className="bg-white p-4 rounded-2xl border border-blush-200 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-maroon uppercase tracking-wider flex items-center gap-1.5">
                  <Layout size={15} />
                  Quick Edit Home Page Sections:
                </span>
                <button
                  onClick={() => setActiveAdminTab("homepage")}
                  className="text-xs text-maroon underline font-medium hover:text-maroon-950"
                >
                  View All Home Sections →
                </button>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => openSectionModal("categories")}
                  className="flex items-center gap-1.5 bg-blush-100 text-maroon text-xs font-medium px-3 py-1.5 rounded-full hover:bg-maroon hover:text-white transition-all flex-shrink-0"
                >
                  <Grid size={13} />
                  <span>Featured Categories</span>
                </button>

                <button
                  onClick={() => openSectionModal("occasions")}
                  className="flex items-center gap-1.5 bg-blush-100 text-maroon text-xs font-medium px-3 py-1.5 rounded-full hover:bg-maroon hover:text-white transition-all flex-shrink-0"
                >
                  <Gift size={13} />
                  <span>Gifts For Every Occasion</span>
                </button>

                <button
                  onClick={() => openSectionModal("packaging")}
                  className="flex items-center gap-1.5 bg-blush-100 text-maroon text-xs font-medium px-3 py-1.5 rounded-full hover:bg-maroon hover:text-white transition-all flex-shrink-0"
                >
                  <Box size={13} />
                  <span>Signature Packaging</span>
                </button>

                <button
                  onClick={() => openSectionModal("hero")}
                  className="flex items-center gap-1.5 bg-blush-100 text-maroon text-xs font-medium px-3 py-1.5 rounded-full hover:bg-maroon hover:text-white transition-all flex-shrink-0"
                >
                  <Sparkles size={13} />
                  <span>Hero Banner</span>
                </button>

                <button
                  onClick={() => openSectionModal("instagram")}
                  className="flex items-center gap-1.5 bg-blush-100 text-maroon text-xs font-medium px-3 py-1.5 rounded-full hover:bg-maroon hover:text-white transition-all flex-shrink-0"
                >
                  <InstagramIcon size={13} />
                  <span>Instagram Feed</span>
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
                onClick={() => openSectionModal("hero")}
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
                  <p className="text-sm font-semibold text-maroon truncate">
                    {homeSettings?.hero?.floatingTagTitle || "Elarose Keychains"}
                  </p>
                  <p className="text-xs text-text-muted font-medium">
                    {homeSettings?.hero?.floatingTagBadge || "Best Seller"} · {homeSettings?.hero?.floatingTagPrice || "₹99"}
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Controls & Action Buttons */}
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

                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 bg-maroon text-white font-medium text-xs px-5 py-2.5 rounded-full hover:bg-maroon-950 transition-all shadow-md active:scale-95 flex-shrink-0"
                >
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Product Display */}
            {fetching ? (
              <div className="py-20 text-center text-text-muted">Loading inventory data...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-blush-200 p-12 text-center text-text-muted">
                No products found matching your search.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id || p._id}
                    className="bg-white rounded-2xl border border-blush-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square bg-blush-50 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                      {p.isBestSeller && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-semibold">
                        {p.category}
                      </div>
                      <h3 className="font-semibold text-text text-base mb-1 truncate font-playfair">{p.title}</h3>
                      <p className="text-maroon font-bold text-sm mb-3">₹{p.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-maroon bg-blush-100 hover:bg-blush-200 py-2 rounded-xl transition-colors"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p)}
                          className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-blush-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-blush-50 text-maroon uppercase tracking-wider border-b border-blush-200">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Badge</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blush-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id || p._id} className="hover:bg-blush-50/50">
                        <td className="p-4 flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-blush-100 flex-shrink-0">
                            <Image src={p.image} alt={p.title} fill className="object-cover" />
                          </div>
                          <span className="font-semibold text-text">{p.title}</span>
                        </td>
                        <td className="p-4 text-text-muted">{p.category}</td>
                        <td className="p-4 font-bold text-maroon">₹{p.price}</td>
                        <td className="p-4">
                          {p.isBestSeller ? (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Best Seller
                            </span>
                          ) : (
                            <span className="text-text-muted">-</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 text-maroon hover:bg-blush-100 rounded-lg"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </SectionWrapper>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT                                */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-blush-200 relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-text-muted hover:text-maroon rounded-full bg-blush-50"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-maroon mb-1 font-playfair">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-text-muted mb-6">
              Fill in product details and upload high-resolution images for your catalog.
            </p>

            {statusMessage.text && (
              <div
                className={`p-3 rounded-xl text-xs font-medium mb-4 ${
                  statusMessage.type === "error"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : statusMessage.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Classic Rose Bouquet"
                  className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={categorySelect}
                    onChange={(e) => setCategorySelect(e.target.value)}
                    className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                  >
                    {Array.from(
                      new Set([
                        "Flower Pots",
                        "Keychains",
                        "Luxury Hampers",
                        "Custom Gifts",
                        "Flower Bouquets",
                        "Home Decor",
                        "Crochet Art",
                        ...categoriesList.map((c) => c.name),
                      ])
                    ).map((catName) => (
                      <option key={catName} value={catName}>
                        {catName}
                      </option>
                    ))}
                    <option value="OTHER">+ Add Custom Category</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="249"
                    className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                  />
                </div>
              </div>

              {categorySelect === "OTHER" && (
                <div>
                  <label className="block font-semibold mb-1">Custom Category Name *</label>
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. Mini Hampers"
                    className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief catchy product summary"
                  className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed specifications, sizing, materials..."
                  className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                />
              </div>

              {/* Product Image */}
              <div>
                <label className="block font-semibold mb-1">Product Image *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://... or /images/..."
                    className="flex-1 px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon text-text"
                  />
                  <label className="flex items-center gap-1.5 bg-blush-100 text-maroon border border-maroon/20 font-medium px-4 py-2.5 rounded-xl hover:bg-blush-200 cursor-pointer transition-colors">
                    <Upload size={14} />
                    <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>

                {image && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-blush-200 mt-2 bg-blush-50">
                    <Image src={image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="w-4 h-4 accent-maroon rounded"
                  />
                  <span>Best Seller Item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={customizable}
                    onChange={(e) => setCustomizable(e.target.checked)}
                    className="w-4 h-4 accent-maroon rounded"
                  />
                  <span>Customizable</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-blush-200 text-text-muted hover:text-maroon font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="bg-maroon text-white font-medium px-6 py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
                >
                  {savingProduct ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SECTION EDITORS (ALL 9 HOME SECTIONS)            */}
      {/* ======================================================== */}
      {activeHomeSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-blush-200 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveHomeSectionModal(null)}
              className="absolute top-5 right-5 p-2 text-text-muted hover:text-maroon rounded-full bg-blush-50"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-maroon font-semibold text-xs uppercase tracking-wider mb-1">
              <Layout size={16} />
              <span>Section Content Editor</span>
            </div>

            <h2 className="text-2xl font-semibold text-maroon mb-1 font-playfair capitalize">
              {activeHomeSectionModal === "hero" && "Edit Hero Section Banner"}
              {activeHomeSectionModal === "categories" && "Edit Featured Categories"}
              {activeHomeSectionModal === "occasions" && "Edit Gifts For Every Occasion"}
              {activeHomeSectionModal === "packaging" && "Edit Signature Packaging"}
              {activeHomeSectionModal === "whyUs" && "Edit Why Choose Us Section"}
              {activeHomeSectionModal === "howItWorks" && "Edit How It Works Steps"}
              {activeHomeSectionModal === "bestSellers" && "Edit Best Sellers Headings"}
              {activeHomeSectionModal === "instagram" && "Edit Instagram Feed & Handle"}
              {activeHomeSectionModal === "finalCta" && "Edit Final Call To Action"}
            </h2>

            <p className="text-xs text-text-muted mb-6">
              Update titles, subtext, links, and upload new images. Changes save directly to database.
            </p>

            {sectionStatusMsg.text && (
              <div
                className={`p-3 rounded-xl text-xs font-medium mb-4 ${
                  sectionStatusMsg.type === "error"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : sectionStatusMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {sectionStatusMsg.text}
              </div>
            )}

            <form onSubmit={handleSaveHomeSection} className="space-y-5 text-xs">
              {/* ---------------- SECTION 1: HERO ---------------- */}
              {activeHomeSectionModal === "hero" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Main Headline *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.hero?.headline || ""}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          hero: { ...sectionFormState.hero, headline: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Accent Headline (Italicized Maroon Text) *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.hero?.headlineAccent || ""}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          hero: { ...sectionFormState.hero, headlineAccent: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Subheadline *</label>
                    <textarea
                      rows={2}
                      required
                      value={sectionFormState?.hero?.subheadline || ""}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          hero: { ...sectionFormState.hero, subheadline: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={sectionFormState?.hero?.ctaPrimary || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, ctaPrimary: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={sectionFormState?.hero?.ctaSecondary || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, ctaSecondary: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Tag Badge</label>
                      <input
                        type="text"
                        value={sectionFormState?.hero?.floatingTagBadge || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, floatingTagBadge: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Tag Title</label>
                      <input
                        type="text"
                        value={sectionFormState?.hero?.floatingTagTitle || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, floatingTagTitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Tag Price</label>
                      <input
                        type="text"
                        value={sectionFormState?.hero?.floatingTagPrice || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, floatingTagPrice: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div>
                    <label className="block font-semibold mb-1">Hero Image *</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        required
                        value={sectionFormState?.hero?.heroImage || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            hero: { ...sectionFormState.hero, heroImage: e.target.value },
                          })
                        }
                        placeholder="Image URL..."
                        className="flex-1 px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                      <label className="flex items-center gap-1.5 bg-blush-100 text-maroon border border-maroon/20 font-medium px-4 py-2.5 rounded-xl hover:bg-blush-200 cursor-pointer transition-colors">
                        <Upload size={14} />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              uploadSectionImage(e.target.files[0], "heroImage", (url) => {
                                setSectionFormState({
                                  ...sectionFormState,
                                  hero: { ...sectionFormState.hero, heroImage: url },
                                });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {sectionFormState?.hero?.heroImage && (
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-blush-200 mt-2 bg-blush-50">
                        <Image src={sectionFormState.hero.heroImage} alt="Hero Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 2: FEATURED CATEGORIES ---------------- */}
              {activeHomeSectionModal === "categories" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.featuredCategoriesHeading || "Featured Categories"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          featuredCategoriesHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.featuredCategoriesSubheading || "Curated collections ready and available to order."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          featuredCategoriesSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* List of Featured Categories Cards */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Category Cards List ({featuredCats.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const newCat: FeaturedCat = {
                            id: `cat-${Date.now()}`,
                            title: "New Category",
                            shortTitle: "New Category",
                            description: "Category description goes here...",
                            image: "/images/products/1.webp",
                            href: "/products",
                            order: featuredCats.length,
                          };
                          setFeaturedCats([...featuredCats, newCat]);
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Category Card</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {featuredCats.map((cat, idx) => (
                        <div key={cat.id || idx} className="p-4 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-xs">Card #{idx + 1}: {cat.shortTitle || cat.title}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = featuredCats.filter((_, i) => i !== idx);
                                setFeaturedCats(updated);
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Title</label>
                              <input
                                type="text"
                                value={cat.title}
                                onChange={(e) => {
                                  const updated = [...featuredCats];
                                  updated[idx].title = e.target.value;
                                  updated[idx].shortTitle = e.target.value;
                                  setFeaturedCats(updated);
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Link Href</label>
                              <input
                                type="text"
                                value={cat.href}
                                onChange={(e) => {
                                  const updated = [...featuredCats];
                                  updated[idx].href = e.target.value;
                                  setFeaturedCats(updated);
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Description</label>
                            <input
                              type="text"
                              value={cat.description}
                              onChange={(e) => {
                                const updated = [...featuredCats];
                                updated[idx].description = e.target.value;
                                setFeaturedCats(updated);
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                            />
                          </div>

                          {/* Image upload for category */}
                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Card Image *</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={cat.image}
                                onChange={(e) => {
                                  const updated = [...featuredCats];
                                  updated[idx].image = e.target.value;
                                  setFeaturedCats(updated);
                                }}
                                className="flex-1 px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                              <label className="flex items-center gap-1 bg-blush-100 text-maroon text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blush-200">
                                <Upload size={12} />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      uploadSectionImage(e.target.files[0], `cat-${idx}`, (url) => {
                                        const updated = [...featuredCats];
                                        updated[idx].image = url;
                                        setFeaturedCats(updated);
                                      });
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 3: GIFTS FOR EVERY OCCASION ---------------- */}
              {activeHomeSectionModal === "occasions" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.occasionsHeading || "Gifts For Every Occasion"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          occasionsHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.occasionsSubheading || "Whatever the moment, we have a gift wrapped for it."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          occasionsSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Occasions List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Occasions List ({(sectionFormState?.occasions || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = sectionFormState?.occasions || [];
                          const newOcc = {
                            id: `occ-${Date.now()}`,
                            title: "New Occasion",
                            description: "Description for this special occasion...",
                            image: "/images/occasions/birthday.jpg",
                            href: "/products",
                          };
                          setSectionFormState({
                            ...sectionFormState,
                            occasions: [...list, newOcc],
                          });
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Occasion Card</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {(sectionFormState?.occasions || []).map((occ: any, idx: number) => (
                        <div key={occ.id || idx} className="p-4 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-xs">Occasion #{idx + 1}: {occ.title}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(sectionFormState?.occasions || [])];
                                list.splice(idx, 1);
                                setSectionFormState({ ...sectionFormState, occasions: list });
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Title</label>
                              <input
                                type="text"
                                value={occ.title}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.occasions || [])];
                                  list[idx].title = e.target.value;
                                  setSectionFormState({ ...sectionFormState, occasions: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Link Href</label>
                              <input
                                type="text"
                                value={occ.href}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.occasions || [])];
                                  list[idx].href = e.target.value;
                                  setSectionFormState({ ...sectionFormState, occasions: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Description</label>
                            <input
                              type="text"
                              value={occ.description}
                              onChange={(e) => {
                                const list = [...(sectionFormState?.occasions || [])];
                                list[idx].description = e.target.value;
                                setSectionFormState({ ...sectionFormState, occasions: list });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                            />
                          </div>

                          {/* Occasion Image Upload */}
                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Occasion Image *</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={occ.image}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.occasions || [])];
                                  list[idx].image = e.target.value;
                                  setSectionFormState({ ...sectionFormState, occasions: list });
                                }}
                                className="flex-1 px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                              <label className="flex items-center gap-1 bg-blush-100 text-maroon text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blush-200">
                                <Upload size={12} />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      uploadSectionImage(e.target.files[0], `occ-${idx}`, (url) => {
                                        const list = [...(sectionFormState?.occasions || [])];
                                        list[idx].image = url;
                                        setSectionFormState({ ...sectionFormState, occasions: list });
                                      });
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {occ.image && (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-blush-200 mt-1 bg-white">
                                <Image src={occ.image} alt={occ.title} fill className="object-cover" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 4: SIGNATURE PACKAGING ---------------- */}
              {activeHomeSectionModal === "packaging" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.packagingHeading || "Signature Packaging"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          packagingHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.packagingSubheading || "Unboxing is part of the gift. Every parcel is an experience unto itself."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          packagingSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Footer Note (Italicized Text) *</label>
                    <input
                      type="text"
                      value={sectionFormState?.packagingNote || "Ivory wrap · Blush ribbon · Gold seal · Hand-lettered card"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          packagingNote: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Packaging Images List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Packaging Images List ({(sectionFormState?.packagingImages || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = sectionFormState?.packagingImages || [];
                          const newPkg = {
                            src: "/images/products/1.webp",
                            alt: "Signature Packaging Showcase",
                          };
                          setSectionFormState({
                            ...sectionFormState,
                            packagingImages: [...list, newPkg],
                          });
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Packaging Image</span>
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {(sectionFormState?.packagingImages || []).map((imgItem: any, idx: number) => (
                        <div key={idx} className="p-4 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-xs">Packaging Image #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(sectionFormState?.packagingImages || [])];
                                list.splice(idx, 1);
                                setSectionFormState({ ...sectionFormState, packagingImages: list });
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Alt Text / Title</label>
                            <input
                              type="text"
                              value={imgItem.alt}
                              onChange={(e) => {
                                const list = [...(sectionFormState?.packagingImages || [])];
                                list[idx].alt = e.target.value;
                                setSectionFormState({ ...sectionFormState, packagingImages: list });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                            />
                          </div>

                          {/* Image Upload */}
                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Image File *</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={imgItem.src}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.packagingImages || [])];
                                  list[idx].src = e.target.value;
                                  setSectionFormState({ ...sectionFormState, packagingImages: list });
                                }}
                                className="flex-1 px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                              <label className="flex items-center gap-1 bg-blush-100 text-maroon text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blush-200">
                                <Upload size={12} />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      uploadSectionImage(e.target.files[0], `pkg-${idx}`, (url) => {
                                        const list = [...(sectionFormState?.packagingImages || [])];
                                        list[idx].src = url;
                                        setSectionFormState({ ...sectionFormState, packagingImages: list });
                                      });
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {imgItem.src && (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-blush-200 mt-1 bg-white">
                                <Image src={imgItem.src} alt={imgItem.alt} fill className="object-cover" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 5: WHY CHOOSE US ---------------- */}
              {activeHomeSectionModal === "whyUs" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.whyHeading || "Why Choose ELAROSE"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          whyHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.whySubheading || "Crafted with care in every petal, every stitch, every detail."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          whySubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Trust Points List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Trust Points List ({(sectionFormState?.trustPoints || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = sectionFormState?.trustPoints || [];
                          const newPoint = {
                            icon: "handmade",
                            title: "New Feature",
                            description: "Description of this trust point...",
                          };
                          setSectionFormState({
                            ...sectionFormState,
                            trustPoints: [...list, newPoint],
                          });
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Trust Point</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {(sectionFormState?.trustPoints || []).map((point: any, idx: number) => (
                        <div key={idx} className="p-4 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-xs">Feature #{idx + 1}: {point.title}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(sectionFormState?.trustPoints || [])];
                                list.splice(idx, 1);
                                setSectionFormState({ ...sectionFormState, trustPoints: list });
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Icon Type</label>
                              <select
                                value={point.icon}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.trustPoints || [])];
                                  list[idx].icon = e.target.value;
                                  setSectionFormState({ ...sectionFormState, trustPoints: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              >
                                <option value="handmade">Handmade</option>
                                <option value="premium">Premium Quality</option>
                                <option value="customizable">Customizable</option>
                                <option value="delivery">Pan India Delivery</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Feature Title</label>
                              <input
                                type="text"
                                value={point.title}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.trustPoints || [])];
                                  list[idx].title = e.target.value;
                                  setSectionFormState({ ...sectionFormState, trustPoints: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Description</label>
                            <input
                              type="text"
                              value={point.description}
                              onChange={(e) => {
                                const list = [...(sectionFormState?.trustPoints || [])];
                                list[idx].description = e.target.value;
                                setSectionFormState({ ...sectionFormState, trustPoints: list });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 6: HOW IT WORKS ---------------- */}
              {activeHomeSectionModal === "howItWorks" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.howItWorksHeading || "How It Works"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          howItWorksHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.howItWorksSubheading || "Four gentle steps to a gift they will never forget."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          howItWorksSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Steps List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Steps List ({(sectionFormState?.steps || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = sectionFormState?.steps || [];
                          const numStr = String(list.length + 1).padStart(2, "0");
                          const newStep = {
                            number: numStr,
                            title: "New Step",
                            description: "Step description goes here...",
                          };
                          setSectionFormState({
                            ...sectionFormState,
                            steps: [...list, newStep],
                          });
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Step</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {(sectionFormState?.steps || []).map((step: any, idx: number) => (
                        <div key={idx} className="p-4 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-xs">Step #{step.number}: {step.title}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(sectionFormState?.steps || [])];
                                list.splice(idx, 1);
                                setSectionFormState({ ...sectionFormState, steps: list });
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Number</label>
                              <input
                                type="text"
                                value={step.number}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.steps || [])];
                                  list[idx].number = e.target.value;
                                  setSectionFormState({ ...sectionFormState, steps: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>

                            <div className="col-span-2">
                              <label className="block text-[10px] font-medium text-text-muted mb-0.5">Step Title</label>
                              <input
                                type="text"
                                value={step.title}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.steps || [])];
                                  list[idx].title = e.target.value;
                                  setSectionFormState({ ...sectionFormState, steps: list });
                                }}
                                className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-medium text-text-muted mb-0.5">Description</label>
                            <input
                              type="text"
                              value={step.description}
                              onChange={(e) => {
                                const list = [...(sectionFormState?.steps || [])];
                                list[idx].description = e.target.value;
                                setSectionFormState({ ...sectionFormState, steps: list });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-blush-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 7: BEST SELLERS TEXT ---------------- */}
              {activeHomeSectionModal === "bestSellers" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.bestSellersHeading || "Best Sellers"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          bestSellersHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.bestSellersSubheading || "The pieces our customers can't stop gifting."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          bestSellersSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 8: INSTAGRAM FEED ---------------- */}
              {activeHomeSectionModal === "instagram" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Instagram Handle *</label>
                      <input
                        type="text"
                        required
                        value={sectionFormState?.instagramHandle || "@elarose_atelier"}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            instagramHandle: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Instagram Profile URL *</label>
                      <input
                        type="text"
                        required
                        value={sectionFormState?.instagramUrl || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            instagramUrl: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.instagramHeading || "@elarose_atelier"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          instagramHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.instagramSubheading || "Follow our journey on Instagram..."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          instagramSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Posts Grid List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-semibold text-maroon uppercase tracking-wider text-[10px]">
                        Instagram Post Images Grid ({(sectionFormState?.instagramPosts || []).length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = sectionFormState?.instagramPosts || [];
                          const newPost = {
                            id: `ig-${Date.now()}`,
                            image: "/images/products/bouquet.jpg",
                            alt: "Instagram Post Showcase",
                          };
                          setSectionFormState({
                            ...sectionFormState,
                            instagramPosts: [...list, newPost],
                          });
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-maroon bg-blush-100 hover:bg-blush-200 px-3 py-1 rounded-full"
                      >
                        <Plus size={12} />
                        <span>Add Post Image</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                      {(sectionFormState?.instagramPosts || []).map((post: any, idx: number) => (
                        <div key={post.id || idx} className="p-3 bg-blush-50/60 rounded-2xl border border-blush-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-maroon text-[11px]">Post #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(sectionFormState?.instagramPosts || [])];
                                list.splice(idx, 1);
                                setSectionFormState({ ...sectionFormState, instagramPosts: list });
                              }}
                              className="text-rose-600 hover:text-rose-800 p-0.5"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="flex gap-2">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white border border-blush-200 flex-shrink-0">
                              <Image src={post.image} alt={post.alt || "Post"} fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <input
                                type="text"
                                value={post.image}
                                onChange={(e) => {
                                  const list = [...(sectionFormState?.instagramPosts || [])];
                                  list[idx].image = e.target.value;
                                  setSectionFormState({ ...sectionFormState, instagramPosts: list });
                                }}
                                className="w-full px-2 py-1 bg-white border border-blush-200 rounded text-[10px]"
                              />
                              <label className="inline-flex items-center gap-1 bg-blush-100 text-maroon text-[10px] px-2 py-0.5 rounded cursor-pointer hover:bg-blush-200">
                                <Upload size={10} />
                                <span>Upload File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      uploadSectionImage(e.target.files[0], `ig-${idx}`, (url) => {
                                        const list = [...(sectionFormState?.instagramPosts || [])];
                                        list[idx].image = url;
                                        setSectionFormState({ ...sectionFormState, instagramPosts: list });
                                      });
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 9: FINAL CTA ---------------- */}
              {activeHomeSectionModal === "finalCta" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Section Heading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.finalCtaHeading || "Make Every Gift Memorable."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          finalCtaHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Section Subheading *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.finalCtaSubheading || "Your perfect gift is just one message away."}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          finalCtaSubheading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Button Text *</label>
                    <input
                      type="text"
                      required
                      value={sectionFormState?.finalCtaButton || "Order on Instagram"}
                      onChange={(e) =>
                        setSectionFormState({
                          ...sectionFormState,
                          finalCtaButton: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                    />
                  </div>

                  {/* Background Image Upload */}
                  <div>
                    <label className="block font-semibold mb-1">Background Image *</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        required
                        value={sectionFormState?.finalCtaImage || ""}
                        onChange={(e) =>
                          setSectionFormState({
                            ...sectionFormState,
                            finalCtaImage: e.target.value,
                          })
                        }
                        placeholder="Image URL..."
                        className="flex-1 px-4 py-2.5 bg-blush-50/50 border border-blush-200 rounded-xl focus:outline-none focus:border-maroon"
                      />
                      <label className="flex items-center gap-1.5 bg-blush-100 text-maroon border border-maroon/20 font-medium px-4 py-2.5 rounded-xl hover:bg-blush-200 cursor-pointer transition-colors">
                        <Upload size={14} />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              uploadSectionImage(e.target.files[0], "finalCtaImg", (url) => {
                                setSectionFormState({
                                  ...sectionFormState,
                                  finalCtaImage: url,
                                });
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {sectionFormState?.finalCtaImage && (
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-blush-200 mt-2 bg-blush-50">
                        <Image src={sectionFormState.finalCtaImage} alt="CTA Background Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-blush-100">
                <button
                  type="button"
                  onClick={() => setActiveHomeSectionModal(null)}
                  className="px-5 py-2.5 rounded-full border border-blush-200 text-text-muted hover:text-maroon font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingSection}
                  className="bg-maroon text-white font-medium px-6 py-2.5 rounded-full hover:bg-maroon-950 transition-colors shadow-md disabled:opacity-50"
                >
                  {savingSection ? "Saving..." : "Save Section Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CATEGORY MANAGER                                 */}
      {/* ======================================================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-blush-200 relative">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-text-muted hover:text-maroon rounded-full bg-blush-50"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-maroon mb-1 font-playfair">Manage Categories</h2>
            <p className="text-xs text-text-muted mb-4">View and rename existing categories across inventory.</p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {categoriesList.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex items-center justify-between p-3 bg-blush-50/50 rounded-xl border border-blush-200 text-xs"
                >
                  {editingCategoryName === cat.name ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={newCatNameInput}
                        onChange={(e) => setNewCatNameInput(e.target.value)}
                        className="flex-1 px-3 py-1 bg-white border border-blush-300 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => handleRenameCategory(cat.name)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingCategoryName(null)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="font-semibold text-text">{cat.name}</span>
                        <span className="text-[10px] text-text-muted ml-2">({cat.count} products)</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingCategoryName(cat.name);
                          setNewCatNameInput(cat.name);
                        }}
                        className="p-1.5 text-maroon hover:bg-blush-100 rounded-lg"
                      >
                        <Edit size={14} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
