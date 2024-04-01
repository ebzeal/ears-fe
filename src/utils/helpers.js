import {decodeToken, isTokenValid} from "./jwt-decode";

const tokenKey = 'userToken';
export const saveUserToken = token => window.localStorage.setItem(tokenKey, token);
export const getUserToken = () => window.localStorage.getItem(tokenKey);
export const removeUserToken = () => window.localStorage.removeItem(tokenKey);

const userToken = getUserToken();
export const getTokenInfo = ()=> decodeToken(userToken);
export const validateToken = ()=> isTokenValid(userToken);

// capitalizeFirstLetter('hello world') => 'Hello world'
export const capitalizeFirstLetter = (str) => {
  try {
    return (
      str[0]?.toUpperCase() + (str?.substring(1) ?? '').toLocaleLowerCase()
    );
  } catch (_) {
    console.log('capitalizeFirstLetter error', _);

    return str;
  }
};

// capitalizeFirstWetter except and('hello and world') => 'Hello And World'
export const capitalizeFirstWord = (sentence) => {
  const sentArr = sentence.split(' ');
  const newArr = [];
  for (let i = 0; i < sentArr.length; i++) {
    let word = sentArr[i];
    word = word.charAt(0).toUpperCase() + word.substring(1);
    newArr.push(word);
  }
  return newArr.join(' ');
};