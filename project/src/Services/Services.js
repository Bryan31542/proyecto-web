import axios from "axios";

const API_URL = "https://posts-pw2021.herokuapp.com/api/v1";

const Services = {};

Services.login = async (username, password) => {
  return axios
    .post(`${API_URL}/auth/signin`, {
      username,
      password,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.verifyToken = async (token) => {
  return axios
    .get(`${API_URL}/auth/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.getPosts = async (token, page) => {
  return axios
    .get(`${API_URL}/post/all?limit=9&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.likePost = async (token, postId) => {
  return axios
    .patch(
      `${API_URL}/post/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.favoritePost = async (token, postId) => {
  return axios
    .patch(
      `${API_URL}/post/fav/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.createPost = async (token, post) => {
  return axios
    .post(`${API_URL}/post/create`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      window.location.reload();
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.updatePost = async (token, postID, updatedPost) => {
  return axios
    .put(`${API_URL}/post/update/${postID}`, updatedPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      window.location.reload();
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.getFavPosts = async (token) => {
  return axios
    .get(`${API_URL}/post/fav`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.getOwned = async (token, page) => {
  return axios
    .get(`${API_URL}/post/owned?limit=9&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.toggleActive = async (token, postId) => {
  return axios
    .patch(
      `${API_URL}/post/toggle/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.getPost = async (token, id) => {
  return axios
    .get(`${API_URL}/post/one/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

Services.addComment = async (token, id, comment) => {
  return axios
    .patch(`${API_URL}/post/comment/${id}`, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export default Services;
