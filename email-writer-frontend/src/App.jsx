import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material'
import './App.css'
import { useState } from 'react'
import axios from 'axios';


function App() {
const [emailContent, setEmailContent] = useState('');
const[tone, setTone] = useState('');
const[loading, setLoading] = useState(false);
const[generatedReply, setGeneratedReply] = useState('');

const handleSubmit = async () => {
   setLoading(true)
   try {
     const response = await axios.post("http://localhost:8080/api/email/generate", {
      emailContent,
      tone
     });
     setGeneratedReply(typeof response.data == 'string' ? 
      response.data : JSON.stringify(response.data)
     );
   } catch (error) {
      console.error(error);
      alert("Failed to generate reply");
   } finally { 
    setLoading(false);
   }
};
  return (
      <Container maxWidth= "md" sx={{py:4}}>
        <Typography variant= 'h3' component="h1" gutterBottom>
          Email reply Generator
        </Typography>

        <Box sx={{mx: 3}}> 
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{mb : 2}}
          />

            <FormControl fullWidth sx={{mb : 2}}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone || ''}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

             <Button variant="contained" sx={{mb : 2}}
             onClick ={handleSubmit} 
             disabled ={!emailContent || loading}>
                {loading ? <CircularProgress size={24}/> : "Generate Reply"}
              </Button>
            </Box>

              <Box sx={{mx: 3}}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant='outlined'
                  value={generatedReply}
                  onChange={(e) => setEmailContent(e.target.value)}
                  sx={{mb : 2}}
                />

                <Button 
                  variant= 'outlined'
                  onClick={() => navigator.clipboard.writeText(generatedReply)}>
Copy to Clipboard
                </Button>
                </Box>

      </Container>
  )
}

export default App
