"use client";
import BlogPost from "@/app/components/BlogPost";
import Container from "@/app/components/Container";
import { categories } from "@/utils/menuItems";
import { getPostByCategoryAction } from "@/utils/serverActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const CategoryPage = ({ params }: Props) => {
  const router = useRouter();
  const [postsByCategories, setPostByCategories] = useState<Blog[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("set loading");
    setLoading(true);
    getPostByCategoryAction(params.id).then((response) => {
      if (response.success) {
        setPostByCategories(response.data);
      }
    });
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-10 rounded mx-auto w-full mt-20 container flex justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  } else if (!postsByCategories || !postsByCategories.length) {
    return (
      <div className="p-20 rounded-md mx-auto w-full mt-20 container flex justify-center flex-col gap-8">
        <h2 className="text-3xl font-bold">No Blog Posts Found! Create Now</h2>
        <button
          className="btn btn-primary w-fit"
          onClick={() => router.push("/create")}
        >
          Create New Post
        </button>
      </div>
    );
  }

  const latestPostId = Math.max(...postsByCategories.map((item) => item.id));
  const latestPost = postsByCategories.find((item) => item.id === latestPostId);
  const relatedPosts = postsByCategories.filter(
    (item) => item.id !== latestPostId
  );

  console.log("loading", loading);

  return (
    <div className="py-8 md:py-10 lg:py-14">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* left panel */}
          <div className="flex flex-col col-span-2 p-5">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {`Latest posts in ${params.id.toUpperCase()}`}
            </h2>

            {/* hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="flex">
                <div className="w-[400px] h-[300px] relative">
                  {latestPost && latestPost.image && (
                    <Image alt="hero" src={latestPost.image} fill />
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="text-5xl font-bold">{latestPost?.title}</h1>
                <p className="py-6 text-justify">{latestPost?.description}</p>
                <button className="btn btn-primary w-fit">Read More...</button>
              </div>
            </div>
          </div>

          {/* right panel */}
          <div className="flex flex-col bg-slate-200 rounded-md p-5 h-fit col-span-1 w-fit order-first md:order-last">
            <h3 className="text-lg font-semibold dark:text-slate-800">
              Filter by Category
            </h3>
            <hr className="bg-slate-500 w-full h-[2px] mb-5 mt-1" />

            {/* category list */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((item) => (
                <button
                  key={item.label}
                  className="btn btn-primary btn-sm"
                  onClick={() => router.push(`/category/${item.value}`)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* related posts */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 mt-10 dark:text-slate-200">
            Related Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
            {relatedPosts && relatedPosts.length ? (
              relatedPosts.map((post) => (
                <div key={post.id}>
                  <BlogPost post={post} />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
