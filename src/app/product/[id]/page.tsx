import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { RelatedProducts } from "@/components/product/RelatedProducts";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found" };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  // same category first, then fill with anything else
  const related = products
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category)
    )
    .slice(0, 4);

  return (
    <div className="container-page py-6 md:py-10">
      <Breadcrumb product={product} />

      <article className="mt-4 grid gap-6 rounded-card bg-white p-4 shadow-card md:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">
        <ProductGallery images={product.gallery} title={product.title} />
        <ProductDetails product={product} />
      </article>

      <ReviewsSection product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
