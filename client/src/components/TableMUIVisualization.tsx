import { useEffect, useState } from "react";
import { CommentDto } from "../api/comments/dto";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "../util/constants";

interface TableMUIVisualizationProps {
  comments: CommentDto[];
}

export const TableMUIVisualization: React.FC<TableMUIVisualizationProps> = ({
  comments,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState({
    id: searchParams.get('id') ?? "",
    name: searchParams.get('name') ?? "",
    email: searchParams.get('email') ?? "",
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const params = {
      id: '',
      name: '',
      email: ''
    };
    if (searchValues.id) params.id = searchValues.id;
    if (searchValues.name) params.name = searchValues.name;
    if (searchValues.email) params.email = searchValues.email;
    setSearchParams(params)
  }, [searchValues]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChanheRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Фильтрация данных на основе значений поиска
  const filteredData = comments.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchValues.name.toLowerCase()) &&
      item.id.toString().includes(searchValues.id) &&
      item.email.toLowerCase().includes(searchValues.email.toLowerCase())
    );
  });

  const handleSearchChange = (column: string, value: string) => {
    setSearchValues((prevState) => ({
      ...prevState,
      [column]: value,
    }));
  };

  return (
    <TableContainer>
      <Table aria-label="Comments List">
        <TableHead>
        <TableRow>
            <TableCell>
              <TextField
                label="Search ID"
                variant="outlined"
                value={searchValues.id}
                onChange={(e) => handleSearchChange('id', e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Search Email"
                variant="outlined"
                value={searchValues.email}
                onChange={(e) => handleSearchChange('email', e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Search Name"
                variant="outlined"
                value={searchValues.name}
                onChange={(e) => handleSearchChange('name', e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell colSpan={6} />
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((comment) => (
            <TableRow key={comment.id}>
              <TableCell component="th" scope="row">
                {comment.id}
              </TableCell>

              <TableCell style={{ width: "30%" }}>{comment.email}</TableCell>

              <TableCell style={{ width: "30%" }}>{comment.name}</TableCell>
              
              <TableCell style={{ width: "20%" }}><Link onClick={() => navigate(routes.goToCommentPage(comment.id))}>{`/comment/${comment.id}`}</Link></TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 50, 100, { label: "All", value: -1 }]}
              colSpan={4}
              count={comments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChanheRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};