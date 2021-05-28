import * as actions from './index';

export default (dispatch) => {
  return {
    setIsPaid: () => dispatch({type: 'SET_IS_PAID'}),
    AllCategories: (success, error) =>
      dispatch(actions.WooCommerceWrapper.productcategory(success, error)), //done

    HomeCategories: (success, error) =>
      dispatch(actions.WooCommerceWrapper.homeproductcategory(success, error)), //done

    GetCurrency: () => dispatch(actions.WooCommerceWrapper.getcurrency()),
    AllProduct: (id, page, params, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.allproduct(id, page, params, success, error),
      ), //done
    EmptyState: () => dispatch(actions.WooCommerceWrapper.emptystate()),
    UserInfo: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.userinfo(data, success, error)), //done getting user info after login
    CartProduct: (cartList, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.cartproduct(cartList, success, error),
      ), //done
    ManageCart: (view, data, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.managecart(view, data, success, error),
      ),
    ValidateOrder: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.validateorder(data, success, error)),
    PaymentMethod: (success, error) =>
      dispatch(actions.WooCommerceWrapper.paymentmethod(success, error)),
    UpdateUser: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.updateuser(data, success, error)),
    RequestCode: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.requestcode(data, success, error)),
    VerifyCode: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.verifycode(data, success, error)),
    ResetPassword: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.resetpassword(data, success, error)),
    Login: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.login(data, success, error)), //done
    Logout: () => dispatch(actions.WooCommerceWrapper.logout()), //done
    GetOrders: (complete, id, page) =>
      dispatch(actions.WooCommerceWrapper.getorders(complete, id, page)), //getting all orders
    SingleProduct: (id, completed, failed) =>
      dispatch(actions.WooCommerceWrapper.singleproduct(id, completed, failed)),
    AddToCart: (data, success, error, details) =>
      dispatch(
        actions.WooCommerceWrapper.addtocart(data, success, error, details),
      ),
    AddCoupon: (id) => dispatch(actions.WooCommerceWrapper.addcoupon(id)),
    RemoveFromWishlist: (id, success) =>
      dispatch(actions.WooCommerceWrapper.removefromwishlist(id, success)),
    AddtoWishlist: (id, success) =>
      dispatch(actions.WooCommerceWrapper.addtowishlist(id, success)),
    SignUp: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.signup(data, success, error)),
    UpdatePassword: (data, id, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.updatepassword(data, id, success, error),
      ),
    SingleOrder: (id, success, error) =>
      dispatch(actions.WooCommerceWrapper.singleorder(id, success, error)),
    GetWishlist: () => dispatch(actions.WooCommerceWrapper.getwishlist()),
    RemoveFromCart: (id) =>
      dispatch(actions.WooCommerceWrapper.removefromcart(id)), //done
    IncrementProduct: (id, price) =>
      dispatch(actions.WooCommerceWrapper.incrementproduct(id, price)), //done
    DecrementProduct: (id, price) =>
      dispatch(actions.WooCommerceWrapper.decrementproduct(id, price)), //done
    CancelOrder: (id, success, error) =>
      dispatch(actions.WooCommerceWrapper.cancelorder(id, success, error)),
    AllProductrating: (id) =>
      dispatch(actions.WooCommerceWrapper.allproductrating(id)),
    CreateRating: (data, success, error) =>
      dispatch(actions.WooCommerceWrapper.createrating(data, success, error)), //deone`
    Refunds: (id) => dispatch(actions.WooCommerceWrapper.refunds(id)),
    AllCoupons: () => dispatch(actions.WooCommerceWrapper.allcoupons()),
    SingleCoupon: (id, success, error) =>
      dispatch(actions.WooCommerceWrapper.singlecoupon(id, success, error)), //use to varify coupon also get the data for coupon
    VarifyCoupon: (id, success, error) =>
      dispatch(actions.WooCommerceWrapper.varifycoupon(id, success, error)), //use to varify coupon also get the data for coupon
    StartLoad: () => dispatch(actions.WooCommerceWrapper.StartLoad()),
    CloseLoad: () => dispatch(actions.WooCommerceWrapper.CloseLoad()),
    CategoryProduct: (id, page, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.categoryProducts(id, page, success, error),
      ),
    EmptyProducts: () => dispatch(actions.WooCommerceWrapper.emptyProducts()),
    EmptySingleProduct: () =>
      dispatch(actions.WooCommerceWrapper.emptySingleProduct()),
    DataFromAPI: (success, error) =>
      dispatch(actions.WooCommerceWrapper.DataFromAPI(success, error)),
    FilterData: (categoryID, min_price, max_price, order) =>
      dispatch(
        actions.WooCommerceWrapper.FilterData(
          categoryID,
          min_price,
          max_price,
          order,
        ),
      ),
    EmptyFilter: () => dispatch(actions.WooCommerceWrapper.EmptyFilter()),
    wishlistAPI: (wishlistIDs, params, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.wishlistAPI(
          wishlistIDs,
          params,
          success,
          error,
        ),
      ),
    SearchList: (productName, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.searchList(productName, success, error),
      ),
    getSubCategories: (parentID) =>
      dispatch(actions.WooCommerceWrapper.getSubCategories(parentID)),
    EmptyAlerts: () => dispatch(actions.WooCommerceWrapper.EmptyAlerts()),
    GetZones: () => dispatch(actions.WooCommerceWrapper.GetZones()),
    GetShippingMethods: (id) =>
      dispatch(actions.WooCommerceWrapper.GetShippingMethods(id)),
    GetVariations: (id, success, error) =>
      dispatch(actions.WooCommerceWrapper.GetVariations(id, success, error)),
    EmptyVariations: () =>
      dispatch(actions.WooCommerceWrapper.EmptyVariations()),
    AddVariation: (variation) =>
      dispatch(actions.WooCommerceWrapper.AddVariation(variation)),
    EmptySearchList: () =>
      dispatch(actions.WooCommerceWrapper.EmptySearchList()),
    EmptyCoupon: () => dispatch(actions.WooCommerceWrapper.EmptyCoupon()),
    managePayment: (data, success, fail) =>
      dispatch(actions.WooCommerceWrapper.managePayment(data, success, fail)),
    checkOutAddress: (data) =>
      dispatch(actions.WooCommerceWrapper.checkOutAddress(data)),
    clear_checkOutAddress: () =>
      dispatch(actions.WooCommerceWrapper.clear_checkOutAddress()),
    discount: (data) => dispatch(actions.WooCommerceWrapper.discount(data)),
    clear_discount: () => dispatch(actions.WooCommerceWrapper.clear_discount()),

    GetCustomData: (success, error) =>
      dispatch(actions.WooCommerceWrapper.getcustomdata(success, error)), //added by Danyal

    // GetBanner: (success, error) =>
    //   dispatch(actions.WooCommerceWrapper.getbanner(success, error)), //added by Danyal

    SubmitContactForm: (data, success, error) =>
      dispatch(
        actions.WooCommerceWrapper.submitContactForm(data, success, error),
      ),
    setNavigationField: (data) =>
      dispatch(actions.WooCommerceWrapper.setNavigationField(data)),
    clearNavigationField: () =>
      dispatch(actions.WooCommerceWrapper.clearNavigationField()),
    storeGetDataFields: (data) =>
      dispatch(actions.WooCommerceWrapper.storeGetDataFields(data)),
  };
};
