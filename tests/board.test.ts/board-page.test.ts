import { Selector } from 'testcafe';

fixture`Board Page Tests`
    .page`http://localhost:3000/board/my-new-board-is-so-cool!`; // Update URL if needed

// Selectors for elements on the page
const boardTitle = Selector('.board-title'); // Replace with actual class or test id
const columnAddButton = Selector('.add-column-button'); // Replace with actual class or test id
const cardAddButton = Selector('.add-card-button'); // Replace with actual class or test id
const cardEditButton = Selector('.edit-card-button'); // Replace with actual class or test id
const deleteDialog = Selector('.dialog-div');
const confirmDeleteButton = Selector('.confirm-delete-button'); // Replace with actual class or test id

test('Load Board Page and Verify Title', async t => {
    // Verify page loads and board title is displayed
    await t.expect(boardTitle.innerText).eql('Your Board Name'); // Replace with the actual title text
});

test('Add a New Column', async t => {
    // Click the Add Column button
    await t
        .click(columnAddButton)
        .typeText(Selector('.column-input'), 'New Column') // Replace with actual selector for the input
        .pressKey('enter');

    // Verify the new column is added
    const newColumn = Selector('.column-title').withText('New Column'); // Replace with actual class or test id
    await t.expect(newColumn.exists).ok();
});

test('Add a New Card to a Column', async t => {
    // Click the Add Card button for the first column
    const firstColumn = Selector('.column').nth(0); // Replace with actual class or test id
    await t
        .hover(firstColumn)
        .click(cardAddButton)
        .typeText(Selector('.card-input'), 'New Card') // Replace with actual selector for the input
        .pressKey('enter');

    // Verify the new card is added
    const newCard = Selector('.card-title').withText('New Card'); // Replace with actual class or test id
    await t.expect(newCard.exists).ok();
});

test('Delete a Card', async t => {
    const cardToDelete = Selector('.card-title').withText('New Card'); // Replace with actual card selector

    // Click delete button for the card
    await t
        .hover(cardToDelete)
        .click(Selector('.delete-card-button')) // Replace with actual class or test id
        .expect(deleteDialog.exists)
        .ok();

    // Confirm deletion
    await t.click(confirmDeleteButton);

    // Verify the card is deleted
    await t.expect(cardToDelete.exists).notOk();
});

test('Move a Column', async t => {
    const firstColumn = Selector('.column').nth(0);
    const moveRightButton = firstColumn.find('.move-right-button'); // Replace with actual class or test id

    await t
        .hover(firstColumn)
        .click(moveRightButton);

    // Verify column moved (check column order or rank)
    const secondColumnTitle = Selector('.column').nth(1).find('.column-title'); // Replace with actual class or test id
    await t.expect(secondColumnTitle.innerText).eql('Expected Column Title'); // Replace with actual title
});

test('Handle Dialog Box', async t => {
    // Open and confirm delete dialog
    await t
        .click(Selector('.delete-board-button')) // Replace with actual class or test id
        .expect(deleteDialog.exists)
        .ok()
        .click(confirmDeleteButton);

    // Verify navigation to the boards list
    await t.expect(Selector('.boards-page').exists).ok(); // Replace with actual class or test id
});
