# FoodLink AI

FoodLink AI is a Singapore-focused food redistribution platform that connects food donors with charities, food banks, shelters, and community organisations.

## Project overview

FoodLink AI helps reduce food waste by allowing restaurants, supermarkets, bakeries, hotels, and event organisers to donate surplus food. The platform also helps recipients such as food banks, shelters, and community programmes request food quickly and efficiently.

## n8n integration

This project uses n8n as a lightweight backend to capture form submissions from the static website and append them into Google Sheets.

### Workflow summary

- `request.html` submits request form data to an n8n webhook at `/webhook/food-request`
- `donate.html` submits donation form data to an n8n webhook at `/webhook/food-donation`
- n8n appends each submission to a Google Sheets tab
- The website receives a JSON response and shows a confirmation message

### Google Sheets setup

Create or use a Google Sheet with these tabs:

- `Food Requests`
- `Food Donations`

Each tab should include columns for the fields captured from the forms. Example columns for `Food Requests`:

- Name
- Contact
- Categories
- Dietary Notes
- Quantity
- Form Type

Example columns for `Food Donations`:

- Provider Name
- Contact
- Food Type
- Quantity
- Pickup Location
- Availability Window
- Notes
- Form Type

### n8n workflow

1. Add a `Webhook` node in n8n.
2. Configure the node to use `POST` and set the path to `/webhook/food-request`.
3. Add a `Google Sheets` node and set it to `Append` rows into the `Food Requests` tab.
4. Map incoming fields to sheet columns.
5. Add a `Respond to Webhook` node and return a success message.
6. Repeat for `/webhook/food-donation` and the `Food Donations` tab.

### Configuration

Open `assets/js/forms.js` and set the `N8N_BASE_URL` constant to your n8n host URL. For example:

```js
const N8N_BASE_URL = 'https://app.example.com';
```

If you are using a local n8n instance, use your local or tunnel URL instead.

### Notes

- The form scripts post JSON payloads to n8n.
- The site is intentionally static and uses n8n as the backend.
- You can extend the n8n workflow later to send email alerts, add Slack notifications, or route requests based on urgency.
