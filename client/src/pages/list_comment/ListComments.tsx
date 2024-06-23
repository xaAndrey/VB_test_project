import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchAllComments } from "../../api/comments/request";

export const ListComments = (): JSX.Element => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    fetchAllComments()
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => setComments(json))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {console.log(comments)}, [comments])

  return (
    <>
    <h1>Hello world!</h1>
      {comments.map((comment, index) => {
        return(
        <>
          <h1>
            {comment.id} -- {index}
          </h1>
          <h2>
            {comment.email}
          </h2>
          </>);
      })}
      {/* {comments[0].body} */}
    </>
  );
};
