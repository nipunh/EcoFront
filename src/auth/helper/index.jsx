import { API } from "../../backend.js";

export const signup = (user) => {
  console.log(API);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return response.json();
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    console.log("Inside authenticate function", data);
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Success."))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "undefined") {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
