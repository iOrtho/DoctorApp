import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Form, Input, Item, Label, DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { database } from 'app/config/firebase';
import ScreenWrapper from 'app/components/common/ScreenWrapper/';
import Button from 'app/components/common/Button/';
import style from '../style';

class AccountDetails extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			firstname: '',
			middlename: '',
			lastname: '',
			photo: '',
			dob: null,
			isSubmitting: false,
		};
	}

	/**
	 * Extract account details from the store's state
	 */
	componentDidMount() {
		const {firstname, middlename, lastname, photo, date_of_birth: dob} = this.props.user;

		this.setState({
			firstname,
			middlename,
			lastname,
			photo,
			dob: new Date(dob.seconds * 1000),
		});
	}

	/**
	 * Validate the input then send the requests to update the user data
	 * @return {Void} 
	 */
	handleUpdateAccount() {
		const {firstname, middlename, lastname, photo, dob: date_of_birth} = this.state;
		const {id} = this.props.user;
		const Users = database.collection('Users');

		if(firstname.length < 6) {
			alert('Please enter your first name.');
			return;
		};

		if(lastname.length < 6) {
			alert('Please enter your last name.');
			return;
		};

		if(! date_of_birth) {
			alert('Make sure you have set your date of birth.');
			return;
		};

		this.setState({isSubmitting: true});

		Users.doc(id).update({
			firstname,
			middlename,
			lastname,
			photo,
			date_of_birth,
			name: `${firstname} ${middlename ? middlename+' ' : ''}${lastname}`,
			updated_at: new Date(),
		}).then(() => {
			this.setState({isSubmitting: false});
			alert('Your account information were successfully updated!');
		})
		.catch(err => {
			this.setState({isSubmitting: false});
			console.log(err);
		});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {firstname, middlename, lastname, dob, isSubmitting} = this.state;

		return (
			<ScreenWrapper>
				<Text style={[style.title]}>Account details</Text>
				<Form>
					<Item floatingLabel>
						<Label>First name</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={true}
							value={firstname}
							onChangeText={(firstname) => this.setState({firstname})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Middle name</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={true}
							value={middlename}
							onChangeText={(middlename) => this.setState({middlename})}
						/>
					</Item>
					<Item floatingLabel>
						<Label>Last name</Label>
						<Input
							autoCapitalize="none"
							autoCorrect={true}
							value={lastname}
							onChangeText={(lastname) => this.setState({lastname})}
						/>
					</Item>
					<Item>
						<Label>Date of birth</Label>
						<DatePicker
							modalTransparent={true}
							defaultDate={new Date(dob)}
							minimumDate={new Date(1940, 1, 1)}
							maximumDate={new Date(2010, 1, 1)}
							onDateChange={(dob) => this.setState({dob})}
							placeHolderText="Select your date of birth"
							locale="en"
						/>
					</Item>
					<Button
						text="Update my account"
						loading={isSubmitting}
						onPress={this.handleUpdateAccount}
					/>
				</Form>
			</ScreenWrapper>
		);
	}
}

export default connect(mapStateToProps, null)(AccountDetails);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.user The user model
 * @return {Object}                  
 */
function mapStateToProps({user}) {
	return {
		user,
	};
}