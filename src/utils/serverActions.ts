"use server";
import { redirect } from "next/navigation";
import prisma from "./prismadb";
import { revalidatePath } from "next/cache";

interface NewComment {
  id: number;
  comments: string[];
}

export const addCommentAction = async (newComment: NewComment) => {
  console.log(`/blogs/${newComment.id}`);
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: newComment.id,
      },
      data: {
        comments: {
          set: [...newComment.comments],
        },
      },
    });

    if (updatedPost) {
      revalidatePath(`/blogs/${newComment.id}`);
      return {
        success: true,
        data: updatedPost,
      };
    }

    return {
      success: false,
      message: "Error saving comment!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const createPostAction = async (formData: BlogFormData) => {
  try {
    const savedPost = await prisma.post.create({
      data: formData,
    });
    revalidatePath("/blogs");
    return {
      success: true,
      data: savedPost,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create blog post, please try again",
    };
  }
};

export const searchPostAction = async (searchTerm: string) => {
  console.log("searchTerm", searchTerm);
  try {
    const searchPosts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
            },
          },
          {
            description: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    if (searchPosts.length) {
      return {
        success: true,
        data: searchPosts,
      };
    }

    return {
      success: false,
      message: "No posts found",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const deletePostAction = async (postId: number, pathName: string) => {
  console.log("deletePostAction", pathName);
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (deletedPost) {
      revalidatePath(pathName);
      return {
        success: true,
        data: deletedPost,
      };
    }

    return {
      success: false,
      message: "Could not delete post!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const getPostByIdAction = async (postId: number) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post) {
      return {
        success: true,
        data: post,
      };
    }

    return {
      success: false,
      message: "Failed to fetch Post",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const getPostByCategoryAction = async (categoryId: string) => {
  console.log("categoryId", categoryId);
  try {
    const postsByCategory = await prisma.post.findMany({
      where: {
        category: categoryId,
      },
    });

    if (postsByCategory) {
      return {
        success: true,
        data: postsByCategory,
      };
    }

    return {
      success: false,
      message: "Failed to fetch data",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
