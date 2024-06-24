import { EuiText } from "@elastic/eui";
import { CommentDto } from "../api/comments/dto";

interface JsonVisualizationProps {
  comments: CommentDto[];
}

export const JsonVisualization: React.FC<JsonVisualizationProps> = ({
  comments,
}): JSX.Element => {
  return (
    <>
      <EuiText>
        <h2>JSON</h2>
        {comments.map((comment) => {
          return (
            <>
              <p>
                {"{"}
                <br />
                &emsp;{`"id" : ${comment.id},`}
                <br />
                &emsp;{`"name" : ${comment.name},`}
                <br />
                &emsp;{`"email" : ${comment.email},`}
                <br />
                &emsp;{`"body" : ${comment.body}`}
                <br />
                {"},"}
              </p>
            </>
          );
        })}
      </EuiText>
    </>
  );
};
