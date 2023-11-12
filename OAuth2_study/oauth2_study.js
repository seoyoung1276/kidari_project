const express = require('express')
const axios = require('axios');

const app = express();

const GOOGLE_CLIENT_ID = '25147128929-gr887lq0ggg3dgatab1nmekelq0pr0dn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_SIGNUP_REDIRECT_URL = "http://localhost:3000/signup/redirect";
const GOOGLE_LOGIN_REDIRECT_URL = 'http://localhost:3000/login/redirect';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

app.get('/',(req, res)=>{
    res.send(`
    <h1>OAuth Study</h1>
    <a href="/login">Log in</a>
    <a href="/signup">Sign up</a>`)
});

app.get('/login', (req, res)=>{
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URL}`
    url += '&response_type=code'
    url += '&scope=email profile'
    res.redirect(url);
});

app.get('/signup',(req, res)=>{
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URL}`
    url += '&response_type=code'
    url += '&scope=email profile'
    res.redirect(url);
})

app.get('/login/redirect', (req, res)=>{
    const {code} = req.query;
    console.log(`code: ${code}`);
    res.send('ok');
})

// email, google id 등을 가져오기 위한 url
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

app.get('/signup/redirect', async (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);

  	// access_token, refresh_token 등의 구글 토큰 정보 가져오기
    const resp = await axios.post(GOOGLE_TOKEN_URL, {
        // x-www-form-urlencoded(body)
      	code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_SIGNUP_REDIRECT_URL,
        grant_type: 'authorization_code',
    });

  	// email, google id 등의 사용자 구글 계정 정보 가져오기
    const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
      	// Request Header에 Authorization 추가
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });
  
  	// 구글 인증 서버에서 json 형태로 반환 받은 body 클라이언트에 반환
    res.json(resp2.data.email);
});
app.listen(3000, () => {
    console.log('server is running at 3000')
})