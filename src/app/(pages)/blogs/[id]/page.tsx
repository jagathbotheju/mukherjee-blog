import BlogDetails from "@/app/components/BlogDetails";
import Container from "@/app/components/Container";
import { getPostByIdAction } from "@/utils/serverActions";

interface Props {
  params: {
    id: string;
  };
}

const BlogDetailsPage = async ({ params }: Props) => {
  const response = await getPostByIdAction(Number(params.id));

  return (
    <Container>
      {response.success && response.data ? (
        <>
          <BlogDetails post={response.data} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default BlogDetailsPage;
