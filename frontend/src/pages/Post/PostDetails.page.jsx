// PostDetailsPage.jsx

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Image } from "@mantine/core";
import DOMAIN from "../../services/endpoint"; // Import the DOMAIN variable


function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);


  const getAuthorName = (email) => {
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.slice(0, atIndex) : email;
  };

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
