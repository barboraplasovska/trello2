import { Selector } from 'testcafe';

fixture`BoardListCarousel - Authenticated`
  .page('http://localhost:3000/login')
  .beforeEach(async t => {
    await t
      .typeText(Selector('input').nth(0), 'TestAccount')
      .typeText(Selector('input').nth(1), 'Test@ccount123')
      .click(Selector('.connexion-button'));

    await t.expect(Selector('h4').withText('My Boards').exists).ok();
  });

  test('Test 1: Verify board loads correctly', async t => {
    const boards = Selector('p');
    await t.expect(boards.count).eql(5);
  });
  
  test('Test 2: Add a new board', async t => {
    const addButton = Selector('p').withText('Create new board');
    await t.click(addButton);
    await t.typeText(Selector('input'), 'New Board 3');
    await t.click(Selector('button').withText('Add board'));
    await t.expect(Selector('p').withText('New Board').exists).ok({ timeout: 1000 });
  });

  test('Test 3: Access a board', async t => {
    await t.click(Selector('p').withText('New Board'))
    await t.expect(Selector('h6').withText('New Board').exists).ok()
  })