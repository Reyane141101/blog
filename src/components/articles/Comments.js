import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, List, ListItem, Avatar, Divider, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material/styles";
import { collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "../../firebase";

function CommentsSection({ articleName }) {
  const { user, isAuthenticated } = useAuth0();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(firestore, "Comments");
        const q = query(commentsRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      }
    };

    fetchComments();
  }, [articleName]);

  const addComment = async (parentId = "") => {
    const commentText = parentId ? replyText[parentId] : newComment;
    if (!commentText.trim()) return;

    const commentData = {
      authorId: user.sub,
      text: commentText,
      author: user.name,
      avatar: user.picture,
      timestamp: new Date(),
      article: articleName,
      parentId,
    };

    try {
      const commentsRef = collection(firestore, "Comments");
      await addDoc(commentsRef, commentData);

      if (parentId) {
        setReplyText({ ...replyText, [parentId]: "" });
        setReplyingTo(null);
      } else {
        setNewComment("");
      }

      const querySnapshot = await getDocs(query(commentsRef, orderBy("timestamp", "asc")));
      setComments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.error("Erreur lors de l'ajout du commentaire :", e);
    }
  };

  return (
    <Box>
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Comments
      </Typography>

      {isAuthenticated ? (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Write a comment..."
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2, mt: 2 }}
          />
          <Button variant="outlined" onClick={() => addComment()}>Post</Button>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          You need to log in to post a comment.
        </Typography>
      )}

      <List sx={{ mt: 1 }}>
        {comments.length > 0 ? (
          comments
            .filter((comment) => !comment.parentId)
            .map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start" sx={{ mb: -1 }}>
                  <Avatar alt={comment.author} src={comment.avatar} sx={{ mr: 3 }} />
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {comment.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comment.timestamp?.toDate ? comment.timestamp.toDate().toLocaleString() : new Date(comment.timestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">{comment.text}</Typography>
                    {isAuthenticated && (
                      <Button size="small" variant="text" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                        Reply
                      </Button>
                    )}

                    {replyingTo === comment.id && (
                      <Box sx={{ mt: 1, ml: 5 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Write a reply..."
                          multiline
                          rows={2}
                          value={replyText[comment.id] || ""}
                          onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                          sx={{ mb: 1 }}
                        />
                        <Button variant="contained" size="small" onClick={() => addComment(comment.id)}>
                          Post
                        </Button>
                      </Box>
                    )}

                    <List sx={{ mt: -1 }}>
                      {comments
                        .filter((reply) => reply.parentId === comment.id)
                        .map((reply) => (
                          <ListItem key={reply.id} alignItems="flex-start" sx={{ mb: 2 }}>
                            <Avatar alt={reply.author} src={reply.avatar} sx={{ mr: 2 }} />
                            <div>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                {reply.author}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {reply.timestamp?.toDate ? reply.timestamp.toDate().toLocaleString() : new Date(reply.timestamp).toLocaleString()}
                              </Typography>
                              <Typography variant="body1">{reply.text}</Typography>
                            </div>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default CommentsSection;
