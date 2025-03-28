import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, Avatar, Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from 'uuid';

function CommentsSection({ articleId }) {
  const { user, isAuthenticated } = useAuth0();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Simulate fetching existing comments for the article from backend
    const storedComments = JSON.parse(localStorage.getItem(`comments-${articleId}`)) || [];
    setComments(storedComments);
  }, [articleId]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const commentData = {
      id: uuidv4(),
      text: newComment,
      author: user.name || user.nickname,
      avatar: user.picture,
      date: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, commentData];
    setComments(updatedComments);
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h6" gutterBottom>
        Commentaires
      </Typography>
      {isAuthenticated ? (
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Ajoutez un commentaire"
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleCommentSubmit}>
            Publier
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Connectez-vous pour laisser un commentaire.
        </Typography>
      )}

      <List sx={{ mt: 3 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <Avatar alt={comment.author} src={comment.avatar} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2">
                    {comment.author} - <Typography component="span" variant="caption" color="text.secondary">{comment.date}</Typography>
                  </Typography>
                  <Typography variant="body1">{comment.text}</Typography>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Aucun commentaire pour le moment.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default CommentsSection;