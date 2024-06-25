import {
  EuiBasicTable,
  EuiBasicTableColumn,
  // EuiFieldSearch,
  EuiTableFieldDataColumnType,
} from "@elastic/eui";
import { CommentDto } from "../api/comments/dto";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

interface TableEUIVisualizationProps {
  comments: CommentDto[];
}

export const TableEUIVisualization: React.FC<TableEUIVisualizationProps> = ({
  comments,
}) => {
  // const { id, name, email } = useParams();

  // const [searchValues, setSearchValues] = useState({
  //   id: id,
  //   name: name,
  //   email: email,
  // });
  //   const [pageIndex, setPageIndex] = useState(0);
  //   const [pageSize, setPageSize] = useState(10);

  //  const findComments = (comments: CommentDto[], pageIndex: number, pageSize: number) => {
  //   let pageOfItems;

  //   if (!pageIndex && !pageSize) {
  //     pageOfItems = comments;
  //   } else {
  //     const startIndex = pageIndex * pageSize;
  //     pageOfItems = comments.slice(
  //       startIndex,
  //       Math.min(startIndex + pageSize, comments.length)
  //     );
  //   }

  //   return {
  //     pageOfItems,
  //     totalItemCount: comments.length
  //   }
  //  };

  // const { pageOfItems, totalItemCount} = findComments(comments, pageIndex, pageSize);

  // const pagination = {
  //   pageIndex,
  //   pageSize,
  //   totalItemCount,
  //   pageSizeOptions: [10, 0]
  // }

  // const onTableChange = ({ page }: Criteria<CommentDto>) => {
  //   if (page) {
  //     const { index: pageIndex, size: pageSize } = page;
  //     setPageIndex(pageIndex);
  //     setPageSize(pageSize);
  //   }
  // }

  // const handleSearchChange = (column, value) => {
  //   setSearchValues((prevState) => ({
  //     ...prevState,
  //     [column]: value,
  //   }));
  // };

  const columns: Array<EuiBasicTableColumn<CommentDto>> = [
    {
      field: "id",
      name: "ID",
      // render: (id) => (
      //   <EuiFieldSearch
      //     placeholder="Search ID"
      //     value={searchValues.id}
      //     onChange={(e) => handleSearchChange("id", e.target.value)}
      //     fullWidth
      //   />
      // ),
    },
    {
      field: "email",
      name: "Email",
            // render: (email) => (
      //   <EuiFieldSearch
      //     placeholder="Search Email"
      //     value={searchValues.email}
      //     onChange={(e) => handleSearchChange("email", e.target.value)}
      //     fullWidth
      //   />
      // ),
    },
    {
      field: "name",
      name: "Name",
            // render: (name) => (
      //   <EuiFieldSearch
      //     placeholder="Search Name"
      //     value={searchValues.name}
      //     onChange={(e) => handleSearchChange("name", e.target.value)}
      //     fullWidth
      //   />
      // ),
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
      <EuiBasicTable
        tableCaption="Comments List"
        items={comments}
        // items={pageOfItems}
        rowHeader="id"
        columns={columns}
        rowProps={getRowsProps}
        cellProps={getCellProps}
        // pagination={pagination}
        // onChange={onTableChange}
        responsiveBreakpoint={false}
      />
    </>
  );
};
