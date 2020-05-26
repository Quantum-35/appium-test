/* eslint-disable no-undef */
import wd from 'wd';
import config from '../../e2e-config';

const port = 4723;
const driver = wd.promiseChainRemote('localhost', port);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Simple Login Example', () => {
  beforeAll(async () => {
    await driver.init(config);
    await driver.sleep(5000);
  });

  afterAll(async () => {
    // await driver.quit();
  });

  it('Login component renders', async () => {
    expect(await driver.hasElementByAccessibilityId('auth__container')).toBe(
      true,
    );
    expect(await driver.hasElementByAccessibilityId('lbl_title')).toBe(true);
  });
  it('logs in user successfully', async () => {
    await driver
      .elementByAccessibilityId('login_input_email')
      .type('test@gmail.com');
    await driver
      .elementByAccessibilityId('login_input_password')
      .type('Password1');
    await driver.elementByAccessibilityId('btn_login').click();

    const messageExist = await driver.hasElementByAccessibilityId(
      'txt_message',
    );
    if (messageExist) {
      const TEXT = 'Logged in successfully';
      const message = await driver
        .elementByAccessibilityId('txt_message')
        .text();
      expect(message).toBe(TEXT);
    }

    driver.sleep(3000);
  });
  it('unsuccessfull login', async () => {
    await driver
      .elementByAccessibilityId('login_input_email')
      .type('invalidemail');
    await driver
      .elementByAccessibilityId('login_input_password')
      .type('password');
    await driver.elementByAccessibilityId('btn_login').click();
    const messageExist = await driver.hasElementByAccessibilityId(
      'txt_message',
    );
    if (messageExist) {
      const TEXT =
        'email must be a valid email' || 'Invalid email' || 'Invalid password';
      const message = await driver
        .elementByAccessibilityId('txt_message')
        .text();
      expect(message).toBe(TEXT);
    }
    driver.sleep(3000);
  });
});
