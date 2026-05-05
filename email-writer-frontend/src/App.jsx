// import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material'
// import './App.css'
// import { useState } from 'react'
// import axios from 'axios';


// function App() {
// const [emailContent, setEmailContent] = useState('');
// const[tone, setTone] = useState('');
// const[loading, setLoading] = useState(false);
// const[generatedReply, setGeneratedReply] = useState('');

// const handleSubmit = async () => {
//    setLoading(true)
//    try {
//      const response = await axios.post("http://localhost:8080/api/email/generate", {
//       emailContent,
//       tone
//      });
//      setGeneratedReply(typeof response.data == 'string' ? 
//       response.data : JSON.stringify(response.data)
//      );
//    } catch (error) {
//       console.error(error);
//       alert("Failed to generate reply");
//    } finally { 
//     setLoading(false);
//    }
// };
//   return (
//       <Container maxWidth= "md" sx={{py:4}}>
//         <Typography variant= 'h3' component="h1" gutterBottom>
//           Email reply Generator
//         </Typography>

//         <Box sx={{mx: 3}}> 
//           <TextField
//             fullWidth
//             multiline
//             rows={6}
//             variant='outlined'
//             label="Original Email Content"
//             value={emailContent || ''}
//             onChange={(e) => setEmailContent(e.target.value)}
//             sx={{mb : 2}}
//           />

//             <FormControl fullWidth sx={{mb : 2}}>
//               <InputLabel>Tone (Optional)</InputLabel>
//               <Select
//                 value={tone || ''}
//                 label="Tone (Optional)"
//                 onChange={(e) => setTone(e.target.value)}
//               >
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="professional">Professional</MenuItem>
//                 <MenuItem value="casual">Casual</MenuItem>
//                 <MenuItem value="friendly">Friendly</MenuItem>
//               </Select>
//             </FormControl>

//              <Button variant="contained" sx={{mb : 2}}
//              onClick ={handleSubmit} 
//              disabled ={!emailContent || loading}>
//                 {loading ? <CircularProgress size={24}/> : "Generate Reply"}
//               </Button>
//             </Box>

//               <Box sx={{mx: 3}}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={6}
//                   variant='outlined'
//                   value={generatedReply}
//                   onChange={(e) => setEmailContent(e.target.value)}
//                   sx={{mb : 2}}
//                 />

//                 <Button 
//                   variant= 'outlined'
//                   onClick={() => navigator.clipboard.writeText(generatedReply)}>
// Copy to Clipboard
//                 </Button>
//                 </Box>

//       </Container>
//   )
// }

// export default App

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual',       label: 'Casual' },
  { value: 'friendly',     label: 'Friendly' },
  { value: 'formal',       label: 'Formal' },
  { value: 'apologetic',   label: 'Apologetic' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
];

export default function App() {
  const [emailContent, setEmailContent]     = useState('');
  const [tone, setTone]                     = useState('professional');
  const [loading, setLoading]               = useState(false);
  const [generatedReply, setGeneratedReply] = useState('');
  const [copied, setCopied]                 = useState(false);
  const [error, setError]                   = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      console.error(err);
      setError('Failed to generate reply. Is the backend running on port 8080?');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setEmailContent('');
    setGeneratedReply('');
    setError('');
  };

  return (
    <div className="app-root">

      {/* Header */}
      <header className="app-header">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#D9971A">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span className="logo-text">
          SmartMail <span className="logo-accent">AI</span>
        </span>
        <span className="logo-badge">Gemini</span>
      </header>

      {/* Main */}
      <main className="app-main">

        <div className="hero">
          <h1 className="hero-title">
            Craft perfect replies,<br />
            <span className="hero-accent">instantly.</span>
          </h1>
          <p className="hero-sub">
            Powered by Google Gemini · Paste any email, pick your tone, get a polished reply in seconds.
          </p>
        </div>

        <div className="panel-grid">

          {/* Left: Input */}
          <div className="card">
            <div className="card-label">
              <span className="label-dot" />
              Original Email
            </div>

            <textarea
              className="input-area"
              placeholder="Paste the email you want to reply to…"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={9}
            />
            <div className={`char-count ${emailContent.length > 0 ? 'active' : ''}`}>
              {emailContent.length} characters
            </div>

            {/* Tone pills */}
            <div className="tone-section">
              <div className="card-label" style={{ marginBottom: 10 }}>
                <span className="label-dot" />
                Tone
              </div>
              <div className="tone-grid">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    className={`tone-btn ${tone === t.value ? 'active' : ''}`}
                    onClick={() => setTone(t.value)}
                    type="button"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="gen-btn"
              onClick={handleSubmit}
              disabled={!emailContent.trim() || loading}
              type="button"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Generating…
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Generate Reply
                </>
              )}
            </button>

            {error && <div className="error-box">{error}</div>}
          </div>

          {/* Right: Output */}
          <div className="card">
            <div className="card-label" style={{ justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="label-dot" />
                Generated Reply
              </span>
              {generatedReply && (
                <button
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="output-box">
              {loading && (
                <div className="loading-state">
                  <span className="dot" style={{ animationDelay: '0s' }} />
                  <span className="dot" style={{ animationDelay: '.2s' }} />
                  <span className="dot" style={{ animationDelay: '.4s' }} />
                </div>
              )}
              {!loading && !generatedReply && (
                <div className="empty-state">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="empty-text">Your AI-generated reply will appear here</span>
                </div>
              )}
              {!loading && generatedReply && (
                <pre className="reply-text">{generatedReply}</pre>
              )}
            </div>

            <div className="output-footer">
              <span className="reply-chars">
                {generatedReply ? `${generatedReply.length} characters` : ''}
              </span>
              <button className="clear-btn" onClick={handleClear} type="button">
                Clear all
              </button>
            </div>
          </div>

        </div>

        <p className="powered-by">
          Powered by <span>Google Gemini API</span> · Spring Boot · React
        </p>
      </main>
    </div>
  );
}