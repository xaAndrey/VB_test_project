import { useEffect, useState } from "react";
import { CommentDto } from "../../api/comments/dto";
import { fetchCommentById } from "../../api/comments/request";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Link, Stack } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { routes } from "../../util/constants";

export const Comment = () => {
  const [comment, setComment] = useState<CommentDto>();
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(
    () =>
      id === undefined ? console.log("undefined") : console.log(parseInt(id)),
    [id]
  );
  useEffect(() => {
    console.log(comment);
    if (comment !== undefined) {
      setLoading(false);
    }
  }, [comment]);

  useEffect(() => {
    if (id === undefined) {
      throw new Error("Id is undefined!");
    }
    fetchCommentById(parseInt(id))
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => {
        setComment(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      {comment?.id === undefined && !loading && (
        <div>
          <Button
            startIcon={<WestIcon />}
            onClick={() => navigate(routes.main)}
            style={{ color: "#1a1a1a" }}
          >
            Назад
          </Button>
          <Stack>
            <h1>Комментарий с таким ID не существует!</h1>
          </Stack>
        </div>
      )}
      {comment?.id !== undefined && !loading && (
        <div>
          <Button
            startIcon={<WestIcon />}
            onClick={() => navigate(routes.main)}
            style={{ color: "#1a1a1a" }}
          >
            Назад
          </Button>
          <h1>
            {"ID: "}
            <Link onClick={() => navigate(`/?id=${comment?.id}`)}>
              {comment?.id}
            </Link>
          </h1>
          <h2>
            {"Name: "}
            <Link onClick={() => navigate(`/?name=${comment?.name}`)}>
              {comment?.name}
            </Link>
          </h2>
          <h2 onClick={() => navigate(`/?email=${comment?.email}`)}>
            {"Email: "}
            <Link>{comment?.email}</Link>
          </h2>
          <h4
            onClick={() =>
              navigate(
                `/?id=${comment?.id}&name=${comment?.name}&email=${comment?.email}`
              )
            }
          >
            {`Body: ${comment?.body}`}
          </h4>
        </div>
      )}
    </>
  );
};
