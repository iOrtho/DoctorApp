import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import ScreenWrapper from 'app/components/common/ScreenWrapper';
import ScreenLoading from 'app/components/common/ScreenLoading';
import QuickHelp from 'app/components/Home/QuickHelp';
import OperatingHours from 'app/components/Home/OperatingHours';
import Slide from 'app/components/Slide';
import Permissions from 'app/lib/Permissions';
import { connect } from 'react-redux';
import UserAction from 'app/store/actions/user';
import style from './style';

class Home extends Component {

	/** The component's constructor */
	constructor(props) {
		super(props);

		this.state = this.getInitialState();

		this.handleImageLoaded = this.handleImageLoaded.bind(this);
	}

	/**
	 * Return the component's initial state
	 * @return {Object} 
	 */
	getInitialState() {
		return {
			data: [],
			loadQueue: []
		};
	}

	/**
	 * Request to activate notifications if not already done and load all the pics
	 */
	componentDidMount() {
		const {user, office: {doctors, pictures}} = this.props;
		const data = pictures.map(url => ({url}));
		this.setState({data});
		
		Image.prefetch(pictures[0]);
		Image.prefetch(doctors[0].picture);

		Permissions.requestNotifications(user.id);
	}

	/**
	 * Update the loaded status of the image with the given index
	 * @param  {Number} i The index of the image
	 * @return {Void}   
	 */
	handleImageLoaded(i) {
		const queue = [...this.state.loadQueue];
		queue[i] = true;

		this.setState({loadQueue: queue});
	}

	/**
	 * Render the component's markup
	 * @return {ReactElement} 
	 */
	render() {
		const {office} = this.props;
		const {data, loadQueue} = this.state;
		const doctorImage = {
			width: '100%',
			height: 220,
			marginBottom: 20,
		}

		if(!office.id) {
			return <ScreenLoading />;
		}

		return (
			<ScrollView contentContainerStyle={{display: 'flex'}}>

				<View style={{height: 250}}>
					<Swiper>
						{data.map(({url, ready}, i) => {
							return (
								<Slide
									key={i}
									index={i}
									uri={url}
									loaded={!!loadQueue[i]}
									onLoad={this.handleImageLoaded} 
								/>
							);
						})}
					</Swiper>
				</View>

				<ScreenWrapper style={[{paddingTop: 0}]}>
					<Text style={[style.title]}>{office.name}</Text>

					<QuickHelp office={office} style={[{marginBottom: 15}]} />

					{office.ready && <OperatingHours hours={office.operating_hours} />}

					{/*<View style={{height: 75, marginTop: 20, marginBottom: 20, backgroundColor: 'lime'}}>
						<Text>Review container</Text>
					</View>*/}

					<Text style={[style.subtitle, {marginBottom: 10}]}>Behind our practice...</Text>

					<View>
						<Text style={[style.paragraph]}>{office.description}</Text>
					</View>

					<Text style={[style.title, {marginBottom: 10}]}>About our Doctor</Text>

					<Text style={[style.subtitle]}>{office.doctors[0].name}</Text>

					<View style={doctorImage}>
						<Image source={{uri: office.doctors[0].picture}} style={{width: '100%', height: '100%'}} />
					</View>

					<View style={{marginBottom: 25}}>
						<Text style={[style.paragraph]}>{office.doctors[0].biography}</Text>
					</View>
				</ScreenWrapper>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * Map the redux store's state to the component's props
 * @param  {Object} options.office The office model
 * @param  {Object} options.user The user model
 * @return {Object}                  
 */
function mapStateToProps({office, user}) {
	return {
		office,
		user,
	};
}

/**
 * Map the store's action dispatcher to the component's props
 * @param  {Function} dispatch The dispatch function
 * @return {Object}           
 */
function mapDispatchToProps(dispatch) {
	return {
		setUserModel: (data) => dispatch(UserAction.setUserModel(data)),
	};
}