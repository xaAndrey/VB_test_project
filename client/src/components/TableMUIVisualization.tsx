import { useEffect, useState } from "react";
import { CommentDto } from "../api/comments/dto";
import {
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
import { useSearchParams } from "react-router-dom";

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
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
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

              <TableCell style={{ width: "40%" }}>{comment.email}</TableCell>

              <TableCell style={{ width: "40%" }}>{comment.name}</TableCell>
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
              colSpan={3}
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

/*
<TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: "20" }} />
          <col style={{ width: "20" }} />
          <col style={{ width: "20" }} />
          <col style={{ width: "20" }} />
          <col style={{ width: "20" }} />
        </colgroup>

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleSort("id")}
              >
                <span>Токен</span>
                {columnToSort === "id" ? (
                  sortDirection === "asc" ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )
                ) : null}
              </div>
            </StyledTableCell>

            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleSort("name")}
              >
                <span>Имя</span>
                {columnToSort === "name" ? (
                  sortDirection === "asc" ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )
                ) : null}
              </div>
            </StyledTableCell>

            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleSort("age")}
              >
                <span>Возраст</span>
                {columnToSort === "age" ? (
                  sortDirection === "asc" ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )
                ) : null}
              </div>
            </StyledTableCell>

            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleSort("gender")}
              >
                <span>Пол</span>
                {columnToSort === "gender" ? (
                  sortDirection === "asc" ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )
                ) : null}
              </div>
            </StyledTableCell>

            <StyledTableCell align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleSort("city")}
              >
                <span>Город</span>
                {columnToSort === "city" ? (
                  sortDirection === "asc" ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )
                ) : null}
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subjects
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((registration) => (
              <TableRow key={registration.token} onClick={() => navigate(routes.goToSubjectPage(registration.id))}>
                <StyledTableCell align="center" sx={TokenStyleTExt}>{registration.token}</StyledTableCell>

                <StyledTableCell align="center" sx={FullNameTextStyle}>
                  {registration.name !== null ? registration.name : '-'}
                </StyledTableCell>

                <StyledTableCell align="center" sx={FullNameTextStyle}>
                  <Box fontWeight="bold">{registration.age !== null ? registration.age : '-'}</Box>
                </StyledTableCell>

                <StyledTableCell align="center" sx={FullNameTextStyle}>
                  <Box fontWeight="bold">{registration.gender === 0 ? "Женский" : registration.gender === 1 ? "Мужской" : "-"}</Box>
                </StyledTableCell>

                <StyledTableCell align="center" sx={FullNameTextStyle}>
                  {registration.city !== null ? registration.city : '-'}
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      {subjects !== undefined && <TablePagination
                sx={{ marginRight: 10 }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={subjects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={'Записей на странице'}
                labelDisplayedRows={({ from, to, count }) => {
                    return `${from}–${to} из ${count !== -1 ? count : `more than ${to}`}`
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
    </TableContainer>


*/
