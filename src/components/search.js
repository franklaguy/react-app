import React from 'react';
import axios from 'axios';

class Search extends  React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
      results: {},
      loading: false,
      message: '',
		};

		this.cancel = '';
	}

	fetchSearchResults = ( query ) => {
		const searchUrl = `https://api.tvmaze.com/search/shows?q=walking`;

		if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();

		axios.get( searchUrl, {
			cancelToken: this.cancel.token
		} )
			.then( res => { 
				const resultNotFoundMsg = ! res.data.length
										? 'There are no more search results. Please try a new search'
										: '';


				function arrayFromArgs() {
				    var results = [];
				    for (var i = 0; i < arguments.length; i++) {
				        results.push(arguments[i].show.name);
				    }
				    return results;
				}
				
				var shows = arrayFromArgs(...res.data);
				var getShows = [];

				for(var j=0;j<shows.length;j++){
					if(shows[j].toLowerCase().includes(query)){
						getShows.push(shows[j]);
					}
				}
	
				this.setState( {
					results: res.data,
					shows: getShows,
					message: resultNotFoundMsg,
					loading: false
				} )
			} )
			.catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false,
						message: 'Failed to fetch the data. Please check network'
					})
				}
			} )
	};

	handleOnInputChange = (event) => {
		const query = event.target.value;

	  if ( ! query ) { 
			this.setState({ query, results: {}, message: '' } );
		} else { 
			this.setState({ query, loading: true, message: '' }, () => {
				this.fetchSearchResults(query);
			});
		}
	};

	renderSearchResults = () => {
		const { results, shows } = this.state;

		if ( Object.keys( results ).length && results.length ) {

					return (
						<div className="results-container">
							{ results.map( result => {
									if(shows.includes(result.show.name)){

										return (
											<ul className="card" key={result.show.id}>
											    <li>
											    	<img src={result.show.image.medium} align="left" alt="{ result.show.name }" />
											    	<div className="blurb">
											    		<h2>{ result.show.name }</h2>
											    		<div dangerouslySetInnerHTML={{ __html: result.show.summary }}></div>
											    		<button type="button" className="btn btn-dark">Show Episodes</button>
											    	</div>
											    </li>
											</ul>
										)
									}
							} ) }
						</div>
					)
		}
	};

	render() {
		const { query, message } = this.state;

		return (
			<span>
				<div className="search ">
	          <div className="input-group pt-3 pb-3">
	            <div className="input-group-prepend">
	              <button className="btn btn-outline-secondary border-0 pt-0 pb-0" type="button">
	                <div className="rotate">&#x26B2;</div>
	                </button>
	            </div>
	            <input type="text" 
	            			 className="form-control border-0 mr-1" 
	            			 placeholder="" 
	            			 aria-label="" 
	            			 aria-describedby="basic-addon1"
	            			 value={ query.toLowerCase() }
	            			 onChange={this.handleOnInputChange} />
	            <button type="button" className="btn btn-dark">Search</button>
	          </div>
	        </div>
	        {message && <p className="message">{ message }</p>}
        	{ this.renderSearchResults() }
        </span>
			)
	}

}

export default Search;