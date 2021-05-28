import config from '../config';
import {EventRegister} from 'react-native-event-listeners';

export const checkConfig = () => {
  if (
    config.url === '' ||
    config.consumerKey === '' ||
    config.consumerSecret === '' ||
    config.consumerKey === undefined ||
    config.consumerSecret === undefined
  ) {
    return false;
  } else {
    return true;
  }
};
let WC = null;
export default {
  post: (endpoint, data, success, error) => {
    // //console.log('post ', data)
    if (checkConfig()) {
      let url =
        config.url +
        endpoint +
        '?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret;
      let body = JSON.stringify(data);
      let header = {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + config.key,
      };
      let requestConfig = {
        method: 'POST',
        headers: new Headers(header),
        body: body,
      };

      fetch(url, requestConfig)
        .then((d) => {
          d.json().then((data) => {
            if (data.status === 'error' || data.status === 401) {
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
          });
        })
        .catch((e) => {
          console.log('post error', e);
          if (e?.message == 'Network request failed')
            return error('No internet connection');
          else {
            return error(e);
          }
        });
    } else {
      return;
    }
  },

  paymentApi: (endpoint, data, success, error, encoded = false) => {
    // //console.log('post ', data)
    if (checkConfig()) {
      let url = endpoint;

      let body = JSON.stringify(data);
      let header = {
        'Content-Type': encoded
          ? 'application/x-www-form-urlencoded;charset=UTF-8'
          : 'application/json',
        Authorization: !encoded
          ? ''
          : 'Bearer  ' + 'sk_test_4z8tSkEJJDNb1YygiS7rdOgg00GC48arNi',
      };
      var formBody = [];
      if (encoded) {
        for (var property in data) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(data[property]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
      }

      let requestConfig = {
        method: 'POST',
        headers: new Headers(header),
        body: !encoded ? body : formBody,
      };

      fetch(url, requestConfig)
        .then((d) => {
          d.json().then((data) => {
            if (data.status === 'error' || data.status === 401) {
              error('data error :', data);
            } else if (
              data.message == 'Invalid resource ID.' &&
              data?.data?.status == 404
            ) {
              EventRegister.emit('logout');
              error('Admin revoked your account');
            } else {
              success(data);
            }
          });
        })
        .catch((e) => {
          console.log('post error', e);
          if (e?.message == 'Network request failed')
            return error('No internet connection');
          else {
            return error(e);
          }
        });
    } else {
      return;
    }
  },

  get: (endpoint, params, success, error) => {
    if (checkConfig()) {
      let parameter = '';
      Object.entries(params).forEach(([key, value]) => {
        let val = '&' + key + '=' + value;
        let prev = parameter;
        parameter = prev + val;
      });
      let url =
        config.url +
        endpoint +
        '?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret +
        parameter;

      let header = {
        Authorization: 'Basic ' + config.key,
      };
      console.log('get url', url);
      fetch(url, {
        method: 'GET',
        headers: new Headers(header),
      })
        .then((d) => {
          d.json()
            .then((data) => {
              if (data.status === 'error') {
                error('Error while hit :', data);
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
              console.log('get error', e);
              error(e);
            });
        })
        .catch((e) => {
          console.log('get error', e);
          if (e?.message == 'Network request failed')
            return error('No internet connection');
          else {
            return error(e);
          }
        });
    } else {
      return;
    }
  },
  auth: (credentials, success, error) => {
    if (checkConfig()) {
      if (credentials) {
        if (!credentials.email) {
          return;
        }
        if (!credentials.password) {
          return;
        }
        let url =
          config.loginUrl +
          'api/auth/generate_auth_cookie/?insecure=cool&username=' +
          credentials.email +
          '&password=' +
          credentials.password;

        fetch(url)
          .then((data) => {
            console.log('auth api', url, data);
            data
              .json()
              .then((d) => {
                success(d);
              })
              .catch((e) => {
                return error(e);
              });
          })
          .catch((e) => {
            console.log('post error', e);
            if (e?.message == 'Network request failed')
              return error('No internet connection');
            else {
              return error(e);
            }
          });
      } else {
        return;
      }
    }
  },
  customApi: (endpoint, data, success, error) => {
    if (checkConfig()) {
      if (data) {
        let url = config.url + endpoint;
        let h = {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        };
        let headers = new Headers(h);
        fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        }).then((res) => {
          res
            .json()
            .then((d) => {
              if (d.status === 1) {
                success(d);
              } else {
                error(d);
              }
            })
            .catch((e) => {
              error(e);
            });
        });
      } else {
        return;
      }
    }
  },
  customGet: (endpoint, success, error) => {
    if (checkConfig()) {
      let url = config.url + endpoint;
      fetch(url).then((res) => {
        res
          .json()
          .then((d) => {
            success(d);
          })
          .catch((e) => {
            error(e);
          });
      });
    }
  },
};
