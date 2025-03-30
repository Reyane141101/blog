import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, List, ListItem, Avatar, Divider, Box, IconButton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from '@mui/material/styles';
import ReplyIcon from "@mui/icons-material/Reply";


function CommentsSection({ articleName }) {
  const { user, isAuthenticated } = useAuth0();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  
  // Récupérer le thème actuel
  const theme = useTheme();

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${articleName}`)) || [];
    setComments(storedComments);
  }, [articleName]);

  const handleCommentSubmit = (parentId = null) => {
    const text = parentId ? replyText[parentId] : newComment;
    if (!text?.trim()) return;

    const commentData = {
      id: uuidv4(),
      text,
      author: user.name || user.nickname,
      avatar: user.picture,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      parentId,
    };

    const updatedComments = [...comments, commentData];
    setComments(updatedComments);
    localStorage.setItem(`comments-${articleName}`, JSON.stringify(updatedComments));

    if (parentId) {
      setReplyText({ ...replyText, [parentId]: "" });
      setReplyingTo(null);
    } else {
      setNewComment("");
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
        <Button
          variant="outlined"
          onClick={() => handleCommentSubmit()}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? "white" : "#333",  
            color: theme.palette.mode === 'dark' ? "black" : "white",          
            border: `1px solid ${theme.palette.mode === 'dark' ? "black" : "#555"}`,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? "#f0f0f0" : "#444",
            },
          }}
        >
          Post
        </Button>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          You need to log in to post a comment.
        </Typography>
      )}

      <List sx={{ mt: 3 }}>
        {comments.length > 0 ? (
          comments
            .filter((comment) => !comment.parentId)
            .map((comment) => (
              <React.Fragment key={comment.id}>
                <ListItem alignItems="flex-start" sx={{ mb: 3 }}>
                  <Avatar alt={comment.author} src={comment.avatar} sx={{ mr: 3 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {comment.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                      {comment.date}
                    </Typography>
                    <Typography variant="body1">{comment.text}</Typography>
                    {isAuthenticated && (
                      <IconButton
                        size="small"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        <ReplyIcon />
                      </IconButton>
                    )}

                    {replyingTo === comment.id && (
                      <Box sx={{ mt: 2, ml: 5 }}>
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
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleCommentSubmit(comment.id)}
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? "white" : "#333",  
                            color: theme.palette.mode === 'dark' ? "black" : "white",          
                            border: `1px solid ${theme.palette.mode === 'dark' ? "black" : "#555"}`,
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark' ? "#f0f0f0" : "#444",
                            },
                          }}
                        >
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
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                                {reply.date}
                              </Typography>
                              <Typography variant="body1">{reply.text}</Typography>
                            </div>
                          </ListItem>
                        ))}
                    </List>
                  </div>
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
