import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchCommentById } from "../../api/comments/request";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export const Comment = () => {
  const [comment, setComment] = useState<CommentDto>();
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(
    () =>
      id === undefined ? console.log("undefined") : console.log(parseInt(id)),
    [id]
  );
  useEffect(() => {
    console.log(comment);
    if (comment !== undefined) {
      setLoading(false);
    }
  }, [comment]);

  useEffect(() => {
    if (id === undefined) {
      throw new Error("Id is undefined!");
    }
    fetchCommentById(parseInt(id))
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => {
        setComment(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      {comment?.id === undefined && !loading && (
        <h1>Комментарий с таким ID не существует!</h1>
      )}

      <h1 onClick={() => navigate(`/?id=${comment?.id}`)}>{comment?.id}</h1>
      <h2 onClick={() => navigate(`/?name=${comment?.name}`)}>
        {comment?.name}
      </h2>
      <h3 onClick={() => navigate(`/?email=${comment?.email}`)}>
        {comment?.email}
      </h3>
      <h4
        onClick={() =>
          navigate(
            `/?id=${comment?.id}&name=${comment?.name}&email=${comment?.email}`
          )
        }
      >
        {comment?.body}
      </h4>
    </>
  );
};
