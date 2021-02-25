export class LoginPageElements {
  static get elementsLogin() {
    return {
      getTxtUsername: () => '[id="userNameInput"]',
      getTxtPassword: () => '[id="passwordInput"]',
      getbtnSignInButton: () => '[id="submitButton"]',
      getTxtSearchField: () => 'input[placeholder="SEARCH"]',
      getBtnEmployeeIdentityProvider: () => 'input[type="button"][value="ITLEmployeesIdentityProvider"]'
    };
  }
}

export default LoginPageElements;
