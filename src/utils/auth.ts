const AUTH_KEY = "logx-authenticated";

export const isAuthenticated = () => {
  return window.localStorage.getItem(AUTH_KEY) === "true";
};

export const setAuthenticated = (value: boolean) => {
  window.localStorage.setItem(AUTH_KEY, value ? "true" : "false");
};

export const clearAuthenticated = () => {
  window.localStorage.removeItem(AUTH_KEY);
};
