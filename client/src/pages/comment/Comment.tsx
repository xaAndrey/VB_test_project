import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchCommentById } from "../../api/comments/request";
import { useParams } from "react-router-dom";

export const Comment = () => {
  const [comment, setComment] = useState<CommentDto>();
  const { id } = useParams();

  useEffect(() => id === undefined ? console.log("undefined") : console.log(parseInt(id)), [id]);
  useEffect(() => console.log(comment), [comment]);

  useEffect(() => {
    if (id === undefined) {throw new Error("Id id undefined!")}
    fetchCommentById(parseInt(id))
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((json) => setComment(json))
    .catch((error) => console.error(error));
  }, []);

  return <>
  {comment?.id === undefined && <h1>Комментарий с таким ID не существует!</h1>}

  <h1>{comment?.id}</h1>
  <h2>{comment?.name}</h2>
  <h3>{comment?.email}</h3>
  <h4>{comment?.body}</h4>
  </>;
};
