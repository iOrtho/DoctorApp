import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator as Spinner } from 'react-native';
import { Input, Button, Item } from 'native-base';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Message from 'app/components/Chat/Message/';
import { connect } from 'react-redux';
import ChatAction from 'app/store/actions/chat';
import { database } from 'app/config/firebase';
import MessageSchema from 'app/schemas/Message';
import style from './style';

class Chat extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
		this.chatview = React.createRef();
		this.handleMarkMessagesAsRead = this.handleMarkMessagesAsRead.bind(this);
		this.renderChatlogs = this.renderChatlogs.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.handleNotifyAgent = this.handleNotifyAgent.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			input: '',
		};
	}

	/**
	 * Load the previous messages of this customer
	 */
	componentDidMount() {
		this.props.asyncFetchMessages();
	}

	/**
	 * Mark newly received messages as read
	 */
	componentDidUpdate(prevProps) {
		const {messages: newMessages} = this.props.chat;
		const {messages} = prevProps.chat;

		if(messages.length != newMessages.length) {
			this.handleMarkMessagesAsRead();
		}
	}

	/**
	 * Mark and save the read receipt on the messages received
	 * @return {Void} 
	 */
	handleMarkMessagesAsRead() {
		const Messages = database.collection('Messages');
		const {Office} = this.props.user;
		const batch = database.batch();
		const messages = [];

		Messages.where('Author.Office.id', '==', Office.id).get()
			.then(data => {
			 	data.docChanges().forEach(changes => {
				    const {id} = changes.doc;
				    const {read_at} = { ...changes.doc.data() };

				    if(!messages.includes(id) && !read_at) messages.push(id);
				});
			});

		messages.forEach(id => batch.update(Messages.doc(id), {read_at: new Date()}));
		batch.commit();
	}

	/**
	 * Create the new message collection entry
	 * @return {Void} 
	 */
	sendMessage() {
		const {input: content} = this.state;
		const {user: {id, name, Office}} = this.props;
		const Messages = database.collection('Messages');

		if(content.length < 3) return;

		const data = MessageSchema({
			recipient: Office.id,
			body: { type: 'text', content },
			author: { id, name },
		});

		this.setState({input: ''});
		Messages.doc(data).set()
		.then(() => {
			console.log('Successfully sent message!');
			//this.handleNotifyAgent();
		})
		.catch((err) => {
			console.log('Error:', err);
		});
	}

	/*handleNotifyAgent() {
		const {} = 
		const data = {
			"notification": {
				"title": "Firebase",
					"body": "Firebase is awesome",
						"click_action": "http://localhost:3000/",
							"icon": "http://url-to-an-icon/icon.png"
			},
			"to": "dntaKBmIr24:APA91bEgMHsBG8TLcFEbApWE8CsLlq7ZmpPc2MPc4YsT5cZyEaK2n7iBx45EiFz0olz5itbeBtVOdFCGrEdyCQTuuEDTP9EOnKwLZE1GutU6Nl9hKvi_RfaYcQpaTJZSyzt9qZ-HXVwE"
		};
		axios.post('https://fcm.googleapis.com/fcm/send')
	}*/

	/**
	 * Render the chat history
	 * @return {ReactElement} 
	 */
	renderChatlogs() {
		const {user, chat} = this.props;

		return chat.messages.map(({id, body, Author}) => {
			return (
				<Message 
					key={id}
					content={body}
					author={Author}
					isAuthor={user.id == Author.id} 
				/>
			);
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {input} = this.state;
		const {user, chat: {messages, meta}} = this.props;

		return (
			<ScreenWrapper>
				<ScrollView
					ref={ref => this.scrollView = ref}
					onContentSizeChange={(contentWidth, contentHeight )=> {        
						this.scrollView.scrollToEnd({animated: true});
					}}
					style={style.chatView}
				>
					{(() => {
						if(user.id && !meta.isLoading) {
							return (
								<React.Fragment>
								{(() => { 
									if(messages.length == 0) {
										return (
											<Text style={{marginTop: '50%', height: 100, textAlign: 'center'}}>
												No messages yet! Start a conversation today.
											</Text>
										);
									}else {
										return this.renderChatlogs();
									}
								})()}
								</React.Fragment>
							);
						}else if(meta.isLoading) {
							return (
								<View style={{height: 100, marginTop: '50%'}}>
									<Spinner color="black" />
								</View>
							);
						}
					})()}
				</ScrollView>
				<View style={style.sender}>
					<Item>
						<Input
							placeholder="Enter your message"
							onChangeText={(input) => this.setState({input})}
							maxLength={1600}
							style={{flex: 1}}
						/>
					</Item>
					<Item>
						<Button onPress={this.sendMessage} style={style.submitMessage}>
							<Text style={{color: '#fff'}}>Submit message</Text>
						</Button>
					</Item>
				</View>
			</ScreenWrapper>	
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} state.user The user's account info
 * @param  {Object} state.office The practice's office info
 * @param {Object} state.chat The chat tree of the store
 * @return {Object}                  
 */
function mapStateToProps({user, office, chat}) {
	return {
		user,
		office,
		chat,
	};
}

/**
 * Map the store's action dispatcher to the component's props
 * @param  {Function} dispatch The dispatch function
 * @return {Object}           
 */
function mapDispatchToProps(dispatch) {
	return {
		asyncFetchMessages: () => dispatch(ChatAction.asyncFetchMessages()),
		setChatMessages: (messages) => dispatch(ChatAction.setChatMessages(messages)),
	};
}