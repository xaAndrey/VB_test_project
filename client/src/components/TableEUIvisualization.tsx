import { EuiBasicTable, EuiBasicTableColumn, EuiTableFieldDataColumnType } from "@elastic/eui";
import { CommentDto } from "../api/comments/dto";

interface TableEUIVisualizationProps {
    comments: CommentDto[],
}

export const TableEUIVisualization : React.FC<TableEUIVisualizationProps> = ({ comments }) => {

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
    
    return(
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
}