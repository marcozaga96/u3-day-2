import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjNmQ5YWZkZWUzZDAwMTU5YmRlZWMiLCJpYXQiOjE3MjQ2NzM0MzQsImV4cCI6MTcyNTg4MzAzNH0.oLgXfqEd6PJ4Qx1OxXK4O-Vf0NwJLqVRP-LnLugz-HQ",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          // this.setState({
          //   comments: (comments),
          //   isLoading: false,
          //   isError: false,
          // });
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          // this.setState({ isLoading: false, isError: true });
          setIsError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        // this.setState({ isLoading: false, isError: true })
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
