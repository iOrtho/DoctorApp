import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator as Spinner } from 'react-native';
import { Input, Button, Item } from 'native-base';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Message from 'app/components/Chat/Message/';
import { connect } from 'react-redux';
import ChatAction from 'app/store/actions/chat';
import { database } from 'app/config/firebase';
import style from './style';

const companyId = 'ow71aFnAQgLAbQuF9KIQ';
const customerId = 'KHHNbjR2iooYQJpHyfSq';

class Chat extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
		
		this.chatview = React.createRef();
		this.renderChatlogs = this.renderChatlogs.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
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
	 * Create the new message collection entry
	 * @return {Void} 
	 */
	sendMessage() {
		const {input: content} = this.state;
		const {office, user: {id, name}} = this.props;

		if(content.length < 3) return;

		this.setState({input: ''});
		database.collection('Messages').doc().set({
			body: {
				type: 'text',
				content,
			},
			recipient: office.id,
			Author: { id, name },
			created_at: new Date(),
		})
		.then(() => {
			console.log('Successfully sent message!');
		})
		.catch((err) => {
			console.log('Error:', err);
		});
	}

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
				{(() => {
					if(user.id && !meta.isLoading) {

						return (
							<ScrollView 
								ref={ref => this.scrollView = ref}
							    onContentSizeChange={(contentWidth, contentHeight)=>{        
							        this.scrollView.scrollToEnd({animated: true});
							    }}
								style={style.chatView}
							>
							{(() => { 
								if(messages.length == 0) {
									return (
										<Text style={{marginTop: 50}}>
											No messages yet! Start a conversation today.
										</Text>
									);
								}else {
									return this.renderChatlogs();
								}
							})()}
							</ScrollView>
						);
					}else if(meta.isLoading) {
						return (<Spinner />);
					}
				})()}
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