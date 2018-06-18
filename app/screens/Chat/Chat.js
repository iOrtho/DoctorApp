import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator as Spinner } from 'react-native';
import { Input, Button, Item } from 'native-base';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Message from 'app/components/Chat/Message/';
import { connect } from 'react-redux';
import ChatAction from 'app/store/actions/chat';
import { database } from 'app/config/firebase';

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
		this.loadConversation = this.loadConversation.bind(this);
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
		//this.loadConversation();
		this.props.asyncFetchMessages();
	}

	/**
	 * Make a request to the firestore to load all messages relevant to this user and
	 * connect to the live database
	 * @return {Void} 
	 */
	loadConversation() {
		const Messages = database.collection('Messages');
		const {id} = this.props.user;
		
		Promise.all([
			Messages.where('Author.id','==', id).get(),
			Messages.where('recipient', '==', id).get()
		])
		.then(res => {
			const messages = [];
			res[0].forEach(doc => messages.push({...doc.data(), id: doc.id}));
			res[1].forEach(doc => messages.push({...doc.data(), id: doc.id}));

			this.props.setChatMessages(messages);
			this.props.asyncFetchMessages();
		})
		.catch(err => console.log(err));
	}

	sendMessage() {
		const {input: body} = this.state;
		const {id, name} = this.props.user;
		const recipient = id == companyId ? customerId : companyId;

		if(body.length < 3) return;

		this.setState({input: ''});
		
		database.collection('Messages').doc().set({
			body,
			recipient,
			Author: {
				id,
				name,
			},
			created_at: new Date(),
		})
		.then(() => {
			console.log('Successfully sent message!');
		})
		.catch((err) => {
			console.log('Error:', err);
		})
	}

	renderChatlogs() {
		const {user, chat} = this.props;

		return chat.messages.map(({id, body, Author, self}) => {
			return (<Message 
						key={id}
						content={body}
						author={Author}
						isAuthor={user.id == Author.id} 
					/>);
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {input} = this.state;
		const {user, chat: {meta}} = this.props;

		return (
			<ScreenWrapper>
				<Text>Hello this is a Chatroom with Verdi.</Text>
				{user.id && <Text style={{margin: 10, textAlign: 'center', color: 'green'}}>Signed in as {user.email}</Text>}
				{(() => {
					if(user.id && !meta.isLoading) {
						return (
							<ScrollView 
								ref={ref => this.scrollView = ref}
							    onContentSizeChange={(contentWidth, contentHeight)=>{        
							        this.scrollView.scrollToEnd({animated: true});
							    }}
								style={{display: 'flex', flexDirection: 'column', height: '70%'}}
							>
								{this.renderChatlogs()}
							</ScrollView>
						);
					}else if(meta.isLoading) {
						return (<Spinner />);
					}
				})()}
				<View style={{display: 'flex', flexDirection: 'column', flex:1, marginBottom: 50}}>
					<Item>
						<Input
							placeholder="Enter your message"
							onChangeText={(input) => this.setState({input})}
							style={{flex: 1}}
						/>
					</Item>
					<Item>
						<Button 
							onPress={this.sendMessage}
							style={{flex: 1, justifyContent: 'center'}}
						>
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
 * @param {Object} state.chat The chat tree of the store
 * @return {Object}                  
 */
function mapStateToProps({user, chat}) {
	return {
		user,
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