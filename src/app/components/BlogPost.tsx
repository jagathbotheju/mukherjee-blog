"use client";
import { deletePostAction } from "@/utils/serverActions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  post: Blog;
}

const BlogPost = ({ post }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();

  const handleDeletePost = () => {
    deletePostAction(post.id, path).then((response) => {
      if (response.success) {
        toast.success("Post Deleted Successfully");
      } else {
        toast.error("Error Deleting Post");
      }
    });
  };

  console.log("pathName", path);

  return (
    <div
      className="shadow-md flex flex-col rounded-md col-span-1 relative overflow-hidden bg-slate-200 text-slate-800 hover:scale-[101%] transition duration-300 cursor-pointer w-[300px] mx-auto"
      onClick={() => router.push(`/blogs/${post.id}`)}
    >
      <h3 className="font-semibold py-1 px-4 uppercase absolute top-3 right-6 z-10 rounded-full bg-primary text-slate-200">
        {post.category}
      </h3>
      <div className="relative w-[300px] h-[200px]  overflow-hidden">
        <Image
          alt="blog image"
          src={post.image}
          fill
          className="object-contain w-full h-full"
        />
      </div>

      <div className="p-4 relative">
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-sm line-clamp-1">{post.description}</p>
        <div className="flex mt-1 gap-x-2">
          <div className="rounded-full w-[40px] h-[40px] relative overflow-hidden">
            <Image
              alt="profile"
              src={post.userimage}
              fill
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">by</p>
            <p>{post.username}</p>
          </div>
        </div>

        <div className="absolute bottom-2 right-2">
          {session &&
            session.user &&
            post.userid === session?.user.id &&
            path !== "/search" && (
              <AiFillDelete
                className="text-secondary cursor-pointer"
                size={18}
                onClick={handleDeletePost}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
