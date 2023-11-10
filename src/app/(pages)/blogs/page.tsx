import BlogList from "@/app/components/BlogList";
import prisma from "@/utils/prismadb";

const BlogsPage = async () => {
  const posts = await prisma.post.findMany();
  //console.log("posts", posts);

  return (
    <div>
      <BlogList posts={posts} />
    </div>
  );
};

export default BlogsPage;
