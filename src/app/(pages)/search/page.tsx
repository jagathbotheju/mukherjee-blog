"use client";
import BlogList from "@/app/components/BlogList";
import BlogPost from "@/app/components/BlogPost";
import Container from "@/app/components/Container";
import { searchPostAction } from "@/utils/serverActions";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Blog[] | null>();
  const [error, setError] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText) {
      console.log("searching", searchText);
      handleSearch(searchText);
    }
  };

  useEffect(() => {
    setError(false);
    setSearchResults(null);
  }, [searchText]);

  const handleSearch = (searchTerm: string) => {
    searchPostAction(searchTerm).then((response) => {
      if (response.success) {
        console.log(response.data);
        setSearchResults(response.data);
      } else {
        console.log(response.message);
        //setSearchText('')
        setSearchResults(null);
        setError(true);
      }
    });
  };

  return (
    <div className='className="py-8 md:py-10 lg:py-14"'>
      <Container>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Search any Blog Post</h2>
            <div className="flex gap-2 max-w-2xl">
              <div className="flex relative w-full">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder="Search Blogs..."
                  className="input input-bordered w-full"
                />
                {searchText && (
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setSearchText("");
                      setSearchResults(null);
                      setError(false);
                    }}
                    size={20}
                    className="absolute top-3 right-2 cursor-pointer"
                  />
                )}
              </div>
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>

        {/* search results */}
        {error ? (
          <>
            <div className="p-10 rounded mx-auto bg-red-100 w-full mt-20 container flex justify-center">
              <h2 className="text-3xl font-bold">No Blog Posts Found!</h2>
            </div>
          </>
        ) : (
          <>
            <section>
              <div className="container mt-10 mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {searchResults &&
                    searchResults.length &&
                    searchResults.map((post) => (
                      <div key={post.id}>
                        <BlogPost post={post} />
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
