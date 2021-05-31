import api from '../Api';
import axios from 'axios';
// import config from './../config/index';
import customApi from './../CustomApi/index';
import Toast from 'react-native-toast';
import { store } from '../store';
const state = store.getState()
const config = state.ConfigReducer
const { baseUrl } = config;

const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USnumber1 = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
const USnumber2 = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

export const WooCommerceWrapper = {
  //********* loading *****************//

  StartLoad: () => {
    return { type: 'START_LOAD' };
  },

  CloseLoad: () => {
    return { type: 'CLOSE_LOAD' };
  },

  emptySingleProduct: () => {
    return {
      type: 'EMPTY_SIGNLE_PROD',
    };
  },

  checkOutAddress: (data) => {
    return { type: 'CHECKOUT_ADDRESS', payload: data };
  },

  clear_checkOutAddress: () => {
    return { type: 'CLEAR_CHECKOUT_ADDRESS' };
  },

  discount: (data) => {
    return { type: 'DISCOUNT', payload: data };
  },

  clear_discount: () => {
    return { type: 'CLEAR_DISCOUNT' };
  },

  // ************* RequestCode ***************
  requestcode: (data, success, error) => {
    return (dispatch) => {
      if (!data.email) {
        // return {
        //   type: "ALERTS",
        //   payload: 'Please enter you email to reset password'
        // }
        error('Please enter you email to reset password');
        return { type: 'default' };
      }

      if (data.email === '') {
        // return {
        //   type: "ALERTS",
        //   payload: 'Please enter you email to reset password'
        // }
        error('Please enter you email to reset password');
        return { type: 'default' };
      }

      if (!email.test(data.email)) {
        // return {
        //   type: "ALERTS",
        //   payload: 'Invalid email provided'
        // }
        error('Invalid email provided');
        return { type: 'default' };
      }

      dispatch({ type: 'START_LOAD' });
      customApi.post(
        `forgotpassword?email=${data.email}`,
        null,
        (d) => {
          if (d?.code == 'error') error(d.message);
          else success(d);

          dispatch({ type: 'CLOSE_LOAD' });
        },
        (err) => {
          console.log('forgot', err);
          error(err);
          dispatch({ type: 'CLOSE_LOAD' });
        },
      );
    };
  }, // ************* VerifyCode ***************
  verifycode: (data, success, error) => {
    if (!data.code) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please enter your code'
      // }
      error('Please enter your code');
      return { type: 'default' };
    }
    if (data.code === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please enter your code'
      // }

      error('Please enter your code');
      return { type: 'default' };
    }
    if (data.code.length != 8) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please enter 4 digit password reset code'
      // }

      error('Please enter 8 digit password reset code');
      return { type: 'default' };
    }

    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });

      customApi.post(
        'code_verify',
        data,
        (d) => {
          if (d?.code == 'error') error(d.message);
          else success(d);
          dispatch({ type: 'CLOSE_LOAD' });
          return { type: 'default' };
        },
        (err) => {
          dispatch({ type: 'CLOSE_LOAD' });
          error(err);
          return { type: 'default' };
        },
      );
    };
  }, // ************* ResetPassword ***************
  resetpassword: (data, success, error) => {
    if (!data.password) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please enter your new password to update'
      // }
      error('Please enter your new password to update');
      return { type: 'default' };
    }

    if (data.password === '') {
      error('Please enter your new password to update');
      return { type: 'default' };
    }

    if (data.password.length < 8) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Password must be at least 8 characters long'
      // }
      error('Password must be at least 8 characters long');
      return { type: 'default' };
    }

    if (!data.confirm) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please confirm your new password to update'
      // }
      error('Please confirm your new password to update');
      return { type: 'default' };
    }

    if (data.confirm === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Please enter your new password to update'
      // }

      error('Please confirm your new password to update');
      return { type: 'default' };
    }

    if (data.confirm.length < 8) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Password must be at least 8 characters long'
      // }
      error('Confirm password must be at least 8 characters long');
      return { type: 'default' };
    }

    if (data.password != data.confirm) {
      // return {
      //   type: "ALERTS",
      //   payload: 'your password and confirm password didnt match'
      // }
      error('Your password and confirm password does not match');
      return { type: 'default' };
    }

    if (!data.code) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Verification code is required'
      // }
      error('Verification code is required');
      return { type: 'default' };
    }

    if (data.code === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Verification code is required'
      // }
      error('Verification code is required');
      return { type: 'default' };
    }

    if (data.code.length != 8) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Verification code must be 4 characters long'
      // }
      error('Verification code must be 8 characters long');
      return { type: 'default' };
    }

    data = {
      code: data.code,
      password: data.password,
    };

    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });

      customApi.post(
        'change_password',
        data,
        (d) => {
          // console.log(d)
          if (d?.code == 'error') error(d.message);
          else success(d);
          dispatch({ type: 'CLOSE_LOAD' });
          return { type: 'default' };
        },
        (err) => {
          dispatch({ type: 'CLOSE_LOAD' });

          error(err);
          return { type: 'default' };
        },
      );
    };
  }, // ************* Login ***************
  login: (data, success, error) => {
    return (dispatch) => {
      if (data.email === '') {
        return error('Email is required');
      }

      if (!email.test(data.email)) {
        return error('Enter valid email address');
      }

      if (data.password === '') {
        return error('Password is required');
      }

      if (!data.password) {
        return error('Password is required');
      }

      if (data.password.length < 8) {
        return error('Password must be at least 8 characters long');
      }

      dispatch({ type: 'START_LOAD' });
      api.auth(
        data,
        (loginsuccess) => {
          console.log('loginsuccess', loginsuccess);
          if (loginsuccess.status == 'error') {
            error('Invalid credentials entered');
            // dispatch({ type: "ALERTS", payload: loginsuccess.error });
            dispatch({ type: 'CLOSE_LOAD' });
          } else {
            // success(true)
            dispatch({ type: 'LOGIN', loginsuccess });
            dispatch({ type: 'CLOSE_LOAD' });
            success(true);
          }
        },
        (error) => {
          console.log('loginerror', error);
          dispatch({ type: 'CLOSE_LOAD' });
        },
      );
    };
  },
  // ************* SignUp ***************
  signup: (data, success, error) => {
    return (dispatch) => {
      if (!data.first_name) {
        return error('First name is required');
      }
      if (data.first_name === '') {
        return error('First name is required');
      }

      if (!data.last_name) {
        return error('Last name is required');
      }
      if (data.last_name === '') {
        return error('Last name is required');
      }

      if (!data.username) {
        return error('Username is required');
      }
      if (data.username === '') {
        return error('Username is required');
      }

      if (!data.phoneNo) {
        return error('Phone no is required');
      }
      if (data.phoneNo === '') {
        return error('Phone no is required');
      }
      if (data.phoneNo.length < 12 || data.phoneNo.length > 12) {
        return error('Phone no is not valid');
      }

 

      if (!data.email) {
        return error('Email is required');
      }
      if (data.email === '') {
        // return {
        //   type: "ALERTS",
        //   payload: 'Email is required'
        // }
        return error('Email is required');
      }
      if (!email.test(data.email)) {
        return error('Enter valid email address');
      }
      if (!data.password) {
        return error('Password is required');
      }
      if (data.password === '') {
        return error('Password is required');
      }
      if (data.password.length < 8) {
        return error('Password must be at least 8 characters long');
      }
      if (!data.confirm) {
        return error('Please confirm your password');
      }
      if (data.confirm === '') {
        return error('Please confirm your password');
      }

      if (data.confirm.length < 8) {
        return error('Confirm password must be at least 8 characters long');
      }

      if (data.password != data.confirm) {
        return error('Passwords do not match');
      }

      data = {
        ...data,
        billing: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phoneNo,
        },
        shipping: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      };

      dispatch({ type: 'START_LOAD' });
      api.post(
        'customers',
        data,
        (signupsuccess) => {

          // check for error and send it
          if ('data' in signupsuccess) {
            if (signupsuccess.data.status == 400) {
              console.log('signupsuccess.message', signupsuccess.message);
              dispatch({ type: 'CLOSE_LOAD' });
              error(signupsuccess.message);
            }
          }
          // else after singup login the user automatically
          else {

            dispatch({ type: 'CLOSE_LOAD' });
            success('Sign up Successfully');

            // var credentials = {
            //   email: data.email,
            //   password: data.password

            // }

            // api.auth(credentials, loginsuccess => {

            //   if (loginsuccess.status == "error") {

            //     dispatch({ type: 'default' });
            //     error(loginsuccess)
            //   }

            //   else {

            //     success('Logged in successfully')
            //     dispatch({ type: "LOGIN", loginsuccess });
            //   }
            // }, err => {
            //   error(err)
            // })
          }
        },
        (err) => {
          console.log('Signup err', err);

          dispatch({ type: 'CLOSE_LOAD' });
          error(err);
        },
      );
    };
  }, // ************* UpdatePassword ***************

  updatepassword: (data, id, success, error) => {
    if (!data.password) {
      error('Please enter your new password to update');
      return { type: 'default' };
    }
    if (!data.confirm) {
      error('Please confirm your new password to update');
      return { type: 'default' };
    }

    if (data.password === '') {
      error('Please enter your new password to update');
      return { type: 'default' };
    }
    if (data.confirm === '') {
      error('Please confirm your new password to update');
      return { type: 'default' };
    }

    if (data.password.length < 8) {
      error('Password must be at least 8 characters long');
      return { type: 'default' };
    }

    if (data.confirm.length < 8) {
      error('Confirm password must be at least 8 characters long');
      return { type: 'default' };
    }

    if (data.password != data.confirm) {
      error("Your password and confirm password doesn't match");
      return { type: 'default' };
    }
    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });

      api.post(
        'customers/' + id,
        data,
        (PassSuccess) => {
          dispatch({ type: 'CLOSE_LOAD' });
          success(true);
        },
        (err) => { },
      );
    };
  },
  // ************* ProductCategory ***************
  productcategory: (completed, failed) => {
    return (dispatch) => {
      api.get(
        'products/categories',
        { per_page: 100 },
        (success) => {
          dispatch({
            type: 'PRODUCT_CATEGORY',
            success,
          });
          console.log('categories', success);
          return completed(success);
        },
        (error) => {
          console.log(error);
          return failed(error);
        },
      );
    };
  }, // ************* UserInfo ***************

  homeproductcategory: (completed, failed) => {
    // alert('ok')
    return (dispatch) => {
      api.get(
        'products/categories',
        { per_page: 100, include: [97, 31, 247, 17] },
        (success) => {
          console.log('home categories', success);
          dispatch({
            type: 'HOME_PRODUCT_CATEGORY',
            success,
          });

          return completed(success);
        },
        (error) => {
          console.log('home categories error', error);
          return failed(error);
        },
      );
    };
  }, // ************* UserInfo ***************

  userinfo: (userId, success, error) => {
    return (dispatch) => {
      api.get(
        'customers/' + userId,
        {},
        (userData) => {
          // console.log('userData ::::', userData);

          dispatch({ type: 'USER_GET', userData });
          return success(userData);
        },
        (error) => {
          // console.log('INNNNNNNNNN 2 ',error)
          return error(true);
        },
      );
    };
  }, // ************* UpdateUser ***************
  updateuser: (details, success, error) => {
    if (!details.first_name) {
      // return { type: "ALERTS", payload: 'Billing First name is required' }
      error('First name is required');
      return { type: 'default' };
    }
    // if (details.last_name.trim() === '') {
    //   // return { type: "ALERTS", payload: 'Billing Last name is required' }
    //   error('Last name is required')
    //   return { type: "default" }
    // }
    if (!details.last_name) {
      // return { type: "ALERTS", payload: 'Billing Last name is required' }
      error('Last name is required');
      return { type: 'default' };
    }

    // if (!details.billing) {
    //   error('Please fillout your billing details')
    //   return { type: "default" }
    // }
    // if (details.billing.first_name.trim() === '') {
    //   error('Billing first name is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.first_name) {
    //   error('Billing first name is required')
    //   return { type: "default" }
    // }
    // if (details.billing.last_name.trim() === '') {
    //   error('Billing last name is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.last_name) {
    //   error('Billing last name is required')
    //   return { type: "default" }
    // }

    // if (details.billing.address_1.trim() === '') {
    //   error('Billing address is required')
    //   return { type: "default" }
    // }

    // if (!details.billing.address_1) {
    //   error('Billing address is required')
    //   return { type: "default" }
    // }

    // if (details.billing.state.trim() === '') {
    //   error('Billing state is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.state) {
    //   error('Billing state is required')
    //   return { type: "default" }
    // }

    // if (details.billing.country.trim() === '') {
    //   error('Billing country is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.country) {
    //   error('Billing country is required')
    //   return { type: "default" }
    // }

    // if (details.billing.city.trim() === '') {
    //   error('Billing city is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.city) {
    //   error('Billing city is required')
    //   return { type: "default" }
    // }

    // if (details.billing.phone.trim() === '') {
    //   error('Billing phone is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.phone) {
    //   error('Billing phone is required')
    //   return { type: "default" }
    // }

    // if (details.billing.phone.length != 15) {
    //   error('Please enter a valid UK phone number')
    //   return { type: "default" }
    // }

    // if (details.billing.postcode.trim() === '') {
    //   error('Billing zip code is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.postcode) {
    //   error('Billing zip code is required')
    //   return { type: "default" }
    // }

    // if (details.billing.email.trim() === '') {
    //   // }
    //   error('Billing email is required')
    //   return { type: "default" }
    // }
    // if (!details.billing.email) {
    //   error('Billing email is required')
    //   return { type: "default" }
    // }
    // if (!email.test(details.billing.email)) {
    //   error('Enter a valid email')
    //   return { type: "default" }
    // }

    // if (!details.shipping) {
    //   error('Please fillout your shipping details')
    //   return { type: "default" }
    // }
    // if (details.shipping.first_name.trim() === '') {
    //   error('Shipping first name is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.first_name) {
    //   error('Shipping first name is required')
    //   return { type: "default" }
    // }
    // if (details.shipping.last_name.trim() === '') {
    //   error('Billing last name is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.last_name) {
    //   error('Shipping last name is required')
    //   return { type: "default" }
    // }
    // if (details.shipping.address_1.trim() === '') {
    //   error('Shipping address is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.address_1) {
    //   error('Shipping address is required')
    //   return { type: "default" }
    // }

    // if (details.shipping.state.trim() === '') {
    //   error('Shipping state is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.state) {
    //   error('Shipping state is required')
    //   return { type: "default" }
    // }

    // if (details.shipping.country.trim() === '') {
    //   error('Shipping country is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.country) {
    //   error('Shipping country is required')
    //   return { type: "default" }
    // }

    // if (details.shipping.city.trim() === '') {
    //   error('Shipping city is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.city) {
    //   error('Shipping city is required')
    //   return { type: "default" }
    // }

    // if (details.shipping.postcode.trim() === '') {
    //   error('Shipping zip code is required')
    //   return { type: "default" }
    // }
    // if (!details.shipping.postcode) {
    //   error('Shipping zip code is required')
    //   return { type: "default" }
    // }

    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });

      api.post(
        'customers/' + details.id,
        details,
        (userData) => {
          dispatch({ type: 'USER_GET', userData });
          success('Profile information has been updated');
        },
        (err) => {
          error('Something went wrong');
          return { type: 'default' };
        },
      );
    };

    // old
    // return dispatch => {
    //   dispatch({ type: 'START_LOAD' })
    //   dispatch(WooCommerceWrapper.checkLogin(details.id, (loginSuccess) => {
    //     if (loginSuccess == true) {
    //       api.post('customers/' + details.id, details, userData => {

    //         dispatch({ type: "USER_GET", userData });
    //         success('Profile information has been updated')
    //       }, err => {
    //         error('Something went wrong');
    //         return { type: "default" }
    //       })
    //     }
    //   }, (err) => {
    //     // console.log('in here 2',err)
    //     // error(error);
    //     return { type: "default" }
    //     // dispatch({ type: "ALERTS", payload: error });
    //   }))
    // }
  },

  // ************* GetOrders ***************
  getorders: (complete, id, page) => {

    return (dispatch) => {
      // dispatch({type: 'START_LOAD'});
      api.get(
        'orders',
        { customer: id, page: page },
        (success) => {

          console.log('all orders::',success );
          dispatch({ type: 'ALL_ORDERS', payload: { success, page } });
          return complete(true);
        },
        (error) => {
          console.log('all orders error',error)
        },
      );
    };
  }, // ************* SingleOrder ***************
  singleorder: (id, success, error) => {
    return (dispatch) => {
      // dispatch({type: 'START_LOAD'});
      api.get(
        `orders/${id}`,
        {},
        (Ordersuccess) => {
          if ('data' in Ordersuccess) {
            if (Ordersuccess.data.status == 404) {
              error(Ordersuccess.message);
              // dispatch({type: 'CLOSE_LOAD'});
              // dispatch({ type: "ALERTS", payload: Ordersuccess.message })
            }
          } else {
            success(Ordersuccess);
            dispatch({
              type: 'SINGLE_ORDER',
              Ordersuccess,
            });
          }
        },
        (Ordererror) => {
          error(Ordererror);
          // dispatch({type: 'CLOSE_LOAD'});
          // console.log('in error', Ordererror)
        },
      );
    };
  },
  // ************* CheckLogin ***************
  checkLogin: (id, success, error) => {
    return (dispatch) => {
      if (id == null) {
        error('Please Login!');
      } else {
        success(true);
      }
    };
  },
  categoryProducts: (id, page, completed, failed) => {
    // console.log('product id', id);
    return (dispatch) => {
      // dispatch({type: 'LOADING'})
      api.get(
        'products',
        (id == undefined) | (id == null)
          ? { page: page }
          : { category: id, page: page },
        (success) => {
          // console.log('in product',id, success);
          // dispatch({
          //   type: "CAT_PRODUCT",
          //   success
          // })
          return completed(success);
        },
        (error) => {
          return failed(error);
          // console.log('in error', error)
        },
      );
    };
  }, // ************* AllProduct or CategorySpecificProducts ***************
  allproduct: (id, page, params, responseSuccess, responseError) => {
 
    return (dispatch) => {
      api.get(
        'products',
        (id == undefined) | (id == null)
          ? { page: page, ...params }
          : { category: id, page: page, ...params },
        (success) => {

          console.log('all success :',success );
          if (params) {
            if (success.length <= 0) {
              Toast.show('No products found for this filter');
            } else {
              return responseSuccess(success);

              // dispatch({
              //   type: "ALL_PRODUCT",
              //   payload: { success, page }
              // })
            }
          } else {
            return responseSuccess(success);

            // dispatch({
            //   type: "ALL_PRODUCT",
            //   payload: { success, page }
            // })
          }
          return responseSuccess(success);
        },
        (error) => {

          console.log('all error :',error );
          return responseError(error);
        },
      );
    };
  },
  EmptySearchList: () => {
    return (dispatch) => {
      dispatch({ type: 'EMPTY_SEARCHLIST' });
    };
  },
  // ************* SingleProduct ***************
  singleproduct: (productId, completed, failed) => {
    return (dispatch) => {
      api.get(
        `products/${productId}`,
        {},
        (success) => {
          console.log('singl product', success);
          dispatch({ type: 'SINGLE_PRODUCT', success });
          dispatch(WooCommerceWrapper.relatedproduct(success.related_ids));
          return completed(success);
        },
        (error) => {
          console.log('singl product error', error);
          return failed(error);
        },
      );
    };
  }, // ************* RealtedProduct ***************
  relatedproduct: (productidarray) => {
    return (dispatch) => {
      api.get(
        `products`,
        { include: productidarray },
        (success) => {
          // console.log('in related product', success);
          dispatch({
            type: 'RELATED_PRODUCT',
            success,
          });
        },
        (error) => {
          // console.log('in related error', error)
        },
      );
    };
  },
  // ************* AddToCart ***************
  addtocart: (cartData, success, error, details) => {
    return (dispatch, getState) => {
      const { Reducer } = getState();
      const repeatedCart = Reducer.cart.find((item) => {
        return item.product_id === cartData.product_id;
      });

      if (repeatedCart === undefined) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: { item: cartData, details: details },
        });
        return success(true);
      } else {
        return error(true);
      }

      // return success(true)

      // return dispatch => {
      //   dispatch({
      //     type: "ADD_TO_CART",
      //     payload: cartData
      //   });

      //   //to dispatch another action with in thunk
      //   dispatch(WooCommerceWrapper.cartproduct())
      // }
    };
  }, // ************* DeleteFromCart ***************
  removefromcart: (productId) => {
    return (dispatch) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: productId,
      });
      //to dispatch another action with in thunk
      // dispatch(WooCommerceWrapper.cartproduct())
    };
  }, // ************* IncrementProduct ***************
  incrementproduct: (productId, price) => {
    return (dispatch) => {
      dispatch({
        type: 'INCREMENT_PRODUCT',
        payload: { productId: productId, price: price },
      });
      //to dispatch another action with in thunk
      // dispatch(WooCommerceWrapper.cartproduct())
    };
  }, // ************* DecrementProduct ***************
  decrementproduct: (productId, price) => {
    // console.log('*** ', productId, price)

    return (dispatch) => {
      dispatch({
        type: 'DECREMENT_PRODUCT',
        payload: { productId: productId, price: price },
      });

      //to dispatch another action with in thunk
      // dispatch(WooCommerceWrapper.cartproduct('incDEC'))
    };
  }, // ************* CartProduct ***************
  cartproduct: (cartList, completed, failed) => {
    return (dispatch) => {
      // if(cartList.length <=0 )
      //   return "No items in the cart"

      // dispatch({ type: 'START_LOAD' })

      let productIDs = [];

      cartList.map((val) => productIDs.push(val.product_id));

      api.get(
        'products',
        { include: productIDs.toString() },
        (success) => {
          dispatch({
            type: 'CART_PRODUCT',
            success,
          });
          // console.log('in error', success)
          // return completed(success)
          return completed(true);
        },
        (error) => {
          //  console.log('in error', error)
          return failed(error);
        },
      );
    };
  },

  // ************* GetWishlist ***************
  getwishlist: () => {
    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });
      api.get(
        'products',
        {},
        (success) => {
          //  console.log('in WISHLIST', success);
          dispatch({
            type: 'GET_WISHLIST',
            success,
          });
        },
        (error) => {
          // console.log('in error', error)
        },
      );
    };
  }, // ************* PaymentMethod ***************
  paymentmethod: (success, error) => {
    return (dispatch) => {
      api.get(
        'payment_gateways',
        {},
        (Paymentsuccess) => {
          if (Paymentsuccess.length > 0) {
            let methods = Paymentsuccess.map((_method) => {
              return {
                enabled: _method.enabled,
                label: _method.title,
                value: _method.id,
              };
            });

            methods = methods.filter((_x) => _x.enabled == true);

            dispatch({
              type: 'PAYMENT_METHOD',
              Paymentsuccess: methods,
            });
          }

          success(true);
        },
        (Paymenterror) => {
          // console.log('in error', Paymenterror)
          error(false);
          return { type: 'default' };
        },
      );
    };
  }, // ************* GetCurrency ***************
  getcurrency: () => {
    return (dispatch) => {
      api.get(
        'data/currencies/current',
        {},
        (success) => {
          // console.log('in currency', success);
          dispatch({
            type: 'CURRENCY',
            success,
          });
        },
        (error) => {
          // console.log('in error', error)
        },
      );
    };
  },
  // ************* ManageCart ***************
  managecart: (view, data, success, error) => {
    if (data.payment_method == "stripe_cc") {
      data.set_paid = true
    } else {
      data.set_paid = false
    }

    console.log('order Data::', data);
    if (view == 'CONFIRM_VIEW') {
      return (dispatch) => {
        dispatch({ type: 'START_LOAD' });
        api.post(
          'orders',
          data,
          (ordersuccess) => {
            success(ordersuccess);
            dispatch({
              type: 'MANAGE_CART',
              view,
            });
            dispatch({ type: 'CLOSE_LOAD' });
          },
          (err) => {
            error('Something Went Wrong');
            dispatch({ type: 'CLOSE_LOAD' });
            // console.log(err)
          },
        );
      };
    } else {
      // console.log('view and data :::',view, data);
      success(true);
      return {
        type: 'MANAGE_CART',
        view,
        data,
      };
    }
  },
  stripePayment: (data, pass, fail) => {
    //  alert('yes defines')

    return (dispatch) => {
      // console.log('stripePayment', amount, token);
      // dispatch({type: 'START_LOAD'});
      api.paymentApi(
        `http://dev25.onlinetestingserver.com/stripeapi/pinkpoppy_stripepayment.php`,
        data,
        (success) => {
          console.log('in stripePayment', success);
          pass();
          // dispatch({
          //   // type: 'CURRENCY',
          //   // success,
          // });
        },
        (error) => {
          dispatch({ type: 'CLOSE_LOAD' });
          console.log('in stripePayment error', error);
          fail();
        },
        false,
      );
    };
  }, // **
  managePayment: (data, pass, fail) => {
    //  alert('yes defines')

    return (dispatch) => {
      let amount = data.amount;
      delete data.amount;
      dispatch({ type: 'START_LOAD' });
      api.paymentApi(
        `https://api.stripe.com/v1/tokens`,
        data,
        (success) => {
          console.log('in refunds', success);
          if (success.hasOwnProperty('error')) {
            Toast.show(success.error.message + '');
            dispatch({ type: 'CLOSE_LOAD' });
            fail();
          } else {
            if (success.id) {
              dispatch(
                WooCommerceWrapper.stripePayment(
                  { amount: amount, token: success.id },
                  (s) => {
                    dispatch({ type: 'CLOSE_LOAD' });
                    pass();
                  },
                  (e) => {
                    dispatch({ type: 'CLOSE_LOAD' });
                    fail();
                  },
                ),
              );
            }
          }

          // dispatch({
          //   // type: 'CURRENCY',
          //   // success,
          // });
        },
        (error) => {
          fail();
          dispatch({ type: 'CLOSE_LOAD' });
          console.log('in refunds error', error);
        },
        true,
      );
    };
  }, // ************* AllCoupons ***************

  // managePayment: (data, success, fail) => {
  //   console.log('managePayment Data', data);
  //   return async (dispatch) => {
  //     dispatch({type: 'START_LOAD'});
  //     let response = await axios.post(
  //       'https://api.stripe.com/v1/tokens',
  //       data,
  //     );
  //     if (response) {
  //       console.log('custom payment6 Api response',response )
  //       if (response.data.code === 'ERROR') return fail(response.data.error);

  //       return success(response.data.status);
  //     }
  //   };
  // },

  // managePayment: (data, success, fail) => {
  //   return async (dispatch) => {
  //     dispatch({type: 'START_LOAD'});
  //     let response = await axios.post(
  //       'http://dev25.onlinetestingserver.com/stripeapi/stripe.php',
  //       data,
  //     );

  //     if (response) {
  //       // console.log(response)
  //       if (response.data.code === 'ERROR') return fail(response.data.error);

  //       return success(response.data.status);
  //     }
  //   };
  // },

  // ************* AddWishlist ***************
  addtowishlist: (productId, success) => {
    return (dispatch, getState) => {
      const { Reducer } = getState();
      const ifExist = Reducer.wishlist.find((item) => item == productId);

      if (ifExist === undefined) {
        dispatch({
          type: 'ADD_TO_WISHLIST',
          payload: productId,
        });
        return success('Added to wishlist');
      }
    };
  }, // ************* RemoveWishlist ***************
  removefromwishlist: (productId, success) => {
    return (dispatch, getState) => {
      const { Reducer } = getState();
      const ifExist = Reducer.wishlist.find((item) => item == productId);

      if (ifExist !== undefined) {
        dispatch({
          type: 'REMOVE_FROM_WISHLIST',
          payload: productId,
        });
        return success('removed from the Wishlist');
      }
    };
  }, // ************* Logout ***************
  logout: () => {
    return {
      type: 'LOG_OUT',
    };
  }, // ************* EmptyState ***************
  emptystate: () => {
    return {
      type: 'EMPTY_STATE',
    };
  },
  emptyProducts: () => {
    return {
      type: 'EMPTY_PRODUCTS',
    };
  },
  // ************* ValidateOrder ***************
  validateorder: (details, success, error) => {
    // console.log(details)
    if (!details.profile) {
      error('Please fillout your profile details');
      return {
        type: 'default',
      };
    }

    if (details.profile.first_name.trim() === '') {
      error('Profile first name is required');
      return { type: 'default' };
    }
    if (!details.profile.first_name) {
      error('Profile first name is required');
      return { type: 'default' };
    }

    if (details.profile.last_name.trim() === '') {
      error('Profile last name is required');
      return { type: 'default' };
    }
    if (!details.profile.last_name) {
      error('Profile last name is required');
      return { type: 'default' };
    }

    if (!details.billing) {
      error('Please fillout your billing details');
      return {
        type: 'default',
      };
    }

    if (details.billing.first_name.trim() === '') {
      error('Billing first name is required');
      return { type: 'default' };
    }
    if (!details.billing.first_name) {
      error('Billing first name is required');
      return { type: 'default' };
    }
    if (details.billing.last_name.trim() === '') {
      error('Billing last name is required');
      return { type: 'default' };
    }
    if (!details.billing.last_name) {
      error('Billing last name is required');
      return { type: 'default' };
    }

    if (details.billing.address_1.trim() === '') {
      error('Billing address is required');
      return { type: 'default' };
    }
    if (!details.billing.address_1) {
      error('Billing address is required');
      return { type: 'default' };
    }

    if (details.billing.state.trim() === '') {
      error('Billing state is required');
      return { type: 'default' };
    }
    if (!details.billing.state) {
      error('Billing state is required');
      return { type: 'default' };
    }
    if (details.billing.country.trim() === '') {
      error('Billing country is required');
      return { type: 'default' };
    }
    if (!details.billing.country) {
      error('Billing country is required');
      return { type: 'default' };
    }
    if (details.billing.city.trim() === '') {
      error('Billing city is required');
      return { type: 'default' };
    }
    if (!details.billing.city) {
      error('Billing city is required');
      return { type: 'default' };
    }
    if (details.billing.phone.trim() === '') {
      error('Billing phone is required');
      return { type: 'default' };
    }
    if (!details.billing.phone) {
      error('Billing phone is required');
      return { type: 'default' };
    }
    if (details.billing.phone.length != 15) {
      // return { type: "ALERTS", payload: 'Billing phone must be of 10 digits' }
      error('Please enter a valid UK phone number');
      return { type: 'default' };
    }
    if (details.billing.postcode.trim() === '') {
      error('Billing zip code is required');
      return { type: 'default' };
    }
    if (!details.billing.postcode) {
      error('Billing zip code is required');
      return { type: 'default' };
    }
    if (details.billing.email.trim() === '') {
      error('Billing email is required');
      return {
        type: 'default',
      };
    }
    if (!details.billing.email) {
      error('Billing email is required');
      return { type: 'default' };
    }
    if (!email.test(details.billing.email)) {
      error('Invalid billing email provided');
      return { type: 'default' };
    }

    if (details.sameBillingShipping === false) {
      if (!details.shipping) {
        error('Please fillout your shipping details');
        return { type: 'default' };
      }

      if (details.shipping.first_name.trim() === '') {
        error('Shipping first name is required');
        return { type: 'default' };
      }
      if (!details.shipping.first_name) {
        error('Shipping first name is required');
        return { type: 'default' };
      }

      if (details.shipping.last_name.trim() === '') {
        error('Shipping last name is required');
        return { type: 'default' };
      }

      if (!details.shipping.last_name) {
        error('Shipping last name is required');
        return { type: 'default' };
      }

      if (details.shipping.address_1.trim() === '') {
        error('Shipping address is required');
        return { type: 'default' };
      }

      if (!details.shipping.address_1) {
        error('Shipping address is required');
        return { type: 'default' };
      }

      // if (details.shipping.address_2 === '') {
      //   error('shipping Address 2 is required')
      //   return { type: "default" }
      // }

      // if (!details.shipping.address_2) {
      //   error('shipping Address 2 is required')
      //   return { type: "default" }
      // }
      if (details.shipping.state.trim() === '') {
        error('Shipping state is required');
        return { type: 'default' };
      }
      if (!details.shipping.state) {
        error('Shipping state is required');
        return { type: 'default' };
      }

      if (details.shipping.country.trim() === '') {
        error('Shipping country is required');
        return { type: 'default' };
      }

      if (!details.shipping.country) {
        error('Shipping country is required');
        return { type: 'default' };
      }

      if (details.shipping.city.trim() === '') {
        error('Shipping city is required');
        return { type: 'default' };
      }
      if (!details.shipping.city) {
        error('Shipping city is required');
        return { type: 'default' };
      }
      if (details.shipping.postcode.trim() === '') {
        error('Shipping zip code is required');
        return { type: 'default' };
      }
      if (!details.shipping.postcode) {
        error('Shipping zip code is required');
        return { type: 'default' };
      }
    }

    success(true);
    return { type: 'default' };
  }, // ************* CancelOrder ***************
  cancelorder: (id, success, error) => {
    var data = {
      status: 'cancelled',
    };
    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });

      api.post(
        'orders/' + id,
        data,
        (cancelsuccess) => {
          api.get(
            'orders',
            { customer: cancelsuccess.customer_id },
            (orderssuccess) => {
              success(true);
              dispatch({ type: 'CLOSE_LOAD' });
              dispatch({ type: 'ORDERS', orderssuccess });
            },
            (orderserror) => {
              dispatch({ type: 'CLOSE_LOAD' });
              error(false);
            },
          );
        },
        (cancelerror) => {
          dispatch({ type: 'CLOSE_LOAD' });
          error(false);
          // console.log(cancelerror)
        },
      );
    };
  }, // ************* Refunds ***************
  refunds: (id) => {
    var data = {
      amosunt: '510.00',
    };

    api.post(
      `orders/${id}/refunds`,
      data,
      (success) => {
        // console.log("in refunds", success);
      },
      (error) => {
        // console.log('in refunds error', error)
      },
    );
  }, // ************* AllCoupons ***************

  allcoupons: () => {
    // console.log('heyy')
    return (dispatch) => {
      api.get(
        'coupons',
        {},
        (success) => {
          // console.log('in coupons', success);
          dispatch({
            type: 'ALL_COUPONS',
            success,
          });
        },
        (error) => {
          // console.log('in error coupons', error)
        },
      );
    };
  },
  addcoupon: (couponData) => {
    return {
      type: 'ADD_COUPON',
      payload: couponData,
    };
  },

  // ************* SingleCoupon ***************
  singlecoupon: (id, success, error) => {
    return (dispatch) => {
      api.get(
        `coupons/${id}`,
        {},
        (Couponsuccess) => {
          // console.log('in coupons', success);

          if ('data' in Couponsuccess) {
            if (Couponsuccess.data.status == 404) {
              success(Couponsuccess.message);
              // dispatch({ type: "ALERTS", payload: Couponsuccess.message })
            }
          } else {
            dispatch({
              type: 'SINGLE_COUPON',
              Couponsuccess,
            });
          }
        },
        (Couponerror) => {
          error(Couponerror);
          // console.log('in error', Couponerror)
        },
      );
    };
  },

  varifycoupon: (couponCode, success, error) => {
    return (dispatch) => {
      api.get(
        'coupons/',
        { search: couponCode },
        (Couponsuccess) => {
          if (Couponsuccess.length > 0) {
            dispatch({
              type: 'ADD_COUPON',
              payload: Couponsuccess,
            });
          }

          return success(Couponsuccess);
        },
        (Couponerror) => {
          error(Couponerror);
          // console.log('in error', Couponerror)
        },
      );
    };
  },

  // ************* CreateRating ***************
  createrating: (data, success, error) => {

    if (data.reviewer_email === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'email is required'
      // }
      error('Email is required');
      return { type: 'default' };
    }

    if (!data.reviewer_email) {
      // return {
      //   type: "ALERTS",
      //   payload: 'email is required'
      // }
      error('Email is required');
      return { type: 'default' };
    }

    if (!email.test(data.reviewer_email)) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Invalid email provided'
      // }
      error('Invalid email provided');
      return { type: 'default' };
    }

    if (data.product_id === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Product id is required'
      // }
      error('Product id is required');
      return { type: 'default' };
    }

    if (!data.product_id) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Product id is required'
      // }
      error('Product id is required');
      return { type: 'default' };
    }

    if (data.review === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Review is required'
      // }
      error('Review is required');
      return { type: 'default' };
    }

    if (!data.review) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Review is required'
      // }
      error('Review is required');
      return { type: 'default' };
    }

    if (data.reviewer === '') {
      // return {
      //   type: "ALERTS",
      //   payload: 'Reviewer is required'
      // }
      error('Reviewer is required');
      return { type: 'default' };
    }

    if (!data.reviewer) {
      // return {
      //   type: "ALERTS",
      //   payload: 'Reviewer is required'
      // }
      error('Reviewer is required');
      return { type: 'default' };
    }

    if (data.rating == 0) {
      // return {
      //   type: "ALERTS",
      //   payload: 'rating is required'
      // }
      error('Rating is required');
      return { type: 'default' };
    }

    if (!data.rating) {
      // return {
      //   type: "ALERTS",
      //   payload: 'rating is required'
      // }
      error('Rating is required');
      return { type: 'default' };
    }

    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });
      console.log('ratingsss data', data);
      api.post(
        `products/reviews`,
        data,
        (ratingsuccess) => {
          console.log('ratingsss data success', ratingsuccess);
          if ('data' in ratingsuccess) {
            if (ratingsuccess.data.status == 409) {
              error(
                'Duplicate comment detected, it looks as though you have already said that!',
              );

              dispatch({ type: 'CLOSE_LOAD' });
              dispatch({ type: 'default' });
              // dispatch({ type: "ALERTS", payload: 'Duplicate comment detected, it looks as though you have already said that!' })
            }
          } else {
            console.log('ratingsss data success else', ratingsuccess);
            dispatch({ type: 'CLOSE_LOAD' });
            success('review added successfully');
            // dispatch({
            //   type: "ALERTS",
            //   payload: 'Review successful'
            // })
            dispatch({ type: 'default' });
          }
        },
        (error) => {
          console.log('ratingsss data error', error);
          // console.log('in error create', error)
        },
      );
    };
  }, // ************* SingleProductReviews ***************
  allproductrating: (id) => {
    return (dispatch) => {
      api.get(
        `products/reviews`,
        { product: id },
        (success) => { },
        (error) => {
          // console.log('in error', error)
        },
      );
    };
  },
  ////********  */
  wishlistAPI: (wishlistIDs, params, completed, failed) => {
    return async (dispatch) => {
      // dispatch({type: 'START_LOAD'});
      api.get(
        `products`,
        { include: wishlistIDs.toString(), ...params },
        (success) => {
          // dispatch({type: 'CLOSE_LOAD'});
          return completed(success);
        },
        (error) => {
          // dispatch({type: 'CLOSE_LOAD'});
          return failed(error);
        },
      );
      // dispatch({ type: "START_LOAD" })
      // let response = await axios.get(baseURL + '/products?consumer_key=' +
      //   config.consumerKey + '&consumer_secret=' + config.consumerSecret + '&include=' + (wishlistIDs).toString());
      // if (response)
      //   dispatch({ type: 'WISHLIST_API', payload: response.data })
    };
  },
  DataFromAPI: (completed, failed) => {
    return async (dispatch) => {
      customApi.get(
        'get_app_data',
        (success) => {
          completed(success);
          return { type: 'default' };
        },
        (error) => {
          failed(error);
          return { type: 'default' };
        },
      );
    };
  },
  FilterData: (categoryID, min_price, max_price, order) => {
    return async (dispatch) => {
      // console.log(categoryID)
      dispatch({ type: 'START_LOAD' });

      let search = '';
      if (categoryID !== '') search += '&category=' + categoryID;

      if (min_price !== '') search += '&min_price=' + min_price;

      if (max_price !== '') search += '&max_price=' + max_price;

      if (order !== '') search += '&order=' + order;

      let response = await axios.get(
        baseURL +
        '/products?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret +
        search,
      );

      if (response) {
        //  console.log('jjjjj',response)

        dispatch({ type: 'FILTER_DATA', payload: response.data });
      }
    };
  },
  EmptyFilter: () => {
    return dispatch({ type: 'EMPTY_FILTER' });
  },
  searchList: (productName, completed, failed) => {
    return async (dispatch) => {
      api.get(
        `products`,
        { search: productName },
        (success) => {
          return completed(success);
        },
        (error) => {
          return failed(error);
        },
      );
    };
  },
  getSubCategories: (parentID) => {
    return async (dispatch) => {
      dispatch({ type: 'START_LOAD' });
      dispatch({ type: 'EMPTY_PRODUCTS' });
      let response = await axios.get(
        baseURL +
        '/products/categories?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret +
        '&parent=' +
        parentID,
      );

      if (response) {
        // console.log(response)
        dispatch({
          type: 'SUB_CATEGORY',
          payload: { subcategories: response.data, id: parentID },
        });
      }
    };
  },
  EmptyAlerts: () => {
    return {
      type: 'EMPTY_ALERTS',
    };
  },
  GetZones: () => {
    return async (dispatch) => {
      let response = await axios.get(
        baseURL +
        '/shipping/zones?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret,
      );

      let zoneLocations = [];

      if (response) {
        response.data.map(async (val) => {
          let responseLocations = await axios.get(
            baseURL +
            '/shipping/zones/' +
            val.id +
            '/locations?consumer_key=' +
            config.consumerKey +
            '&consumer_secret=' +
            config.consumerSecret,
          );

          if (responseLocations) {
            // console.log(responseLocations)
            responseLocations.data.map((value) =>
              zoneLocations.push({ id: val.id, countryCode: value.code }),
            );
          }
        });

        // console.log(zoneLocations)
        dispatch({ type: 'GET_ZONES', payload: zoneLocations });
      }
    };
  },
  GetShippingMethods: (id) => {
    return async (dispatch) => {
      // let response = await axios.get(baseURL+'/shipping/zones/'+id+'/methods?consumer_key=' +
      // config.consumerKey + '&consumer_secret=' + config.consumerSecret);
      // console.log('resp',response)
      // if(response)
      //     dispatch({type: 'SHIPPING_METHODS', payload: response.data})
      // else
      //   console.log('error')
      axios
        .get(
          baseURL +
          '/shipping/zones/' +
          id +
          '/methods?consumer_key=' +
          config.consumerKey +
          '&consumer_secret=' +
          config.consumerSecret,
        )
        .then((response) => {
          dispatch({ type: 'SHIPPING_METHODS', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'SHIPPING_METHODS', payload: [] });
        });
    };
  },
  GetVariations: (id, success, error) => {
    return async (dispatch) => {
      // dispatch({ type: "START_LOAD" })

      let response = await axios.get(
        baseUrl +
        '/products/' +
        id +
        '/variations?consumer_key=' +
        config.consumerKey +
        '&consumer_secret=' +
        config.consumerSecret,
      );

      if (response) {
        dispatch({ type: 'GET_VARIATIONS', payload: response.data });
        success(true);
      } else {
        error(true);
      }
    };
  },
  EmptyVariations: () => {
    return (dispatch) => {
      dispatch({ type: 'EMPTY_VARIATIONS' });
    };
  },
  AddVariation: (variation) => {
    return (dispatch) => {
      dispatch({ type: 'ADD_VARIATION', payload: variation });
    };
  },
  EmptyCoupon: () => {
    return (dispatch) => {
      dispatch({ type: 'EMPTY_COUPON' });
    };
  },

  //Added by Danyal
  getcustomdata: (completed, failed) => {
    return (dispatch) => {
      // dispatch({type: 'START_LOAD'});
      customApi.get(
        'get_app_data',
        (success) => {
          console.log('custom data suces', success);
          if (success.code == 'error') {
            return failed(error?.message);
          } else {
            // dispatch({type: 'CLOSE_LOAD'});
console.log('in else');
            dispatch({
              type: 'CUSTOM_DATA',
              payload: success,
            });

            return completed(true);
          }
        },
        (error) => {
          console.log('custom data error', error);
          // dispatch({type: 'CLOSE_LOAD'});
          return failed(error?.message);
        },
      );
    };
  },
  // //Added by Danyal
  // getbanner: (completed, failed) => {
  //   return (dispatch) => {
  //     // dispatch({type: 'START_LOAD'});
  //     customApi.get(
  //       'get_app_data',
  //       (success) => {
  //         if (success.code == 'error') {
  //           // dispatch({type: 'CLOSE_LOAD'});
  //           return failed(error?.message);
  //         } else {
  //           // dispatch({type: 'CLOSE_LOAD'});
  //           return completed(success.banner);
  //         }
  //       },
  //       (error) => {
  //         // dispatch({type: 'CLOSE_LOAD'});
  //         return failed(error?.message);
  //       },
  //     );
  //   };
  // },

  submitContactForm: (data, completed, failed) => {
    if (!email.test(data.email)) {
      failed('Invalid email provided');
      return { type: 'default' };
    }

    return (dispatch) => {
      dispatch({ type: 'START_LOAD' });
      customApi.post(
        'contact_form',
        data,
        (success) => {
          if (success.code == 'error') {
            dispatch({ type: 'CLOSE_LOAD' });
            return failed(error?.message);
          } else {
            dispatch({ type: 'CLOSE_LOAD' });
            return completed(success);
          }
        },
        (error) => {
          dispatch({ type: 'CLOSE_LOAD' });
          return failed(error?.message);
        },
      );
    };
  },
  clearNavigationField: () => {
    return (dispatch) => {
      dispatch({ type: 'CLEAR_NAVIGATION_FIELD' });
    };
  },
  setNavigationField: (data) => {
    return (dispatch) => {
      dispatch({ type: 'SET_NAVIGATION_FIELD', payload: data });
    };
  },
  storeGetDataFields: (data) => {
    return (dispatch) => {
      dispatch({ type: 'STORE_GETDATA', payload: data });
    };
  },
};
