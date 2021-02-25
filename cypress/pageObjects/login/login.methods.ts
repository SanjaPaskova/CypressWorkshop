import LogoutPageElements from '../logout/logout.elements';
import { LoginPageElements } from './login.elements';

const expect = require('expect-puppeteer');

export class LoginPageMethods {
  async visitAndLogin(page, url:string, username:string, password:string) {
    await page.goto(url);
    await this.completeLogin(page, username, password);
    await this.verifySuccessfullLogin(page);
    return this;
  }
  async fillEmail(page, value: string) {
    await page.waitForSelector(LoginPageElements.elementsLogin.getTxtUsername(), { visible: true });
    await expect(page).toFill(LoginPageElements.elementsLogin.getTxtUsername(), value);
    return this;
  }

  async fillPassword(page, value: string) {
    await page.waitForSelector(LoginPageElements.elementsLogin.getbtnSignInButton(), { visible: true });
    await expect(page).toFill(LoginPageElements.elementsLogin.getTxtPassword(), value);
    return this;
  }

  async submit(page) {
    await page.waitForSelector(LoginPageElements.elementsLogin.getbtnSignInButton(), { visible: true });
    await page.click(LoginPageElements.elementsLogin.getbtnSignInButton());
    return this;
  }

  async clickEmployeeIdentityProviderButton(page) {
    await page.waitForSelector(LoginPageElements.elementsLogin.getBtnEmployeeIdentityProvider(), { visible: true });
    await page.click(LoginPageElements.elementsLogin.getBtnEmployeeIdentityProvider());
    return this;
  }

  async login(page, username: string, password: string) {
    (await (await this.fillEmail(page, username)).fillPassword(page, password)).submit(page);
  }

 async verifySuccessfullLogin(page) {
    await page.waitForSelector(LogoutPageElements.elementsLogout.getBtnLogout(), { visible: true });
    return this;
  }
  async completeLogin(page, username: string, password: string) {
    await (await this.clickEmployeeIdentityProviderButton(page)).login(page, username, password);
  }
}
export default LoginPageMethods;
