import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchAllComments } from "../../api/comments/request";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiText,
} from "@elastic/eui";

export const ListComments = (): JSX.Element => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [variant, setVariant] = useState<string>("table");

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

  const columns: Array<EuiBasicTableColumn<CommentDto>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "email",
      name: "Email",
    },
    {
      field: "name",
      name: "Name",
    },
  ];

  const getRowsProps = (comment: CommentDto) => {
    const { id } = comment;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {},
    };
  };

  const getCellProps = (
    comment: CommentDto,
    column: EuiTableFieldDataColumnType<CommentDto>
  ) => {
    const { id } = comment;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };

  return (
    <>
      <h1>Comments</h1>
      {variant === "json" && (
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
      )}
      {variant === "table" && (
        <>
          <EuiBasicTable
            tableCaption="Comments List"
            items={comments}
            rowHeader="id"
            columns={columns}
            rowProps={getRowsProps}
            cellProps={getCellProps}
            responsiveBreakpoint={false}
          />
        </>
      )}
    </>
  );
};
