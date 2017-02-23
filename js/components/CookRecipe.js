'use strict';

import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Guid from 'guid';
import Base64Image from './Base64Image';
import Rating from 'react-rating';
import styles from '../styles/cookRecipe.css';
import ShowIngredient from './ShowIngredient';
import ShowStep from './ShowStep';

class CookRecipe extends Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.share = this.share.bind(this);
        this.star = this.star.bind(this);
    }

    componentDidMount() {
        this.props.loadRecipeDetails(this.props.params.recipeId);
    }

    edit(e) {
        e.preventDefault();
        this.props.navigateToEdit(this.props.recipeDetails.id);
    }

    share(e) {
        e.preventDefault();
        alert('share');
    }

    star(e) {
        e.preventDefault();
        alert('star');
    }

    render() {
        if (this.props.isFetching) {
            return (<h1>Loading...</h1>)
        }

        let showEdit = (this.props.recipeDetails.userId == this.props.userId);
        let ingredientsMarkup = this.props.recipeDetails.ingredients.map(function (ingredient) {
            var guid = Guid.create();
            return (
                <ShowIngredient key={guid.value} ingredient={ingredient} />
            );
        });
        let stepsMarkup = this.props.recipeDetails.steps.map(function (step) {
            var guid = Guid.create();
            return (
                <ShowStep key={guid.value} step={step} />
            );
        });

        return (
            <div styleName="wrapper">
                <div styleName="title">
                    <h1>{this.props.recipeDetails.title}</h1>
                    <Rating initialRate={this.props.recipeDetails.rating}
                        empty={'glyphicon glyphicon-star-empty'}
                        full={'glyphicon glyphicon-star'}
                    />
                </div>
                <div styleName='image-and-controls'>
                    <div styleName="image">
                        <Base64Image data={this.props.recipeDetails.image} />
                    </div>
                    <div styleName='controls'>
                        {showEdit && <div><a href="#" onClick={this.edit}><span className="glyphicon glyphicon-pencil"></span> Edit</a></div>}
                        <div><a href="#" onClick={this.share}><span className="glyphicon glyphicon-share"></span> Share</a></div>
                        <div><a href="#" onClick={this.star}><span className="glyphicon glyphicon-star"></span> Star</a></div>
                    </div>
                </div>
                <div styleName='ingredients'>
                    <h2>Ingredients</h2>
                    <div>
                        {ingredientsMarkup}
                    </div>
                    <button>Begin</button>
                </div>
                    
                <div styleName="steps">
                    <h2>Steps</h2>
                    <ol>
                        {stepsMarkup}
                    </ol>
                </div>
            </div>
        );
    }
}

export default CSSModules(CookRecipe, styles);