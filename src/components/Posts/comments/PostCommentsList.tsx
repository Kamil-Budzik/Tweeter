const PostCommentsList = ({ postId }: { postId: number }) => {
  return (
    <>
      <ul>
        <li>{postId}</li>
      </ul>
    </>
  );
};

export default PostCommentsList;