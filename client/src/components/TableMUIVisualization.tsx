import { useState } from "react";
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
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface TableMUIVisualizationProps {
  comments: CommentDto[];
}

export const TableMUIVisualization: React.FC<TableMUIVisualizationProps> = ({
  comments,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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

  return (
    <TableContainer>
      <Table aria-label="Comments List">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>ID</TableCell>
            <TableCell style={{ color: "white" }}>Email</TableCell>
            <TableCell style={{ color: "white" }}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? comments.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : comments
          ).map((comment) => (
            <TableRow key={comment.id}>
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {comment.id}
              </TableCell>

              <TableCell style={{ width: "40%", color: "white" }}>
                {comment.email}
              </TableCell>

              <TableCell style={{ width: "40%", color: "white" }}>
                {comment.name}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow >
            <TablePagination
            style={{color: 'white'}}
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
