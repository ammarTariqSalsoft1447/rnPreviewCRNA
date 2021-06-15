import { LayoutAnimation } from 'react-native';

let initialState = {
  badge: 0,
  userId: null,
  currency: null,
  alerts: null,
  userInfo: null,
  singleproduct: null,
  singlecoupon: null,
  singleorder: null, //single order details
  cart: [],
  order: [],
  wishlist: [],
  cartDetail: {},
  cartProduct: [],
  allproduct: [],
  allcoupon: [],
  wishlistproduct: [],
  relatedproduct: [],
  paymentmethods: [],
  productcategory: [],
  homeproductcategory: [],
  loading: false,
  categoryProducts: [],
  cartTotal: 0.0,
  CategoryApis: [],
  productListAPIs: [],
  FeaturedCategAPIs: [],
  filterProducts: [],
  coupon: null,
  subcategories: [],
  zonelocations: [],
  shippingMethods: [],
  productVariation: [],
  addedVariation: [],
  searchList: [],
  checkOutAddress: {
    billingAddress: '',
    shippingAddress: '',
    check: false,
  },
  discount: 0.0,
  navigationField: '',
  nav_fieldData: {},
  application: '',
  customData: {
    aboutUs: null,
    homeBanners: [],
  },
  color: 'red'
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APPLICATION': {
      return { ...state, application: action.application };
    }

    case 'SET_NAVIGATION_FIELD': {
      return { ...state, navigationField: action.payload };
    }

    case 'CLEAR_APPLICATION': {
      return { ...state, application: '' };
    }

    case 'CLEAR_NAVIGATION_FIELD': {
      return { ...state, navigationField: action.payload };
    }

    case 'STORE_GETDATA': {
      return { ...state, nav_fieldData: action.payload };
    }

    case 'CHECKOUT_ADDRESS': {
      // console.log('reddd',action.payload);

      return {
        ...state,
        checkOutAddress: {
          billingAddress: action.payload.billingAddress,
          shippingAddress: action.payload.shippingAddress,
          check: action.payload.check,
        },
      };
    }

    case 'CLEAR_CHECKOUT_ADDRESS': {
      return {
        ...state,
        checkOutAddress: {
          billingAddress: '',
          shippingAddress: '',
          check: false,
        },
      };
    }

    case 'DISCOUNT': {
      // console.log("ddd", action.payload);
      return { ...state, discount: action.payload.discount };
    }

    case 'CLEAR_DISCOUNT': {
      return { ...state, discount: 0 };
    }

    case 'START_LOAD': {
      return { ...state, loading: true };
    }

    case 'CLOSE_LOAD': {
      return { ...state, loading: false };
    }
    case 'EMPTY_SEARCHLIST': {
      return { ...state, searchList: [] };
    }
    case 'EMPTY_COUPON': {
      // console.log('Discount :', state.discount);
      state.cartTotal = state.cartTotal + state.discount;
      return { ...state, coupon: null, discount: 0 };
    }

    case 'LOGIN': {
      return { ...state, userId: action.loginsuccess.user.id, loading: false };
    }

    case 'USER_GET': {
      return { ...state, userInfo: action.userData, loading: false };
    }

    case 'ORDERS': {
      return { ...state, order: action.orderssuccess };
    }

    case 'PRODUCT_CATEGORY': {
      return { ...state, productcategory: action.success, loading: false };
    }
    case 'HOME_PRODUCT_CATEGORY': {
      return { ...state, homeproductcategory: action.success, loading: false };
    }
    case 'CHANGE_COLOR': {
      return {
        ...state,
        color: action.color
      }
    }
    case 'SUB_CATEGORY': {
      if (action.payload.subcategories.length > 0)
        return {
          ...state,
          subcategories: action.payload.subcategories,
          loading: false,
          alerts: '',
        };

      let flag = false;
      state.productcategory.map((val, ind) => {
        if (val.id === action.payload.id) {
          if (val.parent !== 0) {
            flag = true;
          }
        }
      });

      if (flag) return { ...state, loading: false, alerts: 'no-sub-category' };

      return {
        ...state,
        subcategories: [],
        loading: false,
        alerts: 'no-sub-category',
      };
    }

    case 'RELATED_PRODUCT': {
      return { ...state, relatedproduct: action.success };
    }

    case 'PRODUCT': {
      return { ...state, product: action.success };
    }

    case 'CUSTOM_DATA': {
      console.log("CUSTOM_DATA: ", action.payload);
      return {
        ...state,
        customData: {
          aboutUs: action.payload.pages.about_us,
          homeBanners: Object.values(action.payload.banner),
        },
      };
    }

    case 'ALL_ORDERS': {
      if (action.payload.page > 1) {
        // LayoutAnimation.configureNext(CustomLayoutSpring)
        return {
          ...state,
          order: state.order.concat(action.payload.success),
          loading: false,
        };
      } else {
        // LayoutAnimation.configureNext(CustomLayoutSpring)
        return { ...state, order: action.payload.success, loading: false };
      }
    }

    case 'SINGLE_PRODUCT': {
      // console.log(action.success);

      // LayoutAnimation.configureNext(CustomLayoutSpring)
      return { ...state, singleproduct: action.success, loading: false };
    }

    case 'CAT_PRODUCT': {
      if (action.success.length > 0) {
        // console.log('early')
        // return { ...state, allproduct: [...state.allproduct,...action.success] }
        return { ...state, categoryProducts: action.success, loading: false };
      } else {
        // console.log('late')
        return { ...state, categoryProducts: [], loading: false };
      }
    }

    case 'GET_ZONES': {
      return { ...state, zonelocations: action.payload };
    }

    case 'SHIPPING_METHODS': {
      return { ...state, shippingMethods: action.payload };
    }

    case 'EMPTY_SIGNLE_PROD': {
      return { ...state, singleproduct: null };
    }

    case 'ALL_PRODUCT': {
      if (action.payload.page > 1) {
        // LayoutAnimation.configureNext(CustomLayoutSpring)
        return {
          ...state,
          allproduct: state.allproduct.concat(action.payload.success),
          loading: false,
        };
      } else {
        // LayoutAnimation.configureNext(CustomLayoutSpring)
        return { ...state, allproduct: action.payload.success, loading: false };
      }
    }

    case 'SEARCH_PRODUCT': {
      return { ...state, searchList: action.payload, loading: false };
    }

    case 'FILTER_DATA': {
      return { ...state, allproduct: action.payload, loading: false };
    }

    case 'ADD_COUPON': {
      return { ...state, coupon: action.payload };
    }
    case 'EMPTY_FILTER': {
      return { ...state, filterProducts: [] };
    }

    case 'SINGLE_COUPON': {
      return { ...state, singlecoupon: action.Couponsuccess };
    }

    case 'ALL_COUPONS': {
      return { ...state, allcoupon: action.success };
    }

    case 'SINGLE_ORDER': {
      return { ...state, singleorder: action.Ordersuccess, loading: false };
    }

    case 'CURRENCY': {
      action.success.symbol = action.success.symbol.replace(
        /&(#?[\w\d]+);?/g,
        function (s, entity) {
          var chr;
          if (entity.charAt(0) === '#') {
            var code =
              entity.charAt(1) === 'x'
                ? parseInt(entity.substr(2).toLowerCase(), 16)
                : parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
              chr = String.fromCharCode(code);
            }
          } else {
            chr = alphaIndex[entity];
          }
          return chr || s;
        },
      );

      return { ...state, currency: action.success };
    }

    case 'ADD_TO_CART': {
      // Can receive an object having count and productId as key and also just productId as well
      // console.log(action.payload, state);
      // if (typeof action.payload == 'object') {

      // } else {
      //   if (
      //     state.cart.find((val) => val.product_id == action.payload) ==
      //     undefined
      //   ) {
      //     var cartItem = {
      //       product_id: action.payload,
      //       quantity: 1,
      //     };
      //     state.cart.push(cartItem);
      //     return {
      //       ...state,
      //       alerts: 'Added to the cart',
      //       badge: state.cart.length,
      //       loading: false,
      //     };
      //   } else {
      //     return {...state, alerts: 'Already In cart 21', loading: false};
      //   }
      // }
      // if (
      //   state.cart.find(
      //     (val) => val.product_id == action.payload.product_id,
      //   ) == undefined
      // ) {
      //   state.cart.push(action.payload);
      //   return {
      //     ...state,
      //     alerts: 'Added to the cart',
      //     badge: state.cart.length,
      //     loading: false,
      //   };
      // } else {
      //   return {...state, alerts: 'Already In cart 12', loading: false};
      // }cartProduct
      let index = state.cart.findIndex(
        (x) => x.product_id === action.payload.item.product_id,
      );
      if (index > -1) {
        return {
          ...state,
          alerts: 'Already In cart 12',
          loading: false,
        };
      } else {
        state.cart.push(action.payload.item);
        state.cartProduct.push(action.payload.details);
        return {
          ...state,
          alerts: 'Already In cart 12',
          loading: false,
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      let index = state.cart.findIndex((x) => x.product_id === action.payload);
      if (index > -1) {
        state.cart.splice(index, 1);
        state.cartProduct.splice(index, 1);
      }
      return {
        ...state,
      };
      // Just send productId
      // console.log('in remoive');
      // var cartindex = state.cart.findIndex(
      //   (val) => val.product_id == action.payload,
      // );
      // var cartProductindex = state.cartProduct.findIndex(
      //   (val) => val.id == action.payload,
      // );

      // console.log('state.cartProduct  ', state.cartProduct, '  ', state);

      // if (cartindex == -1) {
      //   return {...state, alerts: 'Item Not in cart'};
      // } else {
      //   const removedCartItem = state.cart.splice(cartindex, 1);
      //   const removeProductItem = state.cartProduct.splice(cartProductindex, 1);

      //   if (removeProductItem.length > 0) {
      //     const subtrectFromtotal =
      //       parseFloat(removeProductItem[0].count) *
      //       parseFloat(removeProductItem[0].price);
      //     state.cartTotal =
      //       parseFloat(state.cartTotal) - parseFloat(subtrectFromtotal);
      //   }

      //   console.log(
      //     'removed item :',
      //     removeProductItem,
      //     '   ',
      //     removedCartItem,
      //   );

      //   return {
      //     ...state,
      //     alerts: 'Removed from the cart',
      //     badge: state.cart.length,
      //     loading: false,
      //   };
      // }
    }

    case 'ADD_TO_WISHLIST': {
      if (state.wishlist.find((val) => val == action.payload) == undefined) {
        state.wishlist.push(action.payload);
        return { ...state, alerts: 'Added to wishlist' };
      } else {
        return { ...state, alerts: 'Already In wishlist' };
      }
    }

    case 'REMOVE_FROM_WISHLIST': {
      var wishlistindex = state.wishlist.findIndex(
        (val) => val == action.payload,
      );
      var wishlistproductindex = state.wishlistproduct.findIndex(
        (val) => val.id == action.payload,
      );

      if (wishlistindex == -1) {
        return { ...state, alerts: 'Item Not in wishlist' };
      } else {
        state.wishlist.splice(wishlistindex, 1);
        state.wishlistproduct.splice(wishlistproductindex, 1);
        return { ...state, alerts: 'Removed from the wishlist' };
      }
    }

    case 'INCREMENT_PRODUCT': {
      // state.cart.map((value) => {
      //   if (value.product_id === action.payload.productId) {
      //     // console.log( "AA ",value)
      //     value.quantity++;
      //     state.cartTotal =
      //       parseFloat(action.payload.price) + parseFloat(state.cartTotal);
      //     //  console.log('inc val count', value.quantity);
      //   }
      // });
      let index = state.cart.findIndex(
        (x) => x.product_id === action.payload.productId,
      );
      if (index > -1) {
        state.cart[index].quantity = state.cart[index].quantity + 1;
      }
      return { ...state };
    }

    case 'DECREMENT_PRODUCT': {
      // console.log('in decc');

      // var cartItem = state.cart.find((val) => {
      //   return val.product_id === action.payload.productId;
      // });

      // // console.log( "AA ",cartItem)

      // if (cartItem.quantity !== 1) {
      //   state.cart.map((value) => {
      //     if (value.product_id == action.payload.productId) {
      //       value.quantity--;
      //       state.cartTotal =
      //         parseFloat(state.cartTotal) - parseFloat(action.payload.price);
      //       // console.log('dec val count', value.quantity);
      //     }
      //   });
      // }
      // return {...state};
      let index = state.cart.findIndex(
        (x) => x.product_id === action.payload.productId,
      );
      if (index > -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity = state.cart[index].quantity - 1;
      }
      return { ...state };
    }

    case 'GET_WISHLIST': {
      state.wishlistproduct = [];
      if (state.wishlist.length == 0) {
        return { ...state, alerts: 'wishlist is empty', loading: false };
      } else {
        // console.log('in else');
        state.wishlist.map((value) => {
          //  console.log('wishlist map', value);

          action.success.map((val) => {
            // console.log('wishlist *******', val);

            if (value == val.id) {
              state.wishlistproduct.push(val);
              // console.log('in else state *************', state);
            }
          });
        });
      }
      return { ...state, wishlistproduct: state.wishlistproduct, loading: false };
    }

    case 'WISHLIST_API': {
      state.wishlistproduct = [];
      return { ...state, wishlistproduct: action.payload, loading: false };
    }

    case 'CART_PRODUCT': {
      state.cartProduct = [];
      state.cartTotal = 0.0;
      if (action.success.length == 0)
        return {
          ...state,
          alerts: 'Cart is empty',
          badge: 0,
          cart: [],
          loading: false,
        };

      if (state.cart.length == 0) {
        // console.log('in else 1');
        return { ...state, alerts: 'Cart is empty', loading: false };
      } else {
        state.cart.map((value) => {
          // console.log('cart map', value);

          action.success.map((val) => {
            if (value.product_id == val.id) {
              let variantProduct = state.addedVariation.find(
                (variation) => variation.id == value.variation_id,
              );
              if (variantProduct) {
                val.count = value.quantity;
                val.price = variantProduct.price;

                state.cartTotal =
                  parseInt(val.count) * parseFloat(val.price) +
                  parseFloat(state.cartTotal);
                state.cartProduct.push(val);
              } else {
                val.count = value.quantity;
                state.cartTotal =
                  parseFloat(val.count) * parseFloat(val.price) +
                  parseFloat(state.cartTotal);
                state.cartProduct.push(val);
              }

              // console.log('in else state *************', state);
            }
          });
        });
      }
      return { ...state, loading: false };
    }

    case 'PAYMENT_METHOD': {
      return { ...state, paymentmethods: action.Paymentsuccess };
    }

    case 'MANAGE_CART': {
      // console.log('caled manage cart');

      switch (action.view) {
        case 'PRODUCT_VIEW': {
          // console.log('case 1');

          // console.log('state.coupon ', state.coupon);
          // state.cartDetail = {}
          state.cartDetail.line_items = state.cart;

          if (state.coupon !== null) {
            if (state.coupon.length > 0) {
              if (
                state.coupon[0].code !== undefined &&
                state.coupon[0].amount !== undefined
              )
                //discount changed to amount by woo commerce api

                state.cartDetail.coupon_lines = [
                  {
                    code: state.coupon[0].code,
                    discount: state.coupon[0].amount,
                    // amount: state.coupon[0].amount,
                  },
                ];
            }
          }

          return { ...state };
        }

        case 'BILLING_VIEW': {
          // console.log('case 2');

          // console.log('The action data :', action.data);

          // console.log('userInfo :: before', state.userInfo);

          if (!action.data.anonymous) {
            state.userInfo.billing.address_1 = action.data.address;
            state.userInfo.billing.address_2 = action.data.address;
            state.userInfo.billing.first_name = state.userInfo.first_name;
            state.userInfo.billing.last_name = state.userInfo.last_name;
            state.userInfo.billing.city = '';
            state.userInfo.billing.company = '';
            state.userInfo.billing.country = '';
            state.userInfo.billing.email = state.userInfo.email;
            state.userInfo.billing.phone = '';
            state.cartDetail.billing = { ...state.userInfo.billing }; //billing object
            state.cartDetail.shipping = { ...state.userInfo.billing }; //shipping object
            state.cartDetail.customer_note = action.data.customer_note ?? '';

            return { ...state };
          } else {
            state.userInfo = {
              ...state,
              userInfo: {
                billing: {
                  address_1: action.data.address,
                  address_2: action.data.address,
                  first_name: action.data.first_name,
                  last_name: action.data.last_name,
                  email: action.data.email,
                  phone: action.data.phone,
                },
                shipping: {
                  address_1: action.data.address,
                  address_2: action.data.address,
                  first_name: action.data.first_name,
                  last_name: action.data.last_name,
                },
              },
            };

            state.cartDetail.billing = { ...state.userInfo.billing }; //billing object
            state.cartDetail.shipping = { ...state.userInfo.billing }; //shipping object

            state.cartDetail.customer_note = action.data.customer_note ?? '';
            // state.cartDetail.status ='pending'
            return { ...state };
          }
        }

        case 'PAYMENT_VIEW': {
          state.cartDetail.payment_method = action.data.value;
          state.cartDetail.payment_method_title = action.data.label;
          // state.cartDetail.set_paid = action.data.enabled;
          state.cartDetail.set_paid = false;
          state.cartDetail.customer_id = state.userId;

          return { ...state };
        }
        case 'SET_IS_PAID': {
          // state.cartDetail.set_paid = action.data.enabled;
          state.cartDetail.set_paid = true;

          return { ...state };
        }

        case 'SHIPPING_VIEW': {
          state.cartDetail.shipping_lines = [
            {
              method_id: action.data.method_id,
              method_title: action.data.method_title,
              total: action.data.total,
            },
          ];

          return { ...state };
        }

        case 'CONFIRM_VIEW': {
          return {
            ...state,
            cart: [],
            cartDetail: {},
            cartProduct: [],
            badge: 0,
            cartTotal: 0.0,
            discount: 0.0,
            coupon: null,
            cart: [],
            checkOutAddress: {},
            alerts: 'Your order has been successfully placed',
            addedVariation: [],
          };
        }
        default:
          // console.log('case 6');
          // console.log('The cart Details after placing order ::', state.cartDetail);
          return { ...state };
      }
    }

    case 'LOG_OUT': {
      return {
        ...state,
        userId: null,
        order: [],
        cart: [],
        cartDetail: {},
        cartProduct: [],
        alerts: null,
        userInfo: null,
        singleproduct: null,
        relatedproduct: [],
        cartTotal: 0.0,
        coupon: [],
        badge: 0,
      };
    }

    case 'ALERTS': {
      // console.log('in alert', action.payload);

      return { ...state, alerts: action.payload };
    }

    case 'EMPTY_STATE': {
      // console.log('in empty state');
      return {
        ...state,
        alerts: null,
        singleproduct: null,
        singleorder: null,
        productVariation: [],
        searchList: [],
      };
    }

    case 'EMPTY_ALERTS': {
      return { ...state, alerts: null };
    }

    case 'EMPTY_PRODUCTS': {
      return { ...state, allproduct: [] };
    }

    case 'SPINNER_LOAD': {
      return { ...state, spinnerLoading: true };
    }

    case 'API_DATA': {
      return {
        ...state,
        CategoryApis: action.payload.CategoryApis[0],
        productListAPIs: action.payload.productListAPIs[0],
        FeaturedCategAPIs: action.payload.FeaturedCategAPIs[0],
        spinnerLoading: false,
      };
    }

    case 'EMPTY_VARIATIONS': {
      // console.log('hit e')
      return { ...state, productVariation: [], addedVariation: [] };
    }

    case 'GET_VARIATIONS': {
      return { ...state, productVariation: action.payload };
    }

    case 'ADD_VARIATION': {
      if (state.addedVariation && state.addedVariation.length > 0) {
        if (state.addedVariation.find((val) => val.id == action.payload.id)) {
          return { ...state, alerts: 'Already in cart' };
        } else {
          state.addedVariation.push(action.payload);
          return { ...state };
        }
      } else {
        return { ...state, addedVariation: [action.payload] };
      }
    }

    default:
      return state;
  }
};
