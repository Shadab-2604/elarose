module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/json/home.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$products$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/json/products.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$categories$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/json/categories.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$occasions$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/json/occasions.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$instagram$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/json/instagram.json.[json].cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/HeroSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CategoriesSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/CategoriesSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BestSellersSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/BestSellersSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$WhySection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/WhySection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HowItWorksSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/HowItWorksSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$OccasionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/OccasionsSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PackagingSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/PackagingSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$InstagramSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/InstagramSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FinalCtaSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/FinalCtaSection.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    const bestSellers = __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$products$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].filter((p)=>p.isBestSeller).slice(0, 4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hero
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CategoriesSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                categories: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$categories$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BestSellersSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                products: bestSellers,
                heading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].bestSellersHeading,
                subheading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].bestSellersSubheading
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$WhySection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                heading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].whyHeading,
                subheading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].whySubheading,
                trustPoints: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].trustPoints
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HowItWorksSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                heading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].howItWorksHeading,
                subheading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].howItWorksSubheading,
                steps: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].steps
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$OccasionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                occasions: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$occasions$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PackagingSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                heading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].packagingHeading,
                subheading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].packagingSubheading,
                images: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].packagingImages
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$InstagramSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$instagram$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FinalCtaSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                heading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].finalCtaHeading,
                subheading: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].finalCtaSubheading,
                button: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].finalCtaButton,
                image: __TURBOPACK__imported__module__$5b$project$5d2f$json$2f$home$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].finalCtaImage
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/home/BestSellersSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/BestSellersSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/BestSellersSection.tsx", "default");
}),
"[project]/components/home/BestSellersSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/BestSellersSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/BestSellersSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/BestSellersSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BestSellersSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/BestSellersSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BestSellersSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/BestSellersSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$BestSellersSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/CategoriesSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/CategoriesSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/CategoriesSection.tsx", "default");
}),
"[project]/components/home/CategoriesSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/CategoriesSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/CategoriesSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/CategoriesSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CategoriesSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/CategoriesSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CategoriesSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/CategoriesSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CategoriesSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/FinalCtaSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/FinalCtaSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/FinalCtaSection.tsx", "default");
}),
"[project]/components/home/FinalCtaSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/FinalCtaSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/FinalCtaSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/FinalCtaSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FinalCtaSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/FinalCtaSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FinalCtaSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/FinalCtaSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FinalCtaSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/HeroSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/HeroSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/HeroSection.tsx", "default");
}),
"[project]/components/home/HeroSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/HeroSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/HeroSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/HeroSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/HeroSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/HeroSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/HowItWorksSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/HowItWorksSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/HowItWorksSection.tsx", "default");
}),
"[project]/components/home/HowItWorksSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/HowItWorksSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/HowItWorksSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/HowItWorksSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HowItWorksSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/HowItWorksSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HowItWorksSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/HowItWorksSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HowItWorksSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/InstagramSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/InstagramSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/InstagramSection.tsx", "default");
}),
"[project]/components/home/InstagramSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/InstagramSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/InstagramSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/InstagramSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$InstagramSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/InstagramSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$InstagramSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/InstagramSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$InstagramSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/OccasionsSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/OccasionsSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/OccasionsSection.tsx", "default");
}),
"[project]/components/home/OccasionsSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/OccasionsSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/OccasionsSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/OccasionsSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$OccasionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/OccasionsSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$OccasionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/OccasionsSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$OccasionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/PackagingSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/PackagingSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/PackagingSection.tsx", "default");
}),
"[project]/components/home/PackagingSection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/PackagingSection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/PackagingSection.tsx <module evaluation>", "default");
}),
"[project]/components/home/PackagingSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PackagingSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/PackagingSection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PackagingSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/PackagingSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$PackagingSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/home/WhySection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/WhySection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/WhySection.tsx", "default");
}),
"[project]/components/home/WhySection.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/home/WhySection.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/home/WhySection.tsx <module evaluation>", "default");
}),
"[project]/components/home/WhySection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$WhySection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/home/WhySection.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$WhySection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/home/WhySection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$WhySection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/json/categories.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "pots",
        "title": "Flower Pots",
        "shortTitle": "Flower Pots",
        "description": "Handcrafted floral pots that stay beautiful forever.",
        "image": "/images/products/2.webp",
        "href": "/products?category=pots"
    },
    {
        "id": "keychains",
        "title": "Flower Keychains",
        "shortTitle": "Keychains",
        "description": "Cute handmade floral keychains crafted with love.",
        "image": "/images/products/k3.webp",
        "href": "/products?category=keychains"
    },
    {
        "id": "bouquets",
        "title": "Coming Soon",
        "shortTitle": "Bouquets",
        "description": "Beautiful handcrafted bouquets launching soon.",
        "image": "/images/products/coming-soon.png",
        "href": "/products?category=bouquets"
    },
    {
        "id": "custom",
        "title": "Custom Orders",
        "shortTitle": "Custom",
        "description": "Personalized creations made just for you.",
        "image": "/images/products/custom.png",
        "href": "/products?category=custom"
    }
];
}),
"[project]/json/home.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "hero": {
        "headline": "Handmade Luxury Gifts Crafted",
        "headlineAccent": "With Love",
        "subheadline": "Personalized bouquets, handmade keychains, premium hampers and memorable custom gifting.",
        "ctaPrimary": "Order on Instagram",
        "ctaSecondary": "View Products",
        "badges": [
            "100% Handmade",
            "Pan India Delivery",
            "Customizable"
        ],
        "rating": "4.9",
        "ratingCount": "1.2k reviews",
        "heroImage": "/images/products/keychain.webp"
    },
    "bestSellersHeading": "Best Sellers",
    "bestSellersSubheading": "The pieces our customers can't stop gifting.",
    "whyHeading": "Why Choose ELAROSE",
    "whySubheading": "Crafted with care in every petal, every stitch, every detail.",
    "trustPoints": [
        {
            "icon": "handmade",
            "title": "Handmade",
            "description": "Every piece is made entirely by hand, petal by petal, stitch by stitch."
        },
        {
            "icon": "premium",
            "title": "Premium Quality",
            "description": "Only the finest materials — pipe cleaners, ribbons, fabrics, and packaging."
        },
        {
            "icon": "customizable",
            "title": "Customizable",
            "description": "Every gift can be tailored to tell your story, your way."
        },
        {
            "icon": "delivery",
            "title": "Pan India Delivery",
            "description": "From Mumbai to Manipur — gifts are now travelling everywhere love does."
        }
    ],
    "howItWorksHeading": "How It Works",
    "howItWorksSubheading": "Four gentle steps to a gift they will never forget.",
    "steps": [
        {
            "number": "01",
            "title": "Choose",
            "description": "Browse our collection and pick what speaks to your heart."
        },
        {
            "number": "02",
            "title": "Customize",
            "description": "Tell us the name, date, color, or message that makes it personal."
        },
        {
            "number": "03",
            "title": "Confirm",
            "description": "We finalize the design, confirm details, and begin crafting."
        },
        {
            "number": "04",
            "title": "Receive",
            "description": "Your gift arrives wrapped in our signature ivory packaging."
        }
    ],
    "packagingHeading": "Signature Packaging",
    "packagingSubheading": "Unboxing is part of the gift. Every parcel is an experience unto itself.",
    "packagingImages": [
        {
            "src": "/images/products/1.webp",
            "alt": "ELAROSE gift box with ribbon"
        },
        {
            "src": "/images/products/2.webp",
            "alt": "Handwritten thank you card"
        },
        {
            "src": "/images/products/3.webp",
            "alt": "Brand sticker and gift wrap"
        },
        {
            "src": "/images/products/4.webp",
            "alt": "Luxury wrapped gift"
        }
    ],
    "finalCtaHeading": "Make Every Gift Memorable.",
    "finalCtaSubheading": "Your perfect gift is just one message away.",
    "finalCtaButton": "Order on Instagram",
    "finalCtaImage": "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600"
};
}),
"[project]/json/instagram.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "handle": "@elarose_atelier",
    "url": "https://www.instagram.com/elarose_atelier?igsh=dDVwNDl6dDU3dWcx",
    "heading": "@elarose_atelier",
    "subheading": "Follow our journey on Instagram. Follow us and tag us in your unboxing.",
    "posts": [
        {
            "id": "ig1",
            "image": "/images/products/bouquet.jpg",
            "alt": "Blush rose bouquet by ELAROSE"
        },
        {
            "id": "ig2",
            "image": "/images/products/keychain.webp",
            "alt": "Gold keychain by ELAROSE"
        },
        {
            "id": "ig3",
            "image": "/images/products/hamper.jpg",
            "alt": "Luxury gift hamper by ELAROSE"
        },
        {
            "id": "ig4",
            "image": "/images/products/1.webp",
            "alt": "Pastel bouquet by ELAROSE"
        },
        {
            "id": "ig5",
            "image": "/images/products/2.webp",
            "alt": "Crimson gift wrap by ELAROSE"
        },
        {
            "id": "ig6",
            "image": "/images/products/5.webp",
            "alt": "Signature packaging by ELAROSE"
        },
        {
            "id": "ig7",
            "image": "/images/products/4.webp",
            "alt": "Custom letter frame by ELAROSE"
        },
        {
            "id": "ig8",
            "image": "/images/products/7.webp",
            "alt": "Birthday bundle by ELAROSE"
        },
        {
            "id": "ig9",
            "image": "/images/products/8.webp",
            "alt": "Handwritten card by ELAROSE"
        }
    ]
};
}),
"[project]/json/occasions.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "birthday",
        "title": "Birthday",
        "description": "Make their day unforgettable with a gift crafted just for them.",
        "image": "/images/occasions/birthday.jpg",
        "href": "/products?occasion=Birthday"
    },
    {
        "id": "anniversary",
        "title": "Anniversary",
        "description": "Celebrate every year together with something as lasting as your love.",
        "image": "/images/occasions/anniversary.jpg",
        "href": "/products?occasion=Anniversary"
    },
    {
        "id": "wedding",
        "title": "Wedding",
        "description": "The perfect gift for the most beautiful beginning.",
        "image": "/images/occasions/wedding.jpg",
        "href": "/products?occasion=Wedding"
    },
    {
        "id": "special",
        "title": "Special Occasion",
        "description": "For moments that don't fit a label, but deserve to be remembered.",
        "image": "/images/occasions/special.jpg",
        "href": "/products?occasion=Special+Surprise"
    }
];
}),
"[project]/json/products.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "p1",
        "slug": "daisy-bloom-pot",
        "title": "Daisy Bloom Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Teacher Gift",
            "Home Decor"
        ],
        "price": 249,
        "isBestSeller": false,
        "shortDescription": "Fresh white daisies that stay beautiful forever.",
        "description": "A handcrafted daisy arrangement featuring bright white petals and vibrant yellow centres in a decorative pot.",
        "image": "/images/products/1.webp",
        "customizable": true
    },
    {
        "id": "p2",
        "slug": "sunflower-pot",
        "title": "Sunflower Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Home Decor",
            "Special Surprise"
        ],
        "price": 299,
        "isBestSeller": false,
        "shortDescription": "A bright handcrafted sunflower that never fades.",
        "description": "Handmade sunflower crafted from premium pipe cleaners and arranged in a decorative pot. Perfect for desks, study tables and thoughtful gifts.",
        "image": "/images/products/2.webp",
        "customizable": true
    },
    {
        "id": "p3",
        "slug": "pink-tulip-pot",
        "title": "Pink Tulip Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Mother's Day",
            "Special Surprise"
        ],
        "price": 249,
        "isBestSeller": false,
        "shortDescription": "Elegant pink tulip handcrafted from soft pipe cleaners.",
        "description": "A graceful handmade tulip arrangement designed with soft pastel tones and minimal styling.",
        "image": "/images/products/3.webp",
        "customizable": true
    },
    {
        "id": "p4",
        "slug": "mini-rose-garden-pot",
        "title": "Mini Rose Garden Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Anniversary",
            "Home Decor"
        ],
        "price": 349,
        "isBestSeller": false,
        "shortDescription": "A miniature garden filled with handcrafted roses.",
        "description": "Multiple handcrafted roses arranged together to create a charming mini rose garden in a decorative pot.",
        "image": "/images/products/4.webp",
        "customizable": true
    },
    {
        "id": "p5",
        "slug": "sunshine-garden-pot",
        "title": "Sunshine Garden Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Home Decor",
            "Special Surprise"
        ],
        "price": 399,
        "isBestSeller": false,
        "shortDescription": "A colourful floral arrangement inspired by a sunny garden.",
        "description": "A handcrafted mixed-flower arrangement featuring sunflower-inspired blooms and decorative floral accents in a premium pot.",
        "image": "/images/products/5.webp",
        "customizable": true
    },
    {
        "id": "p6",
        "slug": "golden-sunflower-pot",
        "title": "Golden Sunflower Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Home Decor",
            "Special Surprise"
        ],
        "price": 299,
        "isBestSeller": false,
        "shortDescription": "A handcrafted sunflower that brings warmth and positivity.",
        "description": "A vibrant golden sunflower arrangement crafted from premium pipe cleaners and displayed in a decorative pot.",
        "image": "/images/products/6.webp",
        "customizable": true
    },
    {
        "id": "p7",
        "slug": "lavender-blossom-pot",
        "title": "Lavender Blossom Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Birthday",
            "Friendship",
            "Home Decor"
        ],
        "price": 299,
        "isBestSeller": false,
        "shortDescription": "A vibrant arrangement of purple handcrafted blooms.",
        "description": "A beautiful collection of handmade purple flowers arranged in a decorative pot. Adds charm and colour to any space.",
        "image": "/images/products/7.webp",
        "customizable": true
    },
    {
        "id": "p8",
        "slug": "classic-red-rose-pot",
        "title": "Classic Red Rose Pot",
        "category": "Flower Pots",
        "categorySlug": "pots",
        "occasion": [
            "Anniversary",
            "Valentine",
            "Romantic Gift"
        ],
        "price": 349,
        "isBestSeller": false,
        "shortDescription": "A timeless red rose handcrafted with love.",
        "description": "A handcrafted red rose with detailed leaves and rose bud, presented in a decorative pot. A perfect symbol of love and affection.",
        "image": "/images/products/8.webp",
        "customizable": true
    },
    {
        "id": "p9",
        "slug": "pearl-daisy-keychain",
        "title": "Pearl Daisy Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Friendship",
            "Return Gift"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A cheerful daisy keychain paired with elegant pearl accents.",
        "description": "Handcrafted white daisy made from premium pipe cleaners, finished with a pearl loop and green leaves. A charming accessory for bags, purses and keys.",
        "image": "/images/products/k1.webp",
        "customizable": true
    },
    {
        "id": "p10",
        "slug": "lavender-lily-keychain",
        "title": "Lavender Lily Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Friendship",
            "Special Surprise"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A delicate lavender lily handcrafted with intricate details.",
        "description": "Elegant lavender flower keychain made from premium pipe cleaners. Lightweight, aesthetic and perfect for daily use.",
        "image": "/images/products/k2.webp",
        "customizable": true
    },
    {
        "id": "p11",
        "slug": "sunflower-bloom-keychain",
        "title": "Sunflower Bloom Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Teacher Gift",
            "Special Surprise"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A bright sunflower keychain that spreads happiness.",
        "description": "Handcrafted sunflower keychain featuring vibrant yellow petals and detailed green leaves. Perfect for keys and bags.",
        "image": "/images/products/k3.webp",
        "customizable": true
    },
    {
        "id": "p12",
        "slug": "strawberry-pearl-keychain",
        "title": "Strawberry Pearl Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Return Gift",
            "Friendship"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A cute strawberry charm with a pearl handle.",
        "description": "Handcrafted strawberry keychain paired with elegant pearl beads and floral accents. A playful accessory for everyday use.",
        "image": "/images/products/k4.webp",
        "customizable": true
    },
    {
        "id": "p13",
        "slug": "pink-rose-pearl-keychain",
        "title": "Pink Rose Pearl Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Anniversary",
            "Special Surprise"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A handcrafted pink rose finished with pearl details.",
        "description": "Beautiful pink rose keychain made from premium pipe cleaners and paired with a pearl loop for an elegant look.",
        "image": "/images/products/k5.webp",
        "customizable": true
    },
    {
        "id": "p14",
        "slug": "red-rose-pearl-keychain",
        "title": "Red Rose Pearl Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Valentine",
            "Anniversary",
            "Romantic Gift"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A romantic red rose keychain with pearl accents.",
        "description": "Handcrafted red rose keychain designed with elegant pearl details, making it a perfect keepsake gift.",
        "image": "/images/products/k6.webp",
        "customizable": true
    },
    {
        "id": "p15",
        "slug": "pink-daisy-keychain",
        "title": "Pink Daisy Keychain",
        "category": "Keychains",
        "categorySlug": "keychains",
        "occasion": [
            "Birthday",
            "Friendship",
            "Return Gift"
        ],
        "price": 149,
        "isBestSeller": false,
        "shortDescription": "A sweet pink daisy keychain handcrafted with care.",
        "description": "Handmade pink daisy keychain featuring soft pastel tones and green leaves. A charming accessory for keys, bags and gifts.",
        "image": "/images/products/k7.webp",
        "customizable": true
    }
];
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0y7b5e3._.js.map