async function googleRedirect(code) {
  const tokenUrl = 'https://oauth2.googleapis.com/token';

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  const url = `${tokenUrl}?${params.toString()}`;
  return { url, headers };
}
export default googleRedirect;
