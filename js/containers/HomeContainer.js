import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Home from '../components/Home';
import * as actions from '../actions';
import * as api from '../data/api';
import * as constants from '../constants';

const mapStateToProps = (state) => {
	return {
		username: state.auth.username,
		publicRecipes: state.publicRecipes,
		personalRecipes: state.personalRecipes
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => {
			dispatch(actions.signOut());
			dispatch(push('/SignIn'));
		},
		loadRecipes: () => {
			api.loadRecipes(constants.recipeTypes.PERSONAL)
				.then((recipes) => {
					dispatch(actions.loadPersonalRecipesSuccess(recipes));
				}).catch(() => {
					// some error
				});
			api.loadRecipes(constants.recipeTypes.PUBLIC)
				.then((recipes) => {
					dispatch(actions.loadPublicRecipesSuccess(recipes));
				}).catch(() => {
					// some error
				});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);