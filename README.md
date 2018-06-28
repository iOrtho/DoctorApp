# Current blind sides

### Chat
- Limit the max-length of a text message in the chat to 1600
- Clear the input when a message is sent
- Create `ChatDayLimit` component for Chat screens
- Display `timestamps` on the messages
- Send notifications to customers and to agents (online) whenever a new message is received
- Send an email if a customer doesn't have notif turned on or if no agents are online 
- Add `Permissions` key to `Users` model like so:
```js
Permissions: {
	notifications: Boolean,
	location: Boolean,
}
```

### Home
- Implement modals in the `QuickHelp` component
- Create `OperatingHours` component
- Update the web app to support the updating of all the new fields
- Create `OnlineReviewObserver` component
- Design database schema for info concerning the doctor
- Add a `Doctors` key to the `Office` model like so:
```js
Doctors: [
	{
		id: String,
		firstname: String,
		middlename: String,
		lastname: String,
		position: String,
		photo: String,
		bio: String,
		created_at: Date,
		updated_at: Date,
	}
]
```
- Add the `ReviewPlatform` key to the `Office` model to store info about the platforms holding the reviews
```js
ReviewPlatform: {
	facebook: {
		pageId: String,
		link: String,
		average_review: Number,
		rewiew_count: Number,
		last_updated: Date,
	},
	...
}
```
- Create API keys for "Google My Business", "Yelp', and "Facebook App" in order to be able to fetch reviews
- Create web pages to hold the full-list reviews
- Add the key `description`, `pictures` to the `Office` model

### Settings
- Create `My Tokens` screen to see the current tokens the patient has and how far along he/she is to unlock the next recompense
- Create screen to update change account info
- Create screen to update password
- Create screen to change app settings like notification
- Create link to web page for terms & privacy

### Sign Up
- Make the Sign up process multi-step:
	* 1st screen: fill out profile details (name, address, etc..)
	* 2nd screen: confirm phone number via code
	* 3rd screen: create email + password auth account

### Forgot Password
- Create a screen to send a reset link via email

### General
- Add validation to the various forms on the app
- Add a `middlename` key to `Agent` and `User` model
- Design email sending system
How?
    - Create endpoints on the Firebase API to trigger the sending of certain emails like `message_notifications`



# List of Future Features


### Agents should be able to mark a conversation as `solved`
### The conversations should be automatically marked as ended after 10min of inactivity from the customer
### Agents should only seen active conversations from the Dashboard
### Messages should have functioning read receipt with the time seen
### The `Chat` screen should have placeholder content to let the customer know they're about to start a new conversation with employees of the office
### Add a `TransitionScreen` to be shown when user goes from `App` to `Auth`
### Customer should be able to fill their questionnaire and have that data sent to the 3rd party
Pre-requisite:
Connect to the questionnaire API.

### Customer should be able to upload pics for driver license, insurance card, and profile picture
How? 
- Create `Documents` branch within the User model for insurance & DL

```js
Documents: {
	insurance: {
		photo: String,
	},
	driver_license: {
		photo: String,
	},
}
```

-Connect firebase.storage() to the app and use the File API to upload pictures to the storage. Save the images under:

	- `/customers/images/insurance/userid-timestamp.png`

	- `/customers/images/id/userid-timestamp.png`

	- `/customers/images/profile_photos/userid-timestamp.png`

Then save the referrences to the images in the `User` model.

### Customer should be able to send pics & videos via chat
How?
- Use the File API to upload the documents under

	- `/chat/officeid/images/userid-timestamp.png`

	- `/chat/officeid/videos/userid-timestamp.mp4`

-Save a referrence to the file in the `content` key of the `Message.body`.
-Depending on the `Message.body.type` then the rendering of the `content` should be handled differently.

### Customers should be able to clear their chat history
How?
- Add a `deleted_by_customer`, and `deleted_by_customer_at` key to the messages.
- On the chat history show only the messages that do not have this key set.

### Customers should be able to receive video consultations
Pre-requisite:
Need to confirm the scheduled appointment with the customer via notification.
Need to have video calling system implemented of the web-app.

### Customers should be able to receive appointment reminders
Pre-requisite:
Connect the app to the office's CRM and explore the API.

### Customers should be able to receive notifications written by office staff
Pre-requisite:
Customers can receive notifications.
Create system of ranking and roles to determine authorization for certain actions.
Ability to schedule said notifications and select segment to receive it.

### Customers should be able to request appointments
Pre-requisite:
Connect the app to the office's CRM and explore the API.

### Customers should have access to their financials and their Patient Portal (online payment, print receipt, payment info, etc..)
Pre-requisite:
Connect the app to the office's CRM and explore the API.
