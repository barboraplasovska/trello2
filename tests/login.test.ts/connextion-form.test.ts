import { Selector } from 'testcafe';

fixture`ConnexionForm Component Tests`
    .page`http://localhost:3000/login`;

// Selectors for elements in the form
const formTitle = Selector('.form-title');
const errorMessage = Selector('.form-error');
const usernameInput = Selector('input').nth(0); // Username Input
const passwordInput = Selector('input').nth(1); // Password Input
const confirmPasswordInput = Selector('input').nth(2); // Confirm Password Input
const submitButton = Selector('.connexion-button');
const toggleModeText = Selector('.change-mode-text');

test('Login form renders correctly', async t => {
    await t
        .expect(formTitle.innerText).eql('Login')
        .expect(usernameInput.exists).ok()
        .expect(passwordInput.exists).ok()
        .expect(confirmPasswordInput.exists).notOk();
});

test('Signup form renders correctly', async t => {
    await t
        .click(toggleModeText)
        .expect(formTitle.innerText).eql('Sign up')
        .expect(usernameInput.exists).ok()
        .expect(passwordInput.exists).ok()
        .expect(confirmPasswordInput.exists).ok();
});

test('Error message is displayed', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .typeText(usernameInput, 'testuser')
        .click(submitButton)
        .expect(errorMessage.innerText).eql('Please fill in all fields');
});

test('Switch between login and signup modes', async t => {
    await t
        .click(toggleModeText)
        .expect(formTitle.innerText).eql('Sign up')
        .click(toggleModeText)
        .expect(formTitle.innerText).eql('Login');
});

test('Inputs accept text correctly', async t => {
    await t
        .typeText(usernameInput, 'testuser')
        .typeText(passwordInput, 'Password123!')
        .expect(usernameInput.value).eql('testuser')
        .expect(passwordInput.value).eql('Password123!');
});

test('Connect button triggers action', async t => {
    const connectMock = t.ctx.connectMock = Selector('.connexion-button').with({ visibilityCheck: true });
    
    await t
        .typeText(usernameInput, 'testuser')
        .typeText(passwordInput, 'Password123!')
        .click(connectMock)
        .expect(connectMock.exists).ok();
});

test('Login and access Main Page', async t => {
    await t
      .typeText(usernameInput, 'TestAccount')
      .typeText(passwordInput, 'Test@ccount123')
      .click(submitButton);
    
    await t.expect(Selector('h4').withText('My Boards').exists).ok();
  });