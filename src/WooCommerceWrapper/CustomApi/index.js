// const customURL =
//   'https://dev57.onlinetestingserver.com/cindy-walling/wp-json/api/v1/';
const customURL = 'https://pinkpoppy-boutique.com/wp-json/api/v1/';
const customApi = {
  post: (endpoint, data, success, error) => {
    let url = customURL + endpoint;

    let h = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    };
    let headers = new Headers(h);
    var configs = {
      method: 'POST',
      headers: headers,
    };
    if (data) {
      configs['body'] = JSON.stringify(data);
    }
    console.log('url', url);
    fetch(url, configs)
      .then((res) => {
        res
          .json()
          .then((data) => {
            console.log('custom data', data);
            if (data.status == 'error') {
              error(data);
            } else if (
              data.message == 'Invalid resource ID.' &&
              data?.data?.status == 404
            ) {
              EventRegister.emit('logout');
              error('Admin revoked your account');
            } else {
              success(data);
            }
          })
          .catch((e) => {
            error(e);
          });
      })
      .catch((e) => {
        console.log('custom data err', e);
        if (e?.message == 'Network request failed')
          return error('No internet connection');
        else {
          return error(e);
        }
      });
  },
  get: (endpoint, success, error) => {
    let url = customURL + endpoint;

    fetch(url, {
      method: 'GET',
    })
      .then((d) => {
        d.json()
          .then((data) => {
            console.log('custom data', data);
            if (data.status == 'error') {
              error(data);
            } else if (
              data.message == 'Invalid resource ID.' &&
              data?.data?.status == 404
            ) {
              EventRegister.emit('logout');
              error('Admin revoked your account');
            } else {
              success(data);
            }
          })
          .catch((e) => {
            error('something went wrong');
          });
      })
      .catch((e) => {
        if (e?.message == 'Network request failed')
          return error('No internet connection');
        else {
          return error(e);
        }
      });
  },
};

export default customApi;
