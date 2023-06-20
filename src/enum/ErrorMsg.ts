enum ErrorMsg {
  // VISITOR
  //============================================================================
  VISITORS_FETCHED = "An error occurred while fetching the visitors",
  VISITOR_REGISTERED_UPDATED = "An error occurred while registering/updating the visitor",
  VISITOR_UPDATED = "An error occurred while updating the visitor",
  VISITOR_DELETED = "An error occurred while deleting the visitor",
  // PRODUCT
  PRODUCT_FETCHED = "An error occurred while fetching the products",
  PRODUCT_REGISTERED_UPDATED = "An error occurred while registering/updating the product",
  PRODUCT_UPDATED = "An error occurred while updating the product",
  PRODUCT_DELETED = "An error occurred while deleting the product",
  //============================================================================
  // USER
  //============================================================================
  USER_FECTHED = "An error ocurred while fetching the user",
  USER_NOT_FOUND = "An error occurred while updating the user",
  USER_INCORRECT_PASSWORD = "An error occurred while updating the user",
  USER_LOGIN_ERROR = "An error ocurred while logging",
  USER_RESTORE_PASS = "An error ocurred while restoring the password",
  USER_REPEATED_EMAIL = "There is already an user with the email provided",
}

export default ErrorMsg;
