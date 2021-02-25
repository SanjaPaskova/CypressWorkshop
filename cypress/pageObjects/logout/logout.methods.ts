import LoginPageElements from '../login/login.elements';
import { LogoutPageElements } from './logout.elements';

export class LogoutPageMethods {
  async verifySuccessfullLogout(page) {
    await page.waitForSelector(LogoutPageElements.elementsLogout.getBtnLogout(), { visible: true });
    await page.click(LogoutPageElements.elementsLogout.getBtnLogout());
    await page.waitForSelector(LoginPageElements.elementsLogin.getBtnEmployeeIdentityProvider(), { visible: true });
    return this;
  }
}
export default LogoutPageMethods;
