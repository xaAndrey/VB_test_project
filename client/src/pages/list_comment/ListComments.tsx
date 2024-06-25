import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchAllComments } from "../../api/comments/request";
import {
  EuiButtonGroup,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { JsonVisualization } from "../../components/JsonVisualization";
import { TableEUIVisualization } from "../../components/TableEUIvisualization";
import { TableMUIVisualization } from "../../components/TableMUIVisualization";

export const ListComments = (): JSX.Element => {
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [variant, setVariant] = useState<string>("table_mui");

  const toggleButtons = [
    {
      id: `json`,
      label: 'JSON',
    },
    {
      id: `table_eui`,
      label: 'Table EUI',
    },
    {
      id: `table_mui`,
      label: 'Table MUI',
    },
  ];

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

  const onChange = (optionId: string) => {
    setVariant(optionId);
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>
          <h1>Comments</h1>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiButtonGroup
            style={{ border: "0px" }}
            isFullWidth
            legend="Data visualization options"
            options={toggleButtons}
            idSelected={variant}
            onChange={(value) => onChange(value)}
          ></EuiButtonGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      {variant === "json" && <JsonVisualization comments={comments} />}
      
      {variant === "table_eui" && (
        <TableEUIVisualization
          comments={comments} 
        />
      )}

      {variant === "table_mui" && (
        <TableMUIVisualization 
          comments={comments}
        />
      )}
    </>
  );
};
