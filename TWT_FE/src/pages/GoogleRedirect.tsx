import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { getGoogleTokenFn } from '../api/auth';

function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');
  const getToken = async (code: string) => {
    const REST_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT;
    const SECRET_KEY = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET;
    const response = await axios.post(
      `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${code}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    if (code) {
      getToken(code).then((res) => {
        getGoogleTokenFn(res.access_token);
      });
    }
  }, [code]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Spinner size={'10'} />
    </div>
  );
}

export default GoogleRedirect;
