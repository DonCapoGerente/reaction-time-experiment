const SHEET_NAME = 'RT-Daten';
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  sheet.appendRow([ new Date(), data.subjectId, data.runType, data.trial, data.rt, data.error ]);
  return ContentService
    .createTextOutput(JSON.stringify({status:'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
