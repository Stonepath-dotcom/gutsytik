import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/blog-article-layout";
import { getAllAutoBlogPosts, getAutoBlogPostBySlug } from "@/lib/auto-blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params from auto-blog data
export async function generateStaticParams() {
  const posts = getAllAutoBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAutoBlogPostBySlug(slug);

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  const ogImage = post.image
    ? `https://getmova.my.id${post.image}`
    : "https://getmova.my.id/og-image.png";

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://getmova.my.id/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://getmova.my.id/blog/${post.slug}`,
      siteName: "getmova",
      type: "article",
      publishedTime: post.dateISO,
      modifiedTime: post.lastUpdatedISO || post.dateISO,
      authors: ["GetMova"],
      images: [
        {
          url: ogImage,
          width: 1344,
          height: 768,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

// ISR: revalidate every 6 hours
export const revalidate = 21600;

export default async function AutoBlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getAutoBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `https://getmova.my.id${post.image}` : undefined,
    datePublished: post.dateISO,
    dateModified: post.lastUpdatedISO || post.dateISO,
    author: { "@type": "Organization", name: "getmova" },
    publisher: {
      "@type": "Organization",
      name: "getmova",
      logo: {
        "@type": "ImageObject",
        url: "https://getmova.my.id/mova-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://getmova.my.id/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post.faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqJsonLd) }}
        />
      )}
      {post.howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.howToJsonLd) }}
        />
      )}
      <BlogArticleLayout
        title={post.title}
        slug={post.slug}
        description={post.description}
        date={post.date}
        readingTime={post.readingTime}
        jsonLd={articleJsonLd}
        relatedArticles={post.relatedArticles}
        headings={post.headings}
        lastUpdated={post.lastUpdated}
        image={post.image}
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </BlogArticleLayout>
    </>
  );
}
