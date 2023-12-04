import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Image } from "@mantine/core";
import data from   "../../../../backend/data.json";

function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log('Current postId:', postId);
  
    const fetchPostDetails = () => {
      const postDetails = data.posts.find((post) => post.id === parseInt(postId, 10));
      console.log('Post details:', postDetails);
  
      if (postDetails) {
        setPost(postDetails);
      } else {
        console.error("Post not found");
      }
    };
  
    fetchPostDetails();
  }, [postId]);
  

  return (
    <Container>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>
            <strong>Author:</strong> {getAuthorName(post.creatorEmail)}
          </p>
          <p>
            <strong>Category:</strong> {post.category}
          </p>
          <p>{post.content}</p>
          <Image src={post.image} alt={post.title} />

          <Button>
            <Link to="/posts">Back to Posts</Link>
          </Button>
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  try {
    const response = await axios.get(`${DOMAIN}/api/posts/${params.postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
};

export default PostDetailsPage;