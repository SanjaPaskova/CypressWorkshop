/// <reference types="cypress" />

import LoginPageMethods from "../pageObjects/login/login.methods";
import LogoutPageMethods from "../pageObjects/logout/logout.methods";

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

/**
@type {Cypress.PluginConfig}
 */
const login = new LoginPageMethods();
const logout = new LogoutPageMethods();
module.exports = (on: any, config: any) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  //on('task', require('@cypress/code-coverage/task'))
  const puppeteer = require('puppeteer');
  const expect = require('expect-puppeteer');
  var fs = require('fs');

  on("task", {
    login: (args) => {
      return (async () => {
        expect.setDefaultOptions({ timeout: 10000 });
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage();
        await login.visitAndLogin(page, args.url, args.username, args.password);
        const localStorageData = await page.evaluate(() => {
          let json = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            json[key] = localStorage.getItem(key);
          }
          return json;
        });
        fs.writeFileSync('cypress/fixtures/localstorage.json', JSON.stringify(localStorageData));
        return JSON.stringify(localStorageData);
      })();
    }
  });
  on("task", {
    logout: (args) => {
      return (async () => {
        expect.setDefaultOptions({ timeout: 10000 });
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage();
        await login.visitAndLogin(page, args.url, args.username, args.password);
        await logout.verifySuccessfullLogout(page);
        await browser.close();
        return null;
      })();
    }
  });
}
