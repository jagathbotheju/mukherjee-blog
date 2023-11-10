"use client";
import BlogPost from "./BlogPost";

interface Props {
  posts: Blog[] | undefined | null;
}

const BlogList = ({ posts }: Props) => {
  if (!posts || !posts.length || null) {
    return (
      <div className="p-10 rounded mx-auto w-full mt-20 container flex justify-center">
        <h2 className="text-3xl font-bold">No Blog Posts Found!</h2>
      </div>
    );
  }

  return (
    <section>
      <div className="container mt-10 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts &&
            posts.length &&
            posts.map((post) => (
              <div key={post.id}>
                <BlogPost post={post} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
