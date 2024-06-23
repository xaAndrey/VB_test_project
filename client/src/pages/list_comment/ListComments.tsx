import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchAllComments } from "../../api/comments/request";
import {
  EuiText,
} from '@elastic/eui';

export const ListComments = (): JSX.Element => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [variant, setVariant] = useState<string>("json");


  useEffect(() => {
    fetchAllComments()
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => setComments(json))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return <>
  <h1>Comments</h1>
  {variant === "json" && <>
  <EuiText>
    <h2>JSON</h2>
    {comments.map((comment) => {
      return(
        <>
        <p>
        {'{'}<br/>
        &emsp;{`"id" : ${comment.id},`}<br/>
        &emsp;{`"name" : ${comment.name},`}<br/>
        &emsp;{`"email" : ${comment.email},`}<br/>
        &emsp;{`"body" : ${comment.body}`}<br/>
        {'},'}
        </p>
        </>
      );
    })}
    </EuiText>
  </>}
  </>;
};
