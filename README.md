# Current blind sides

- Limit the max-length of a message in the chat 
- Clear the input when a message is sent
- Create screens for
	* office overview (Addresses, operating hours, reviews)
	* Settings (change account info,change app conf like notification, terms & privacy)

## List of Future Features

### Customer should be able to fill their questionnaire and have that data sent to the 3rd party
How?

### Customer should be able to upload pics for driver license, insurance card, and profile picture
How? 
- Create `Documents` branch within the User model for insurance & DL

`
Documents: {
	insurance: {
		photo: String,
	},
	driver_license: {
		photo: String,
	},
}
`

-Connect firebase.storage() to the app and use the File API to upload pictures to the storage. Save the images under 
	-`/customers/images/insurance/userid-timestamp.png`
	-`/customers/images/id/userid-timestamp.png` 
	-`/customers/images/profile_photos/userid-timestamp.png`

Then save the referrences to the images in the `User` model.

### Customer should be able to send pics & videos via chat
How?
- Use the File API to upload the documents under
	-`/chat/officeid/images/userid-timestamp.png`
	-`/chat/officeid/videos/userid-timestamp.mp4`

-Save a referrence to the file in the `content` key of the `Message.body`.
-Depending on the `Message.body.type` then the rendering of the `content` should be handled differently.

### Customers should be able to clear their chat history
How?
- Add a `deleted_by_customer`, and `deleted_by_customer_at` key to the messages.
- On the chat history show only the messages that do not have this key set.

