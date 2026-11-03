// Change this to any private word. Type the same word into the app's
// "Sheet sync settings" so only your app can write to your sheet.
const SECRET = 'DJSCE';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return reply({ ok: false, error: 'Wrong secret word' });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Expenses');
    if (!sheet) return reply({ ok: false, error: 'No tab named Expenses' });

    // Lock so two syncs at the same moment can't write over each other
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // Column F holds each entry's ID, which is how we spot duplicates
      const lastRow = sheet.getLastRow();
      const known = new Set(
        lastRow > 1
          ? sheet.getRange(2, 6, lastRow - 1, 1).getValues().flat().map(String)
          : []
      );

      const rows = body.entries
        .filter((x) => !known.has(String(x.id)))
        .map((x) => [x.date, x.day, x.time, x.amount, x.category, x.id]);

      if (rows.length > 0) {
        sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
      }

      // Report every ID back, including duplicates, so the app marks them as synced
      return reply({ ok: true, saved: body.entries.map((x) => x.id) });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
