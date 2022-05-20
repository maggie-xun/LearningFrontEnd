instance.interceptors.request.use(
  (config) => {
    const tokenObj = getToken();
    // 添加请求头
    config.headers["X-Token"] = tokenObj.token;
    // 登录接口和刷新token接口绕过
    if (
      config.url.indexOf("/refreshToken") >= 0 ||
      config.url.indexOf("/login") >= 0
    ) {
      return config;
    }
    if (tokenObj.token && tokenObj.tokenExpireTime) {
      const now = Date.now();
      if (now >= tokenObj.tokenExpireTime) {
        // 立即刷新token
        if (!isRefreshing) {
          console.log("刷新token ing");
          isRefreshing = true;
          refreshToken()
            .then((res) => {
              const { token, tokenExprieIn } = res.data;
              const tokenExpireTime = now + tokenExprieIn * 1000;
              instance.setToken({ token, tokenExpireTime });
              isRefreshing = false;
              return token;
            })
            .then((token) => {
              console.log("刷新token成功，执行队列");
              requests.forEach((cb) => cb(token));
              // 执行完成后，清空队列
              requests = [];
            })
            .catch((res) => {
              console.error("refresh token error: ", res);
            });
        }
        const retryOriginalRequest = new Promise((resolve) => {
          requests.push((token) => {
            // 因为config中的token是旧的，所以刷新token后要将新token传进来
            config.headers["X-Token"] = token;
            resolve(config);
          });
        });
        return retryOriginalRequest;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
