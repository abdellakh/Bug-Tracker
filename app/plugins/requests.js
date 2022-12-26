const axios = require("axios");

export default ({ store }, inject) => {
  inject("get", (route) => {
    let headers = {
      headers: {
        Authorization: store.state.auth ? store.state.auth.token : "",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.api_uri + route, headers)
        .then(function (response) {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  inject(
    "post",
    (route, body = {}, isUpload = false, progressCallback = console.log) => {
      let headers = !isUpload
        ? {
            headers: {
              Authorization: store.state.auth ? store.state.auth.token : "",
            },
          }
        : {
            headers: {
              Authorization: store.state.auth ? store.state.auth.token : "",
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: progressCallback,
          };
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.api_uri + route, body, headers)
          .then(function (response) {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  );

  inject("patch", (route, body = {}) => {
    let headers = {
      headers: {
        Authorization: store.state.auth ? store.state.auth.token : "",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .patch(process.env.api_uri + route, body, headers)
        .then(function (response) {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  inject("put", (route, body = {}) => {
    let headers = {
      headers: {
        Authorization: store.state.auth ? store.state.auth.token : "",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .put(process.env.api_uri + route, body, headers)
        .then(function (response) {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  inject("del", (route) => {
    let headers = {
      headers: {
        Authorization: store.state.auth ? store.state.auth.token : "",
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.api_uri + route, headers)
        .then(function (response) {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

