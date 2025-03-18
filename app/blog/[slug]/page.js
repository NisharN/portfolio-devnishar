// @flow strict
import { personalData } from "@/utils/data/personal-data";

async function getBlog(slug) {
  const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

// Generates static params for each blog post
export async function generateStaticParams() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    console.error("Failed to fetch blog data");
    return [];
  }

  const data = await res.json();

  return data.map((post) => ({
    slug: post.slug, // Ensure this matches your dynamic param
  }));
}

async function BlogDetails({ params }) {
  const slug = params.slug;
  
  try {
    const blog = await getBlog(slug);

    return (
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        <div dangerouslySetInnerHTML={{ __html: blog.body_html }} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Blog Not Found</h1>
        <p>Sorry we couldnt fetch the blog content. Please try again later.</p>
      </div>
    );
  }
}

export default BlogDetails;
