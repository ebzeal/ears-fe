import {jwtDecode} from 'jwt-decode';

export const isTokenValid = token => {
  try {
    const decodedToken = jwtDecode(token);

if (decodedToken.exp) {
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTime) {
    return false;
  } else {
    return true;
  }
}
  } catch (error) {
    console.log('Token does not have an expiration time');

  }
};

export const decodeToken = token => {
  try {
    return jwtDecode(token);
} catch (error) {
    console.log(error);

  }
};
