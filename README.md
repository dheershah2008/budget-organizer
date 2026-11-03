# budget-organizer
Repository with code of an offline HTML file to link to a spreadsheet to manage all your budgeting needs.

Steps to follow to link this to your spreadsheet:
1. Download the offline-system.html file on your device.
2. Create an empty spreadsheet (preferably Google Sheet, but it works on Excel as well once uploaded to Drive).
3. Rename the sheet from Sheet1 (default name) to Expenses.
4. On Google Sheets, select Extensions->Add-ons->Apps Script.
5. On the Apps Script editor, paste the code written in the code.gs file.
6. Change the code word to something you will remember.
7. Use the dropdown next to the Deploy button and select New Deployment.
8. Set 'Who has access' to Anyone.
9. Press Deploy and copy the URL of the deployment.
10. Open the HTML file on any browser and input the URL into the text box that is displayed after clicking 'Sheet Sync Settings' and add your code word same as the one enters in code.gs.
11. You are ready to run your own personal offline budget manager.


Suggestions and edits welcome. Kindly add a pull request and I'll look into it.
